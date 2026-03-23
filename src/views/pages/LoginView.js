function init() { }

function handleLogin(login) {
    const form = document.getElementById('loginForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);

        if (login(formData)) {
            window.location.href = 'dashboard.html';
        } else {
            window.location.href = 'login.html';
        }

    });
}

export default { init, handleLogin };