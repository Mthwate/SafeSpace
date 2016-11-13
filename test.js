var comments = document.body.getElementsByClassName("comment-renderer");

var getUserRating = function(user, funct) {
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", "https://lrceivshje.execute-api.us-east-1.amazonaws.com/prod/resource", true);
	xhttp.send('{ "user": "' + user + '" }');
	xhttp.onload = function () {
		funct(xhttp.responseText);
	};
};

Array.prototype.forEach.call(comments, function(comment) {
	console.log(comment)
});
