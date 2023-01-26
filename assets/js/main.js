
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)
    
    /* ======= VALIDATE VARIABLES EXIST ======= */
    if(toggle && nav){
        toggle.addEventListener('click',() => {
    /* ======= WHE ADD THE SHOW MENU CLASS TO THE DIV CLASS ======= */
                nav.classList.toggle('show-menu')
            })
    }
}
showMenu('nav-toggle','nav-menu') 



/* ======= REMOVE MENU MOBILE =======*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    /* ======= WHEN WE CLICK ON EACH NAV__LINK WE REMOVE THE SHOW-MENU CLASS ======= */
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))
 


/* ======= SCROLL SECTION ACTIVE LINK =======*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)


/* ======= SHOW SCROLL TOP =======*/
function scrollTop(){
    const scrollTop = document.getElementById('scroll-top');
    
    if(this.scrollY >= 200) scrollTop.classList.add('show-scroll'); else scrollTop.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollTop)


/* ======= DARK LIGHT THEME =======*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bx-sun'

/* ======= PREVIOUSLY SELECTED TOPIC =======*/
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')


const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx-moon' : 'bx-sun'

/* ======= WHE VALIDATE IF THE USER PREVIOUSLY CHOSE A TOPIC =======*/
if (selectedTheme) {
/* ======= ACTIVATED OR DEACTIVATED THE DARK */
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](iconTheme)
}

/* ======= ACTIVATE / DISABLE THEME MANUALLY WITH THE BUTTON  =======*/
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
/* ======= WE SAVE THE THEME AND THE CURRENT ICON THAT THE USER CHOSEN ======= */
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*REDUCE THE SIZE AND PRINT ON AN A4 SHEET*/
function scaleCv() {
    document.body.classList.add('scale-cv')
}

/* REMOVE THE SIZE WHEN THE CV IS DOWNLOADED */
function removeScale(){
    document.body.classList.remove('scale-cv')
}

/* GENERATE PDF */
let areaCv = document.getElementById('area-cv')
let resumeButton= document.getElementById('resume-button')

/* Html2pdf option */
let opt = {
    margin:       0,
    filename:     'myResume.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 4 },
    jsPDF:        { format: 'a4', orientation: 'portrait' }
}

function generateResume(){
    html2pdf(areaCv, opt)
}

resumeButton.addEventListener('click', () =>{

    scaleCv()
generateResume()
setTimeout(removeScale, 5000)
})