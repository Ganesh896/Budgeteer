import axios from "axios";
import { baseUrl } from "../../main";
import { addExpense, renderUserExpenses } from "./expenses";

export const getUserDetails = async () => {
    if (localStorage.getItem("authToken")) {
        await axios
            .get(`${baseUrl}user/user-details`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            })
            .then(function (response) {
                // console.log(response.data.data);
                localStorage.setItem("userDetails", JSON.stringify(response.data.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    }
};

document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("authToken");
    getUserDetails();
    if (token) {
        // const userDetails = JSON.parse(localStorage.getItem("userDetails") || "{}");
        addExpense();
        renderUserExpenses();
    }
});
