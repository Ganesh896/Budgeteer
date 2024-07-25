// import { updateExpenses } from "./expenses";
// import { updateBudget } from "./budget";
// import { updateSavingGoals } from "./savingGoals";
// import { updateUserProfile } from "./userProfile";
// import { initializeCharts } from "./charts";

import { addExpense, renderUserExpenses } from "./expenses";
import { updateUserProfile } from "./userProfile";

// export function initializeDashboard() {
//     updateUserProfile();
//     updateExpenses();
//     updateBudget();
//     updateSavingGoals();
//     initializeCharts();
// }

document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("authToken");
    if (token) {
        const userDetails = JSON.parse(localStorage.getItem("userDetails") || "{}");
        addExpense();
        updateUserProfile(userDetails);
        renderUserExpenses();
    }
});
