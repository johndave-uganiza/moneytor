import BudgetModel from '../models/BudgetModel.js';
import BudgetView from '../views/components/BudgetView.js';

const model = BudgetModel;
const view = BudgetView;

function init() {
    view.init();
    view.handleRenderBudgets(getBudgets(), { deleteBudget });
    view.handleSaveBudget(createBudget);
}

function getBudgets() {
    return model.read();
}

function createBudget(formData) {
    try {
        model.create(formData);
        Moneytor.utils.functions.showSuccessMessage("Budget added successfully!");
        view.handleRenderBudgets(getBudgets(), { deleteBudget });
    } catch (error) {
        Moneytor.utils.functions.showErrorMessage("An error occured while creating the Budget!");
    }
}

function deleteBudget(intBudgetId) {
    try {
        model.remove(intBudgetId);
        Moneytor.utils.functions.showSuccessMessage("Budget deleted successfully!");
        view.handleRenderBudgets(getBudgets(), { deleteBudget });
    } catch (error) {
        Moneytor.utils.functions.showErrorMessage("An error occured while deleting the Budget record!");
    }
}

export default { init };