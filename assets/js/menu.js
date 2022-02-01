let btn = document.getElementById("exit_button");
btn.onclick = function() {
    let user = getCurrentUser();
    user.removeCurrentUser();
    location.replace("login.html");
}