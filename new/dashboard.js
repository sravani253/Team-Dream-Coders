document.addEventListener("DOMContentLoaded", function () {
    let user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user) {
        alert("You are not logged in!");
        window.location.href = "index.html";
        return;
    }

    // Display user email
    document.getElementById("user-email").textContent = user.email;

    // Display user profile (dummy avatar or actual)
    let profileImg = document.getElementById("profile-img");
    profileImg.src = user.profilePic || "https://tamilnaducouncil.ac.in/wp-content/uploads/2020/04/dummy-avatar.jpg";

    // Logout function
    document.getElementById("logout-btn").addEventListener("click", function () {
        localStorage.removeItem("currentUser");
        window.location.href = "index.html";
    });
});
