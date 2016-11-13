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
	var header = comment.getElementsByClassName("comment-renderer-header")[0];
	var username = header.getElementsByTagName("a")[0].textContent;
	// Check user name
	console.log(username);

	var rate = rating();
	var text = comment.getElementsByClassName("comment-renderer-text-content")[0];

	addRating(header, rate);
	addReportBTN(header, username);

	if(rate >= threshold){
		// Black Out comment for now
		changeText(text);
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

function addRating (text, r){
	var rate = document.createElement("span");
	rate.textContent = "	User's current rating:	" + r +" ";
	rate.style.color = "green";
	text.appendChild(rate);
}
function addReportBTN (text, username){
	var report = document.createElement("input");
	report.type = "button";
	report.value = "Rate User";
	report.onclick = function (){
		var rateForm = document.createElement("form");
		rateForm.name = "Rate Form for" + username;
		rateForm.method = "post";
		//rateForm.action = "";
		var dropdown = document.createElement("input");
		dropdown.type = "number";
		dropdown.name = "rate";
		var submit = document.createElement("input");
		submit.type = "submit";
		submit.value = "Submit";

		rateForm.appendChild(dropdown);
		rateForm.appendChild(submit);
		text.appendChild(rateForm);
	};
	text.appendChild(report);
}