import Auth from "../services/auth/auth.js";
import NavigationView from "../views/partial/NavigationView.js";

const view = NavigationView;
const auth = Auth;

function init() {
    view.init();
    view.handleProfileName(auth.getUsername());
}

export default { init };