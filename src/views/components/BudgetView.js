function init() {
    handleAddBudgetClick();
}

function handleAddBudgetClick() {
    const addBudgetButton = document.querySelector('.add-budget-btn');

    addBudgetButton.addEventListener('click', (e) => {
        handleShowAddBudgetModal().show();
    });
}

function handleRenderBudgets(budgets, callback) {
    const tbodyBudgetHistory = document.getElementById('tbodyBudgetHistory');
    tbodyBudgetHistory.innerHTML = '';

    if (budgets && budgets[0]) {
        budgets.forEach(budget => {
            /* Budget Number */
            const row = document.createElement('tr');
            const tdBudgetNumber = document.createElement('td');
            tdBudgetNumber.innerHTML = budget.strBudgetNumber;
            row.appendChild(tdBudgetNumber);

            /* Source */
            const tdSource = document.createElement('td');
            tdSource.innerHTML = budget.strSource;
            row.appendChild(tdSource);

            /* Date */
            const tdDate = document.createElement('td');
            tdDate.innerHTML = budget.dtmDate;
            row.appendChild(tdDate);

            /* Total Amount */
            const tdTotalAmount = document.createElement('td');
            tdTotalAmount.innerHTML = budget.dclTotalAmount;
            row.appendChild(tdTotalAmount);

            /* Actions */
            const tdActions = document.createElement('td');
            const anchorDelete = document.createElement('a');

            tdActions.classList.add('actions');
            anchorDelete.classList.add('action-delete');
            anchorDelete.title = "Delete";
            anchorDelete.innerHTML = '<i class="bi bi-trash3-fill"></i>';
            anchorDelete.href = '#';
            anchorDelete.addEventListener('click', (e) => {
                e.preventDefault();
                handleDeleteClick(budget, callback);
            });


            tdActions.appendChild(anchorDelete);
            row.appendChild(tdActions);

            tbodyBudgetHistory.appendChild(row);
        });
    }
}

function handleShowAddBudgetModal() {
    const modal = document.querySelector('.modal.add-budget');;
    const form = document.getElementById('formBudget');
    const formEl = form.elements;

    function show() {
        console.log(form);

        form.reset();
        const sources = Moneytor.utils.constants.sources;
        const selectSource = formEl.namedItem('strSource');
        const defaultOption = document.createElement('option');

        selectSource.replaceChildren();
        defaultOption.selected = true;
        defaultOption.disabled = true;
        defaultOption.value = '';
        defaultOption.textContent = '-- Select a Source --';

        selectSource.appendChild(defaultOption);

        sources.forEach((source) => {
            const sourceOption = document.createElement('option');
            sourceOption.value = source.strSource;
            sourceOption.textContent = source.strSource;
            selectSource.appendChild(sourceOption);
        });

        const inputTotalAmount = formEl.namedItem('dclTotalAmount');
        inputTotalAmount.placeholder = "0.00";
        inputTotalAmount.addEventListener('change', (e) => {
            e.preventDefault();
            inputTotalAmount.value = parseFloat(inputTotalAmount.value).toFixed(2);
        });

        const dtmDate = formEl.namedItem('dtmDate');
        dtmDate.value = new Date().toLocaleDateString('en-CA');

        modal.style.display = 'block';
    }
    function close() {
        modal.style.display = 'none';
    }

    return { show, close };
}

function handleSaveBudget(createBudgetFn) {
    const form = document.getElementById('formBudget');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);

        try {
            createBudgetFn(formData);
            handleShowAddBudgetModal().close();

        } catch (error) {
            Moneytor.utils.functions.showErrorMessage("An error occured while adding the Budget!");
            return;
        }
    });
}

function handleDeleteClick(budget, callback) {
    const alertDelete = document.querySelector('.modal.alert-delete');
    const deleteMessage = document.getElementById('delete-message');
    const btnYes = document.querySelector('.btn-yes');
    const btnNo = document.querySelector('.btn-no');

    btnNo.addEventListener('click', (e) => {
        alertDelete.style.display = 'none';
    });

    btnYes.addEventListener('click', (e) => {
        callback.deleteBudget(budget.intBudgetId);
        alertDelete.style.display = 'none';
    });

    alertDelete.style.display = 'block';
    deleteMessage.innerHTML = `Are you sure you want to delete <strong>${budget.strBudgetNumber}</strong>?`;
}

export default { init, handleRenderBudgets, handleSaveBudget };