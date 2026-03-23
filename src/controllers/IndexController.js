import Auth from "../services/auth/auth.js";
import IndexView from "../views/pages/IndexView.js";

const view = IndexView;
const auth = Auth;

function init() {
    view.init();
    view.handleLoginClick(auth);
    view.handleDashboardClick(auth);
}

export default { init };