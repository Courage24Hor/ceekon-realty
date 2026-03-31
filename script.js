// Strict check for touch devices to avoid scroll lag
const isMobileTouch = window.matchMedia("(pointer: coarse)").matches;

// Lenis Smooth Scroll
const lenis = new Lenis({
    duration: 1.5,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    smoothTouch: false,
});

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time)=>{
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if(window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Mobile Menu Toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const mobileNav = document.querySelector('.mobile-nav');
const mobileLinks = document.querySelectorAll('.mobile-nav a');

if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
        mobileToggle.classList.toggle('active');
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
        
        if(typeof lenis !== 'undefined') {
            mobileNav.classList.contains('active') ? lenis.stop() : lenis.start();
        }
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            mobileToggle.classList.remove('active');
            document.body.style.overflow = '';
            if(typeof lenis !== 'undefined') lenis.start();
        });
    });
}

// Animations on Scroll
const revealElements = document.querySelectorAll('.reveal-up');
revealElements.forEach(el => {
    let delay = 0;
    if(el.classList.contains('delay-1')) delay = 0.2;
    if(el.classList.contains('delay-2')) delay = 0.4;
    
    gsap.fromTo(el,
        { y: 30, autoAlpha: 0 },
        {
            y: 0,
            autoAlpha: 1,
            duration: 1.2,
            ease: "power3.out",
            delay: delay,
            scrollTrigger: {
                trigger: el,
                start: "top 90%",
            }
        }
    );
});



// Image Parallax (Hero image)
const heroImg = document.querySelector('.hero-img');
if (heroImg) {
    gsap.to(heroImg, {
        y: '20%',
        ease: "none",
        scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });
    
    gsap.fromTo(heroImg, 
        { autoAlpha: 0, scale: 1.05 },
        { autoAlpha: 1, scale: 1, duration: 2, ease: "power3.out", delay: 0.6 }
    );
}

// Image Parallax (Gallery Zoom)
document.querySelectorAll('.zoom-img').forEach(img => {
    gsap.to(img, {
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
            trigger: img.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });
});

// Copyright Dynamic Year
const yearEl = document.getElementById('current-year');
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

// Carousel Controls
const scrollContainer = document.getElementById('scroll-container');
const btnLeft = document.getElementById('slide-left');
const btnRight = document.getElementById('slide-right');

if (scrollContainer && btnLeft && btnRight) {
    btnRight.addEventListener('click', () => {
        const cardWidth = document.querySelector('.collection-card').offsetWidth;
        const gap = window.innerWidth * 0.04; // 4vw gap
        scrollContainer.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
    });
    
    btnLeft.addEventListener('click', () => {
        const cardWidth = document.querySelector('.collection-card').offsetWidth;
        const gap = window.innerWidth * 0.04;
        scrollContainer.scrollBy({ left: -(cardWidth + gap), behavior: 'smooth' });
    });
}
