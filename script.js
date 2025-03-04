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
    indicator.textContent = ' ';
    body.appendChild(indicator);
    
    // Remove after 3 seconds
    setTimeout(() => indicator.remove(), 2000);

    // Initialize breadcrumb functionality
    initializeBreadcrumbs();
    
    // Initialize filter functionality
    initializeFilters();
    
    // Initialize card grid layout
    initializeCardGridLayout();
    
    // Fetch GitHub repository stats
    fetchGitHubStats();
    
    // Initialize the anchor link intersection observer
    initializeAnchorLinks();
    
    // Initialize Evydence charts
    initializeEvydenceCharts();
    
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

// Initialize anchor links functionality
function initializeAnchorLinks() {
  const sections = document.querySelectorAll("section");
  const links = document.querySelectorAll(".anchor-link");
  const anchorLinkList = document.querySelector(".anchor-link-list");
  const anchorItems = document.querySelectorAll('.anchor-link-list li');
  
  console.log('Initializing anchor links - found sections:', sections.length);
  console.log('Initializing anchor links - found links:', links.length);

  // Make sure anchor links are always visible
  if (anchorLinkList) {
    anchorLinkList.classList.remove("hidden");
    
    // Mobile toggle functionality
    function isMobileView() {
      return window.innerWidth <= 768;
    }
    
    // Handle tap/click on list items to expand in mobile
    if (isMobileView()) {
      // Make list items expandable on tap
      anchorItems.forEach(item => {
        item.addEventListener('click', function(e) {
          if (!isMobileView()) return;
          
          // Close any other expanded items
          anchorItems.forEach(otherItem => {
            if (otherItem !== item) {
              otherItem.classList.remove('expanded');
            }
          });
          
          // Toggle expanded state on this item
          this.classList.toggle('expanded');
          
          // Let the event propagate to links if clicking directly on a link
          if (e.target !== this && !e.target.classList.contains('anchor-link') && !this.contains(e.target.closest('.anchor-link'))) {
            e.preventDefault();
            e.stopPropagation();
          }
        });
      });
      
      // Handle clicks on the toggle button
      const navToggle = document.querySelector('.mobile-nav-toggle');
      if (navToggle) {
        navToggle.addEventListener('click', function() {
          anchorLinkList.classList.toggle('hidden');
          this.classList.toggle('active');
        });
      }
      
      // Hide expanded items when clicking elsewhere
      document.addEventListener('click', function(e) {
        if (!e.target.closest('.anchor-link-list')) {
          anchorItems.forEach(item => {
            item.classList.remove('expanded');
          });
        }
      });
    }
    
    // Update on window resize
    window.addEventListener('resize', function() {
      if (isMobileView()) {
        // Reset expanded states when switching to mobile
        anchorItems.forEach(item => {
          item.classList.remove('expanded');
        });
      }
    });
    
    // Add aria attributes for accessibility
    anchorLinkList.setAttribute('role', 'navigation');
    anchorLinkList.setAttribute('aria-label', 'Page sections');
  }

  const observerOptions = {
    root: null, // Use the viewport as the root
    threshold: 0.3, // Trigger when 30% of the section is visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const link = document.querySelector(
        `.anchor-link[href="#${entry.target.id}"]`
      );
      
      if (!link) return; // Skip if link not found

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
  sections.forEach((section) => {
    if (section.id) { // Only observe sections with IDs
      observer.observe(section);
    }
  });
}

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

// Function to handle card grid layout based on number of cards
function initializeCardGridLayout() {
    console.log('Initializing card grid layout...');
    
    // Get all card grid containers
    const cardGrids = document.querySelectorAll('.card-grid');
    
    // Apply layout initially
    applyCardGridLayout(cardGrids);
    
    // Add resize event listener to update layout when window size changes
    window.addEventListener('resize', () => {
        // Use debounce to prevent excessive function calls during resize
        clearTimeout(window.resizeTimer);
        window.resizeTimer = setTimeout(() => {
            console.log('Window resized, updating card grid layout...');
            // Re-apply the layout
            applyCardGridLayout(document.querySelectorAll('.card-grid'));
        }, 250); // Wait 250ms after resize ends before updating
    });
    
    // Set up a mutation observer to watch for dynamically added card grids
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                // Check if any added nodes are card grids or contain card grids
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        // Check if the node itself is a card grid
                        if (node.classList && node.classList.contains('card-grid')) {
                            console.log('New card grid added, updating layout...');
                            applyCardGridLayout([node]);
                        }
                        
                        // Check if the node contains any card grids
                        const childGrids = node.querySelectorAll('.card-grid');
                        if (childGrids.length > 0) {
                            console.log('Found card grids in added content, updating layout...');
                            applyCardGridLayout(childGrids);
                        }
                    }
                });
            }
        });
    });
    
    // Start observing the document body for changes
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

// Function to apply the appropriate grid layout based on card count
function applyCardGridLayout(cardGrids) {
    // Process each card grid
    cardGrids.forEach(grid => {
        const cardCount = grid.children.length;
        console.log(`Processing card grid with ${cardCount} cards`);
        
        // Remove any existing grid classes
        grid.classList.remove('card-grid-1', 'card-grid-2', 'card-grid-4');
        
        // Apply appropriate class based on card count
        if (cardCount === 1) {
            grid.classList.add('card-grid-1');
        } else if (cardCount === 2) {
            grid.classList.add('card-grid-2');
        } else if (cardCount === 4) {
            grid.classList.add('card-grid-4');
        }
    });
}

// Function to fetch GitHub repository stats
function fetchGitHubStats() {
    const repo = 'ivanyeors/Relinky';
    const starsElement = document.getElementById('github-stars');
    const forksElement = document.getElementById('github-forks');
    const issuesElement = document.getElementById('github-issues');
    
    if (!starsElement || !forksElement || !issuesElement) {
        console.log('GitHub stats elements not found on this page');
        return;
    }
    
    console.log('Fetching GitHub stats for repository:', repo);
    
    // Set loading state
    starsElement.textContent = 'Loading...';
    forksElement.textContent = 'Loading...';
    issuesElement.textContent = 'Loading...';
    
    fetch(`https://api.github.com/repos/${repo}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('GitHub API request failed');
            }
            return response.json();
        })
        .then(data => {
            console.log('GitHub API response:', data);
            
            // Update stats with actual data
            starsElement.textContent = data.stargazers_count || '0';
            forksElement.textContent = data.forks_count || '0';
            issuesElement.textContent = data.open_issues_count || '0';
        })
        .catch(error => {
            console.error('Error fetching GitHub stats:', error);
            
            // Set fallback values on error
            starsElement.textContent = 'N/A';
            forksElement.textContent = 'N/A';
            issuesElement.textContent = 'N/A';
        });
}

  // Function to toggle experience details
  function toggleExperience(element) {
    const details = element.nextElementSibling;
    const icon = element.querySelector('.toggle-icon');
    const item = element.closest('.experience-item');
    
    // Toggle the current item
    if (details.classList.contains('collapsed')) {
      // First close any open ones
      const allExpanded = document.querySelectorAll('.experience-details.expanded');
      allExpanded.forEach(exp => {
        if (exp !== details) {
          exp.classList.remove('expanded');
          exp.classList.add('collapsed');
          exp.previousElementSibling.querySelector('.toggle-icon').textContent = '+';
        }
      });
      
      // Then open this one
      details.classList.remove('collapsed');
      details.classList.add('expanded');
      icon.textContent = '−'; // Minus sign
      item.classList.add('active');
    } else {
      details.classList.remove('expanded');
      details.classList.add('collapsed');
      icon.textContent = '+'; // Plus sign
      item.classList.remove('active');
    }
  }
  
  // Function to toggle all experiences (expand/collapse all)
  function toggleAllExperiences() {
    const experienceHeaders = document.querySelectorAll('.experience-header');
    const expandText = document.getElementById('expand-text');
    const arrowIcon = document.querySelector('.icon-arrow');
    
    // Check if all are already expanded
    let allExpanded = true;
    document.querySelectorAll('.experience-details').forEach(detail => {
      if (detail.classList.contains('collapsed')) {
        allExpanded = false;
      }
    });
    
    // Toggle based on current state
    experienceHeaders.forEach(header => {
      const details = header.nextElementSibling;
      const toggleIcon = header.querySelector('.toggle-icon');
      const item = header.closest('.experience-item');
      
      if (allExpanded) {
        // Collapse all
        details.classList.remove('expanded');
        details.classList.add('collapsed');
        toggleIcon.textContent = '+';
        expandText.textContent = 'Expand All';
        arrowIcon.classList.remove('up');
        item.classList.remove('active');
      } else {
        // Expand all
        details.classList.remove('collapsed');
        details.classList.add('expanded');
        toggleIcon.textContent = '−'; // Using the same minus sign as in toggleExperience
        expandText.textContent = 'Collapse All';
        arrowIcon.classList.add('up');
        item.classList.add('active');
      }
    });
  }
  
  // Add hover effect for experience headers
  document.addEventListener('DOMContentLoaded', function() {
    const headers = document.querySelectorAll('.experience-header');
    
    headers.forEach(header => {
      header.addEventListener('mouseenter', function() {
        this.classList.add('hover');
      });
      
      header.addEventListener('mouseleave', function() {
        this.classList.remove('hover');
      });
    });
  });

// Function to initialize the charts for the Evydence platform
function initializeEvydenceCharts() {
    // Check if we're on the Evydence page
    if (!document.getElementById('aiHealthcareChart') || !document.getElementById('populationHealthChart')) {
        return;
    }
    
    console.log('Initializing Evydence charts');
    
    // AI in Healthcare Chart
    const aiCtx = document.getElementById('aiHealthcareChart').getContext('2d');
    const aiHealthcareChart = new Chart(aiCtx, {
        type: 'bar',
        data: {
            labels: ['2023', '2030'],
            datasets: [{
                label: 'Market Size (Billion USD)',
                data: [4.6, 50.9],
                borderRadius: 6,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(54, 162, 235, 0.9)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Billion USD'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `$${context.raw}B`;
                        }
                    }
                }
            }
        }
    });

    // Population Health Management Chart
    const phCtx = document.getElementById('populationHealthChart').getContext('2d');
    const populationHealthChart = new Chart(phCtx, {
        type: 'bar',
        data: {
            labels: ['2023', '2030'],
            datasets: [{
                label: 'Market Size (Billion USD)',
                data: [12.8, 54.7],
                borderRadius: 6,
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(75, 192, 192, 0.9)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1,

            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Billion USD'
                    },
                    grid: {
                        display: true,
                        drawBorder: true,
                        lineWidth: 0.5
                    }
                },
                x: {
                    grid: {
                        display: true,
                        drawBorder: true,
                        lineWidth: 0.5
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `$${context.raw}B`;
                        }
                    }
                }
            }
        }
    });
    
    // Add a third chart to show CAGR comparison
    const cagrCtx = document.getElementById('cagrComparisonChart')?.getContext('2d');
    if (cagrCtx) {
        const cagrComparisonChart = new Chart(cagrCtx, {
            type: 'line',
            data: {
                labels: ['2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'],
                datasets: [
                    {
                        label: 'AI in Healthcare (40.9% CAGR)',
                        data: [4.6, 6.48, 9.13, 12.86, 18.12, 25.53, 35.97, 50.9],
                        borderColor: 'rgba(54, 162, 235, 1)',
                        backgroundColor: 'rgba(54, 162, 235, 0.1)',
                        fill: true,
                        tension: 0.4,
                        borderWidth: 2
                    },
                    {
                        label: 'Population Health Management (23.1% CAGR)',
                        data: [12.8, 15.76, 19.4, 23.88, 29.4, 36.2, 44.56, 54.85],
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.1)',
                        fill: true,
                        tension: 0.4,
                        borderWidth: 2
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Billion USD'
                        },
                        grid: {
                            display: true,
                            drawBorder: true,
                            lineWidth: 0.5
                        }
                    },
                    x: {
                        grid: {
                            display: true,
                            drawBorder: true,
                            lineWidth: 0.5
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: $${context.raw}B`;
                            }
                        }
                    }
                }
            }
        });
    }
}