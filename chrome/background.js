var threshold = 3;

function changeText(text){
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

function addRating(text, r){
	var rate = document.createElement("span");
	rate.textContent = "	User's current rating:	" + r +" ";
	rate.style.color = "green";
	text.appendChild(rate);
}

function addReportBTN(text, username){
	var rate = document.createElement("input");
	rate.type = "button";
	rate.value = "Rate User";
	rate.onclick = function (){
      if(!rate.classList.contains("safeSpaceRated")) {
        var rateForm = document.createElement("div");
        //rateForm.name = "Rate Form for" + username;
        //rateForm.method = "post";

        var desc = document.createElement("div");
        desc.textContent = "Please enter a rating for the user (Good:1 to Bad:5)";
        rateForm.appendChild(desc);

        var dropdown = document.createElement("input");
        dropdown.type = "number";
        dropdown.name = "rate";
        dropdown.defaultValue = 1;
        dropdown.onchange = function () {
          if (this.value < 1) this.value = 1;
          if (this.value > 5) this.value = 5;
        };
        var submit = document.createElement("input");
        submit.type = "button";
        submit.value = "Submit";

        submit.onclick = function(){report(username, dropdown.value, "", function(success){
          if(success){
            text.removeChild(rateForm);
            console.log("Success in sending info");
          }
          else{console.log("didn't send")}
        })};							// This thing right here

        rateForm.appendChild(dropdown);
        rateForm.appendChild(submit);
        text.appendChild(rateForm);
        rate.classList.add("safeSpaceRated");
      }
	};
	text.appendChild(rate);
}

function loopComments(comments) {
	Array.prototype.forEach.call(comments, function(comment) {
		// Grab element, done with comment
		// Grab username
		if (!comment.classList.contains("safespacechecked")) {
			var header = comment.getElementsByClassName("comment-renderer-header")[0];
			var username = header.getElementsByTagName("a")[0].textContent;
			// Check user name
			console.log(username);

			var rate = getRating(username, function (num) {
				var text = comment.getElementsByClassName("comment-renderer-text-content")[0];

				addRating(header, num);
				addReportBTN(header, username);

				if (num >= threshold) {
					// Black Out comment for now
					changeText(text);
				}
			});

			comment.classList.add("safespacechecked");
		}

	});
}



setInterval(function() {

	var comments = document.body.getElementsByClassName("comment-renderer");

	loopComments(comments);

}, 500);