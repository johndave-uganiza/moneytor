function init() {
    handleHomePageScroll();
    handleDiscoverTrackingFeaturesClick();

}

function handleChangeImage() {
    const carousel = document.querySelector(".hero-section-carousel");
    const images = carousel.querySelectorAll(".img-container img");
    const prev = carousel.querySelector(".prev");
    const next = carousel.querySelector(".next");
    const dashContainer = carousel.querySelector(".dash-container");
    const dashes = dashContainer.querySelectorAll(".dash");

    let currentImageIndex = 0;

    function translateImage(currentImageIndex) {
        images.forEach((image, index) => {
            console.log("currentImageIndex", currentImageIndex);
            image.style.transform = `translateX(${100 * (index - currentImageIndex)}%)`;
            console.log("trans", image.style.transform);
        });
    }

    prev.addEventListener("click", () => {
        currentImageIndex--;
        /* Start from last index if the currentImageIndex is LESS THAN the maximum images index */
        if (currentImageIndex < 0) {
            currentImageIndex = images.length - 1;
        }

        dashes.forEach(dash => {
            dash.classList.remove("active");
            console.log(Number(dash.dataset.index), currentImageIndex);
            if (Number(dash.dataset.index) === currentImageIndex) {
                dash.classList.add("active");
            }
        });

        translateImage(currentImageIndex);
    });

    next.addEventListener("click", () => {
        currentImageIndex++;
        /* Start from first index if the currentImageIndex is GREATER THAN the maximum images index */
        if (currentImageIndex > images.length - 1) {
            currentImageIndex = 0;
        }

        dashes.forEach(dash => {
            dash.classList.remove("active");
            console.log(Number(dash.dataset.index), currentImageIndex);
            if (Number(dash.dataset.index) === currentImageIndex) {
                dash.classList.add("active");
            }
        });

        translateImage(currentImageIndex);
    });
}

async function handleRenderImagesAsync(getImageLinksAsync) {
    // const altImages = ["https://picsum.photos/id/0/5000/3333",
    //     "https://picsum.photos/id/20/3670/2462",
    //     "https://picsum.photos/id/6/5000/3333"];

    const imageLinks = await getImageLinksAsync();
    const carousel = document.querySelector(".hero-section-carousel");
    const imgContainer = carousel.querySelector(".img-container");
    const prev = carousel.querySelector(".prev");
    const next = carousel.querySelector(".next");
    const dashContainer = carousel.querySelector(".dash-container");


    imgContainer.innerHTML = "";
    imgContainer.innerHTML = imageLinks.map((link, index) =>
        `<img src="${link}" alt="Image ${index + 1}" style="transform: translateX(${100 * index}%)">`
    ).join("");

    /* Set dashContainer innerHTML first in order to access each dash */
    dashContainer.innerHTML = "";
    dashContainer.innerHTML = imageLinks.map((link, index) =>
        `<div class="dash${index === 0 ? " active" : ""}" data-index=${index}></div>`
    ).join("");

    console.log(imgContainer);
    handleChangeImage();
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

export default { init, handleLoginClick, handleDashboardClick, handleRenderImagesAsync };