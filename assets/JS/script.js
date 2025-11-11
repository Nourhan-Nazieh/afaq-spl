/* <!-- ================= START PRELOADER SECTION ======================= */

window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    const loadingBarFill = document.getElementById('loadingBarFill');
    const loadingPercentage = document.getElementById('loadingPercentage');
    
    let percentage = 0;
    
    // Faster loading progress
    const loadingInterval = setInterval(function() {
        percentage += Math.random() * 35; 
        
        if (percentage >= 100) {
            percentage = 100;
            clearInterval(loadingInterval);

            // Update UI instantly
            if (loadingBarFill) loadingBarFill.style.width = "100%";
            if (loadingPercentage) loadingPercentage.textContent = "100%";

            // Hide quicker
            setTimeout(function() {
                preloader.classList.add('hidden');

                // Remove smoothly
                setTimeout(function() {
                    preloader.remove();
                }, 400); 
            }, 300); 
        }

        // Update bar + text
        if (loadingBarFill) loadingBarFill.style.width = percentage + "%";
        if (loadingPercentage) loadingPercentage.textContent = Math.floor(percentage) + "%";

    }, 110); 
});

/* <!-- ================= START-AOS ======================= */

    // Initialize AOS with professional settings
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100,
        delay: 0,
        anchorPlacement: 'top-bottom'
    });

/* <!-- ================= START - HEADER SECTION ======================= */

// ========== MOBILE MENU ==========
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');
const menuOverlay = document.getElementById('menuOverlay');

// Open Mobile Menu
if (menuToggle) {
    menuToggle.addEventListener('click', function() {
        this.classList.add('active');
        mobileMenu.classList.add('active');
        menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

// Close Mobile Menu
function closeMobileMenu() {
    menuToggle.classList.remove('active');
    mobileMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

if (mobileClose) {
    mobileClose.addEventListener('click', closeMobileMenu);
}

if (menuOverlay) {
    menuOverlay.addEventListener('click', closeMobileMenu);
}

// Close menu when clicking mobile nav links
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// ========== STICKY HEADER WITH TOP BAR HIDE ==========
const mainHeader = document.getElementById('mainHeader');
const topBar = document.querySelector('.top-bar');
const body = document.body;

window.addEventListener('scroll', function() {
    const scrollY = window.scrollY || window.pageYOffset;
    
    if (scrollY > 100) {
        // Scrolled down - hide top bar, fix main header
        if (topBar) topBar.classList.add('hidden');
        mainHeader.classList.add('scrolled');
        body.classList.add('header-fixed');
    } else {
        // At top - show top bar, unfix main header
        if (topBar) topBar.classList.remove('hidden');
        mainHeader.classList.remove('scrolled');
        body.classList.remove('header-fixed');
    }
});

// ========== ACTIVE LINK ==========
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY + 120;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            // Desktop Nav
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
});

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = mainHeader.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========== LANGUAGE BUTTON (للمستقبل) ==========
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        console.log('Language button - Ready for future use');
    });
});

/* ====================================================== */
/* ========== START-HERO SECTION  ========== */

// ========== PARALLAX EFFECT ==========
window.addEventListener('scroll', function() {
    const scrolled = window.scrollY;
    const heroBg = document.querySelector('.hero-bg');
    
    if (heroBg && scrolled < window.innerHeight) {
        heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ========== SCROLL DOWN BUTTON ==========
const scrollDown = document.querySelector('.scroll-down');
if (scrollDown) {
    scrollDown.addEventListener('click', function() {
        const nextSection = document.querySelector('#about');
        if (nextSection) {
            const headerHeight = document.getElementById('mainHeader').offsetHeight;
            const targetPosition = nextSection.offsetTop - headerHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
}
/* ====================================================== */
/* ========== Start QUOTE SECTION  ========== */

// ========== SCROLL ANIMATION ==========
// Animation عند الوصول للسيكشن
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// مراقبة Quote Section
const quoteSection = document.querySelector('.quote-section');
if (quoteSection) {
    observer.observe(quoteSection);
}


/* ====================================================== */
/* ========== About us  ========== */

// ========== SCROLL ANIMATION ==========
const aboutObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add animation classes
            const elements = entry.target.querySelectorAll('.section-title, .title-line, .about-subtitle, .about-description, .about-btn');
            elements.forEach((el, index) => {
                setTimeout(() => {
                    el.style.animation = `fadeInUp 0.8s ease-out forwards`;
                }, index * 100);
            });
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
});

const aboutSection = document.querySelector('.about-section');
if (aboutSection) {
    aboutObserver.observe(aboutSection);
}

// Add fadeInUp animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

document.head.appendChild(style);


/* =======================SERVICES SECTION==================== */
// ========== SCROLL ANIMATION FOR SERVICES ==========
const servicesObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.service-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.animation = 'fadeInUp 0.6s ease-out forwards';
                    card.style.opacity = '1';
                }, index * 100);
            });
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

const servicesSection = document.querySelector('.services-section');
if (servicesSection) {
    // Set initial opacity
    const cards = servicesSection.querySelectorAll('.service-card');
    cards.forEach(card => {
        card.style.opacity = '0';
    });
    
    servicesObserver.observe(servicesSection);
}

// Add fadeInUp animation if not already defined
if (!document.querySelector('style[data-services-animation]')) {
    const style = document.createElement('style');
    style.setAttribute('data-services-animation', 'true');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

/* =======================PROJECTS CAROUSEL==================== */

let currentSlide = 0;
const slides = document.querySelectorAll('.project-slide');
const indicators = document.querySelectorAll('.indicator');
const totalSlides = slides.length;

// Show specific slide
function showSlide(index) {
    // Remove active class from all
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Add active class to current
    slides[index].classList.add('active');
    indicators[index].classList.add('active');
}

// Move to next/previous slide
function moveSlide(direction) {
    currentSlide += direction;
    
    // Loop around
    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }
    
    showSlide(currentSlide);
}

// Go to specific slide
function goToSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
}

// Auto play (optional)
let autoPlayInterval;

function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
        moveSlide(1);
    }, 5000); // Change slide every 5 seconds
}

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

// Start auto play on page load
startAutoPlay();

// Stop auto play on hover
const carouselContainer = document.querySelector('.projects-carousel');
if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', stopAutoPlay);
    carouselContainer.addEventListener('mouseleave', startAutoPlay);
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
        moveSlide(1); // Left arrow = next (RTL)
    } else if (e.key === 'ArrowRight') {
        moveSlide(-1); // Right arrow = previous (RTL)
    }
});
/* =======================PROJECTS انتظرونا قريباً==================== */
// ========== TOAST NOTIFICATION SYSTEM ==========
class Toast {
    constructor() {
      this.createContainer();
    }
  
    // إنشاء  الإشعارات
    createContainer() {
      if (!document.getElementById('toast-container')) {
        const container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
      }
    }
  
    // عرض إشعار
    show(message, type = 'info', duration = 3000) {
      const container = document.getElementById('toast-container');
      
      // إنشاء عنصر الإشعار
      const toast = document.createElement('div');
      toast.className = `toast toast-${type}`;
      
      // تحديد الأيقونة بناءً على النوع
      let icon = '';
      switch(type) {
        case 'success':
          icon = '<i class="fas fa-check-circle"></i>';
          break;
        case 'error':
          icon = '<i class="fas fa-exclamation-circle"></i>';
          break;
        case 'warning':
          icon = '<i class="fas fa-exclamation-triangle"></i>';
          break;
        case 'info':
        default:
          icon = '<i class="fas fa-info-circle"></i>';
          break;
      }
      
      // محتوى الإشعار
      toast.innerHTML = `
        <div class="toast-content">
          <div class="toast-icon">${icon}</div>
          <div class="toast-message">${message}</div>
          <button class="toast-close">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="toast-progress"></div>
      `;
      
      // إضافة الإشعار للحاوية
      container.appendChild(toast);
      
      // تفعيل الحركة
      setTimeout(() => {
        toast.classList.add('show');
      }, 10);
      
      // زر الإغلاق
      const closeBtn = toast.querySelector('.toast-close');
      closeBtn.addEventListener('click', () => {
        this.remove(toast);
      });
      
      // إزالة تلقائية بعد المدة المحددة
      setTimeout(() => {
        this.remove(toast);
      }, duration);
    }
  
    // إزالة الإشعار
    remove(toast) {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.remove();
      }, 300);
    }
  
    // اختصارات سريعة
    success(message, duration = 3000) {
      this.show(message, 'success', duration);
    }
  
    error(message, duration = 3000) {
      this.show(message, 'error', duration);
    }
  
    warning(message, duration = 3000) {
      this.show(message, 'warning', duration);
    }
  
    info(message, duration = 3000) {
      this.show(message, 'info', duration);
    }
  
    // رسالة مشروع قريباً
    comingSoon(projectName = 'هذا المشروع') {
      this.show(` ${projectName} قريباً جداً!`, 'info', 3500);
    }
  }
  
  // ========== INITIALIZE TOAST ==========
  let toast;
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      toast = new Toast();
      window.toast = toast; 
    });
  } else {
    toast = new Toast();
    window.toast = toast;
  }
  
  // ========== AUTO-ATTACH TO "Coming Soon" BUTTONS ==========
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.project-btn').forEach(btn => {
      const text = btn.textContent.trim();
      if (text.includes('انتظرونا') || text.includes('قريباً')) {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          window.toast.comingSoon('هذا المشروع');
        });
      }
    });
  });
  

/* =======================Start Clints  ==================== */
const clientsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.client-item');
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.style.animation = 'fadeInUp 0.5s ease-out forwards';
                    item.style.opacity = '1';
                }, index * 50);
            });
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

const clientsSection = document.querySelector('.clients-section');
if (clientsSection) {
    // Set initial opacity
    const items = clientsSection.querySelectorAll('.client-item');
    items.forEach(item => {
        item.style.opacity = '0';
    });
    
    clientsObserver.observe(clientsSection);
}

// Add fadeInUp animation if not already defined
if (!document.querySelector('style[data-clients-animation]')) {
    const style = document.createElement('style');
    style.setAttribute('data-clients-animation', 'true');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

/* =======================Start CONTACT US  ==================== */
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            service: document.getElementById('service').value,
            message: document.getElementById('message').value
        };
        
        // Here you can send the data to your backend
        console.log('Form Data:', formData);
        
        // Show success message (you can customize this)
        alert('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
        
        // Reset form
        contactForm.reset();
    });
}

// ========== FORM VALIDATION ==========
const inputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');

inputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value.trim() === '' && this.hasAttribute('required')) {
            this.style.borderColor = '#ff4444';
        } else {
            this.style.borderColor = '#e0e0e0';
        }
    });
    
    input.addEventListener('focus', function() {
        this.style.borderColor = '#f7931e';
    });
});
/* =================================================== */
/* ================ FOOTER SECTION =================== */

// ========== BACK TO TOP BUTTON ==========
const backToTopBtn = document.getElementById('backToTop');

// Show/Hide button on scroll
window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

// Scroll to top on click
backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========== SMOOTH SCROLL FOR FOOTER LINKS ==========
const footerLinks = document.querySelectorAll('.footer-links a, .footer-social-link');

footerLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Check if it's an internal link (starts with #)
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

/* =================================================== */
/* ================ AI CHAT  SECTION =================== */
// ========== CHATBOT FUNCTIONALITY ==========

const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotWindow = document.getElementById('chatbotWindow');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotForm = document.getElementById('chatbotForm');
const chatbotMessageInput = document.getElementById('chatbotMessageInput');
const chatbotMessages = document.getElementById('chatbotMessages');
const quickReplies = document.querySelectorAll('.quick-reply-btn');

// Toggle Chatbot
chatbotToggle.addEventListener('click', function() {
    chatbotWindow.classList.add('active');
    chatbotToggle.style.display = 'none';
    
    // Remove badge
    const badge = document.querySelector('.chatbot-badge');
    if (badge) {
        badge.style.display = 'none';
    }
});

// Close Chatbot
chatbotClose.addEventListener('click', function() {
    chatbotWindow.classList.remove('active');
    chatbotToggle.style.display = 'flex';
});

// Send Message
chatbotForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const message = chatbotMessageInput.value.trim();
    
    if (message) {
        // Add user message
        addMessage(message, 'user');
        
        // Clear input
        chatbotMessageInput.value = '';
        
        // Show typing indicator
        showTypingIndicator();
        
        // Simulate bot response
        setTimeout(function() {
            removeTypingIndicator();
            const botResponse = getBotResponse(message);
            addMessage(botResponse, 'bot');
        }, 1500);
    }
});

// Quick Replies
quickReplies.forEach(btn => {
    btn.addEventListener('click', function() {
        const message = this.getAttribute('data-message');
        
        // Add user message
        addMessage(message, 'user');
        
        // Hide quick replies
        document.getElementById('quickReplies').style.display = 'none';
        
        // Show typing indicator
        showTypingIndicator();
        
        // Simulate bot response
        setTimeout(function() {
            removeTypingIndicator();
            const botResponse = getBotResponse(message);
            addMessage(botResponse, 'bot');
        }, 1500);
    });
});

// Add Message Function
function addMessage(text, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    
    const currentTime = new Date().toLocaleTimeString('ar-SA', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    if (type === 'bot') {
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="bi bi-robot"></i>
            </div>
            <div class="message-content">
                <p>${text}</p>
                <span class="message-time">${currentTime}</span>
            </div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="bi bi-person-fill"></i>
            </div>
            <div class="message-content">
                <p>${text}</p>
                <span class="message-time">${currentTime}</span>
            </div>
        `;
    }
    
    chatbotMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Show Typing Indicator
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message typing-message';
    typingDiv.innerHTML = `
        <div class="message-avatar">
            <i class="bi bi-robot"></i>
        </div>
        <div class="message-content">
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        </div>
    `;
    
    chatbotMessages.appendChild(typingDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Remove Typing Indicator
function removeTypingIndicator() {
    const typingMessage = document.querySelector('.typing-message');
    if (typingMessage) {
        typingMessage.remove();
    }
}

// Get Bot Response (Simple Logic)
function getBotResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Responses based on keywords
    if (message.includes('خدمات') || message.includes('خدمة')) {
        return 'نقدم مجموعة متنوعة من الخدمات: تصميم المواقع الإلكترونية، تصميم الهوية البصرية، نظم التطبيقات الذكية، التسويق الإلكتروني، خدمات الصيانة، وتحسين محركات البحث (SEO). يمكنك زيارة قسم الخدمات لمعرفة المزيد!';
    }
    else if (message.includes('تواصل') || message.includes('اتصال') || message.includes('هاتف')) {
        return 'يمكنك التواصل معنا عبر:<br>📞 الهاتف: +966 50 123 4567<br>✉️ البريد الإلكتروني: info@afaqalsubol.com<br>أو يمكنك ملء نموذج التواصل في الموقع!';
    }
    else if (message.includes('سعر') || message.includes('تكلفة') || message.includes('عرض')) {
        return 'للحصول على عرض سعر مخصص لمشروعك، يرجى التواصل معنا عبر نموذج التواصل أو الاتصال بنا مباشرة. سنكون سعداء بمناقشة احتياجاتك وتقديم أفضل الحلول!';
    }
    else if (message.includes('مشاريع') || message.includes('أعمال') || message.includes('سابقة')) {
        return 'لدينا العديد من المشاريع الناجحة في مجالات مختلفة. يمكنك الاطلاع على قسم "مشاريعنا" في الموقع لمشاهدة بعض أعمالنا السابقة!';
    }
    else if (message.includes('شكرا') || message.includes('شكراً')) {
        return 'العفو! سعداء بخدمتك. إذا كان لديك أي استفسار آخر، لا تتردد في السؤال! 😊';
    }
    else if (message.includes('مرحبا') || message.includes('السلام') || message.includes('أهلا')) {
        return 'أهلاً وسهلاً بك! كيف يمكنني مساعدتك اليوم؟ 😊';
    }
    else {
        return 'شكراً لتواصلك معنا! للحصول على إجابة دقيقة على استفسارك، يرجى التواصل مع فريقنا عبر نموذج التواصل أو الاتصال بنا مباشرة. نحن هنا لمساعدتك!';
    }
}
