// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const htmlEl = document.documentElement;
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');

// Check for saved theme or system preference
const storedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Update icon based on theme
function updateThemeIcon(isDark) {
    if (isDark) {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    } else {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    }
}

// Apply stored or system preference on load
let isDark = storedTheme === 'dark' || (!storedTheme && prefersDark);
if (isDark) {
    htmlEl.classList.add('dark');
}
updateThemeIcon(isDark);

// Handle theme toggle click
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        htmlEl.classList.toggle('dark');
        isDark = htmlEl.classList.contains('dark');
        const newTheme = isDark ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(isDark);
    });
}

// Expandable Skill Cards
const skillCards = document.querySelectorAll('.skill-expandable');

skillCards.forEach(card => {
    // Make entire card clickable
    card.addEventListener('click', (e) => {
        // Prevent if clicking inside a link or button (though we don't have any in skills)
        if (e.target.closest('a')) return;
        
        const isExpanded = card.getAttribute('data-expanded') === 'true';
        
        // Toggle expanded state
        card.setAttribute('data-expanded', isExpanded ? 'false' : 'true');
        
        console.log('Card clicked. Was expanded:', isExpanded, 'Now expanded:', !isExpanded);
    });
});

// View More Projects Toggle
const viewMoreBtn = document.getElementById('view-more-projects');
const moreProjects = document.getElementById('more-projects');
const viewMoreText = document.getElementById('view-more-text');
const viewMoreIcon = document.getElementById('view-more-icon');

if (viewMoreBtn && moreProjects) {
    viewMoreBtn.addEventListener('click', () => {
        const isHidden = moreProjects.style.display === 'none';
        
        if (isHidden) {
            moreProjects.style.display = 'grid';
            viewMoreText.textContent = 'View Less';
            viewMoreIcon.style.transform = 'rotate(180deg)';
        } else {
            moreProjects.style.display = 'none';
            viewMoreText.textContent = 'View More Projects';
            viewMoreIcon.style.transform = 'rotate(0deg)';
            // Scroll back to projects section
            document.getElementById('projects').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
}

// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger icon
        const spans = mobileMenuToggle.querySelectorAll('span');
        spans[0].style.transform = navMenu.classList.contains('active') ? 'rotate(45deg) translate(5px, 5px)' : 'none';
        spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
        spans[2].style.transform = navMenu.classList.contains('active') ? 'rotate(-45deg) translate(7px, -6px)' : 'none';
    });
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            
            // Reset hamburger icon
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    } else {
        navbar.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Add animation to elements when they come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
        }
    });
}, observerOptions);

// Observe skill categories and project cards
document.querySelectorAll('.skill-category, .project-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Add active state to navigation links based on scroll position
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
                navLink.style.color = '#1e3a8a';
            }
        }
    });
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav(); // Call once on load

// Add hover effect to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Console message for developers
console.log('%c👋 Hi there! Thanks for checking out my portfolio!', 'color: #1e3a8a; font-size: 16px; font-weight: bold;');
console.log('%cFeel free to reach out via LinkedIn or GitHub.', 'color: #06b6d4; font-size: 14px;');
