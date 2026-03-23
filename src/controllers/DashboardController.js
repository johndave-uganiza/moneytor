import ExpenseModel from "../models/ExpenseModel.js";
import BudgetModel from "../models/BudgetModel.js";
import DashboardView from "../views/pages/DashboardView.js";

const view = DashboardView;
const expenseModel = ExpenseModel;
const budgetModel = BudgetModel;

function init() {
    view.init({ expenses: expenseModel.read(), budgets: budgetModel.read() });
}

export default { init };