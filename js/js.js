window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});
const servicesModals = document.querySelectorAll('.porfolio-model');
const learnmoreBtns = document.querySelectorAll('.img-card');
const modalCloseBtns = document.querySelectorAll('.portfolio-close-btn');
var modal = function (modalClick) {
    servicesModals[modalClick].classList.add('active');
}
learnmoreBtns.forEach((learnmoreBtn, i) => {
    learnmoreBtn.addEventListener('click', () => {
        modal(i);
    });
});
modalCloseBtns.forEach((modalCloseBtn) => {
    modalCloseBtn.addEventListener('click', () => {
        servicesModals.forEach((modalView) => {
            modalView.classList.remove('active');
        });
    });
});
// website dark/light mode
const themeBtn = document.querySelector('.theme-btn');
themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    themeBtn.classList.toggle('sun');
    localStorage.setItem('saved-theme', getCurrentTheme());
    localStorage.setItem('saved-icon', getCurrentIcon());
});
const getCurrentTheme = () => document.body.classList.contains('dark-theme') ? 'dark' : 'light';
const getCurrentIcon = () => themeBtn.classList.contains('sun') ? 'sun' : 'moon';
const savedTheme = localStorage.getItem('saved-theme');
const savedIcon = localStorage.getItem('saved-icon');
if (savedTheme) {
    document.body.classList[savedTheme === 'dark' ? 'add' : 'remove']('dark-theme');
    themeBtn.classList[savedIcon === 'sun' ? 'add' : 'remove']('sun');
}
const scrollToBtn = document.querySelector('.scrollToTop-btn');
window.addEventListener('scroll', function () {
    scrollToBtn.classList.toggle('active', window.scrollY > 500);
});
scrollToBtn.addEventListener('click', () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
        let sectionHeight = current.offsetHeight;
        let sectionTop = current.offsetTop - 50;
        let id = current.getAttribute('id');
        if (
            scrollY > sectionTop && scrollY <= sectionTop + sectionHeight
        ) {
            document.querySelector('.nav-items a[href*=' + id + ']').classList.add('active');
        } else {
            document.querySelector('.nav-items a[href*=' + id + ']').classList.remove('active');
        }
    })
});