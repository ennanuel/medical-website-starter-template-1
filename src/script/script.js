document.addEventListener('DOMContentLoaded', () => {

    // Cookie consent logic

    const cookieBanner = document.getElementById('cookie-banner');
    const acceptButton = document.getElementById('accept-cookies');
    const rejectButton = document.getElementById('reject-cookies');

    const cookieName = 'user-consent';
    
    function hasCookie(name) {
        return document.cookie.split(';').some((item) => item.trim().startsWith(name + '='));
    }

    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/;SameSite=Strict";
    }
    
    function hideBanner() {
        cookieBanner.classList.remove('show');

        setTimeout(() => {
            cookieBanner.style.display = 'none';
        }, 500);
    }
    
    if (!hasCookie(cookieName)) {
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 1000);
    } else {
        cookieBanner.style.display = 'none';
    }

    acceptButton.addEventListener('click', () => {
        setCookie(cookieName, 'true', 365);
        hideBanner();
    });

    rejectButton.addEventListener('click', hideBanner);


    // Mobile menu toggle logic

    let mobileMenuIsOpen = false;
    const toggleMenuBtn = document.getElementById('menu-toggle-btn');
    const mobileHeader = document.getElementById('mobile-header');

    toggleMenuBtn?.addEventListener('click', () => {
        mobileMenuIsOpen = !mobileMenuIsOpen;
        toggleMenuBtn?.classList?.toggle('active', mobileMenuIsOpen);
        mobileHeader?.classList?.toggle('show', mobileMenuIsOpen);
    });

    // Testimonials navigation logic

    let step = 1;
    const nextTestimonialBtn = document.getElementById('next-testimonial-btn');
    const prevTestimonialBtn = document.getElementById('prev-testimonial-btn');

    function moveTestimonials (direction) {
        const testimonials = document.getElementsByClassName('testimonial-container');

        const canMoveTestimonials = direction && ((direction === 'left' && (step < testimonials.length)) || (direction === 'right' && step > 1));

        if (!canMoveTestimonials) return;

        step = direction === 'left' ? step + 1 : step - 1;

        [...testimonials].forEach((testimonial) => {
            testimonial.style.transform = `translateX(${100 * (1 - step)}%)`;
        })
    };

    nextTestimonialBtn?.addEventListener('click', () => moveTestimonials('left'));
    prevTestimonialBtn?.addEventListener('click', () => moveTestimonials('right'));
});