window.runScript = function() {  // Attach function to global window object
    let inputValue = document.getElementById("userInput").value;
    
    console.log("User Input:", inputValue);

    let id = inputValue;  // Assuming you use input as `id`
    let time = Date.now();
    let secret = 'tB87#kPtkxqOS2'; // Replace with actual secret

    let form = `fid=${id}&time=${time}`;
    let sign = md5(form + secret);
    form = `sign=${sign}&` + form;

    fetch('https://wos-giftcode-api.centurygame.com/api/player', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: form
    })
    .then(response => response.json())
    .then(data => {
        console.log("Full Response:", data); // Log full response

        // Ensure we have a valid response structure
        if (data.code === 0 && data.data) {
            let avatarUrl = data.data.avatar_image || ""; // Default empty if missing
            let nickname = data.data.nickname || "Unknown Player"; // Default text if missing

            console.log("Avatar URL:", avatarUrl);
            console.log("Nickname:", nickname);

            // Update nickname
            document.getElementById("nickname").textContent = nickname;

            // Update avatar image only if a valid URL exists
            if (avatarUrl) {
                document.getElementById("avatar").src = avatarUrl;
                document.getElementById("avatar").style.display = "block";
            } else {
                console.warn("No avatar found.");
                document.getElementById("avatar").style.display = "none";
            }
        } else {
            console.error("Unexpected response format or user not found.");
            document.getElementById("nickname").textContent = "User not found!";
            document.getElementById("avatar").style.display = "none";
        }
    })
    .catch(error => {
        console.error("Error fetching data:", error);
        document.getElementById("nickname").textContent = "Error fetching data!";
        document.getElementById("avatar").style.display = "none";
    });
};