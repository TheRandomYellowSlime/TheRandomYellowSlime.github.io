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
        console.log("Full Response:", data); // Log full response for debugging

        if (data && data.data) {
            let avatarUrl = data.data.avatar_image; 
            let nickname = data.data.nickname;

            console.log("Avatar URL:", avatarUrl);
            console.log("Nickname:", nickname);

            if (avatarUrl) {
                document.getElementById("avatar").src = avatarUrl;
                document.getElementById("avatar").style.display = "block";
            } else {
                console.warn("Avatar URL is missing in response!");
                document.getElementById("avatar").style.display = "none";
            }

            if (nickname) {
                document.getElementById("nickname").textContent = nickname;
            } else {
                console.warn("Nickname is missing in response!");
                document.getElementById("nickname").textContent = "No nickname found";
            }
        } else {
            console.error("No 'data' field in response!");
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