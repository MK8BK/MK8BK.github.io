const dropDown =
    document
    .getElementsByClassName('nav-menu')
    .item(0);
const themeButton =
    document
    .getElementsByClassName("theme-button")
    .item(0);
const hamburgerButton =
    document
    .getElementsByClassName("hamburger-button")
    .item(0);


    
/**
 * To handle clicks outside clickable areas.
 */
window.onclick = function (event) {
    let classes = event.target.classList;
    if(!(classes.contains('hamburger-button'))){
        hideDropDown();
    }
};


/**
 * Flips the theme color by changing the class of the body element.
 */
function flipTheme(){
    let body = document.body;
    if(body.classList.contains('dark-body-theme')){
        body.classList.remove('dark-body-theme');
        body.classList.add('light-body-theme');
        localStorage.setItem('portfolio-theme','light');
    }else{
        body.classList.remove('light-body-theme');
        body.classList.add('dark-body-theme');
        localStorage.setItem('portfolio-theme','dark');
    }
}

/**
 * used to store theme between link reloads
 */
function initTheme(){
    let possiblySetTheme = localStorage.getItem('portfolio-theme');
    if(possiblySetTheme){
        if(possiblySetTheme === 'dark'){
            flipTheme();
        }
        // else: do nothing, already light by default
    }
}

/**
 * Show the links drop down menu.
 */
function toggleDropDown(){
    if(dropDown.classList.contains('active')){
        hideDropDown();
    }else{
        dropDown.classList.toggle('active');
    }
}


function hideDropDown(){
    dropDown.classList.remove('active');
}


hideDropDown();
initTheme();