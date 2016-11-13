var comments = document.body.getElementsByClassName("comment-renderer");

var getUserRating = function(user, funct) {
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", "https://lrceivshje.execute-api.us-east-1.amazonaws.com/prod/resource", true);
	xhttp.send('{ "user": "' + user + '" }');
	xhttp.onload = function () {
		funct(xhttp.responseText);
	};
};

var threshold = 3;

Array.prototype.forEach.call(comments, function(comment) {
	//console.log(comment);
	// Grab element, done with comment
	// Grab username
	var username = comment.getElementsByClassName("comment-renderer-header")[0].getElementsByTagName("a")[0].textContent;
	// Check user name
	console.log(username);
	var rate = rating();
	// If(rating >= threshold}
	if(rate >= threshold){
		// Black Out comment for now
		var text = comment.getElementsByClassName("comment-renderer-text-content")[0];
		changeText(text);
		//comment.style.color = "black";
		//console.log("Set background to black");
	}
});

function rating (){
	//console.log("Inside the rating function");
	return 5;
}

function changeText (text){
	//text.style.display = "none";	// Hide the user's text
	text.style.visibility = "hidden";
	// Add text inline
	//var warningText = document.createTextNode("User has bad rating...");
	var btn = document.createElement("input");
	btn.type = "button";
	btn.onclick = function (){
		if(this.value=="View Anyways") {
			this.parentNode.childNodes[0].style.visibility = "visible";
			this.value="Hide Comment";
		}
		else{
			this.parentNode.childNodes[0].style.visibility = "hidden";
			this.value="View Anyways";
		}
	};
	btn.value = "View Anyways";
	// Add a button
	//text.insertAdjacentHTML('afterend', "<input type=\"button\" onclick=\"buttonHandler(event.target)\" value=\"View Anyways\">");
	//text.insertAdjacentHTML('afterend', btn.htmlText);

	text.insertAdjacentHTML('afterend', "User has a bad rating...");
	text.parentNode.appendChild(btn);
	//text.parentNode.appendChild(warningText);
	// Add a listener to the button
}


// Add a button handler
function buttonHandler(text){
	if(this.value=="View Anyways") {
		text.style.visibility = "visible";
		this.value="Hide Comment";
	}
	else{
		text.style.visibility = "hidden";
		this.value="View Anyways";
	}
	//text.getElementsByTagName("INPUT")[0].textContent = "Hide comment";
}