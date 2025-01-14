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

// scroll
ScrollReveal({
    // reset: true,
    distance: '60px',
    duration: 2500,
    delay: 100
});

ScrollReveal().reveal('.home .info h2,.home .info h1, .section-title-01, .section-title-02', { delay: 500, origin: 'bottom' });
ScrollReveal().reveal('.home .info h3, .home .info p, .about-info .btn', { delay: 600, origin: 'bottom' });
ScrollReveal().reveal('.home .info .btn', { delay: 700, origin: 'bottom' });
ScrollReveal().reveal('.media-icons i, .contact-left li', { delay: 500, origin: 'bottom', interval: 200 });
ScrollReveal().reveal('.home-img, .about-img', { delay: 500, origin: 'bottom' });
ScrollReveal().reveal(' .contact-right', { delay: 600, origin: 'bottom' });
ScrollReveal().reveal(' .content', { delay: 600, origin: 'bottom' });
ScrollReveal().reveal('.about .professional-list li', { delay: 500, origin: 'bottom', interval: 200 });
ScrollReveal().reveal('.skills-description, .services-description, .contact-card, .client-swiper, .contact-left h2', { delay: 700, origin: 'bottom' });
ScrollReveal().reveal('.experience-card, .service-card, .education, .profolio .img-card', { delay: 800, origin: 'bottom', interval: 200 });
