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
        console.log("Response:", data);

        // Check if response contains the required data
        if (data && data.data) {
            let avatarUrl = data.data.avatar_image; // Get avatar image URL
            let nickname = data.data.nickname; // Get nickname
            
            // Update the DOM elements
            document.getElementById("nickname").textContent = nickname;
            document.getElementById("avatar").src = avatarUrl;
            document.getElementById("avatar").style.display = "block"; // Show the image
        } else {
            document.getElementById("nickname").textContent = "User not found!";
            document.getElementById("avatar").style.display = "none"; // Hide image
        }
    })
    .catch(error => {
        console.error("Error:", error);
        document.getElementById("nickname").textContent = "Error fetching data!";
        document.getElementById("avatar").style.display = "none"; // Hide image
    });
};