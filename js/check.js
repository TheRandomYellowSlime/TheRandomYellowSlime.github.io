let currentKid = null;

const REQUIRED_KID = 1958; // Example constant to check if user has access

// Check if the user is already logged in on page load
window.onload = function() {
    // Check if currentKid exists (set when logging in)
    if (currentKid === REQUIRED_KID) {
        showRestrictedContent();  // Show restricted content if valid
    } else {
        showLoginForm();  // Show login form if no valid kid
    }
};

// Add event listener for the login button
document.addEventListener("DOMContentLoaded", () => {
    const loginButton = document.getElementById("loginButton");
    loginButton.addEventListener("click", login);

    // Add event listener for the logout button
    const logoutButton = document.getElementById("logoutButton");
    logoutButton.addEventListener("click", logout);
});

// Login function
function login() {
    const inputValue = document.getElementById("userInput").value;

    // Check if the input is a number and within the valid range of characters
    if (!/^\d+$/.test(inputValue)) {
        showError("Please enter a valid number.");
        return;
    }

    let secret = 'tB87#kPtkxqOS2';  // Example secret key
    let time = Date.now();
    
    let form = `fid=${inputValue}&time=${time}`;
    let sign = md5(form + secret);
    form = `sign=${sign}&` + form;

    fetch('https://wos-giftcode-api.centurygame.com/api/player', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: form
    })
    .then(response => response.json())
    .then(data => {
        if (data.code === 0 && data.data) {
            const kid = data.data.kid;  // Get the kid from the response
            const avatarUrl = data.data.avatar_image || "";
            const nickname = data.data.nickname || "Unknown Player";
            
            // Store kid in localStorage (semi-login token)
            currentKid = kid;
            
            // Show nickname and avatar
            document.getElementById("nickname").textContent = nickname;
            if (avatarUrl) {
                document.getElementById("avatar").src = avatarUrl;
                document.getElementById("avatar").style.display = "block";
            } else {
                document.getElementById("avatar").style.display = "none";
            }
            
            // Check if user has access to restricted content
            if (kid === REQUIRED_KID) {
                showRestrictedContent();
            } else {
                showError("You do not have access to the restricted section.");
            }
        } else {
            showError("Invalid user ID or data.");
        }
    })
    .catch(error => {
        console.error("Error fetching data:", error);
        showError("There was an error with the login process.");
    });
}

// Show restricted content if the user has the correct kid
function showRestrictedContent() {
    document.getElementById("restrictedContent").style.display = "block";
    document.getElementById("loginForm").style.display = "none";  // Hide login form
}

// Show login form if the user is not logged in
function showLoginForm() {
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("restrictedContent").style.display = "none";  // Hide restricted content
}

// Logout function to clear session and go back to login
function logout() {
    currentKid = null;  // Clear the kid from memory
    showLoginForm();  // Show login form again
    document.getElementById("nickname").textContent = "";
    document.getElementById("avatar").style.display = "none";
}

// Display error message
function showError(message) {
    document.getElementById("errorMessage").textContent = message;
}
