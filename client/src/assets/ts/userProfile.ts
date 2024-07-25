export function updateUserProfile(userDetails: any) {
    const headerProfileElement = document.querySelector(".header__profile") as HTMLDivElement;
    const welcomeMsgElement = document.getElementById("welcome__msg") as HTMLHeadElement;

    const fullName = userDetails.firstName + " " + userDetails.lastName;
    if (headerProfileElement) {
        headerProfileElement.innerHTML = `
            <div class="header__profile--img">
                <img src="${userDetails.profile || "./public/images/default-profile.jpg"}" id="profile__img" alt="Profile Image" />
            </div>
            <div class="header__right--details">
                <h5 class="normal__text">${fullName || "User"}</h5>
                <p class="meta__text">${userDetails.email || "user@example.com"}</p>
            </div>
        `;
    }

    welcomeMsgElement.textContent = `Welcome back, ${userDetails.firstName || "User"}!`;
}

// UPDATE PROFILE PICTURE
// import axios from "axios";
// import { baseUrl } from "../../main";

// const updateProfileFormEle = document.getElementById("update__profile") as HTMLFormElement;
// const updateProfileButtonEle = document.getElementById("update__profile--btn") as HTMLButtonElement;

// const updateProfileHandler = function (form: HTMLFormElement) {
//     const token = localStorage.getItem("authToken");
//     let formData = new FormData(form);
//     axios
//         .put(`${baseUrl}user/update-profile`, formData, {
//             headers: {
//                 Authorization: "Bearer " + token,
//                 "Content-Type": "multipart/form-data",
//             },
//         })
//         .then(function (response) {
//             console.log(response);
//         })
//         .catch(function (error) {
//             console.error(error.response ? error.response.data : error.message);
//         });
// };

// updateProfileButtonEle?.addEventListener("click", function (e) {
//     e.preventDefault();
//     console.log("Butten clicked");
//     updateProfileHandler(updateProfileFormEle);
// });
