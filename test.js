var comments = document.body.getElementsByClassName("comment-renderer");

Array.prototype.forEach.call(comments, function(comment) {
	console.log(comment)
});
