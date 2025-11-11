// ============================================
// PORTFOLIO WEBSITE - MAIN JAVASCRIPT
// ============================================

// ============================================
// 1. PATH DETECTION & COMPONENT LOADER
// ============================================
const ComponentLoader = {
  /**
   * Detect if we're in a subfolder (like projects/) or in root
   * Returns the correct path prefix
   */
  getBasePath() {
    const path = window.location.pathname;
    // If path contains /projects/, we're in a subfolder
    if (path.includes('/projects/')) {
      return '../';
    }
    // Otherwise we're in root
    return '';
  },

  /**
   * Load navbar and footer components
   */
  init() {
    this.loadNavbar();
    this.loadFooter();
  },

  loadNavbar() {
    const basePath = this.getBasePath();
    fetch(`${basePath}components/navbar.html`)
      .then((res) => {
        if (!res.ok) throw new Error('Navbar not found');
        return res.text();
      })
      .then((data) => {
        const placeholder = document.getElementById("navbar-placeholder");
        if (placeholder) {
          placeholder.innerHTML = data;
          // Re-initialize AOS after navbar loads
          if (typeof AOS !== 'undefined') {
            AOS.refresh();
          }
        }
      })
      .catch((error) => {
        console.error("Error loading navbar:", error);
      });
  },

  loadFooter() {
    const basePath = this.getBasePath();
    fetch(`${basePath}components/footer.html`)
      .then((res) => {
        if (!res.ok) throw new Error('Footer not found');
        return res.text();
      })
      .then((data) => {
        const placeholder = document.getElementById("footer-placeholder");
        if (placeholder) {
          placeholder.innerHTML = data;
        }
      })
      .catch((error) => {
        console.error("Error loading footer:", error);
      });
  }
};

// ============================================
// 2. MOBILE NAVIGATION
// ============================================
const MobileNav = {
  /**
   * Open mobile dropdown menu
   */
  hamburg() {
    const navbar = document.querySelector(".dropdown");
    if (navbar) {
      navbar.style.transform = "translateY(0px)";
    }
  },

  /**
   * Close mobile dropdown menu
   */
  cancel() {
    const navbar = document.querySelector(".dropdown");
    if (navbar) {
      navbar.style.transform = "translateY(-500px)";
    }
  },

  /**
   * Initialize mobile navigation event listeners
   */
  init() {
    // Wait for navbar to be loaded before attaching listeners
    setTimeout(() => {
      const hamburgBtn = document.querySelector('.hamburg');
      const cancelBtn = document.querySelector('.cancel');
      
      if (hamburgBtn) {
        hamburgBtn.addEventListener('click', this.hamburg);
      }
      
      if (cancelBtn) {
        cancelBtn.addEventListener('click', this.cancel);
      }
    }, 100);
  }
};

// Make functions globally accessible for inline onclick handlers
window.hamburg = () => MobileNav.hamburg();
window.cancel = () => MobileNav.cancel();

// ============================================
// 3. TYPEWRITER EFFECT (Home page only)
// ============================================
const TypewriterEffect = {
  texts: ["developer", "designer", "builder"],
  speed: 75,
  textIndex: 0,
  characterIndex: 0,
  element: null,

  init() {
    this.element = document.querySelector(".typewriter-type");
    if (this.element) {
      this.typeWriter();
    }
  },

  typeWriter() {
    if (this.characterIndex < this.texts[this.textIndex].length) {
      this.element.innerHTML += this.texts[this.textIndex].charAt(this.characterIndex);
      this.characterIndex++;
      setTimeout(() => this.typeWriter(), this.speed);
    } else {
      setTimeout(() => this.eraseText(), 1000);
    }
  },

  eraseText() {
    if (this.element.innerHTML.length > 0) {
      this.element.innerHTML = this.element.innerHTML.slice(0, -1);
      setTimeout(() => this.eraseText(), 50);
    } else {
      this.textIndex = (this.textIndex + 1) % this.texts.length;
      this.characterIndex = 0;
      setTimeout(() => this.typeWriter(), 500);
    }
  }
};

// ============================================
// 4. SMOOTH SCROLLING
// ============================================
const SmoothScroll = {
  init() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }
};

// ============================================
// 5. ANIMATIONS (AOS)
// ============================================
const Animations = {
  init() {
    if (typeof AOS !== 'undefined') {
      AOS.init({ 
        offset: 0,
        duration: 1000,
        once: false
      });
    }
  }
};

// ============================================
// 6. MAIN INITIALIZATION
// ============================================
const App = {
  init() {
    // Load components first
    ComponentLoader.init();
    
    // Initialize other features
    MobileNav.init();
    TypewriterEffect.init();
    SmoothScroll.init();
    Animations.init();
    
    console.log('Portfolio initialized successfully');
  }
};

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => App.init());
} else {
  App.init();
}

// ============================================
// 7. UTILITY FUNCTIONS
// ============================================

/**
 * Toggle mobile menu
 */
function toggleMenu() {
  const menu = document.getElementById('mobile-menu');
  if (menu) {
    menu.classList.toggle('show');
  }
}

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ComponentLoader, MobileNav, TypewriterEffect, SmoothScroll };
}