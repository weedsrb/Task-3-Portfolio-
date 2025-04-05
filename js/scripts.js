// Initialize AOS animation library
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true,
  mirror: false
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Parallax scrolling effect for hero section
document.addEventListener('DOMContentLoaded', function() {
  const heroSection = document.querySelector('.hero');
  const heroBg = document.querySelector('.hero-bg');
  
  if (heroSection && heroBg) {
    window.addEventListener('scroll', function() {
      // Calculate how far down the page we've scrolled
      const scrolled = window.scrollY;
      
      // Only apply parallax if we're within the hero section
      if (scrolled < heroSection.offsetHeight) {
        // Move the background at a slower rate than the scroll (0.5x)
        // This creates the parallax effect
        heroBg.style.transform = `translateY(${scrolled * 0.4}px)`;
      }
    });
  }
  
  // Project filtering functionality
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-item');
  
  if (filterBtns.length > 0 && projectItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Get filter value
        const filterValue = this.getAttribute('data-filter');
        
        // Show/hide projects based on filter
        projectItems.forEach(item => {
          if (filterValue === 'all' || item.classList.contains(filterValue)) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }
  
  // Animate stats numbers
  const statsNumbers = document.querySelectorAll('.stats-number');
  
  if (statsNumbers.length > 0) {
    const animateStats = () => {
      statsNumbers.forEach(number => {
        const target = parseInt(number.textContent);
        const suffix = number.textContent.includes('+') ? '+' : '';
        let current = 0;
        const increment = target / 50; // Divide by steps
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            number.textContent = target + suffix;
            clearInterval(timer);
          } else {
            number.textContent = Math.floor(current) + suffix;
          }
        }, 30);
      });
    };
    
    // Use Intersection Observer to trigger animation when stats are visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateStats();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    // Observe the first stats number
    if (statsNumbers[0]) {
      observer.observe(statsNumbers[0].parentElement.parentElement);
    }
  }
});
