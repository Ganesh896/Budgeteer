import axios from "axios";

// base local url
export const baseUrl = "http://localhost:8000/api";

//signin-signup
const signinLinkEle = document.querySelector(".signin__link") as HTMLLinkElement;
const signupLinkEle = document.querySelector(".signup__link") as HTMLLinkElement;
const signinContainerEle = document.querySelector(".signin") as HTMLDivElement;
const signupContainerEle = document.querySelector(".signup") as HTMLDivElement;

// signin elements
const signinFormEle = document.getElementById("signin") as HTMLFormElement;
const signinButtonEle = document.querySelector(".btn__signin") as HTMLButtonElement;
const loginErrorEle = document.querySelector(".signin__error") as HTMLParagraphElement;

// signup elements
const signupFormEle = document.getElementById("signup") as HTMLFormElement;
const signupButtonEle = document.querySelector(".btn__signup") as HTMLButtonElement;
const signupErrorEle = document.querySelector(".signup__error") as HTMLParagraphElement;

// open signin form
signinLinkEle?.addEventListener("click", function () {
    signinContainerEle.style.display = "block";
    signupContainerEle.style.display = "none";
});

// open signup form
signupLinkEle?.addEventListener("click", function () {
    signupContainerEle.style.display = "block";
    signinContainerEle.style.display = "none";
});

//login
const signinHandler = function (form: HTMLFormElement) {
    let formData = new FormData(form);
    let data = Object.fromEntries(formData.entries());

    axios
        .post(`${baseUrl}/users/login`, data)
        .then(function (response) {
            localStorage.setItem("authToken", response.data.data.accessToken);
            window.location.href = "/dashboard";
        })
        .catch(function (error) {
            console.error(error.response.data);
            loginErrorEle.innerText = error.response.data.message;
        });
};

signinButtonEle?.addEventListener("click", function (e) {
    e.preventDefault();
    signinHandler(signinFormEle);
});

//signup
const signupHandler = function (form: HTMLFormElement) {
    let formData = new FormData(form);
    let data = Object.fromEntries(formData.entries());

    axios
        .post(`${baseUrl}/users/register`, data)
        .then(function (response) {
            signupErrorEle.innerText = "Register successfully!";
            signupErrorEle.style.color = "green";
            form.reset();
        })
        .catch(function (error) {
            console.error(error.response.data);
            signupErrorEle.innerText = error.response.data.message;
        });
};

signupButtonEle?.addEventListener("click", function (e) {
    e.preventDefault();
    signupHandler(signupFormEle);
});

//login
const logoutBtnEle = document.querySelector(".logout") as HTMLButtonElement;
const logoutHandler = function () {
    localStorage.removeItem("authToken");
    window.location.href = "/";
};

logoutBtnEle?.addEventListener("click", function () {
    console.log("logout");
    logoutHandler();
});
