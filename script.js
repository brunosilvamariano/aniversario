// Elementos DOM
const loadingScreen = document.getElementById('loading-screen');
const musicPlayer = document.getElementById('music-player');
const musicToggle = document.getElementById('music-toggle');
const musicText = musicToggle.querySelector('.music-text');
const musicIcon = musicToggle.querySelector('.music-icon');
const musicVisualizer = document.querySelector('.music-visualizer');
const backgroundMusic = document.getElementById('background-music');
const heartsContainer = document.getElementById('hearts-container');
const confettiContainer = document.getElementById('confetti-container');
const fireworksContainer = document.getElementById('fireworks-container');

// Variáveis de controle
let musicPlaying = false;
let clickCount = 0;
let heartsInterval;
let confettiInterval;

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    // Simular carregamento
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        startHeartAnimation();
        setupScrollEffects();
        setupModalEvents();
        setupNavigationSmooth();
        setupEasterEggs();
    }, 3000);
});

// Controle de Música
musicToggle.addEventListener('click', function() {
    if (musicPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
});

function playMusic() {
    backgroundMusic.play().then(() => {
        musicPlaying = true;
        musicText.textContent = 'Pausar';
        musicIcon.textContent = '⏸️';
        musicVisualizer.classList.add('active');
    }).catch(error => {
        console.log('Erro ao reproduzir música:', error);
        // Fallback para navegadores que bloqueiam autoplay
        musicText.textContent = 'Play';
        musicIcon.textContent = '🎵';
    });
}

function pauseMusic() {
    backgroundMusic.pause();
    musicPlaying = false;
    musicText.textContent = 'Play';
    musicIcon.textContent = '🎵';
    musicVisualizer.classList.remove('active');
}

// Animação de Corações
function startHeartAnimation() {
    heartsInterval = setInterval(createFloatingHeart, 2000);
}

function createFloatingHeart() {
    const hearts = ['💞'];
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
    heart.style.fontSize = (Math.random() * 1 + 1) + 'rem';
    
    heartsContainer.appendChild(heart);
    
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, 7000);
}

// Animação de Confete
function createConfetti(count = 50) {
    const colors = ['#ff6b6b', '#ff8e53', '#d4af37', '#87a96b', '#54a0ff', '#c44569'];
    
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            
            confettiContainer.appendChild(confetti);
            
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 4000);
        }, i * 50);
    }
}

// Fogos de Artifício
function createFireworks(count = 5) {
    const colors = ['#ff6b6b', '#ff8e53', '#d4af37', '#87a96b', '#54a0ff', '#c44569'];
    
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const centerX = Math.random() * window.innerWidth;
            const centerY = Math.random() * (window.innerHeight * 0.6) + window.innerHeight * 0.2;
            
            for (let j = 0; j < 12; j++) {
                const firework = document.createElement('div');
                firework.className = 'firework';
                firework.style.left = centerX + 'px';
                firework.style.top = centerY + 'px';
                firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                
                const angle = (j * 30) * Math.PI / 180;
                const distance = Math.random() * 100 + 50;
                const endX = centerX + Math.cos(angle) * distance;
                const endY = centerY + Math.sin(angle) * distance;
                
                firework.style.setProperty('--end-x', endX + 'px');
                firework.style.setProperty('--end-y', endY + 'px');
                
                firework.style.animation = `fireworkExplode 1s ease-out forwards`;
                
                fireworksContainer.appendChild(firework);
                
                setTimeout(() => {
                    if (firework.parentNode) {
                        firework.parentNode.removeChild(firework);
                    }
                }, 1000);
            }
        }, i * 200);
    }
}

// Função de Celebração
function startCelebration() {
    // Scroll suave para próxima seção
    document.getElementById('message').scrollIntoView({
        behavior: 'smooth'
    });
    
    // Efeitos especiais
    setTimeout(() => {
        createConfetti(30);
        createSpecialHearts(20);
        
        // Tentar tocar música automaticamente
        if (!musicPlaying) {
            playMusic();
        }
    }, 500);
}


// Função para criar corações especiais
function createSpecialHearts(count = 10) {
    const specialHearts = [''];
    
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = specialHearts[Math.floor(Math.random() * specialHearts.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDuration = (Math.random() * 2 + 3) + 's';
            heart.style.fontSize = (Math.random() * 1.5 + 1.2) + 'rem';
            heart.style.color = '#ff6b6b';
            
            heartsContainer.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 5000);
        }, i * 100);
    }
}

// Surpresa Final
function finalSurprise() {
    // Múltiplos efeitos simultâneos
    createConfetti(100);
    createFireworks(8);
    createSpecialHearts(50);
    
    // Mostrar modal de surpresa
    setTimeout(() => {
        const surpriseModal = document.getElementById('final-surprise-modal');
        if (surpriseModal) {
            surpriseModal.classList.add('active');
            
            // Fechar modal automaticamente após 4 segundos
            setTimeout(() => {
                surpriseModal.classList.remove('active');
            }, 4000);
        }
    }, 1000);
    
    // Efeito de tela cheia de corações
    setTimeout(() => {
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                createFloatingHeart();
            }, i * 100);
        }
    }, 2000);
}

// Configurar Modais
function setupModalEvents() {
    // Modais de memórias
    const memoryCards = document.querySelectorAll('.memory-card');
    const modals = document.querySelectorAll('.memory-modal');
    const closeButtons = document.querySelectorAll('.modal-close');
    
    memoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('active');
                createSpecialHearts(5);
            }
        });
    });
    
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.memory-modal');
            if (modal) {
                modal.classList.remove('active');
            }
        });
    });
    
    // Fechar modal clicando fora
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    });
}

// Navegação Suave
function setupNavigationSmooth() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Efeitos de Scroll
function setupScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Efeitos especiais para seções específicas
                if (entry.target.classList.contains('memories-section')) {
                    setTimeout(() => createConfetti(10), 500);
                }
                
                if (entry.target.classList.contains('wishes-section')) {
                    setTimeout(() => createSpecialHearts(8), 500);
                }
            }
        });
    }, observerOptions);
    
    // Observar seções
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
}

// Easter Eggs
function setupEasterEggs() {
    let clickCount = 0;
    
    document.addEventListener('click', function() {
        clickCount++;
        
        // A cada 10 cliques - coração especial
        if (clickCount % 10 === 0) {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = '🎁';
            heart.style.left = '50%';
            heart.style.fontSize = '2rem';
            heart.style.color = '#d4af37';
            heart.style.animationDuration = '4s';
            
            heartsContainer.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 4000);
        }
        
        // A cada 25 cliques - festa especial
        if (clickCount % 25 === 0) {
            createSpecialHearts(5);
            createConfetti(15);
        }
    });
    
    // Easter egg para mobile - swipe up
    let touchStartY = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', function(e) {
        const touchEndY = e.changedTouches[0].clientY;
        const swipeDistance = touchStartY - touchEndY;
        
        // Swipe up detectado
        if (swipeDistance > 100) {
            createSpecialHearts(3);
        }
    });
    
    // Efeito de cursor especial (desktop)
    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', function(e) {
            if (Math.random() < 0.02) { // 2% de chance
                const sparkle = document.createElement('div');
                sparkle.textContent = '✨';
                sparkle.style.position = 'fixed';
                sparkle.style.left = e.clientX + 'px';
                sparkle.style.top = e.clientY + 'px';
                sparkle.style.pointerEvents = 'none';
                sparkle.style.fontSize = '0.8rem';
                sparkle.style.zIndex = '1000';
                sparkle.style.animation = 'fadeInUp 1s ease-out forwards';
                
                document.body.appendChild(sparkle);
                
                setTimeout(() => {
                    if (sparkle.parentNode) {
                        sparkle.parentNode.removeChild(sparkle);
                    }
                }, 1000);
            }
        });
    }
}

// Controle de Volume da Música
function setupVolumeControl() {
    backgroundMusic.volume = 0.7; // Volume padrão 70%
}

// Detecção de Visibilidade da Página
document.addEventListener('visibilitychange', function() {
    if (document.hidden && musicPlaying) {
        // Pausar música quando a aba não está visível
        backgroundMusic.pause();
    } else if (!document.hidden && musicPlaying) {
        // Retomar música quando a aba volta a ficar visível
        backgroundMusic.play();
    }
});

// Prevenção de Erro de Áudio
backgroundMusic.addEventListener('error', function() {
    console.log('Erro ao carregar música');
    musicText.textContent = 'Música indisponível';
    musicToggle.disabled = true;
});

// Configurações de Performance
function optimizePerformance() {
    // Limitar número de elementos animados
    const maxHearts = 20;
    const maxConfetti = 50;
    
    setInterval(() => {
        const hearts = heartsContainer.children;
        if (hearts.length > maxHearts) {
            for (let i = 0; i < hearts.length - maxHearts; i++) {
                hearts[i].remove();
            }
        }
        
        const confetti = confettiContainer.children;
        if (confetti.length > maxConfetti) {
            for (let i = 0; i < confetti.length - maxConfetti; i++) {
                confetti[i].remove();
            }
        }
    }, 5000);
}

// Inicializar otimizações
optimizePerformance();
setupVolumeControl();

// Adicionar CSS dinâmico para animações de fogos
const style = document.createElement('style');
style.textContent = `
    @keyframes fireworkExplode {
        0% {
            transform: translate(0, 0) scale(0);
            opacity: 1;
        }
        100% {
            transform: translate(var(--end-x, 0), var(--end-y, 0)) scale(1);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Função para redimensionamento responsivo
window.addEventListener('resize', function() {
    // Ajustar elementos baseado no tamanho da tela
    if (window.innerWidth <= 768) {
        // Reduzir frequência de animações em mobile
        clearInterval(heartsInterval);
        heartsInterval = setInterval(createFloatingHeart, 4000);
    } else {
        // Frequência normal em desktop
        clearInterval(heartsInterval);
        heartsInterval = setInterval(createFloatingHeart, 2000);
    }
});

// Log de inicialização
console.log('🎉 Página de aniversário da Thaynara carregada com sucesso! 🎂');
console.log('💖 Recursos especiais ativados: música, corações, confete e fogos! ✨');

