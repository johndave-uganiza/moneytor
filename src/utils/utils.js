const functions = {
    formatCurrency: (amount) => new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount),

    showErrorMessage: (message) => {
        const toast = document.getElementById("toast-error");
        toast.textContent = message;
        toast.style.display = "block";

        setTimeout(() => {
            toast.style.display = "none";
        }, 4000);
    },

    showSuccessMessage: (message) => {
        const toast = document.getElementById("toast-success");
        toast.textContent = message;
        toast.style.display = "block";

        setTimeout(() => {
            toast.style.display = "none";
        }, 4000);
    }
};

const constants = {
    categories: [
        {
            intCategoryId: 1,
            strCategory: "Utility"
        },
        {
            intCategoryId: 2,
            strCategory: "Grocery"
        },
        {
            intCategoryId: 3,
            strCategory: "Transport"
        },
        {
            intCategoryId: 4,
            strCategory: "Others"
        },
    ],
    sources: [
        {
            intSourceId: 1,
            strSource: "Income"
        },
        {
            intSourceId: 2,
            strSource: "Savings"
        },
        {
            intSourceId: 3,
            strSource: "Emergency Fund"
        },
        {
            intSourceId: 4,
            strSource: "Others"
        },
    ]
};

export default { functions, constants };
