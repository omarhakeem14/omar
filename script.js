// ==================== Theme Toggle (Dark/Light Mode) ====================
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const html = document.documentElement;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

// Theme toggle event listener
themeToggle.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';

  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);

  // Add a subtle animation
  themeToggle.style.transform = 'rotate(360deg)';
  setTimeout(() => {
    themeToggle.style.transform = 'rotate(0deg)';
  }, 300);
});

function updateThemeIcon(theme) {
  themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
}

// ==================== Mobile Menu Toggle ====================
const mobileToggle = document.getElementById('mobile-toggle');
const navMenu = document.getElementById('nav-menu');

mobileToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');

  // Update mobile toggle icon
  if (navMenu.classList.contains('active')) {
    mobileToggle.textContent = '✕';
  } else {
    mobileToggle.textContent = '☰';
  }
});

// Close mobile menu when clicking on a nav link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    mobileToggle.textContent = '☰';
  });
});

// ==================== Header Scroll Effect ====================
const header = document.getElementById('header');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // Add shadow when scrolled
  if (scrollTop > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  lastScrollTop = scrollTop;
});

// ==================== Smooth Scroll for Navigation Links ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');

    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerHeight = header.offsetHeight;
      const targetPosition = targetElement.offsetTop - headerHeight - 20;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ==================== Intersection Observer for Animations ====================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all cards and sections
const animatedElements = document.querySelectorAll(
  '.value-card, .portfolio-item, .service-card, .testimonial-card'
);

animatedElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  observer.observe(el);
});

// ==================== Contact Form Handling ====================
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get form data
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value
  };

  // Create mailto link with form data
  const subject = encodeURIComponent(`رسالة جديدة من ${formData.name}`);
  const body = encodeURIComponent(
    `الاسم: ${formData.name}\n` +
    `البريد الإلكتروني: ${formData.email}\n\n` +
    `الرسالة:\n${formData.message}\n\n` +
    `---\n` +
    `تم الإرسال من موقع Portfolio`
  );

  // Open email client with pre-filled data
  window.location.href = `mailto:omar2010hakeem14@gmail.com?subject=${subject}&body=${body}`;

  // Show success message
  setTimeout(() => {
    showNotification('success', 'تم فتح تطبيق البريد الإلكتروني! أكمل إرسال الرسالة من هناك 📧');
  }, 500);

  // Reset form
  contactForm.reset();

  // Log form data
  console.log('Form submitted:', formData);
});

// ==================== Notification System ====================
function showNotification(type, message) {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${type === 'success' ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #ef4444, #dc2626)'};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 1rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    z-index: 10000;
    font-family: var(--font-family);
    font-weight: 600;
    max-width: 400px;
    animation: slideInRight 0.5s ease-out;
    backdrop-filter: blur(10px);
  `;
  notification.textContent = message;

  document.body.appendChild(notification);

  // Remove notification after 5 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.5s ease-out';
    setTimeout(() => {
      notification.remove();
    }, 500);
  }, 5000);
}

// Add notification animations to CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(100px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes slideOutRight {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(100px);
    }
  }
`;
document.head.appendChild(style);

// ==================== Active Navigation Link Highlighting ====================
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 150;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (navLink) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLink.style.color = 'var(--primary-500)';
        navLink.style.fontWeight = '700';
      } else {
        navLink.style.color = '';
        navLink.style.fontWeight = '600';
      }
    }
  });
}

window.addEventListener('scroll', highlightNavigation);

// ==================== Form Validation ====================
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

emailInput.addEventListener('blur', () => {
  if (emailInput.value && !validateEmail(emailInput.value)) {
    emailInput.style.borderColor = '#ef4444';
    showFieldError(emailInput, 'الرجاء إدخال بريد إلكتروني صحيح');
  } else {
    emailInput.style.borderColor = '';
    removeFieldError(emailInput);
  }
});

function showFieldError(field, message) {
  removeFieldError(field);

  const error = document.createElement('span');
  error.className = 'field-error';
  error.textContent = message;
  error.style.cssText = `
    display: block;
    color: #ef4444;
    font-size: 0.875rem;
    margin-top: 0.5rem;
  `;

  field.parentNode.appendChild(error);
}

function removeFieldError(field) {
  const existingError = field.parentNode.querySelector('.field-error');
  if (existingError) {
    existingError.remove();
  }
}

// ==================== Portfolio Item Hover Effects ====================
const portfolioItems = document.querySelectorAll('.portfolio-item');

portfolioItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.style.transition = 'all 0.3s ease';
  });
});

// ==================== Scroll to Top Button (Optional Enhancement) ====================
// Create scroll to top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.setAttribute('aria-label', 'العودة للأعلى');
scrollTopBtn.style.cssText = `
  position: fixed;
  bottom: 30px;
  left: 30px;
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, var(--primary-500), var(--secondary-500));
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;

document.body.appendChild(scrollTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 500) {
    scrollTopBtn.style.opacity = '1';
    scrollTopBtn.style.pointerEvents = 'auto';
  } else {
    scrollTopBtn.style.opacity = '0';
    scrollTopBtn.style.pointerEvents = 'none';
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

scrollTopBtn.addEventListener('mouseenter', () => {
  scrollTopBtn.style.transform = 'scale(1.1) translateY(-5px)';
});

scrollTopBtn.addEventListener('mouseleave', () => {
  scrollTopBtn.style.transform = 'scale(1) translateY(0)';
});

// ==================== Performance: Lazy Loading Images ====================
if ('loading' in HTMLImageElement.prototype) {
  // Browser supports lazy loading natively
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
    img.src = img.src;
  });
} else {
  // Fallback for browsers that don't support lazy loading
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
  document.body.appendChild(script);
}

// ==================== Console Welcome Message ====================
console.log(`
%c🚀 مرحباً بك في موقع عمر عبد الحكيم 
%c💻 مطور واجهات محترف
%c📧 للتواصل: omar2010hakeem14@gmail.com
%c📱 01093781061
`,
  'color: #3b82f6; font-size: 20px; font-weight: bold;',
  'color: #8b5cf6; font-size: 16px;',
  'color: #06b6d4; font-size: 14px;',
  'color: #10b981; font-size: 14px;'
);

// ==================== Page Load Performance ====================
window.addEventListener('load', () => {
  const loadTime = performance.now();
  console.log(`⚡ Page loaded in ${(loadTime / 1000).toFixed(2)} seconds`);
});
