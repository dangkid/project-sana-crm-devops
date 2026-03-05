/* ============================================
   SANA - JavaScript Principal
   Center Terapéutico Integral
   ============================================ */

// ============================================
// MENU MÓVIL
// ============================================

function toggleMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('hidden');
}

// Cerrar menú al hacer click en un link
document.querySelectorAll('#mobileMenu a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('mobileMenu').classList.add('hidden');
    });
});

// ============================================
// NAVBAR - Efecto de opacidad al scroll
// ============================================

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('nav');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// ============================================
// INTERSECTION OBSERVER - Animaciones al entrar en viewport
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.animation = 'fadeInUp 0.8s ease-out';
        }
    });
}, observerOptions);

// Observar todas las tarjetas de servicios
document.querySelectorAll('.group').forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// ============================================
// FORMULARIO DE CONTACTO
// ============================================

function handleFormSubmit(event) {
    event.preventDefault();

    // Obtener valores del formulario
    const form = event.target;
    const nombre = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const telefono = form.querySelector('input[type="tel"]').value;
    const servicio = form.querySelector('select').value;
    const mensaje = form.querySelector('textarea').value;

    // Validación básica
    if (!nombre || !email || !telefono || !servicio || !mensaje) {
        showNotification('Por favor completa todos los campos', 'error');
        return;
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Por favor ingresa un email válido', 'error');
        return;
    }

    // Simular envío (En producción, enviar a servidor)
    console.log('Formulario enviado:', {
        nombre,
        email,
        telefono,
        servicio,
        mensaje,
        fecha: new Date().toLocaleString('es-ES')
    });

    // Mensaje de éxito
    showNotification('¡Solicitud enviada exitosamente! Nos pondremos en contacto pronto.', 'success');

    // Limpiar formulario
    form.reset();

    // Scroll suave a la sección de contacto
    setTimeout(() => {
        window.scrollTo({ top: form.offsetTop - 100, behavior: 'smooth' });
    }, 500);
}

// ============================================
// SISTEMA DE NOTIFICACIONES
// ============================================

function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 px-6 py-4 rounded-lg shadow-lg z-50 animate-slideInRight`;
    
    // Estilos según tipo
    const styles = {
        success: {
            bg: 'bg-green-500',
            text: 'text-white',
            icon: '✓'
        },
        error: {
            bg: 'bg-red-500',
            text: 'text-white',
            icon: '✕'
        },
        info: {
            bg: 'bg-blue-500',
            text: 'text-white',
            icon: 'ℹ'
        }
    };

    const style = styles[type] || styles.info;
    notification.classList.add(style.bg, style.text);
    
    notification.innerHTML = `
        <div class="flex items-center gap-3">
            <span class="text-lg font-bold">${style.icon}</span>
            <span>${message}</span>
        </div>
    `;

    document.body.appendChild(notification);

    // Auto-remove despues de 4 segundos
    setTimeout(() => {
        notification.style.animation = 'slideInLeft 0.3s ease-out reverse';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// ============================================
// SMOOTH SCROLL PERSONALIZADO
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // No prevenir comportamiento si es un hashtag vacío
        if (href !== '#') {
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ============================================
// CONTADOR ANIMADO
// ============================================

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
            clearInterval(interval);
        } else {
            element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
        }
    }, 30);
}

// Observador para contadores
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            entry.target.dataset.animated = 'true';
            const text = entry.target.textContent;
            const number = parseInt(text.replace(/\D/g, ''));
            animateCounter(entry.target, number);
        }
    });
}, { threshold: 0.5 });

// Observar todos los elementos con números
document.querySelectorAll('#inicio p:has(+ p)').forEach(el => {
    if (el.querySelector('p:first-child')) {
        counterObserver.observe(el.querySelector('p:first-child'));
    }
});

// ============================================
// DETECCIÓN DE NAVEGADOR Y COMPATIBILIDAD
// ============================================

// Detectar si el navegador soporta características modernas
const supportsWebP = () => {
    const canvas = document.createElement('canvas');
    return canvas.toDataURL('image/webp').includes('image/webp');
};

console.log('WebP Soportado:', supportsWebP());

// ============================================
// ANALYTICS Y TRACKING
// ============================================

// Rastrear clics en CTAs
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function() {
        const buttonText = this.textContent;
        console.log('CTA Clickeada:', {
            texto: buttonText,
            timestamp: new Date().toISOString(),
            pagina: window.location.href
        });
    });
});

// Rastrear tiempo en página
let pageStartTime = Date.now();

window.addEventListener('beforeunload', () => {
    const timeSpent = (Date.now() - pageStartTime) / 1000; // en segundos
    console.log('Tiempo en página:', Math.floor(timeSpent) + 's');
});

// ============================================
// LAZY LOADING PARA IMÁGENES
// ============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// VALIDACIÓN DE FORMULARIO EN TIEMPO REAL
// ============================================

const form = document.getElementById('contactForm');
if (form) {
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateField(input);
        });
        
        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                validateField(input);
            }
        });
    });
}

function validateField(field) {
    let isValid = true;
    let errorMessage = '';

    if (!field.value.trim()) {
        isValid = false;
        errorMessage = 'Este campo es requerido';
    } else if (field.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
            isValid = false;
            errorMessage = 'Email inválido';
        }
    } else if (field.type === 'tel') {
        const telRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
        if (!telRegex.test(field.value.replace(/\s/g, ''))) {
            isValid = false;
            errorMessage = 'Teléfono inválido';
        }
    }

    if (!isValid) {
        field.classList.add('border-red-500');
        field.classList.remove('border-gray-200');
    } else {
        field.classList.remove('border-red-500');
        field.classList.add('border-gray-200');
    }

    return isValid;
}

// ============================================
// MODO OSCURO (Opcional)
// ============================================

// Detectar preferencia del sistema
const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Guardar preferencia en localStorage
function toggleDarkMode() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', isDark);
}

// Cargar preferencia guardada
const savedDarkMode = localStorage.getItem('darkMode');
if (savedDarkMode === 'true' || (!savedDarkMode && prefersDarkMode)) {
    document.documentElement.classList.add('dark');
}

// ============================================
// INICIALIZACIÓN
// ============================================

console.log('✓ SANA - Centro Terapéutico Integral');
console.log('✓ JavaScript cargado correctamente');
console.log('✓ Timestamp:', new Date().toLocaleString('es-ES'));

// Event listener global para debugging
window.addEventListener('error', (event) => {
    console.error('Error detectado:', event.error);
});

// Validar que el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
    console.log('✓ DOM completamente cargado');
});

// ============================================
// FUNCIONES AUXILIARES PÚBLICAS
// ============================================

// Función para abrir Chatwoot manualmente (si es necesario)
window.openChatwoot = function() {
    if (window.$chatwoot) {
        window.$chatwoot.toggleBubble();
    } else {
        console.warn('Chatwoot no está disponible');
    }
};

// Función para validar email
window.validateEmail = function(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

// Función para formatear teléfono
window.formatPhone = function(phone) {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return phone;
};
