/* ================= START PRELOADER SECTION ======================= */
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    const loadingBarFill = document.getElementById('loadingBarFill');
    const loadingPercentage = document.getElementById('loadingPercentage');
    
    let percentage = 0;
    
    const loadingInterval = setInterval(function() {
        percentage += Math.random() * 35; 
        if (percentage >= 100) {
            percentage = 100;
            clearInterval(loadingInterval);

            if (loadingBarFill) loadingBarFill.style.width = "100%";
            if (loadingPercentage) loadingPercentage.textContent = "100%";

            setTimeout(function() {
                preloader.classList.add('hidden');
                setTimeout(function() {
                    preloader.remove();
                }, 400); 
            }, 300); 
        }

        if (loadingBarFill) loadingBarFill.style.width = percentage + "%";
        if (loadingPercentage) loadingPercentage.textContent = Math.floor(percentage) + "%";
    }, 110); 
});

/* ================= START-AOS ======================= */
AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 100,
    delay: 0,
    anchorPlacement: 'top-bottom'
});

/* ================= START - HEADER SECTION ======================= */
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');
const menuOverlay = document.getElementById('menuOverlay');

if (menuToggle) {
    menuToggle.addEventListener('click', function() {
        this.classList.add('active');
        mobileMenu.classList.add('active');
        menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

function closeMobileMenu() {
    menuToggle.classList.remove('active');
    mobileMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

if (mobileClose) mobileClose.addEventListener('click', closeMobileMenu);
if (menuOverlay) menuOverlay.addEventListener('click', closeMobileMenu);
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

const mainHeader = document.getElementById('mainHeader');
const topBar = document.querySelector('.top-bar');
const body = document.body;

window.addEventListener('scroll', function() {
    const scrollY = window.scrollY || window.pageYOffset;
    if (scrollY > 100) {
        if (topBar) topBar.classList.add('hidden');
        mainHeader.classList.add('scrolled');
        body.classList.add('header-fixed');
    } else {
        if (topBar) topBar.classList.remove('hidden');
        mainHeader.classList.remove('scrolled');
        body.classList.remove('header-fixed');
    }
});

window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY + 120;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = mainHeader.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
    });
});

document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        console.log('Language button - Ready for future use');
    });
});

/* ================= START-HERO SECTION ======================= */
window.addEventListener('scroll', function() {
    const scrolled = window.scrollY;
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg && scrolled < window.innerHeight) {
        heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

const scrollDown = document.querySelector('.scroll-down');
if (scrollDown) {
    scrollDown.addEventListener('click', function() {
        const nextSection = document.querySelector('#about');
        if (nextSection) {
            const headerHeight = mainHeader.offsetHeight;
            const targetPosition = nextSection.offsetTop - headerHeight;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
    });
}

/* ================= START QUOTE SECTION ======================= */
const observerOptions = { threshold: 0.3, rootMargin: '0px 0px -100px 0px' };
const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('animate');
    });
}, observerOptions);

const quoteSection = document.querySelector('.quote-section');
if (quoteSection) observer.observe(quoteSection);

/* ================= ABOUT US ======================= */
const aboutObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.section-title, .title-line, .about-subtitle, .about-description, .about-btn');
            elements.forEach((el, index) => {
                setTimeout(() => { el.style.animation = `fadeInUp 0.8s ease-out forwards`; }, index * 100);
            });
        }
    });
}, { threshold: 0.2, rootMargin: '0px 0px -100px 0px' });

const aboutSection = document.querySelector('.about-section');
if (aboutSection) aboutObserver.observe(aboutSection);

const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);

/* ================= SERVICES ======================= */
const servicesObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.service-card');
            cards.forEach((card, index) => {
                setTimeout(() => { card.style.animation = 'fadeInUp 0.6s ease-out forwards'; card.style.opacity = '1'; }, index * 100);
            });
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

const servicesSection = document.querySelector('.services-section');
if (servicesSection) {
    const cards = servicesSection.querySelectorAll('.service-card');
    cards.forEach(card => card.style.opacity = '0');
    servicesObserver.observe(servicesSection);
}

/* ================= PROJECTS CAROUSEL ======================= */
let currentSlide = 0;
const slides = document.querySelectorAll('.project-slide');
const indicators = document.querySelectorAll('.indicator');
const totalSlides = slides.length;

//HTML slides count = projectLinks length = indicators count & Order of links = Order of slides
const projectLinks = [
    'landingPages/الموارد البشرية/index.html', // Slide 1
    'landingPages/رمح/index.html',           // Slide 2
    '../../landingPages/مستقيم/index.html',       // Slide 3
    '../../landingPages/بيترو بانك/index.html',    // Slide 4
    '../../landingPages/ميديكال/index.html',      // Slide 5
    '../../landingPages/الواحة/index.html',       // Slide 6
    '../../landingPages/طيف/index.html',         // Slide 7
    'landingPages/عناية/index.html'        // Slide 8
];

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    slides[index].classList.add('active');
    indicators[index].classList.add('active');

    // تحديث زر المشروع لكل سلايد
   const projectBtn = slides[index].querySelector('.project-btn');
    if (projectBtn) projectBtn.href = projectLinks[index];
}


function moveSlide(direction) {
    currentSlide += direction;
    if (currentSlide >= totalSlides) currentSlide = 0;
    else if (currentSlide < 0) currentSlide = totalSlides - 1;
    showSlide(currentSlide);
}

function goToSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
}

let autoPlayInterval;
function startAutoPlay() {
    autoPlayInterval = setInterval(() => moveSlide(1), 5000);
}
function stopAutoPlay() { clearInterval(autoPlayInterval); }

startAutoPlay();

const carouselContainer = document.querySelector('.projects-carousel');
if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', stopAutoPlay);
    carouselContainer.addEventListener('mouseleave', startAutoPlay);
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') moveSlide(1);
    else if (e.key === 'ArrowRight') moveSlide(-1);
});

/* ================= CLIENTS ======================= */
const clientsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.client-item');
            items.forEach((item, index) => {
                setTimeout(() => { item.style.animation = 'fadeInUp 0.5s ease-out forwards'; item.style.opacity = '1'; }, index * 50);
            });
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

const clientsSection = document.querySelector('.clients-section');
if (clientsSection) {
    const items = clientsSection.querySelectorAll('.client-item');
    items.forEach(item => item.style.opacity = '0');
    clientsObserver.observe(clientsSection);
}

/* ================= CONTACT US ======================= */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            service: document.getElementById('service').value,
            message: document.getElementById('message').value
        };
        console.log('Form Data:', formData);
        alert('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
        contactForm.reset();
    });
}

const inputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');
inputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value.trim() === '' && this.hasAttribute('required')) this.style.borderColor = '#ff4444';
        else this.style.borderColor = '#e0e0e0';
    });
    input.addEventListener('focus', function() { this.style.borderColor = '#f7931e'; });
});

/* ================= FOOTER ======================= */
const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) backToTopBtn.classList.add('show');
    else backToTopBtn.classList.remove('show');
});
backToTopBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

const footerLinks = document.querySelectorAll('.footer-links a, .footer-social-link');
footerLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetElement = document.getElementById(href.substring(1));
            if (targetElement) targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

/* ================= AI CHAT ======================= */
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotWindow = document.getElementById('chatbotWindow');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotForm = document.getElementById('chatbotForm');
const chatbotMessageInput = document.getElementById('chatbotMessageInput');
const chatbotMessages = document.getElementById('chatbotMessages');
const quickReplies = document.querySelectorAll('.quick-reply-btn');

chatbotToggle.addEventListener('click', function() {
    chatbotWindow.classList.add('active');
    chatbotToggle.style.display = 'none';
    const badge = document.querySelector('.chatbot-badge');
    if (badge) badge.style.display = 'none';
});

chatbotClose.addEventListener('click', function() {
    chatbotWindow.classList.remove('active');
    chatbotToggle.style.display = 'flex';
});

chatbotForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const message = chatbotMessageInput.value.trim();
    if (message) {
        addMessage(message, 'user');
        chatbotMessageInput.value = '';
        showTypingIndicator();
        setTimeout(() => { removeTypingIndicator(); addMessage(getBotResponse(message), 'bot'); }, 1500);
    }
});

quickReplies.forEach(btn => {
    btn.addEventListener('click', function() {
        const message = this.getAttribute('data-message');
        addMessage(message, 'user');
        document.getElementById('quickReplies').style.display = 'none';
        showTypingIndicator();
        setTimeout(() => { removeTypingIndicator(); addMessage(getBotResponse(message), 'bot'); }, 1500);
    });
});

function addMessage(text, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    const currentTime = new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });
    if (type === 'bot') {
        messageDiv.innerHTML = `<div class="message-avatar"><i class="bi bi-robot"></i></div>
        <div class="message-content"><p>${text}</p><span class="message-time">${currentTime}</span></div>`;
    } else {
        messageDiv.innerHTML = `<div class="message-avatar"><i class="bi bi-person-fill"></i></div>
        <div class="message-content"><p>${text}</p><span class="message-time">${currentTime}</span></div>`;
    }
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message typing-message';
    typingDiv.innerHTML = `<div class="message-avatar"><i class="bi bi-robot"></i></div>
    <div class="message-content"><div class="typing-indicator"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div></div>`;
    chatbotMessages.appendChild(typingDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function removeTypingIndicator() {
    const typingMessage = document.querySelector('.typing-message');
    if (typingMessage) typingMessage.remove();
}

function getBotResponse(userMessage) {
    const message = userMessage.toLowerCase();
    if (message.includes('خدمات') || message.includes('خدمة')) return 'نقدم مجموعة متنوعة من الخدمات: تصميم المواقع الإلكترونية، تصميم الهوية البصرية، نظم التطبيقات الذكية، التسويق الإلكتروني، خدمات الصيانة، وتحسين محركات البحث (SEO). يمكنك زيارة قسم الخدمات لمعرفة المزيد!';
    else if (message.includes('تواصل') || message.includes('اتصال') || message.includes('هاتف')) return 'يمكنك التواصل معنا عبر:<br>📞 الهاتف: +966 50 123 4567<br>✉️ البريد الإلكتروني: info@afaqalsubol.com<br>أو يمكنك ملء نموذج التواصل في الموقع!';
    else if (message.includes('سعر') || message.includes('تكلفة') || message.includes('عرض')) return 'للحصول على عرض سعر مخصص لمشروعك، يرجى التواصل معنا عبر نموذج التواصل أو الاتصال بنا مباشرة. سنكون سعداء بمناقشة احتياجاتك وتقديم أفضل الحلول!';
    else if (message.includes('مشاريع') || message.includes('أعمال') || message.includes('سابقة')) return 'لدينا العديد من المشاريع الناجحة في مجالات مختلفة. يمكنك الاطلاع على قسم "مشاريعنا" في الموقع لمشاهدة بعض أعمالنا السابقة!';
    else if (message.includes('شكرا') || message.includes('شكراً')) return 'العفو! سعداء بخدمتك. إذا كان لديك أي استفسار آخر، لا تتردد في السؤال! 😊';
    else if (message.includes('مرحبا') || message.includes('السلام') || message.includes('أهلا')) return 'أهلاً وسهلاً بك! كيف يمكنني مساعدتك اليوم؟ 😊';
    else return 'شكراً لتواصلك معنا! للحصول على إجابة دقيقة على استفسارك، يرجى التواصل مع فريقنا عبر نموذج التواصل أو الاتصال بنا مباشرة. نحن هنا لمساعدتك!';
}

