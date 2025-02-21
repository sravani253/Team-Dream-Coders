// Button Click Alert
document.querySelectorAll(".referral-card button").forEach(button => {
    button.addEventListener("click", function() {
        alert("Messaging feature coming soon!");
    });
});

// Referrer Form Submission Alert
document.querySelector("form")?.addEventListener("submit", function(event) {
    event.preventDefault();
    alert("Referrer Registration Successful!");
});

document.addEventListener("DOMContentLoaded", function () {
    const profilePic = document.getElementById("profilePic");
    const profileDropdown = document.getElementById("profileDropdown");
    const logoutBtn = document.getElementById("logoutBtn");

    // Use external dummy avatar as default
    const defaultAvatar = "https://tamilnaducouncil.ac.in/wp-content/uploads/2020/04/dummy-avatar.jpg";

    // Get saved profile image from localStorage
    let userProfile = localStorage.getItem("userProfile");

    if (userProfile) {
        profilePic.src = userProfile; // Load user's profile pic
    } else {
        profilePic.src = defaultAvatar; // Set dummy avatar before login
    }

    // Simulated login (replace with actual auth logic)
    function loginUser() {
        // Example user image (Replace with actual login process)
        const userImageURL = "https://randomuser.me/api/portraits/men/45.jpg";
        localStorage.setItem("userProfile", userImageURL);
        profilePic.src = userImageURL;
    }

    // Logout function
    logoutBtn.addEventListener("click", function () {
        localStorage.removeItem("userProfile");
        profilePic.src = defaultAvatar; // Reset to dummy avatar
    });

    // Profile dropdown toggle on click
    profilePic.addEventListener("click", function (event) {
        event.stopPropagation();
        profileDropdown.style.display = profileDropdown.style.display === "block" ? "none" : "block";
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function (event) {
        if (!profilePic.contains(event.target) && !profileDropdown.contains(event.target)) {
            profileDropdown.style.display = "none";
        }
    });

    // Simulate login (For testing: Remove this after implementing real login)
    setTimeout(loginUser, 3000); // Change to actual login function
});
