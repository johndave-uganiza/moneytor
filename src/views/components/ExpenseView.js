function init() {
    hanldeAddExpenseClick();
    handleAddExpenseDetailClick();
}

function hanldeAddExpenseClick() {
    const addExpensesButton = document.querySelector('.add-expense-btn');
    addExpensesButton.addEventListener('click', (e) => {
        e.preventDefault();
        handleShowAddExpenseModal().show();
    });
}

function handleAddExpenseDetailClick() {
    const btnAddExpenseDetail = document.getElementById('btnAddExpenseDetail');
    btnAddExpenseDetail.addEventListener('click', (e) => {
        e.preventDefault();
        handleAddExpenseDetail();
    });
}

function handleRenderExpenses(expenses, callback) {
    const tbodyExpenseList = document.getElementById('tbodyExpenseList');
    tbodyExpenseList.innerHTML = '';

    if (expenses && expenses[0]) {
        expenses.forEach(expense => {
            /* Expense Detail */
            const row = document.createElement('tr');

            const inputExpenseId = document.createElement('input');
            inputExpenseId.dataset.id = expense.intExpenseId;
            inputExpenseId.hidden = true;

            const tdExpenseNumber = document.createElement('td');
            tdExpenseNumber.innerHTML = expense.strExpenseNumber;

            /* Date */
            const tdDate = document.createElement('td');
            tdDate.innerHTML = expense.dtmDate;

            /* Total Amount */
            const tdTotalAmount = document.createElement('td');
            tdTotalAmount.innerHTML = `$ ${expense.dclTotalAmount}`;

            /* Actions */
            const tdActions = document.createElement('td');
            tdActions.classList.add('actions');
            const anchorEdit = document.createElement('a');
            anchorEdit.classList.add('action-edit');
            anchorEdit.title = "Edit";
            anchorEdit.innerHTML = '<i class="bi bi-pencil-square"></i>';
            anchorEdit.href = '#';
            anchorEdit.addEventListener('click', (e) => {
                e.preventDefault();
                handleEditClick(expense).show();
            });

            const anchorDelete = document.createElement('a');
            anchorDelete.classList.add('action-delete');
            anchorDelete.title = "Delete";
            anchorDelete.innerHTML = '<i class="bi bi-trash3-fill"></i>';
            anchorDelete.href = '#';
            anchorDelete.addEventListener('click', (e) => {
                e.preventDefault();
                handleDeleteClick(expense, callback);
            });

            row.append(tdExpenseNumber, tdDate, tdTotalAmount, tdActions);
            tdActions.append(anchorEdit, anchorDelete);
            tbodyExpenseList.appendChild(row);
        });
    }
}

function handleShowAddExpenseModal() {
    const modal = document.querySelector('.modal.add-expense');
    const windowHeader = modal.querySelector('.window-header');
    const headerTitle = windowHeader.querySelector('.title');
    const windowFooter = modal.querySelector('.window-footer');
    const form = document.getElementById('formExpense');
    const formEl = form.elements;
    const tbodyExpenseFormTable = document.getElementById('tbodyExpenseFormTable');
    const title = "Add Expense";
    headerTitle.textContent = title;
    windowFooter.textContent = title;

    function show() {
        form.reset();
        formEl.namedItem('dclTotalAmount').value = "0.00";
        formEl.namedItem('dtmDate').value = new Date().toLocaleDateString('en-CA');
        tbodyExpenseFormTable.replaceChildren();
        modal.style.display = 'block';
    }
    function close() {
        modal.style.display = 'none';
    }

    return { show, close };
}

function handleEditClick(expense) {
    const modal = document.querySelector('.modal.add-expense');
    const windowHeader = modal.querySelector('.window-header');
    const windowFooter = modal.querySelector('.window-footer');
    const headerTitle = windowHeader.querySelector('.title');
    const expenseNumber = document.getElementById('expenseNumber');
    expenseNumber.innerHTML = `Expense Number: <strong>${expense.strExpenseNumber}</strong>`;
    const form = document.getElementById('formExpense');
    const formEl = form.elements;
    const tbodyExpenseFormTable = document.getElementById('tbodyExpenseFormTable');
    const title = "Update Expense";
    headerTitle.textContent = title;
    windowFooter.textContent = title;

    function show() {
        modal.style.display = 'block';
        if (expense) {
            const { expenseDetails } = expense;
            tbodyExpenseFormTable.replaceChildren();
            form.reset();
            formEl.namedItem('intExpenseId').value = expense.intExpenseId;
            formEl.namedItem('dclTotalAmount').value = expense.dclTotalAmount;
            formEl.namedItem('dtmDate').value = expense.dtmDate;

            expenseDetails.forEach((item) => {
                const currentRow = handleAddExpenseDetail();
                currentRow.querySelector('[name="strDescription"]').value = item.strDescription;
                currentRow.querySelector('[name="strCategory"]').value = item.strCategory;
                currentRow.querySelector('[name="dclAmount"]').value = item.dclAmount;
            });
        }
    }
    function close() {
        modal.style.display = 'none';
    }

    return { show, close };
}

function handleDeleteClick(expense, callback) {
    const alertDelete = document.querySelector('.modal.alert-delete');
    const deleteMessage = document.getElementById('delete-message');
    const btnYes = document.querySelector('.btn-yes');
    const btnNo = document.querySelector('.btn-no');

    btnNo.addEventListener('click', (e) => {
        alertDelete.style.display = 'none';
    });

    btnYes.addEventListener('click', (e) => {
        callback.deleteExpense(expense.intExpenseId);
        alertDelete.style.display = 'none';
    });

    alertDelete.style.display = 'block';
    deleteMessage.innerHTML = `Are you sure you want to delete <strong>${expense.strExpenseNumber}</strong>?`;
}

function handleAddExpenseDetail() {
    const tbodyExpenseFormTable = document.getElementById('tbodyExpenseFormTable');
    const categories = Moneytor.utils.constants.categories;
    /* Expense Detail Row */
    const row = document.createElement('tr');
    row.classList.add('expense-detail');

    /* Description */
    const tdDescription = document.createElement('td');
    tdDescription.innerHTML = `<input type="text" value="" name="strDescription" required>`;
    row.appendChild(tdDescription);

    /* Category */
    const tdCategory = document.createElement('td');
    const selectCategory = document.createElement('select');
    const defaultOption = document.createElement('option');

    selectCategory.id = 'category';
    selectCategory.name = 'strCategory';
    selectCategory.required = true;

    defaultOption.label = '-- Select a Category --';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    defaultOption.value = '';

    selectCategory.appendChild(defaultOption);

    categories.forEach((category) => {
        const optionCategory = document.createElement('option');
        optionCategory.value = category.strCategory;
        optionCategory.textContent = category.strCategory;
        selectCategory.appendChild(optionCategory);
    });

    tdCategory.appendChild(selectCategory);
    row.appendChild(tdCategory);

    /* Amount */
    const tdAmount = document.createElement('td');
    const inputAmount = document.createElement('input');
    inputAmount.type = "number";
    inputAmount.name = "dclAmount";
    inputAmount.classList.add('amount');
    inputAmount.addEventListener('change', (e) => {
        handleUpdateTotalAmount();
    });
    inputAmount.addEventListener("blur", (e) => {
        if (inputAmount.value !== "") {
            inputAmount.value = parseFloat(inputAmount.value).toFixed(2);
        }
    });
    tdAmount.appendChild(inputAmount);
    row.appendChild(tdAmount);

    /* Actions */
    const tdActions = document.createElement('td');
    const btnRemoveExpenseDetail = document.createElement('button');
    btnRemoveExpenseDetail.innerHTML = '<i class="bi bi-dash"></i>';
    btnRemoveExpenseDetail.classList.add('btn-remove-expense-detail');
    btnRemoveExpenseDetail.addEventListener('click', handleRemoveExpenseDetail);
    tdActions.appendChild(btnRemoveExpenseDetail);
    row.appendChild(tdActions);

    tbodyExpenseFormTable.appendChild(row);

    return row;
}

function handleUpdateTotalAmount() {
    const form = document.getElementById('formExpense');
    const formData = new FormData(form);
    const amounts = formData.getAll('dclAmount').map(item => parseFloat(item));
    let total = 0.00;


    if (amounts.length > 0) {
        total = amounts.reduce((previousTotal, currentValue) => previousTotal + currentValue);
    }

    const finalTotal = total.toFixed(2);
    formData.set('dclTotalAmount', finalTotal);
    form.elements.namedItem('dclTotalAmount').value = finalTotal;
}

function handleRemoveExpenseDetail() {
    const btn = this;
    btn.closest('.expense-detail').remove();
    handleUpdateTotalAmount();
}

function handleSaveExpense(callback) {
    const form = document.getElementById('formExpense');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const formEl = form.elements;
        const isExistingExpense = formEl.namedItem('intExpenseId').value > 0;
        const tbodyExpenseFormTable = document.getElementById('tbodyExpenseFormTable');

        try {
            const hasExpenseDetail = tbodyExpenseFormTable.children.length > 0;

            if (!hasExpenseDetail) {
                Moneytor.utils.functions.showErrorMessage("Please add at least one expense detail!");
                return;
            }

            if (isExistingExpense) {
                callback.updateExpense(formData);
            } else {
                callback.createExpense(formData);
            }

            handleShowAddExpenseModal().close();

        } catch (error) {
            Moneytor.utils.functions.showErrorMessage("An error occured while adding the Expense!");
            console.error(error);
            return;
        }
    });
}

export default {
    init,
    handleRenderExpenses,
    handleSaveExpense
};
