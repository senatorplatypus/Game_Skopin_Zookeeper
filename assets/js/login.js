String.prototype.isEmpty = function () {
    return !this || this.length === 0;
};


enter.onclick = function () {
    setErrorText('');
    if (validate()) {
        let user = new User(username.value);
        let userFromStorage = user.findInStorage();
        if (userFromStorage !== null) {
            clearFields();
            user.setCurrentUser();
            location.replace("menu.html");
        } else if (userFromStorage == null) {
            let savedUsers = localStorage.getItem(USERS_STORAGE_KEY);
            savedUsers = savedUsers !== null ? savedUsers.fromJson() : [];
            savedUsers.push(user);
            localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(savedUsers));
            user.setCurrentUser();
            location.replace("menu.html");
        } else {
            clearFields();
        }
    } else {
        setErrorText('Поле не заполнено');
    }
}

function validate() {
    return !username.value.isEmpty();
}

function clearFields() {
    username.value = "";
}

function setErrorText(message) {
    error.innerHTML = message;
}