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
    });
