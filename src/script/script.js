document.addEventListener('DOMContentLoaded', () => {

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
});