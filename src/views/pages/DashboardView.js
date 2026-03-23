let expenses = [];
let budgets = [];

function init(data) {
    expenses = data.expenses;
    budgets = data.budgets;

    const dashboardLinks = document.querySelectorAll('.dashboard-link');
    const transactionLinks = document.querySelectorAll('.transaction-link');
    dashboardLinks.forEach(link => link.href = 'dashboard.html');
    transactionLinks.forEach(link => link.href = 'transaction.html');

    updateSummaryDataById('currentBudget', () => addTotalAmounts(budgets) - addTotalAmounts(expenses));
    updateSummaryDataById('todaysExpenses', () => addTotalAmounts(getTodaysExpenses()));
    updateSummaryDataById('monthlyExpenses', () => addTotalAmounts(getMonthlyExpenses()));
    updateSummaryDataById('dailyExpenseRate', () => calculateDailyExpenseRate(getYearlyExpenses()));

    renderRecentTransactions();
    renderExpenseChart();
}

function getTodaysExpenses() {
    if (expenses.length === 0) return 0;

    return expenses.filter((expense) => expense.dtmDate === new Date().toLocaleDateString('en-CA'));
}

function getMonthlyExpenses() {
    if (expenses.length === 0) return 0;

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    return expenses.filter((expense) => {
        const expenseMonth = new Date(expense.dtmDate).getMonth();
        const expenseYear = new Date(expense.dtmDate).getFullYear();
        return expenseMonth === currentMonth && expenseYear === currentYear;
    });
}

function getYearlyExpenses() {
    if (expenses.length === 0) return 0;

    const currentYear = new Date().getFullYear();

    return expenses.filter((expense) => {
        const expenseYear = new Date(expense.dtmDate).getFullYear();
        return expenseYear === currentYear;
    });
}

function addTotalAmounts(transactions) {
    if (!transactions || transactions.length === 0) return 0;

    return transactions.reduce((total, transaction) => parseFloat(total) + parseFloat(transaction.dclTotalAmount || transaction.dclAmount), 0);
}

function updateSummaryDataById(elementId, calculate) {
    const element = document.getElementById(elementId);

    element.textContent = (Moneytor.utils.functions.formatCurrency(calculate())).concat(elementId === 'dailyExpenseRate' ? '/day' : '');
}

function calculateDailyExpenseRate(yearlyExpenses) {
    if (yearlyExpenses === 0) return 0;

    const currentYear = new Date().getFullYear();
    const daysInCurrentYear = ((currentYear % 4 === 0 & currentYear % 100 !== 0) || currentYear % 400 === 0) ? 366 : 365;
    const dailyExpenseRate = (addTotalAmounts(yearlyExpenses) / daysInCurrentYear);

    return dailyExpenseRate;
}

function renderRecentTransactions() {
    const recentExpenses = expenses.slice(-5);
    const divRecentTransactions = document.getElementById('recentTransactions');


    recentExpenses.forEach((expense) => {
        const div = document.createElement('div');
        div.classList = 'data';

        const spanTransactionNumber = document.createElement('span');
        const spanDate = document.createElement('span');
        const spantype = document.createElement('span');
        const spanAmount = document.createElement('span');

        spanTransactionNumber.textContent = expense.strExpenseNumber;
        spanDate.textContent = expense.dtmDate;
        spantype.textContent = 'Expense';
        spanAmount.textContent = Moneytor.utils.functions.formatCurrency(expense.dclTotalAmount);

        div.append(spanTransactionNumber, spanDate, spantype, spanAmount);
        divRecentTransactions.appendChild(div);
    });
}

function renderExpenseChart() {
    const monthlyGroceryExpenses = calculatePeriodicExpensesByCategory('Grocery', getMonthlyExpenses());
    const yearlyGroceryExpenses = calculatePeriodicExpensesByCategory('Grocery', getYearlyExpenses());
    const monthlyTransportExpenses = calculatePeriodicExpensesByCategory('Transport', getMonthlyExpenses());
    const yearlyTransportExpenses = calculatePeriodicExpensesByCategory('Transport', getYearlyExpenses());
    const monthlyUtilityExpenses = calculatePeriodicExpensesByCategory('Utility', getMonthlyExpenses());
    const yearlyUtilityExpenses = calculatePeriodicExpensesByCategory('Utility', getYearlyExpenses());
    const monthlyOtherExpenses = calculatePeriodicExpensesByCategory('Others', getMonthlyExpenses());
    const yearlyOtherExpenses = calculatePeriodicExpensesByCategory('Others', getYearlyExpenses());
    const canvas = document.getElementById('expenseChart');

    if (canvas) {
        const ctx = canvas.getContext('2d');
        const monthlyData = [monthlyGroceryExpenses, monthlyTransportExpenses, monthlyUtilityExpenses, monthlyOtherExpenses];
        const yearlyData = [yearlyGroceryExpenses, yearlyTransportExpenses, yearlyUtilityExpenses, yearlyOtherExpenses];

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Grocery', 'Transportation', 'Utilities', 'Others'],
                datasets: [
                    {
                        label: 'Monthly Expenses (USD)',
                        data: monthlyData,
                        backgroundColor: 'rgba(134, 235, 134, 0.7)',
                        borderColor: 'rgba(134, 235, 134, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Yearly Expenses (USD)',
                        data: yearlyData,
                        backgroundColor: 'rgba(143, 168, 238, 0.7)',
                        borderColor: 'rgba(143, 168, 238, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Monthly vs Yearly Expense Breakdown'
                    }
                }
            }
        });
    }
}

function calculatePeriodicExpensesByCategory(category, periodicExpenses) {
    if (!periodicExpenses || periodicExpenses.length === 0) return 0;
    const periodicExpenseDetails = [];
    periodicExpenses.forEach(expense => {
        periodicExpenseDetails.push(...expense.expenseDetails);
    });

    const periodicExpenseDetailsByCategory = periodicExpenseDetails.filter((expenseDetail => expenseDetail.strCategory === category));
    return addTotalAmounts(periodicExpenseDetailsByCategory);
}


export default { init };