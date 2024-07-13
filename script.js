document.addEventListener("DOMContentLoaded", function() {
    const infoIcons = document.querySelectorAll(".info-icon");
    const overlay = document.getElementById("overlay");
    const popup = document.getElementById("popup");
    const popupText = document.getElementById("popup-text");
    const closeBtn = document.querySelector(".popup .close");

    infoIcons.forEach(icon => {
        icon.addEventListener("click", function() {
            const description = this.getAttribute("data-description");
            popupText.textContent = description;

            overlay.style.display = "block";
            popup.style.display = "block";

            overlay.classList.add("overlay-visible");
            popup.classList.add("popup-visible");

            overlay.classList.remove("overlay-hidden");
            popup.classList.remove("popup-hidden");
        });
    });

    function closePopup() {
        overlay.classList.add("overlay-hidden");
        popup.classList.add("popup-hidden");

        overlay.classList.remove("overlay-visible");
        popup.classList.remove("popup-visible");

        setTimeout(() => {
            overlay.style.display = "none";
            popup.style.display = "none";
        }, 500); // Match the duration of the animation
    }

    closeBtn.addEventListener("click", closePopup);
    overlay.addEventListener("click", closePopup);
});
