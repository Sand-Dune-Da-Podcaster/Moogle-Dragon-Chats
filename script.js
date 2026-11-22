const urlForm = document.getElementById("urlForm");
const urlInput = document.getElementById("urlInput");

// Website navigation
urlForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let address = urlInput.value.trim();

    if (!address) {
        urlInput.focus();
        return;
    }

    // Add HTTPS if the user hasn't included a protocol.
    if (!/^[a-zA-Z][a-zA-Z\d+.-]*:/.test(address)) {
        address = "https://" + address;
    }

    try {
        const website = new URL(address);

        if (!["https:", "http:"].includes(website.protocol)) {
            throw new Error("Invalid website");
        }

        window.open(website.href, "_blank", "noopener");

    } catch {
        alert("Please enter a valid website address!");
    }
});

// Dark mode
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", function() {
    document.body.classList.toggle("dark");

    const dark = document.body.classList.contains("dark");

    themeToggle.textContent = dark ? "☀" : "☾";

    localStorage.setItem("moogle-dark", dark ? "1" : "0");
});

// Remember theme preference
if (localStorage.getItem("moogle-dark") === "1") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀";
}
