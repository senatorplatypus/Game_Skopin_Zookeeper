window.onload = updateResults;

function updateResults() {
    let users = localStorage.getItem(USERS_STORAGE_KEY).fromJson();
    users = users.sort((u1, u2) => u2.score - u1.score).filter(u => u.score !== null);

    console.log(users)


    if (users.length < 5) {

    } else {
        CreateProfileScore(users[4].name, users[4].score, 5)
    }

    if (users.length < 4) {
    } else {
        CreateProfileScore(users[3].name, users[3].score, 4)
    }

    if (users.length < 3) {
    } else {
        CreateProfileScore(users[2].name, users[2].score, 3)
    }

    if (users.length < 2) {
    } else {
        CreateProfileScore(users[1].name, users[1].score, 2)
    }

    if (users.length < 1) {
    } else {
        CreateProfileScore(users[0].name, users[0].score, 1)
    }
}

function CreateProfileScore(name, score, pos) {
    let profilesinner = document.querySelector('.leaderboard__profiles')
    let profile = document.createElement('article')
    profile.classList.add('leaderboard__profile')
    let position = document.createElement('div')
    position.classList.add('leaderboard__position')
    position.innerHTML = pos
    let gamename = document.createElement('span')
    gamename.classList.add('leaderboard__name')

    gamename.innerHTML = name
    let gamescore = document.createElement('span')
    gamescore.classList.add('leaderboard__score')
    gamescore.innerHTML = score

    profilesinner.prepend(profile)
    profile.append(position)
    profile.append(gamename)
    profile.append(gamescore)
}