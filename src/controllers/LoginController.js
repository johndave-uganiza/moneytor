import Auth from "../services/auth/auth.js";
import LoginView from "../views/pages/LoginView.js";

const view = LoginView;
const auth = Auth;

function init() {
    view.init();
    view.handleLogin(login);
}

function login(formData) {

    const data = {
        username: formData.get('username'),
        password: formData.get('password')
    };

    return auth.login(data);
}

export default { init };