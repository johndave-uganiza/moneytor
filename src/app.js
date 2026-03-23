import DashboardController from './controllers/DashboardController.js';
import ExpenseController from './controllers/ExpenseController.js';
import BudgetController from './controllers/BudgetController.js';
import LoginController from './controllers/LoginController.js';
import IndexController from './controllers/IndexController.js';
import utils from './utils/utils.js';
import Auth from './services/auth/auth.js';
import NavigationController from './controllers/NavigationController.js';
import TransactionController from './controllers/TransactionController.js';

// Initialize Utilities
window.Moneytor = window.Moneytor || {};
Moneytor = Moneytor || {};
Moneytor.utils = Moneytor.utils || utils;

// Initialize Views
const indexPage = document.getElementById('indexPage') || undefined;
const dashboardPage = document.getElementById('dashboardPage') || undefined;
const loginPage = document.getElementById('loginPage') || undefined;
const transactionPage = document.getElementById('transactionPage') || undefined;
const isProtectedPage = document.body.dataset.protected === 'true';

if (indexPage) {
    IndexController.init();
} else if (loginPage) {
    LoginController.init();
}



if (isProtectedPage) {
    Auth.authorize();
    NavigationController.init();

    if (dashboardPage) {
        DashboardController.init();
    } else if (transactionPage) {
        TransactionController.init();
        ExpenseController.init();
        BudgetController.init();
    };
}
