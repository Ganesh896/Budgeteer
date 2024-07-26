// document.addEventListener("DOMContentLoaded", () => {
//     const sidebarItems = document.querySelectorAll(".sidebar__item");
//     const contentSections = document.querySelectorAll(".dashboard-content");

//     // Function to hide all sections
//     function hideAllSections() {
//         contentSections.forEach(section => section.style.display = "none");
//     }

//     // Function to show the active section
//     function showSection(id) {
//         const targetSection = document.getElementById(id);
//         if (targetSection) {
//             targetSection.style.display = "block";
//         }
//     }

//     // Function to handle navigation
//     function handleNavigation(event) {
//         const target = event.currentTarget;
//         const link = target.getAttribute("data-link");

//         // Hide all sections and show the active one
//         hideAllSections();
//         showSection(link);

//         // Update URL
//         history.pushState(null, "", `/dashboard/${link}`);

//         // Remove active class from all sidebar items
//         sidebarItems.forEach(item => item.classList.remove("active"));

//         // Add active class to the clicked item
//         target.classList.add("active");
//     }

//     // Attach click event to sidebar items
//     sidebarItems.forEach(item => {
//         item.addEventListener("click", handleNavigation);
//     });

//     // Load the initial content based on URL
//     const currentPath = window.location.pathname.split("/")[2];
//     hideAllSections();
//     if (currentPath) {
//         showSection(currentPath);
//     } else {
//         showSection("dashboard");
//     }
// });
