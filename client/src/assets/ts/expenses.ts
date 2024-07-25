import axios from "axios";
import { baseUrl } from "../../main";

export function renderCategory() {
    const token = localStorage.getItem("authToken");
    const categoryList = document.getElementById("category")!;

    axios
        .get(`${baseUrl}expense/category`, { headers: { Authorization: "Bearer " + token } })
        .then(function (response) {
            const categories = response.data.data;
            // const meta = response.data.data.meta;
            console.log(categories);
            categories.forEach((category: any) => {
                let optionEle = document.createElement("option");
                optionEle.setAttribute("value", `${category.id}`);
                optionEle.innerHTML = `${category.categoryName}`;
                categoryList.appendChild(optionEle);
            });
        })
        .catch(function (error) {
            console.error(error.response);
        });
}

export function addExpense() {
    const token = localStorage.getItem("authToken");
    const responseMsg = document.querySelector(".response__msg") as HTMLParagraphElement;
    const addExpenseFormEle = document.getElementById("addexpense__form") as HTMLFormElement;
    addExpenseFormEle?.addEventListener("submit", (event) => {
        event.preventDefault();
        let formData = new FormData(addExpenseFormEle);
        let data = Object.fromEntries(formData.entries());
        axios
            .post(`${baseUrl}expense/add`, data, { headers: { Authorization: "Bearer " + token } })
            .then(function (response) {
                responseMsg.innerText = response.data.data.message;
                responseMsg.style.color = "green";
                console.log(response.data);
                addExpenseFormEle.reset();
            })
            .catch(function (error) {
                console.error(error.response.data);
                responseMsg.innerText = error.response.data.message;
                responseMsg.style.color = "red";
            });
    });
}

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
