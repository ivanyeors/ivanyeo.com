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


// Open the video modal
function openVideoModal(videoElement) {
    const modal = document.querySelector(".video-modal");
    const modalVideo = modal.querySelector(".modal-video-content");

    // Set the modal video source to the clicked video's source
    modalVideo.querySelector("source").src = videoElement.querySelector("source").src;
    modalVideo.load(); // Reload the video to apply the new source
    modal.style.display = "flex"; // Show the modal
}

// Close the video modal
function closeVideoModal() {
    const modal = document.querySelector(".video-modal");
    const modalVideo = modal.querySelector(".modal-video-content");

    modal.style.display = "none"; // Hide the modal
    modalVideo.pause(); // Stop the video when closing
    modalVideo.querySelector("source").src = ""; // Reset video source
}
