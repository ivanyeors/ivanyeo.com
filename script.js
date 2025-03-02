console.log('Script loaded');

// Add this at the start of your file
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - Initializing all features');

    // Add a visible indicator that JS is running
    const body = document.body;
    body.style.position = 'relative';
    const indicator = document.createElement('div');
    indicator.style.cssText = `
        position: fixed;
        top: 8px;
        right: 8px;
        background: darkgreen;
        padding: 5px;
        color: white;
        border-radius: 6px;
        z-index: 99999;
    `;
    indicator.textContent = '✅';
    body.appendChild(indicator);
    
    // Remove after 3 seconds
    setTimeout(() => indicator.remove(), 2000);

    // Initialize breadcrumb functionality
    initializeBreadcrumbs();
    
    // Initialize filter functionality
    initializeFilters();
    
    // Initialize other features...
});

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
  console.log('DOM fully loaded');
  // Select all videos with the 'auto-play-video' class
  const videos = document.querySelectorAll(".auto-play-video");

  // Create an Intersection Observer for autoplay
  const observer = new IntersectionObserver(
    (entries) => {
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
    },
    {
      threshold: 0.5, // Trigger when 50% of the video is visible
    }
  );

  // Observe each video
  videos.forEach((video) => {
    observer.observe(video);
  });

  // Modal functionality
  const modal = document.querySelector(".video-modal");
  const modalVideo = modal.querySelector(".modal-video-content");

  // Open the video modal
  window.openVideoModal = (videoElement) => {
    modalVideo.querySelector("source").src =
      videoElement.querySelector("source").src;
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
    threshold: 0.3, // Trigger when 30% of the section is visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const link = document.querySelector(
        `.anchor-link[href="#${entry.target.id}"]`
      );

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
  const anchorLinks = document.querySelector(".anchor-link");

  burgerMenu.addEventListener("click", () => {
    anchorLinks.classList.toggle("open"); // Toggle the "open" class
  });
});

// Anchor link show / hide state only in mobile view
document.addEventListener("DOMContentLoaded", () => {
  const anchorLinks = document.querySelector(".anchor-links");

  let isScrolling;

  window.addEventListener("scroll", () => {
    anchorLinks.classList.add("visible");

    window.clearTimeout(isScrolling);

    isScrolling = setTimeout(() => {
      anchorLinks.classList.remove("visible");
    }, 2000); // Hide after 2 seconds of no scrolling
  });
});

// Anchor link show / hide state only in mobile view
document.addEventListener("DOMContentLoaded", () => {
  const anchorLinks = document.querySelector(".anchor-link-list");

  let isScrolling;

  function handleScroll() {
    anchorLinks.classList.remove("hidden");

    window.clearTimeout(isScrolling);

    isScrolling = setTimeout(() => {
      anchorLinks.classList.add("hidden");
    }, 1000); // Hide after 1 second of no scrolling
  }

  function checkViewport() {
    if (window.innerWidth <= 768) {
      // Mobile view
      window.addEventListener("scroll", handleScroll);
    } else {
      window.removeEventListener("scroll", handleScroll);
      anchorLinks.classList.remove("hidden");
    }
  }

  window.addEventListener("resize", checkViewport);
  checkViewport(); // Initial check
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

function initializeModalSheet() {
    console.log('Initializing modal sheet...');
    
    // Create modal sheet elements
    const modalSheet = document.createElement('div');
    modalSheet.className = 'modal-sheet';
    console.log('Modal sheet element created');
    
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-sheet-overlay';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-sheet-content';
    
    const closeButton = document.createElement('button');
    closeButton.className = 'modal-sheet-close';
    closeButton.innerHTML = `
        <img src="assets/close-icon.svg" alt="Close">
    `;
    
    modalSheet.appendChild(closeButton);
    modalSheet.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
    document.body.appendChild(modalSheet);
    
    // Handle card clicks
    const cards = document.querySelectorAll('.card-modal');
    console.log('Found cards:', cards.length);
    
    cards.forEach(card => {
        // Add a click indicator
        card.style.cursor = 'pointer';
        card.addEventListener('click', async (e) => {
            console.log('Card clicked:', card.id);
            card.style.opacity = '0.7'; // Visual feedback
            setTimeout(() => card.style.opacity = '1', 200);
            
            e.preventDefault();
            e.stopPropagation();
            const url = card.dataset.url;
            console.log('Loading URL:', url);
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error('Network response was not ok');
                const html = await response.text();
                
                // Extract the content we want to display
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const content = doc.querySelector('.project-content');
                
                if (content) {
                    modalContent.innerHTML = content.outerHTML;
                    requestAnimationFrame(() => {
                        modalOverlay.classList.add('open');
                        modalSheet.classList.add('open');
                        document.body.style.overflow = 'hidden';
                    });
                } else {
                    console.error('Could not find .project-content in loaded HTML');
                }
            } catch (error) {
                console.error('Error loading content:', error);
            }
        });
    });
    
    // Close sheet functionality
    const closeSheet = () => {
        modalSheet.classList.remove('open');
        modalOverlay.classList.remove('open');
        setTimeout(() => {
            document.body.style.overflow = '';
        }, 300); // Match transition duration
    };
    
    closeButton.addEventListener('click', closeSheet);
    modalOverlay.addEventListener('click', closeSheet);
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeSheet();
    });
}

// Initialize modal sheet after DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeModalSheet);
} else {
    initializeModalSheet();
}

// Breadcrumb functionality
function initializeBreadcrumbs() {
    const lastBreadcrumb = document.querySelector('.breadcrumbs li[aria-current="page"]');
    if (lastBreadcrumb) {
        function truncateBreadcrumb() {
            const fullText = lastBreadcrumb.getAttribute('title') || lastBreadcrumb.textContent;
            console.log('Full text:', fullText);
            
            // Create measuring element
            const measureElement = document.createElement('span');
            measureElement.style.cssText = `
                position: absolute;
                visibility: hidden;
                white-space: nowrap;
                font-size: ${window.getComputedStyle(lastBreadcrumb).fontSize};
                font-weight: ${window.getComputedStyle(lastBreadcrumb).fontWeight};
            `;
            measureElement.textContent = fullText;
            document.body.appendChild(measureElement);
            
            const textWidth = measureElement.offsetWidth;
            const containerWidth = lastBreadcrumb.parentElement.offsetWidth;
            const availableWidth = containerWidth * 0.6; // Use 60% of container width as threshold
            
            document.body.removeChild(measureElement);
            console.log('Text width:', textWidth, 'Available width:', availableWidth);
            
            if (textWidth > availableWidth) {
                console.log('Truncating text...');
                const truncatedText = `${fullText.slice(0, 10)}...`;
                lastBreadcrumb.textContent = truncatedText;
                lastBreadcrumb.classList.add('truncate');
            } else {
                console.log('Showing full text...');
                lastBreadcrumb.textContent = fullText;
                lastBreadcrumb.classList.remove('truncate');
            }
        }
        
        // Run on load
        truncateBreadcrumb();
        
        // Run on resize with debounce
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(truncateBreadcrumb, 250);
        });
    }
}

// Filter functionality
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.card-modal');
    
    // Only proceed if we have both buttons and cards
    if (!filterButtons.length || !cards.length) {
        console.log('Filter elements not found on this page');
        return;
    }
    
    console.log('Filter initialization started');
    console.log('Found filter buttons:', filterButtons.length);
    console.log('Found cards:', cards.length);

    function filterCards(filterValue) {
        console.log('Filtering for:', filterValue);
        
        cards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            console.log('Card category:', cardCategory);
            
            // Save current onclick
            const href = card.getAttribute('onclick')?.match(/location\.href='(.+?)'/)?.[1];
            
            if (filterValue === 'all' || cardCategory === filterValue) {
                // Show matching cards
                card.style.display = '';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                
                // Restore click functionality
                if (href) {
                    card.onclick = () => location.href = href;
                }
            } else {
                // Hide non-matching cards
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.onclick = null; // Remove click handler
                
                // Hide after animation
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }

    // Handle filter button clicks
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            const filterValue = button.getAttribute('data-filter');
            console.log('Button clicked:', filterValue);
            
            // Update active state
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                console.log('Removed active from:', btn.getAttribute('data-filter'));
            });
            button.classList.add('active');
            console.log('Added active to:', filterValue);
            
            // Apply filter
            filterCards(filterValue);
        });
    });

    // Initialize with 'all' filter
    console.log('Setting initial filter: all');
    filterCards('all');
}
