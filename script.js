const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const urlForm = document.getElementById("urlForm");
const urlInput = document.getElementById("urlInput");

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = searchInput.value.trim();
  if (!query) { searchInput.focus(); return; }
  // Search results open in a new tab so Moogle stays available as your home page.
  window.open("https://duckduckgo.com/?q=" + encodeURIComponent(query), "_blank", "noopener");
});

urlForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let address = urlInput.value.trim();
  if (!address) { urlInput.focus(); return; }
  if (!/^[a-zA-Z][a-zA-Z\d+.-]*:/.test(address)) address = "https://" + address;
  try {
    const parsed = new URL(address);
    if (!["http:", "https:"].includes(parsed.protocol)) throw new Error("Unsupported protocol");
    window.open(parsed.href, "_blank", "noopener");
  } catch {
    urlInput.setCustomValidity("Please enter a valid website address, like example.com");
    urlInput.reportValidity();
    urlInput.addEventListener("input", () => urlInput.setCustomValidity(""), { once: true });
  }
});

document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const dark = document.body.classList.contains("dark");
  document.getElementById("themeToggle").textContent = dark ? "☀" : "☾";
  try { localStorage.setItem("moogle-dark", dark ? "1" : "0"); } catch {}
});
try {
  if (localStorage.getItem("moogle-dark") === "1") {
    document.body.classList.add("dark");
    document.getElementById("themeToggle").textContent = "☀";
  }
} catch {}
document.getElementById("year").textContent = new Date().getFullYear();
