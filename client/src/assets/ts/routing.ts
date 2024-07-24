import axios from "axios";

// base local url
export const baseUrl = "http://localhost:8000/api";

// checking login status
document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("authToken");
    const currentPath = window.location.pathname;

    if (currentPath === "/") {
        if (token) {
            // Redirect to dashboard if already logged in
            window.location.href = "/dashboard";
        }
    } else if (currentPath === "/dashboard") {
        if (!token) {
            // Redirect to login if not logged in
            window.location.href = "/";

        } else {
            // Verify token with server
            axios
                .get(`${baseUrl}/auth/verifyToken`, { headers: { Authorization: "Bearer " + token } })
                .then((response) => {
                    if (!response.data.valid) {
    
                        localStorage.removeItem("authToken");
                        window.location.href = "/";
                    }
                })
                .catch((error) => {
                    localStorage.removeItem("authToken");
                    window.location.href = "/";
                    console.log(error);
                });
        }
    } else {
        window.location.href = "/404";
    }
});
