function lin() {
    var u = document.getElementById('uname').value;
    var p = document.getElementById('psw').value;
    login(u, p, function(sucess) {
        if (sucess) {
            chrome.storage.sync.set({'user': u});
            chrome.storage.sync.set({'pass': p});
        }
    });
}

function reg() {
    register(document.getElementById('uname').value, document.getElementById('psw').value, function(sucess) {});
}

function init() {
    loginBtn = document.querySelector('#login');
    registerBtn = document.querySelector('#register');

    loginBtn.addEventListener('click', lin, false);
    registerBtn.addEventListener('click', reg, false);
}

document.addEventListener('DOMContentLoaded', init);