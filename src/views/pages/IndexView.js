function init() {
    handleHomePageScroll();
    handleDiscoverTrackingFeaturesClick();
}

function handleHomePageScroll() {
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

}

function handleDiscoverTrackingFeaturesClick() {
    const header = document.querySelector('.header');
    const heroSection = document.querySelector('.hero-section');
    const button = document.querySelector('.discover-tracking-features-button');
    button.addEventListener('click', () => {
        window.scrollTo(
            {
                top: window.innerHeight - header.offsetHeight + 1.5 * parseFloat(window.getComputedStyle(heroSection).rowGap),
                behavior: 'smooth'
            }
        );
    });

}

function handleLoginClick(auth) {
    const btnLogIn = document.querySelector('.login-logout-link');
    const isLoggedIn = auth.getIsLoggedIn();

    if (isLoggedIn) {
        btnLogIn.textContent = 'Log Out';
        if (!btnLogIn.classList.contains('logged-in')) {
            btnLogIn.classList.add('logged-in');
        };
    }

    btnLogIn.addEventListener('click', (e) => {
        e.preventDefault();

        if (isLoggedIn) {
            auth.logout();
            btnLogIn.classList.remove('logged-in');
            btnLogIn.textContent = 'Log In';
        }

        window.location.href = 'login.html';
    });
}

function handleDashboardClick(auth) {
    const btnDashboard = document.querySelector('.dashboard-link');

    btnDashboard.addEventListener('click', (e) => {
        e.preventDefault();
        const isLoggedIn = auth.getIsLoggedIn();

        if (isLoggedIn) {
            window.location.href = 'dashboard.html';
        } else { window.location.href = 'login.html'; }
    });
}

export default { init, handleLoginClick, handleDashboardClick };