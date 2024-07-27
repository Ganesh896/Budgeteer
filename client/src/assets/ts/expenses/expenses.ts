import { Expense } from "../interface/expense";
import { addExpense, getExpenseCategory, getExpenses } from "./axios";

// render categories on addexpense form for select
export async function renderCategory() {
    const categoryList = document.getElementById("category")!;
    const categories = await getExpenseCategory();

    let maxCategoryId = 0;
    console.log(categories);
    categories.forEach((category: any) => {
        let optionEle = document.createElement("option");
        optionEle.setAttribute("value", `${category.id}`);
        optionEle.innerHTML = `${category.categoryName}`;
        categoryList.appendChild(optionEle);

        // finding max id of category to add next category if needed
        maxCategoryId = Math.max(maxCategoryId, category.id);
        localStorage.setItem("maxCategoryId", "" + maxCategoryId);
    });
}

// rendering expense of current user on dashboard
function renderUserExpenses(expenses: Expense[]) {
    const expenseListEle = document.getElementById("expenses__list")!;
    expenseListEle.innerHTML = "";
    expenses.forEach((expense: any) => {
        let tableRow = document.createElement("tr");
        tableRow.innerHTML = `
                    <tr>
                        <td>${expense.createdAt}</td>
                        <td>Rs.${expense.amount}</td>
                        <td>${expense.title}</td>
                        <td>${expense.paymentMethod}</td>
                        <td>${expense.categoryName}</td>
                    </tr>
                    `;
        expenseListEle.appendChild(tableRow);
    });
}

// load all content
document.addEventListener("DOMContentLoaded", async function () {
    const prevButton = document.querySelector(".expenses__prev--btn") as HTMLButtonElement;
    const nextButton = document.querySelector(".expenses__next--btn") as HTMLButtonElement;
    const currentPageEle = document.querySelector(".current__page") as HTMLSpanElement;
    const totalPageEle = document.querySelector(".total__pages") as HTMLSpanElement;
    const size = 2;
    let page = 1;
    const expenses = await getExpenses(size, 1);
    const total = expenses.meta.total.count;
    totalPageEle.innerText = total / size + "";
    if (page === 1) {
        prevButton.setAttribute("disabled", "true");
    }

    prevButton.addEventListener("click", async function () {
        nextButton.removeAttribute("disabled");

        page--;
        currentPageEle.innerText = page + "";
        const prevPage = await getExpenses(size, page);
        renderUserExpenses(prevPage.data);

        if (page === 1) {
            prevButton.setAttribute("disabled", "true");
        } else {
            prevButton.removeAttribute("disabled");
        }
    });

    nextButton.addEventListener("click", async function () {
        prevButton.removeAttribute("disabled");
        page++;
        currentPageEle.innerText = page + "";
        const prevPage = await getExpenses(size, page);
        renderUserExpenses(prevPage.data);

        if (page === total / size) {
            nextButton.setAttribute("disabled", "true");
        } else {
            nextButton.removeAttribute("disabled");
        }
    });

    // sorting expenses by amount
    const sortExpensesBtn = document.querySelector(".expenses__sort--btn") as HTMLButtonElement;
    sortExpensesBtn?.addEventListener("click", function () {
        const sortedExpenses = expenses.data.sort((a: Expense, b: Expense) => b.amount - a.amount);
        renderUserExpenses(sortedExpenses);
    });

    addExpense();
    renderUserExpenses(expenses.data);
});
