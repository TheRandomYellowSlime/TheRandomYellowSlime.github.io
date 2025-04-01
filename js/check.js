function runScript() {
    let inputValue = document.getElementById("userInput").value;
    
    // Example: Using input value in your existing script
    console.log("User Input:", inputValue);

    // Add your existing script logic here
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
    .then(data => console.log("Response:", data))
    .catch(error => console.error("Error:", error));
}