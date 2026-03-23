
function read() {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    return expenses;
}

function create(formData) {
    try {
        const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        const newExpenseDetails = [];
        const dclTotalAmount = formData.get('dclTotalAmount');
        const dtmDate = formData.get('dtmDate');
        const strDescriptionItems = formData.getAll('strDescription');
        const strCategoryItems = formData.getAll('strCategory');
        const dclAmountItems = formData.getAll('dclAmount');

        strDescriptionItems.forEach((item, index) => {
            newExpenseDetails.push({
                strDescription: item,
                strCategory: strCategoryItems[index],
                dclAmount: dclAmountItems[index]
            });
        });

        const intNewExpenseId = expenses?.length > 0 && expenses[0]?.intExpenseId ? expenses[expenses.length - 1].intExpenseId + 1 : 1;
        const newExpense = {
            intExpenseId: intNewExpenseId,
            strExpenseNumber: `Exp-#${intNewExpenseId}`,
            dclTotalAmount: dclTotalAmount,
            dtmDate: dtmDate,
            expenseDetails: newExpenseDetails
        };

        expenses.push(newExpense);
        localStorage.setItem('expenses', JSON.stringify(expenses));

    } catch (error) {
        console.error("An error occured while creating the Expense!");
    }
}

function update(formData) {
    try {
        const newExpenseDetails = [];
        const intExpenseId = Number(formData.get('intExpenseId'));
        const dclTotalAmount = formData.get('dclTotalAmount');
        const dtmDate = formData.get('dtmDate');
        const strDescriptionItems = formData.getAll('strDescription');
        const strCategoryItems = formData.getAll('strCategory');
        const dclAmountItems = formData.getAll('dclAmount');

        strDescriptionItems.forEach((item, index) => {
            newExpenseDetails.push({
                strDescription: item,
                strCategory: strCategoryItems[index],
                dclAmount: dclAmountItems[index]
            });
        });

        const expenses = JSON.parse(localStorage.getItem('expenses')) || [];

        const updatedExpenses = expenses.map(item => {
            if (item.intExpenseId === intExpenseId) {
                item.dclTotalAmount = dclTotalAmount;
                item.dtmDate = dtmDate;
                item.expenseDetails = newExpenseDetails;
            }

            return item;
        });

        localStorage.setItem('expenses', JSON.stringify(updatedExpenses));

    } catch (error) {
        console.error("An error occured while updating the Expense record!");
    }
}

function remove(intExpenseId) {
    try {
        let expenses = JSON.parse(localStorage.getItem('expenses'));
        expenses = expenses.filter(expense => expense.intExpenseId !== intExpenseId);
        localStorage.setItem('expenses', JSON.stringify(expenses));
    } catch (error) {
        console.error("An error occured while deleting the Expense record!");
    }
}

export default { create, read, update, remove };