function getAuth() {
    return {
        username: 'Admin',
        password: 'Moneytor_Demo.2026',
        role: 'admin',
        isLoggedIn: false
    };
}

function authorize() {
    if (getIsLoggedIn()) {
        const dashboardLinks = document.querySelectorAll('.dashboard-link');
        const transactionLinks = document.querySelectorAll('.transaction-link');
        const logoutLinks = document.querySelectorAll('.logout-link');

        /* Dashboard */
        dashboardLinks.forEach(link => link.href = 'dashboard.html');

        /* Transactions */
        transactionLinks.forEach(link => link.href = 'transaction.html');

        /* Logout */
        logoutLinks.forEach(logoutLink => {
            logoutLink.addEventListener('click', (e) => {
                e.preventDefault();
                logout();
                window.location.href = 'index.html';
            });
        });
    }
}

function getIsLoggedIn() {
    return JSON.parse(localStorage.getItem('auth'))?.isLoggedIn;
}

function setIsLoggedIn(auth) {
    auth.isLoggedIn = true;
    localStorage.setItem('auth', JSON.stringify(auth));
    return auth.isLoggedIn;
}

function login(data) {
    let auth = getAuth();

    return (auth.username === data.username && auth.password === data.password)
        ? setIsLoggedIn(auth) : false;
}

function logout() {
    localStorage.removeItem('auth');
}

function getUsername() {
    return getAuth().username;
}
export default { getUsername, getIsLoggedIn, setIsLoggedIn, login, logout, authorize };