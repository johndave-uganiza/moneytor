import ExpenseModel from '../models/ExpenseModel.js';
import ExpenseView from '../views/components/ExpenseView.js';

const model = ExpenseModel;
const view = ExpenseView;

function init() {
    view.init();
    view.handleRenderExpenses(getExpenses(), { deleteExpense });
    view.handleSaveExpense({ createExpense, updateExpense });
}

function getExpenses() {
    return model.read();
}

function createExpense(form) {
    try {
        model.create(form);
        Moneytor.utils.functions.showSuccessMessage("Expense added successfully!");
        view.handleRenderExpenses(getExpenses(), { deleteExpense });
    } catch (error) {
        Moneytor.utils.functions.showErrorMessage("An error occured while adding the Expense record!");
    }

}

function updateExpense(form) {
    try {
        model.update(form);
        Moneytor.utils.functions.showSuccessMessage("Expense updated successfully!");
        view.handleRenderExpenses(getExpenses(), { deleteExpense });
    } catch (error) {
        Moneytor.utils.functions.showErrorMessage("An error occured while updating the Expense record!");
    }
}

function deleteExpense(intExpenseId) {
    try {
        model.remove(intExpenseId);
        Moneytor.utils.functions.showSuccessMessage("Expense deleted successfully!");
        view.handleRenderExpenses(getExpenses(), { deleteExpense });
    } catch (error) {
        Moneytor.utils.functions.showErrorMessage("An error occured while deleting the Expense record!");
    }
}


export default { init };