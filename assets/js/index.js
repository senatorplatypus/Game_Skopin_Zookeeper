function setTheme(light) {
    localStorage.setItem('theme', light);
    document.documentElement.className = light;
}

(function () {
    if (localStorage.getItem('theme')) {
        setTheme(localStorage.getItem('theme'))
    } else {
        setTheme('light')
    }
})
    ();