function init() {
    handleSlider();
    handleSearch();
    handleMenuSelection();
}

function handleSlider() {
    const nav = document.querySelector('nav');
    const slider = document.querySelector('.slider');
    const isNavCollapsed = localStorage.getItem('isNavCollapsed') === 'true';

    if (isNavCollapsed) {
        nav.classList.add('collapse');
    }

    window.addEventListener('resize', (e) => {
        if (window.innerWidth < 1300) {
            const isCollapsed = 'true';
            nav.classList.add('collapse');
            localStorage.setItem('isNavCollapsed', isCollapsed);
        }
    });

    slider.addEventListener('click', (e) => {
        e.preventDefault();
        const isCollapsed = nav.classList.toggle('collapse');
        localStorage.setItem('isNavCollapsed', isCollapsed);
    });
}

function handleProfileName(username) {
    const profileName = document.getElementById('profileName');
    profileName.textContent = username;
}

function handleSearch() {
    const searchBar = document.getElementById('searchBar');
    const menuItems = document.querySelectorAll('.menu-item');

    searchBar.addEventListener('input', (e) => {
        e.preventDefault();
        menuItems.forEach(item => {
            const searchValue = e.target.value.toLowerCase();
            const menuItemName = item.querySelector('.menu-item-name')?.textContent.toLowerCase();

            const isMatching = menuItemName?.includes(searchValue);
            console.log(menuItemName);

            (menuItemName && menuItemName !== 'logout') && (item.style.display = isMatching ? '' : 'none');
        });
    });
}

function handleMenuSelection() {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        const selected = item.querySelector('a').classList.value;
        if (localStorage.getItem('menu') === selected) {
            item.classList.add('selected');
        } else {
            item.classList.remove('selected');
        }

        item.addEventListener('click', (e) => {
            if (selected !== 'logout-link') {
                localStorage.setItem('menu', selected);
            }
        });
    });
}

export default { init, handleProfileName, handleSearch };
