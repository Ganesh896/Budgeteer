import axios from "axios";
import { baseUrl } from "../../main";

// render categories on addexpense form for select
export function renderCategory() {
    const token = localStorage.getItem("authToken");
    const categoryList = document.getElementById("category")!;

    axios
        .get(`${baseUrl}expense/category`, { headers: { Authorization: "Bearer " + token } })
        .then(function (response) {
            const categories = response.data.data;

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
        })
        .catch(function (error) {
            console.error(error.response);
        });
}

// adding expense
export function addExpense() {
    const token = localStorage.getItem("authToken");

    const addCategoryInput = document.querySelector(".addcategory__input") as HTMLInputElement;
    const responseMsg = document.querySelector(".response__msg") as HTMLParagraphElement;
    const addExpenseFormEle = document.getElementById("addexpense__form") as HTMLFormElement;

    addExpenseFormEle?.addEventListener("submit", (event) => {
        event.preventDefault();
        let formData = new FormData(addExpenseFormEle);
        let data = Object.fromEntries(formData.entries());

        // getting max category id from localstorage
        const nextCategoryId = Number(localStorage.getItem("maxCategoryId")) + 1;

        // adding our own expense category
        if (!addCategoryInput.classList.contains("hide")) {
            axios
                .post(`${baseUrl}expense/category`, { categoryId: nextCategoryId, categoryName: data.categoryName }, { headers: { Authorization: "Bearer " + token } })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.error(error.response);
                });
        }

        // sending new category id to expense table
        if (data.categoryId === "") {
            data.categoryId = "" + nextCategoryId;
            delete data.categoryName; //deleting categoryName used for adding category
        }

        axios
            .post(`${baseUrl}expense/add`, data, { headers: { Authorization: "Bearer " + token } })
            .then(function (response) {
                // showing success message
                responseMsg.innerText = response.data.data.message;
                responseMsg.style.color = "green";

                console.log(response.data);
                addExpenseFormEle.reset(); // reseting form
            })
            .catch(function (error) {
                console.error(error.response.data);
                // showing error message
                responseMsg.innerText = error.response.data.message;
                responseMsg.style.color = "red";
            });
    });
}

// rendering expense of current user on dashboard
export function renderUserExpenses() {
    const token = localStorage.getItem("authToken");
    const expenseListEle = document.getElementById("expenses__list")!;

    axios
        .get(`${baseUrl}expense?size=2`, { headers: { Authorization: "Bearer " + token } })
        .then(function (response) {
            const expenses = response.data.data.data;
            // const meta = response.data.data.meta;

            expenses.forEach((expense: any) => {
                let tableRow = document.createElement("tr");
                tableRow.innerHTML = `
                    <tr>
                        <td>${expense.createdAt}</td>
                        <td>-$${expense.amount}</td>
                        <td>${expense.title}</td>
                        <td>${expense.paymentMethod}</td>
                        <td>${expense.categoryName}</td>
                    </tr>
                    `;
                expenseListEle.appendChild(tableRow);
            });
        })
        .catch(function (error) {
            console.error(error.response);
        });
}
