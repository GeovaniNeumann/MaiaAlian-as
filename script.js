
        // Menu Mobile
        const menuToggle = document.getElementById('menuToggle');
        const nav = document.getElementById('nav');

        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
        });

        // Fechar menu ao clicar em um link
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
            });
        });

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
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Galeria de Alianças
        const slides = document.querySelectorAll('.gallery-slide');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        let currentSlide = 0;

        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            currentSlide = index;
        }

        function nextSlide() {
            let nextIndex = (currentSlide + 1) % slides.length;
            showSlide(nextIndex);
        }

        function prevSlide() {
            let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(prevIndex);
        }

        // Event Listeners para a galeria
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const index = parseInt(dot.getAttribute('data-index'));
                showSlide(index);
            });
        });

        // Auto-play da galeria
        setInterval(nextSlide, 5000);

        // Trocar imagens para mobile
        function updateGalleryForMobile() {
            if (window.innerWidth <= 768) {
                // URLs para imagens mobile (opcional - pode usar as mesmas)
                const mobileImages = [
                    'https://i.ibb.co/BKSVLB0w/mulher-segura-anel-casamento-preciosa-em-dela-bracos.jpg',
                    'https://i.ibb.co/1GYSJ1V9/aneis-de-casamento-em-solo-na-mesa-woden.jpg',
                    'https://i.ibb.co/TJz2f8C/dois-aneis-de-casamento-de-ouro-encontram-se-no-raio-de-luz.jpg',
                    'https://i.ibb.co/3mxNNYMt/anel-de-casamento-de-ouro-simboliza-amor-e-uniao-gerados-por-ia.jpg'
                ];
                
                slides.forEach((slide, index) => {
                    slide.style.backgroundImage = `url('${mobileImages[index]}')`;
                });
            }
        }

        // Verificar tamanho da tela ao carregar e redimensionar
        window.addEventListener('load', updateGalleryForMobile);
        window.addEventListener('resize', updateGalleryForMobile);
