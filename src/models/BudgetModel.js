
function read() {
    const budgets = JSON.parse(localStorage.getItem('budgets')) || [];
    return budgets;
}

function create(formData) {
    try {
        const budgets = JSON.parse(localStorage.getItem('budgets')) || [];
        const strSource = formData.get('strSource');
        const dclTotalAmount = formData.get('dclTotalAmount');
        const dtmDate = formData.get('dtmDate');

        const intNewBudgetId = budgets?.length > 0 && budgets[0]?.intBudgetId ? budgets[budgets.length - 1].intBudgetId + 1 : 1;

        const newBudget = {
            intBudgetId: intNewBudgetId,
            strBudgetNumber: `Bgt-#${intNewBudgetId}`,
            strSource: strSource,
            dtmDate: dtmDate,
            dclTotalAmount: dclTotalAmount
        };
        budgets.push(newBudget);
        localStorage.setItem('budgets', JSON.stringify(budgets));

    } catch (error) {
        console.error("An error occured while saving the Budget!");
    }
}

function remove(intBudgetId) {
    try {
        let budgets = JSON.parse(localStorage.getItem('budgets'));
        budgets = budgets.filter(budget => budget.intBudgetId !== intBudgetId);
        localStorage.setItem('budgets', JSON.stringify(budgets));
    } catch (error) {
        console.error("An error occured while deleting the Budget record!");
    }
}


export default { create, read, remove };