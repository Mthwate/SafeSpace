var lambdaUrl = "https://lrceivshje.execute-api.us-east-1.amazonaws.com/prod/"
console.log("going");
$(document).ready(function () {
    var comments = $(".comment-renderer");
    console.log(comments);

    var login = function (user, pass, funct) {
        localStorage.user = user;
        localStorage.pass = pass;
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", lambdaUrl + "login", true);
        xhttp.send('{ "user" : "' + user + '", "pass" : "' + pass + '" }');
        xhttp.onload = function () {
            funct(xhttp.responseText);
        };
    };

    var register = function (user, pass, funct) {
        localStorage.user = user;
        localStorage.pass = pass;
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", lambdaUrl + "register", true);
        xhttp.send('{ "user" : "' + user + '", "pass" : "' + pass + '" }');
        xhttp.onload = function () {
            funct(xhttp.responseText);
        };
    };

    var threshold = 3;
    Array.prototype.forEach.call(comments, function (comment) {
        //console.log(comment);
        // Grab element, done with comment
        // Grab username
        var username = comment.getElementsByClassName("comment-renderer-header")[0].getElementsByTagName("a")[0].textContent;
        // Check user name
        console.log(username);
        var rate = rating();
        // If(rating >= threshold}
        if (rate >= threshold) {
            // Black Out comment for now
            var text = comment.getElementsByClassName("comment-renderer-text-content")[0];
            changeText(text);
            //comment.style.color = "black";
            //console.log("Set background to black");
        }
    });
    function changeText(text) {
        //text.style.display = "none";	// Hide the user's text
        text.style.visibility = "hidden";
        // Add text inline
        //var warningText = document.createTextNode("User has bad rating...");
        var warningText = document.createElement("div");
        warningText.style.color = "red";
        warningText.textContent = "User has a bad rating!";
        var btn = document.createElement("input");
        btn.type = "button";
        btn.onclick = function () {
            if (this.value == "View Anyways") {
                this.parentNode.childNodes[0].style.visibility = "visible";
                this.value = "Hide Comment";
            }
            else {
                this.parentNode.childNodes[0].style.visibility = "hidden";
                this.value = "View Anyways";
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
    function buttonHandler(text) {
        if (this.value == "View Anyways") {
            text.style.visibility = "visible";
            this.value = "Hide Comment";
        }
        else {
            text.style.visibility = "hidden";
            this.value = "View Anyways";
        }
        //text.getElementsByTagName("INPUT")[0].textContent = "Hide comment";
    }
    function getCurrentTabUrl(callback) {
        // Query filter to be passed to chrome.tabs.query - see
        var queryInfo = {
            active: true,
            currentWindow: true
        }
    };

    chrome.tabs.query(queryInfo, function(tabs) {
        var tab = tabs[0];
        var url = tab.url;

        console.assert(typeof url == 'string', 'tab.url should be a string');

        callback(url);
    });
    x.onerror = function() {
        errorCallback('Network error.');
    };
    x.send();

    function renderStatus(statusText) {
        document.getElementById('status').textContent = statusText;
    }

    document.addEventListener('DOMContentLoaded', function() {
        getCurrentTabUrl(function(url) {
            // Put the image URL in Google search.
            renderStatus('Performing Google Image search for ' + url);

            getImageUrl(url, function(imageUrl, width, height) {

                renderStatus('Search term: ' + url + '\n' +
                    'Google image search result: ' + imageUrl);
                var imageResult = document.getElementById('image-result');
                imageResult.width = width;
                imageResult.height = height;
                imageResult.src = imageUrl;
                imageResult.hidden = false;

            }, function(errorMessage) {
                renderStatus('Cannot display image. ' + errorMessage);
            });
        });
    });
    console.log("going");
    var e = document.getElementById("login");
    console.log("going1");
    if (e.onclick == "logingo") {
        console.log("going2");
        e.onclick = login(e.getElementsByTagName("uname"), e.getElementsByTagName("psw"));
    }
    var f = document.getElementById("register");
    console.log("going3");
    if (f.onclick == "regigo") {
        
        f.onclick = register(f.getElementsByTagName("uname"), f.getElementsByTagName("psw"));

    }
})

