    // Dropdown functionality
    document.addEventListener('DOMContentLoaded', function() {
      // Get all dropdown buttons
      const dropdownButtons = document.querySelectorAll('[data-testid="myTickets"], [data-testid="myProfile"], [data-testid="mySettings"]');

      dropdownButtons.forEach(button => {
        button.addEventListener('click', function(e) {
          e.preventDefault();

          // Get current state
          const isExpanded = this.getAttribute('aria-expanded') === 'true';

          // Close all other dropdowns first
          dropdownButtons.forEach(otherButton => {
            if (otherButton !== this) {
              otherButton.setAttribute('aria-expanded', 'false');
              const otherDropdown = otherButton.nextElementSibling;
              if (otherDropdown) {
                otherDropdown.style.display = 'none';
                // Update chevron rotation
                const otherChevron = otherButton.querySelector('.sc-e6660eb6-6');
                if (otherChevron) {
                  otherChevron.style.transform = 'rotate(0deg)';
                }
              }
            }
          });

          // Toggle current dropdown
          const newState = !isExpanded;
          this.setAttribute('aria-expanded', newState.toString());

          // Find the dropdown content (next sibling)
          const dropdown = this.nextElementSibling;
          if (dropdown) {
            dropdown.style.display = newState ? 'block' : 'none';
          }

          // Rotate chevron icon
          const chevron = this.querySelector('.sc-e6660eb6-6');
          if (chevron) {
            chevron.style.transform = newState ? 'rotate(180deg)' : 'rotate(0deg)';
            chevron.style.transition = 'transform 0.2s ease-out';
          }
        });
      });

      // Initialize dropdown states based on aria-expanded
      dropdownButtons.forEach(button => {
        const isExpanded = button.getAttribute('aria-expanded') === 'true';
        const dropdown = button.nextElementSibling;
        if (dropdown) {
          dropdown.style.display = isExpanded ? 'block' : 'none';
        }

        // Set initial chevron rotation
        const chevron = button.querySelector('.sc-e6660eb6-6');
        if (chevron) {
          chevron.style.transform = isExpanded ? 'rotate(180deg)' : 'rotate(0deg)';
          chevron.style.transition = 'transform 0.2s ease-out';
        }
      });

      // Mobile Sidebar functionality
      const hamburgerButton = document.querySelector('.sc-e486b071-2.dyOaeo');
      const mobileSidebar = document.getElementById('mobile-sidebar');
      const mobileSidebarOverlay = document.getElementById('mobile-sidebar-overlay');
      const closeSidebarBtn = document.getElementById('close-sidebar');

      // Function to open sidebar
      function openSidebar() {
        mobileSidebar.classList.add('open');
        mobileSidebarOverlay.classList.add('open');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
      }

      // Function to close sidebar
      function closeSidebar() {
        mobileSidebar.classList.remove('open');
        mobileSidebarOverlay.classList.remove('open');
        document.body.style.overflow = ''; // Restore scrolling
      }

      // Open sidebar when hamburger menu is clicked
      if (hamburgerButton) {
        hamburgerButton.addEventListener('click', function(e) {
          e.preventDefault();
          openSidebar();
        });
      }

      // Close sidebar when close button is clicked
      if (closeSidebarBtn) {
        closeSidebarBtn.addEventListener('click', function(e) {
          e.preventDefault();
          closeSidebar();
        });
      }

      // Close sidebar when overlay is clicked
      if (mobileSidebarOverlay) {
        mobileSidebarOverlay.addEventListener('click', function(e) {
          e.preventDefault();
          closeSidebar();
        });
      }

      // Close sidebar when escape key is pressed
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileSidebar.classList.contains('open')) {
          closeSidebar();
        }
      });

      // Close sidebar when window is resized to desktop size
      window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) {
          closeSidebar();
        }
      });

      // Country Flag Modal functionality
      const countryFlagButton = document.querySelector('.sc-eeec92d6-2.hvUcCR');
      const countryFlagModal = document.getElementById('country-flag-modal');
      const closeCountryModalBtn = document.getElementById('close-country-modal');
      const countrySearchInput = document.getElementById('country-search');
      const countryItems = document.querySelectorAll('.country-item');

      // Function to open country modal
      function openCountryModal() {
        countryFlagModal.classList.add('open');
        document.body.style.overflow = 'hidden';
        // Focus on search input
        setTimeout(() => {
          if (countrySearchInput) {
            countrySearchInput.focus();
          }
        }, 100);
      }

      // Function to close country modal
      function closeCountryModal() {
        countryFlagModal.classList.remove('open');
        document.body.style.overflow = '';
        // Clear search
        if (countrySearchInput) {
          countrySearchInput.value = '';
          filterCountries('');
        }
      }

      // Open country modal when flag button is clicked
      if (countryFlagButton) {
        countryFlagButton.addEventListener('click', function(e) {
          e.preventDefault();
          openCountryModal();
        });
      }

      // Close country modal when close button is clicked
      if (closeCountryModalBtn) {
        closeCountryModalBtn.addEventListener('click', function(e) {
          e.preventDefault();
          closeCountryModal();
        });
      }

      // Close country modal when clicking outside
      if (countryFlagModal) {
        countryFlagModal.addEventListener('click', function(e) {
          if (e.target === countryFlagModal) {
            closeCountryModal();
          }
        });
      }

      // Close country modal when escape key is pressed
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && countryFlagModal.classList.contains('open')) {
          closeCountryModal();
        }
      });

      // Filter countries based on search input
      function filterCountries(searchTerm) {
        const countries = document.querySelectorAll('.country-item');
        countries.forEach(country => {
          const countryName = country.querySelector('.country-name').textContent.toLowerCase();
          const countryCode = country.querySelector('.country-code').textContent.toLowerCase();
          const searchLower = searchTerm.toLowerCase();
          
          if (countryName.includes(searchLower) || countryCode.includes(searchLower)) {
            country.style.display = 'flex';
          } else {
            country.style.display = 'none';
          }
        });
      }

      // Search functionality
      if (countrySearchInput) {
        countrySearchInput.addEventListener('input', function(e) {
          filterCountries(e.target.value);
        });
      }

      // Handle country selection
      countryItems.forEach(item => {
        item.addEventListener('click', function() {
          const countryCode = this.getAttribute('data-country');
          const countryName = this.querySelector('.country-name').textContent;
          const emoji = this.querySelector('.country-flag').textContent.trim();

          // Update the flag button display
          const flagButton = document.querySelector('.sc-eeec92d6-2.hvUcCR');
          if (flagButton) {
            const emojiSpan = flagButton.querySelector('.country-flag-emoji');
            const codeSpan = flagButton.querySelector('.country-code-text');
            const hiddenSpan = flagButton.querySelector('.VisuallyHidden-sc-8buqks-0');

            if (emojiSpan) {
              emojiSpan.textContent = emoji || '🏳️';
            }
            if (codeSpan) {
              codeSpan.textContent = countryCode;
            }
            if (hiddenSpan) {
              hiddenSpan.textContent = `${countryName} selected, change country`;
            }
          }

          // Close modal
          closeCountryModal();

          // Placeholder: integrate region switch
          console.log(`Selected country: ${countryName} (${countryCode})`);
        });
      });
    });
