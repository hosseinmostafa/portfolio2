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

const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
let numStars = 100;

let mouseX = canvas.width / 2;
let mouseY = canvas.height / 2;

let isDarkMode = localStorage.getItem('saved-theme') === 'dark';


function setStarCount() {
    if (window.innerWidth >= 1024) {
        numStars = 100;
    } else if (window.innerWidth >= 768) {
        numStars = 50;
    } else {
        numStars = 25;
    }
}

function init() {
    setStarCount();
    stars = [];
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5,
            vx: Math.random() * 0.5 - 0.25,
            vy: Math.random() * 0.5 - 0.25,
            alpha: Math.random(),
            isFollowingMouse: i === 0
        });
    }
}

function draw() {
    ctx.fillStyle = isDarkMode ? '#0e1b31' : '#fefefe';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);

        ctx.fillStyle = isDarkMode ? `rgba(255, 255, 255, ${star.alpha})` : `rgba(0, 0, 0, ${star.alpha})`;
        ctx.fill();

        if (star.isFollowingMouse) {
            star.x = mouseX;
            star.y = mouseY;
        } else {
            star.x += star.vx;
            star.y += star.vy;

            if (star.x < 0 || star.x > canvas.width || star.y < 0 || star.y > canvas.height) {
                star.x = Math.random() * canvas.width;
                star.y = Math.random() * canvas.height;
            }
        }
    });

    drawLines();
    requestAnimationFrame(draw);
}

function drawLines() {
    const maxDistance = 100;
    for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
            const dx = stars[i].x - stars[j].x;
            const dy = stars[i].y - stars[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < maxDistance) {
                ctx.beginPath();
                ctx.moveTo(stars[i].x, stars[i].y);
                ctx.lineTo(stars[j].x, stars[j].y);
                ctx.strokeStyle = isDarkMode ? `rgba(255, 255, 255, ${1 - distance / maxDistance})` : `rgba(0, 0, 0, ${1 - distance / maxDistance})`;
                ctx.stroke();
            }
        }
    }
}

canvas.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

canvas.addEventListener('click', (e) => {
    const clickX = e.clientX;
    const clickY = e.clientY;

    for (let i = 0; i < 10; i++) {
        stars.push({
            x: clickX,
            y: clickY,
            radius: Math.random() * 1.5,
            vx: Math.random() * 2 - 1,
            vy: Math.random() * 2 - 1,
            alpha: Math.random(),
            isFollowingMouse: false
        });
    }
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

themeBtn.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-theme', isDarkMode);
    themeBtn.classList.toggle('sun', isDarkMode);
    localStorage.setItem('saved-theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('saved-icon', isDarkMode ? 'sun' : 'moon');
});

if (savedTheme) {
    isDarkMode = savedTheme === 'dark';
    document.body.classList.toggle('dark-theme', isDarkMode);
    themeBtn.classList.toggle('sun', isDarkMode);
}

init();
draw();
// scroll
ScrollReveal({
    distance: '60px',
    duration: 2500,
    delay: 100
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