var comments = document.body.getElementsByClassName("comment-renderer");
var threshold = 3;
Array.prototype.forEach.call(comments, function(comment) {
	//console.log(comment);
	// Grab element, done with comment
	// Grab username
	var username = comment.getElementsByClassName("comment-renderer-header")[0].getElementsByTagName("a")[0].textContent;
	// Check user name
	console.log(username);
	var rating = function(){
		// Send the username to the server
		console.log("Inside the rating function");
		return 5;
	};
	// If(rating >= threshold}
	if(rating >= threshold){
		// Black Out comment for now
		var text = comment.getElementsByClassName("comment-renderer-text-content")[0];
		text.style.backgroundColor = "Black";
		//comment.style.color = "black";
		console.log("Set background to black");
	}
});
