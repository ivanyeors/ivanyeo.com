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


// Open the video modal / Auto play
document.addEventListener("DOMContentLoaded", () => {
    // Select all videos with the 'auto-play-video' class
    const videos = document.querySelectorAll(".auto-play-video");

    // Create an Intersection Observer for autoplay
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const video = entry.target;

            if (entry.isIntersecting) {
                // Video is in the viewport - play it
                video.play();
            } else {
                // Video is outside the viewport - pause it
                video.pause();
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the video is visible
    });

    // Observe each video
    videos.forEach((video) => {
        observer.observe(video);
    });

    // Modal functionality
    const modal = document.querySelector(".video-modal");
    const modalVideo = modal.querySelector(".modal-video-content");

    // Open the video modal
    window.openVideoModal = (videoElement) => {
        modalVideo.querySelector("source").src = videoElement.querySelector("source").src;
        modalVideo.load(); // Load the new video source
        modal.style.display = "flex"; // Show the modal
        modalVideo.play(); // Play the video in the modal
    };

    // Close the video modal
    window.closeVideoModal = () => {
        modal.style.display = "none"; // Hide the modal
        modalVideo.pause(); // Pause the video in the modal
        modalVideo.querySelector("source").src = ""; // Clear the video source
    };
});

document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    const links = document.querySelectorAll(".anchor-link");

    const observerOptions = {
        root: null, // Use the viewport as the root
        threshold: 0.3 // Trigger when 30% of the section is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const link = document.querySelector(`.anchor-link[href="#${entry.target.id}"]`);

            if (entry.isIntersecting) {
                // Add active class when section is in view
                link.classList.add("active");
            } else {
                // Remove active class when section is out of view
                link.classList.remove("active");
            }
        });
    }, observerOptions);

    // Observe each section
    sections.forEach((section) => observer.observe(section));
});


// Anchor link in mobile for expand and collapse view
document.addEventListener("DOMContentLoaded", () => {
    const burgerMenu = document.querySelector(".burger-menu");
    const anchorLinks = document.querySelector(".anchor-links");

    burgerMenu.addEventListener("click", () => {
        anchorLinks.classList.toggle("open"); // Toggle the "open" class
    });
});


// Header menu 
document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".main-header");
    const headerHeight = header.offsetHeight;

    let isScrolled = false;
    let timeoutId = null;

    window.addEventListener("scroll", () => {
        if (window.scrollY > headerHeight && !isScrolled) {
            isScrolled = true;
            timeoutId = setTimeout(() => {
                header.classList.add("scrolled");
            }, 1000); // 1-second delay
        } else if (window.scrollY <= headerHeight && isScrolled) {
            isScrolled = false;
            clearTimeout(timeoutId); // Cancel the delay if scrolling back up
            header.classList.remove("scrolled");
        }
    });
});

