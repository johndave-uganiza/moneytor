function init() {
    handleModalCloseButton();
    handleTabClick();
}

function handleModalCloseButton() {
    const closeButtons = document.querySelectorAll('.close-btn');

    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.modal.add-expense, .modal.add-budget').style.display = 'none';
        });
    });
}

function handleTabClick() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => { content.classList.remove('active'); });

            button.classList.add('active');
            document.getElementById(button.dataset.tab).classList.add('active');
        });
    });
}

export default { init };