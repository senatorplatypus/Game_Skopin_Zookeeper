class User {
    constructor(name) {
        this.name = name;
        this.score = null;
    }

    findInStorage() {
        let savedUsers = localStorage.getItem(USERS_STORAGE_KEY);
        if (savedUsers !== null) {
            savedUsers = savedUsers.fromJson();
            let userFromStorage = savedUsers.find(savedUser => savedUser.name === this.name);
            if (userFromStorage) {
                return userFromStorage;
            }
        }
        return null;
    }

    saveResult(score) {
        let users = localStorage.getItem(USERS_STORAGE_KEY).fromJson();
        let user = this.findInStorage();
        if (user.score === null || user.score < score) {
            user.score = score;
            let index = users.findIndex(u => user.name === u.name);
            users[index] = user;
            localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
        }
    }

    setCurrentUser() {
        localStorage.setItem(CURRENT_USER_STORAGE_KEY, this.name);
    }

    removeCurrentUser() {
        localStorage.setItem(CURRENT_USER_STORAGE_KEY, null);
    }

    toJson() {
        return JSON.stringify(this);
    }
}

String.prototype.fromJson = function() {
    return JSON.parse(this);
}

const USERS_STORAGE_KEY = 'users';
const CURRENT_USER_STORAGE_KEY = 'current_user';

function getCurrentUser() {
    let username = localStorage.getItem(CURRENT_USER_STORAGE_KEY);
    let users = localStorage.getItem(USERS_STORAGE_KEY).fromJson();
    let user = users.find(u => u.name === username);
    return new User(user.name);
}