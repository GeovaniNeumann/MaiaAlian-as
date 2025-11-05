// Menu Mobile
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
        });
    });
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (header) {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

// Animação de scroll para as seções
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observar todas as seções
document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
});

// Observar itens individuais
document.querySelectorAll('.about-item, .contact-item').forEach(item => {
    sectionObserver.observe(item);
});

// Galeria de Alianças - SEM AUTO-PLAY (Google Friendly)
const slides = document.querySelectorAll('.gallery-slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

if (slides.length > 0) {
    let currentSlide = 0;
    
    function showSlide(index) {
        // Remove classes ativas
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Adiciona classes ativas
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
        
        // Atualiza ARIA labels para acessibilidade
        updateAriaLabels();
    }
    
    function updateAriaLabels() {
        slides.forEach((slide, index) => {
            slide.setAttribute('aria-hidden', index !== currentSlide);
            slide.setAttribute('aria-label', `Slide ${index + 1} de ${slides.length}`);
        });
        
        dots.forEach((dot, index) => {
            dot.setAttribute('aria-label', 
                index === currentSlide ? 
                `Slide ${index + 1} atual` : 
                `Ir para slide ${index + 1}`
            );
        });
    }
    
    // Navegação por botões
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            let nextIndex = (currentSlide + 1) % slides.length;
            showSlide(nextIndex);
        });
        
        nextBtn.setAttribute('aria-label', 'Próximo slide');
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(prevIndex);
        });
        
        prevBtn.setAttribute('aria-label', 'Slide anterior');
    }
    
    // Navegação por dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
        
        // Navegação por teclado para dots
        dot.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                showSlide(index);
            }
        });
    });
    
    // Navegação por teclado (setas)
    document.addEventListener('keydown', (e) => {
        const gallery = document.querySelector('.gallery');
        if (gallery && document.activeElement.closest('.gallery')) {
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                let nextIndex = (currentSlide + 1) % slides.length;
                showSlide(nextIndex);
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
                showSlide(prevIndex);
            }
        }
    });
    
    // Swipe para mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    const galleryContainer = document.querySelector('.gallery-container');
    if (galleryContainer) {
        galleryContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        galleryContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe para esquerda - próximo slide
            let nextIndex = (currentSlide + 1) % slides.length;
            showSlide(nextIndex);
        }
        
        if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe para direita - slide anterior
            let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(prevIndex);
        }
    }
    
    // Inicializar
    showSlide(0);
}

