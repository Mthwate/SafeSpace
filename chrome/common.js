var lambdaUrl = "https://1pvxwe83ta.execute-api.us-east-1.amazonaws.com/prod/";

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
	xhttp.open("POST", lambdaUrl + "report", true);
	xhttp.send('{ "sourceuser" : "' + srcUser + '", "pass" : "' + pass + '", "targetuser" : "' + targetUser + '", "rating" : "' + rating + '", "comment" : "' + comment + '", }');
	xhttp.onload = function () {
		funct(xhttp.responseText == "true");
	};
};