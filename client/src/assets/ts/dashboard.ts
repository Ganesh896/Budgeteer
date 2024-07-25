import Chart from "chart.js/auto";
import { renderCategory } from "./expenses";
const sidebarItemsEle = document.querySelectorAll(".sidebar__item");

// setting active sidebar item
sidebarItemsEle.forEach((item) => {
    item.addEventListener("click", () => {
        const current = document.getElementsByClassName("active");
        if (current.length > 0) {
            current[0].className = current[0].className.replace(" active", "");
        }
        item.className += " active";
    });
});

const sidebarToggleEle = document.querySelector(".sidebar__toggle") as HTMLButtonElement;
const sidebarEle = document.querySelector(".sidebar") as HTMLDivElement;
const dashboardEle = document.querySelector(".dashboard") as HTMLDivElement;

sidebarToggleEle.addEventListener("click", function () {
    sidebarEle.classList.toggle("close");
    dashboardEle.classList.toggle("open");
});

// open-close add expense modal form
const openModal = document.querySelector(".addexpense__btn") as HTMLButtonElement;
const closeModal = document.querySelector(".close__modal") as HTMLButtonElement;
const overlay = document.querySelector(".overlay") as HTMLDivElement;
const addexpenseModal = document.querySelector(".addexpense__modal") as HTMLDivElement;
const htmlBodyEle = document.querySelector("body") as HTMLBodyElement;

openModal.addEventListener("click", () => {
    overlay.classList.add("show");
    addexpenseModal.classList.add("show");
    htmlBodyEle.classList.add("overflowHidden");
    renderCategory();
});

closeModal.addEventListener("click", () => {
    overlay.classList.remove("show");
    addexpenseModal.classList.remove("show");
    htmlBodyEle.classList.remove("overflowHidden");
});

// categories chart
const categoryChartEle = document.getElementById("categories__chart") as HTMLCanvasElement;
const categoryItemsEle = document.querySelector(".categories") as HTMLUListElement;

(async function () {
    interface CategoryData {
        category: string;
        amount: number;
    }

    const data: CategoryData[] = [
        { category: "Cafe & Restaurants", amount: 10 },
        { category: "Entertainment", amount: 20 },
        { category: "Investments", amount: 15 },
        { category: "Foods & Groceries", amount: 25 },
        { category: "Health & Beauty", amount: 22 },
        { category: "Travelling", amount: 30 },
    ];

    new Chart(categoryChartEle, {
        type: "doughnut",
        data: {
            datasets: [
                {
                    label: "Budget",
                    data: data.map((row) => row.amount),
                },
            ],
        },
    });

    data.forEach((item) => {
        const li = document.createElement("li");
        li.innerHTML = `<i class="bx bxs-circle"></i><span>${item.category}</span>`;
        categoryItemsEle.appendChild(li);
    });
})();

// money flow chart
const moneyFlowChartEle = document.getElementById("money__flow") as HTMLCanvasElement;

(async function () {
    interface MonthData {
        month: string;
        amount: number;
    }

    const data: MonthData[] = [
        { month: "Jan", amount: 10 },
        { month: "Feb", amount: 20 },
        { month: "March", amount: 15 },
        { month: "April", amount: 25 },
        { month: "May", amount: 22 },
        { month: "June", amount: 30 },
    ];

    new Chart(moneyFlowChartEle, {
        type: "bar",
        data: {
            labels: data.map((row) => row.month),
            datasets: [
                {
                    label: "Current month",
                    barThickness: 20,
                    borderRadius: 30,
                    data: data.map((row) => row.amount),
                },
                {
                    label: "Previous month",
                    barThickness: 20,
                    borderRadius: 30,
                    data: data.map((row) => row.amount - 5),
                },
            ],
        },
    });
})();

//changing theme
const themeCheckbox = document.getElementById("checkbox") as HTMLInputElement;
const themeButton = document.querySelector(".theme__button") as HTMLDivElement;

// saving theme on localStorage
const setTheme = function (): void {
    localStorage.removeItem("theme");
    if (themeCheckbox.checked) {
        localStorage.setItem("theme", "dark__theme");
    } else {
        localStorage.setItem("theme", "light__theme");
    }
};

// adding theme from localStorage
const changeTheme = function (): void {
    setTheme();
    const theme = localStorage.getItem("theme") || "light__theme";
    document.body.classList.toggle(theme);
};

// setting default theme
document.body.classList.toggle(localStorage.getItem("theme") || "light__theme");
themeButton.addEventListener("click", changeTheme); //changing theme on nav toggle button

// retaining the toggle button state on refresh
themeCheckbox.checked = localStorage.getItem("theme") === "dark__theme";

// LOGOUT
const logoutBtnEle = document.querySelector(".logout") as HTMLButtonElement;

logoutBtnEle.addEventListener("click", function () {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userDetails");
    window.location.href = "/";
});
