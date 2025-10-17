// ===================================
// CAFÉ NORDIC - JAVASCRIPT
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // Mobile Menu Toggle
    // ===================================
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animoi hamburger-ikoni
            const spans = this.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Sulje menu kun linkkiä klikataan
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
    
    // ===================================
    // Smooth Scroll
    // ===================================
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Älä tee mitään jos href on vain "#"
            if (href === '#') {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===================================
    // Sticky Header - lisää varjo scrollatessa
    // ===================================
    const header = document.querySelector('.main-header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
            } else {
                header.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
            }
        });
    }
    
    // ===================================
    // Form Validation (Varauslomake)
    // ===================================
    const bookingForm = document.querySelector('.booking-form');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Tarkista että kaikki pakolliset kentät on täytetty
            const requiredFields = bookingForm.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#d32f2f';
                } else {
                    field.style.borderColor = '#E0E0E0';
                }
            });
            
            if (isValid) {
                // Tässä voisi lähettää datan palvelimelle
                // Nyt vain näytetään onnistumisviesti
                alert('Kiitos varauksestasi! Vahvistamme varauksesi sähköpostitse 24 tunnin kuluessa.');
                bookingForm.reset();
            } else {
                alert('Täytä kaikki pakolliset kentät (merkitty tähdellä *)');
            }
        });
        
        // Poista virheväri kun käyttäjä alkaa kirjoittaa
        const formInputs = bookingForm.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                this.style.borderColor = '#E0E0E0';
            });
        });
    }
    
    // ===================================
    // Galleria - Lightbox (yksinkertainen)
    // ===================================
    const galleryImages = document.querySelectorAll('.gallery-item img');
    
    if (galleryImages.length > 0) {
        galleryImages.forEach(img => {
            img.style.cursor = 'pointer';
            
            img.addEventListener('click', function() {
                // Luo lightbox
                const lightbox = document.createElement('div');
                lightbox.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.9);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 9999;
                    cursor: pointer;
                `;
                
                const lightboxImg = document.createElement('img');
                lightboxImg.src = this.src;
                lightboxImg.alt = this.alt;
                lightboxImg.style.cssText = `
                    max-width: 90%;
                    max-height: 90%;
                    box-shadow: 0 8px 32px rgba(0,0,0,0.5);
                    border-radius: 8px;
                `;
                
                lightbox.appendChild(lightboxImg);
                document.body.appendChild(lightbox);
                
                // Sulje lightbox klikkauksella
                lightbox.addEventListener('click', function() {
                    document.body.removeChild(lightbox);
                });
            });
        });
    }
    
    // ===================================
    // Animaatiot scrollatessa (Fade in)
    // ===================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Lisää animaatio elementeille
    const animateElements = document.querySelectorAll('.product-card, .menu-item, .value-card, .team-member, .gallery-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // ===================================
    // Video autoplay fix (mobile)
    // ===================================
    const heroVideo = document.querySelector('.hero-video video');
    
    if (heroVideo) {
        // Yritä toistaa videota kun sivu latautuu
        heroVideo.play().catch(error => {
            console.log('Video autoplay prevented:', error);
            // Jos autoplay estyy, näytä play-nappi
        });
    }
    
    // ===================================
    // Date picker - aseta minimipäivä tänään
    // ===================================
    const dateInput = document.querySelector('#date');
    
    if (dateInput) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const year = tomorrow.getFullYear();
        const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
        const day = String(tomorrow.getDate()).padStart(2, '0');
        
        dateInput.min = `${year}-${month}-${day}`;
    }
    
    // ===================================
    // Konsoliin tervehdys
    // ===================================
    console.log('%c☕ Tervetuloa Café Nordicin sivustolle! ', 'background: #2C5F2D; color: white; font-size: 16px; padding: 10px; border-radius: 5px;');
    console.log('Sivusto toteutettu osana web-kehityksen projektityötä.');
    
});

// ===================================
// Utility Functions
// ===================================

// Debounce function (optimoi scroll/resize eventtejä)
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Tarkista onko elementti näkyvissä
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
