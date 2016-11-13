var lambdaUrl = "https://1pvxwe83ta.execute-api.us-east-1.amazonaws.com/prod/";

var threshold = -1;

var getRating = function(user, funct) {
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", lambdaUrl + "getrating", true);
	xhttp.send('{ "user" : "' + user + '" }');
	xhttp.onload = function () {
		funct(parseInt(xhttp.responseText));
	};
};

var login = function(user, pass, funct) {
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", lambdaUrl + "login", true);
	xhttp.send('{ "user" : "' + user + '", "pass" : "' + pass + '" }');
	xhttp.onload = function () {
		funct(xhttp.responseText == "true");
	};
};

var register = function(user, pass, funct) {
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", lambdaUrl + "register", true);
	xhttp.send('{ "user" : "' + user + '", "pass" : "' + pass + '" }');
	xhttp.onload = function () {
		funct(xhttp.responseText == "true");
	};
};

var report = function(targetUser, rating, comment, funct) {
    var srcUser = localStorage.user;
    var pass = localStorage.pass;
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", lambdaUrl + "register", true);
	xhttp.send('{ "sourceuser" : "' + srcUser + '", "pass" : "' + pass + '", "targetuser" : "' + targetUser + '", "rating" : "' + rating + '", "comment" : "' + comment + '", }');
	xhttp.onload = function () {
		funct(xhttp.responseText == "true");
	};
};





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
      if(!report.classList.contains("safeSpaceRated")) {
        var rateForm = document.createElement("form");
        rateForm.name = "Rate Form for" + username;
        rateForm.method = "post";

        var desc = document.createElement("div");
        desc.textContent = "Please enter a rating for the user (Good:1 to Bad:5)";
        rateForm.appendChild(desc);

        var dropdown = document.createElement("input");
        dropdown.type = "number";
        dropdown.name = "rate";
        dropdown.onchange = function () {
          if (this.value < 1) this.value = 1;
          if (this.value > 5) this.value = 5;
        };
        var submit = document.createElement("input");
        submit.type = "submit";
        submit.value = "Submit";

        rateForm.action = this.report(username, dropdown.value, text.parentNode.childNodes[1], function(success){
          if(success){
            text.removeChild(rateForm);
            console.log("Success in sending info");
          }
        });							// This thing right here

        rateForm.appendChild(dropdown);
        rateForm.appendChild(submit);
        text.appendChild(rateForm);
        report.classList.add("safeSpaceRated");
      }
	};
	text.appendChild(report);
}







var loopComments = function(comments) {
	Array.prototype.forEach.call(comments, function(comment) {
		//console.log(comment);
		// Grab element, done with comment
		// Grab username
		if (!comment.classList.contains("safespacechecked")) {
			var header = comment.getElementsByClassName("comment-renderer-header")[0];
			var username = header.getElementsByTagName("a")[0].textContent;
			// Check user name
			console.log(username);

			//var rate = rating();
			var rate = getRating(username, function (num) {
				var text = comment.getElementsByClassName("comment-renderer-text-content")[0];

				addRating(header, num);
				addReportBTN(header, username);

				//if(rate == undefined | rate == null) rate = 1;
				if (num >= threshold) {
					// Black Out comment for now
					changeText(text);
				}
			});

			comment.classList.add("safespacechecked");
		}

	});
};



setInterval(function() {

	var comments = document.body.getElementsByClassName("comment-renderer");

	loopComments(comments);

}, 500);