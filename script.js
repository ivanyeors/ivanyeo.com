document.addEventListener('DOMContentLoaded', () => {
    // Burger menu toggle
    const burgerMenu = document.querySelector('.burger-menu');
    const anchorLinks = document.querySelector('.anchor-links');

    if (burgerMenu && anchorLinks) {
        burgerMenu.addEventListener('click', () => {
            anchorLinks.classList.toggle('open'); // Toggle the "open" class
        });
    }

    // Header scroll effect
    const header = document.querySelector('.main-header');
    if (header) {
        const headerHeight = header.offsetHeight;
        let isScrolled = false;
        let timeoutId = null;

        window.addEventListener('scroll', () => {
            if (window.scrollY > headerHeight && !isScrolled) {
                isScrolled = true;
                timeoutId = setTimeout(() => {
                    header.classList.add('scrolled');
                }, 1000); // 1-second delay
            } else if (window.scrollY <= headerHeight && isScrolled) {
                isScrolled = false;
                clearTimeout(timeoutId); // Cancel the delay if scrolling back up
                header.classList.remove('scrolled');
            }
        });
    }

    // Modal toggle
    const openBtn = document.getElementById('open-modal-button');
    const closeBtn = document.getElementById('close-modal-button');
    const modal = document.getElementById('modalp');

    if (openBtn && closeBtn && modal) {
        openBtn.addEventListener('click', () => {
            modal.classList.add('open');
            modal.style.display = 'flex'; // Ensure the modal is displayed
        });

        closeBtn.addEventListener('click', () => {
            modal.classList.remove('open');
            modal.style.display = 'none'; // Ensure the modal is hidden
        });

        // Close modal when clicking outside modal-content
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('open');
                modal.style.display = 'none'; // Ensure the modal is hidden
            }
        });
    }
    
// Function to open the modal
function openModal() {
    const modal = document.getElementById('modalp');
    modal.classList.add('open');
}

// Function to close the modal
function closeModal() {
    const modal = document.getElementById('modalp');
    modal.classList.remove('open');
}

// Event listener to open the modal
document.getElementById('openModalButton').addEventListener('click', openModal);

// Event listener to close the modal when clicking outside of it
window.addEventListener('click', function(event) {
    const modal = document.getElementById('modalp');
    if (event.target == modal) {
        closeModal();
    }
});

// Ensure the modal can be reopened
document.getElementById('modalp').addEventListener('click', function(event) {
    event.stopPropagation();
});

// Event listener for the close button inside the modal
document.querySelector('.close-button-modal').addEventListener('click', closeModal);


    // Image modal functionality
    function openModal(imageElement) {
        const modal = document.querySelector(".modal");
        const modalImage = modal.querySelector(".modal-content");

        modalImage.src = imageElement.src; // Set the modal image source
        modal.style.display = "flex"; // Display the modal
    }

    function closeModal() {
        const modal = document.querySelector(".modal");
        modal.style.display = "none"; // Hide the modal
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeModal();
        }
    });

    const imageModal = document.querySelector(".modal");
    if (imageModal) {
        imageModal.addEventListener("click", (event) => {
            if (event.target === imageModal) {
                closeModal();
            }
        });
    }

    // Video autoplay functionality
    const videos = document.querySelectorAll(".auto-play-video");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const video = entry.target;

            if (entry.isIntersecting) {
                video.play();
            } else {
                video.pause();
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the video is visible
    });

    videos.forEach((video) => {
        observer.observe(video);
    });

    // Show/hide anchor links on scroll
    const anchorLinkList = document.querySelector('.anchor-link-list');
    let scrollTimeout;

    if (anchorLinkList) {
        window.addEventListener('scroll', () => {
            anchorLinkList.classList.remove('hidden'); // Show anchor links

            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                anchorLinkList.classList.add('hidden'); // Hide anchor links after 2 seconds of no scrolling
            }, 2000);
        });
    }


});