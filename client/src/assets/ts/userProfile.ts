import axios from "axios";
import { baseUrl } from "../../main";

// render user details
function renderUserDetails(userDetails: any) {
    // profile on dashboard header
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

    if (welcomeMsgElement) {
        welcomeMsgElement.textContent = `Welcome back, ${userDetails.firstName || "User"}!`;
    }
    // profile on profile section
    const profileDetailContainer = document.querySelector(".updatedetail__form--container") as HTMLDivElement;
    const profileImage = document.getElementById("profile__picture") as HTMLImageElement;
    profileImage.src = userDetails.profile;

    if (profileDetailContainer) {
        profileDetailContainer.innerHTML = `
                                <div class="form__groups">
                                    <div class="form__group">
                                        <input type="text" name="firstName" value="${userDetails.firstName}" class="update__field" disabled />
                                    </div>
                                    <div class="form__group">
                                        <input type="text" name="lastName" value="${userDetails.lastName}" class="update__field" disabled />
                                    </div>
                                </div>
                                <div class="form__groups">
                                    <div class="form__group">
                                        <input type="email" name="email" value="${userDetails.email}" class="update__field" disabled />
                                    </div>
                                    <div class="form__group">
                                        <input type="number" name="phone" value="${userDetails.phone}" class="update__field" disabled />
                                    </div>
                                </div>

                                <div class="form__group">
                                    <label>Address</label>
                                    <textarea name="address" class="update__field" disabled>${userDetails.address}</textarea>
                                </div>`;
    }
}

function updateUserDetails() {
    const userDetailUpdateForm = document.getElementById("updatedetail__form") as HTMLFormElement;
    userDetailUpdateForm?.addEventListener("submit", function (event) {
        event.preventDefault();

        let formData = new FormData(userDetailUpdateForm);
        let data = Object.fromEntries(formData.entries());

        axios
            .put(`${baseUrl}user/update`, data, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("authToken"),
                },
            })
            .then(function (response) {
                // location.reload
                console.log(response);
            })
            .catch(function (error) {
                console.error(error.response);
            });
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("authToken");
    if (token) {
        const userDetails = JSON.parse(localStorage.getItem("userDetails") || "{}");
        renderUserDetails(userDetails);
        updateUserDetails();
    }

    // enable update detail form
    const updateInputs = document.querySelectorAll(".update__field");
    const editInfoBtn = document.querySelector(".edit__info--button") as HTMLButtonElement;
    const updateInfoBtn = document.querySelector(".update__info") as HTMLButtonElement;

    editInfoBtn?.addEventListener("click", function () {
        updateInputs.forEach((input) => {
            input.removeAttribute("disabled");
        });
        updateInfoBtn.classList.add("show");
    });

    // update profile ficture
    const uploadProfilePictureBtn = document.querySelector(".profile__picture--upload") as HTMLButtonElement;
    const closeModalBtn = document.querySelector(".close__modal") as HTMLButtonElement;
    const uploadProfilePictureForm = document.getElementById("update__profile--form") as HTMLFormElement;
    const uploadProfilePictureModal = document.querySelector(".update__profile--modal") as HTMLDivElement;
    const overlay = document.querySelector(".overlay") as HTMLDivElement;
    const htmlBodyEle = document.querySelector("body") as HTMLBodyElement;

    // open update profile picture modal
    uploadProfilePictureBtn.addEventListener("click", function () {
        overlay.classList.add("show");
        uploadProfilePictureModal.classList.add("show");
        htmlBodyEle.classList.add("overflowHidden");
    });

    // close update profile picture modal
    closeModalBtn.addEventListener("click", function () {
        overlay.classList.remove("show");
        uploadProfilePictureModal.classList.remove("show");
        htmlBodyEle.classList.remove("overflowHidden");
    });

    // update user profile picture call
    uploadProfilePictureForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const token = localStorage.getItem("authToken");
        let formData = new FormData(uploadProfilePictureForm);
        axios
            .put(`${baseUrl}user/update-profile`, formData, {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(function (response) {
                console.log(response);
                location.reload();
            })
            .catch(function (error) {
                console.error(error.response ? error.response.data : error.message);
            });
    });
});
