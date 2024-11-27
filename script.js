// Open the modal
function openModal(imageElement) {
    const modal = document.querySelector(".modal");
    const modalImage = modal.querySelector(".modal-content");

    modalImage.src = imageElement.src; // Set the modal image source
    modal.style.display = "flex"; // Display the modal
}

// Close the modal
function closeModal() {
    const modal = document.querySelector(".modal");
    modal.style.display = "none"; // Hide the modal
}

// Close the modal with Esc key
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeModal();
    }
});

// Close the modal when clicking outside the image
document.querySelector(".modal").addEventListener("click", (event) => {
    if (event.target === document.querySelector(".modal")) {
        closeModal();
    }
});
