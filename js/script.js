 const canvas = document.getElementById('space-canvas');
        const ctx = canvas.getContext('2d');
        let particlesArray = [];
        const numberOfParticles = 300;

        // Set canvas size
        function setCanvasSize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        setCanvasSize();
        window.addEventListener('resize', setCanvasSize);

        // Create particles
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
                this.color = getComputedStyle(document.documentElement).getPropertyValue('--star-color');
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                
                // Wrap around edges
                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Initialize particles
        function init() {
            particlesArray = [];
            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle());
            }
        }

        // Animate particles
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
            }
            
            // Connect particles with lines
            connectParticles();
            
            requestAnimationFrame(animate);
        }

        // Connect particles with lines
        function connectParticles() {
            const maxDistance = 100;
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    const dx = particlesArray[a].x - particlesArray[b].x;
                    const dy = particlesArray[a].y - particlesArray[b].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < maxDistance) {
                        const opacity = 1 - distance / maxDistance;
                        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.2})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        // Initialize and animate
        init();
        animate();

        // Theme switching functionality
        const themeSwitch = document.getElementById('themeSwitch');
        const themeHandle = document.getElementById('themeHandle');
        const body = document.body;
        
        // Check for saved theme preference or respect OS preference
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'light' || (!savedTheme && !prefersDark)) {
            body.classList.add('light-mode');
            themeHandle.style.left = '26px';
        } else {
            themeHandle.style.left = '2px';
        }
        
        themeSwitch.addEventListener('click', () => {
            body.classList.toggle('light-mode');
            if (body.classList.contains('light-mode')) {
                themeHandle.style.left = '26px';
                localStorage.setItem('theme', 'light');
            } else {
                themeHandle.style.left = '2px';
                localStorage.setItem('theme', 'dark');
            }
            
            // Update particle colors
            particlesArray.forEach(particle => {
                particle.color = getComputedStyle(document.documentElement).getPropertyValue('--star-color');
            });
        });

        // Typing animation
        const typingText = document.getElementById('typingText');
        const texts = [
            "Creating beautiful digital experiences...",
            "4-time hackathon winner...",
            "Frontend developer & cosmic explorer...",
            "Turning ideas into functional applications..."
        ];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingDelay = 100;
        let eraseDelay = 50;
        let newTextDelay = 2000;

        function type() {
            if (charIndex < texts[textIndex].length && !isDeleting) {
                typingText.textContent += texts[textIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, typingDelay);
            } else if (isDeleting && charIndex > 0) {
                typingText.textContent = texts[textIndex].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(type, eraseDelay);
            } else {
                isDeleting = !isDeleting;
                if (!isDeleting) {
                    textIndex = (textIndex + 1) % texts.length;
                }
                setTimeout(type, newTextDelay);
            }
        }

        // Scroll animations
        function checkScroll() {
            const elements = document.querySelectorAll('.fade-in');
            elements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.3;
                if (elementPosition < screenPosition) {
                    element.style.animationPlayState = 'running';
                }
            });
        }

        // Initialize
        document.addEventListener('DOMContentLoaded', () => {
            // Start typing effect
            setTimeout(type, 1000);
            
            // Initial scroll check
            checkScroll();
            
            // Add scroll listener
            window.addEventListener('scroll', checkScroll);
            
            // Add click events to doors
            const doors = document.querySelectorAll('.door');
            doors.forEach(door => {
                door.addEventListener('click', function() {
                    const doorType = this.querySelector('.door-title').textContent;
                });
            });
        });