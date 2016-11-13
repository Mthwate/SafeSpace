var lambdaUrl = "https://lrceivshje.execute-api.us-east-1.amazonaws.com/prod/"

var comments = document.body.getElementsByClassName("comment-renderer");

var getRating = function(user, funct) {
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", lambdaUrl + "getrating", true);
	xhttp.send('{ "user" : "' + user + '" }');
	xhttp.onload = function () {
		funct(xhttp.responseText);
	};
};

var login = function(user, pass, funct) {
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", lambdaUrl + "login", true);
	xhttp.send('{ "user" : "' + user + '", "pass" : "' + pass + '" }');
	xhttp.onload = function () {
		funct(xhttp.responseText);
	};
};

var register = function(user, pass, funct) {
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", lambdaUrl + "register", true);
	xhttp.send('{ "user" : "' + user + '", "pass" : "' + pass + '" }');
	xhttp.onload = function () {
		funct(xhttp.responseText);
	};
};

var report = function(srcUser, pass, targetUser, rating, comment, funct) {
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", lambdaUrl + "register", true);
	xhttp.send('{ "sourceuser" : "' + srcUser + '", "pass" : "' + pass + '", "targetuser" : "' + targetUser + '", "rating" : "' + rating + '", "comment" : "' + comment + '", }');
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
	var warningText = document.createElement("div");
	warningText.style.color = "red";
	warningText.textContent  = "User has a bad rating!";
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

	//text.insertAdjacentHTML('afterend', "User has a bad rating...");
	text.parentNode.appendChild(warningText);
	text.parentNode.appendChild(btn);
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