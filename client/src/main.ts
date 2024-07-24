import Chart from "chart.js/auto";
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

// categories chart
const categoryChartEle = document.getElementById("categories__chart") as HTMLCanvasElement;
const categoryItemsEle = document.querySelector(".categories") as HTMLUListElement;

(async function () {
    const data = [
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
            // labels: data.map((row) => row.category),
            datasets: [
                {
                    label: "Budget",
                    data: data.map((row) => row.amount),
                },
            ],
        },
    });

    data.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `<i class="bx bxs-circle"></i><span>${item.category}</span>`;
        categoryItemsEle.appendChild(li);
    });
})();

// money flow chart
const moneyFlowChartEle = document.getElementById("money__flow") as HTMLCanvasElement;
// const categoryItemsEle = document.querySelector(".categories") as HTMLUListElement;

(async function () {
    const data = [
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
const setTheme = function () {
    localStorage.removeItem("theme");
    if (themeCheckbox.checked) {
        localStorage.setItem("theme", "dark__theme");
    } else {
        localStorage.setItem("theme", "light__theme");
    }
};

// adding theme from localStorage
const changeTheme = function () {
    setTheme();
    let theme = localStorage.getItem("theme");
    document.getElementsByTagName("body")[0].classList.toggle(`${theme ? theme : "light__theme"}`);
};

// setting default theme
document.getElementsByTagName("body")[0].classList.toggle(`${localStorage.getItem("theme") ? localStorage.getItem("theme") : "light__theme"}`);
themeButton.addEventListener("click", changeTheme); //changing theme on nav toggle button

// retaining the toggle button state on refress
if (localStorage.getItem("theme") === "dark__theme") {
    themeCheckbox.checked = true;
} else {
    themeCheckbox.checked = false;
}
