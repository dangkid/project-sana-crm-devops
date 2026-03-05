# SANA - Centro Terapéutico Integral
## Landing Page Profesional

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![Version](https://img.shields.io/badge/version-1.0.0-blue)

---

## 📋 Descripción General

**SANA** es una landing page moderna y profesional desarrollada para un centro terapéutico integral. Ofrece una experiencia visual atractiva, responsive y optimizada para SEO que mejora la confianza de los pacientes y facilita el contacto.

### Características Principales

✨ **Diseño Moderno**
- Interfaz minimalista y profesional
- Colores clínicos (azul y verde agua)
- Animaciones suaves y atractivas
- Totalmente responsive (mobile-first)

🚀 **Rendimiento**
- Carga rápida con Tailwind CSS via CDN
- Optimizaciones de caché y compresión Gzip
- Lazy loading de imágenes
- Health checks y monitoreo

🔒 **Seguridad**
- Headers de seguridad HTTP
- Content Security Policy (CSP)
- Protección contra XSS y CSRF
- Certificados SSL/TLS preparados

📱 **Mobile Responsive**
- Diseño adaptativo para todos los tamaños
- Touch-friendly interfaces
- Menú móvil colapsable
- Optimizado para navegadores móviles

🔍 **SEO Friendly**
- Meta tags optimizados
- Estructura HTML semántica
- Sitemap.xml listo
- Open Graph tags

💬 **Integración Chatwoot**
- Widget de chat en tiempo real
- Espacio preparado y documentado
- Configuración simplificada

---

## 🛠️ Stack Tecnológico

### Frontend
- **HTML5** - Estructura semántica
- **CSS3** - Estilos avanzados y animaciones
- **Tailwind CSS** - Framework CSS utility-first (vía CDN)
- **JavaScript Vanilla** - Sin dependencias externas

### Backend/Infraestructura
- **Nginx** - Servidor web de alto rendimiento
- **Docker** - Containerización
- **Docker Compose** - Orquestación de servicios
- **Ubuntu 22.04** - Sistema operativo base

### Herramientas
- **Git** - Control de versiones
- **npm/package.json** - Gestión de dependencias (opcional)

---

## 📂 Estructura del Proyecto

```
project-sana-crm-devops/
├── public/                          # Archivos públicos servidos por Nginx
│   ├── index.html                   # Página principal
│   ├── css/
│   │   └── styles.css               # Estilos personalizados
│   ├── js/
│   │   └── main.js                  # JavaScript principal
│   └── images/                      # Directorio para imágenes
├── nginx/
│   ├── sana.conf                    # Configuración de Nginx
│   └── ssl/                         # Certificados SSL (futuro)
├── docker-compose.yml               # Orquestación Docker
├── Dockerfile                       # Imagen Docker
├── CHATWOOT_INTEGRATION.md         # Guía de integración Chatwoot
├── README.md                        # Este archivo
└── .env                             # Variables de entorno
```

---

## 🚀 Instalación y Despliegue

### Requisitos Previos

- Docker >= 20.10
- Docker Compose >= 1.29
- Git >= 2.30
- 2GB RAM mínimo
- Puerto 80 disponible

### Pasos de Instalación

#### 1. Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/project-sana-crm-devops.git
cd project-sana-crm-devops
```

#### 2. Configurar Variables de Entorno

```bash
# Crear archivo .env
cat > .env << EOF
# Nginx Configuration
SERVER_NAME=sana-clinica.com
PORT=80
SSL_ENABLED=false

# Chatwoot (opcional)
CHATWOOT_DOMAIN=
CHATWOOT_WEBSITE_TOKEN=
EOF
```

#### 3. Construir e Iniciar

```bash
# Construir imagen Docker
docker-compose build

# Iniciar servicios
docker-compose up -d

# Verificar estado
docker-compose ps

# Ver logs
docker-compose logs -f sana-web
```

#### 4. Verificar Instalación

```bash
# Prueba de conectividad
curl -I http://localhost/index.html

# Deberías ver:
# HTTP/1.1 200 OK
# Server: nginx/1.xx
```

---

## 🌐 Acceso a la Aplicación

Después del despliegue:

- **URL Local:** `http://localhost`
- **URL Producción:** `https://tu-dominio.com`

### Health Check

```bash
curl http://localhost/health
# Respuesta: healthy
```

---

## 📄 Páginas y Secciones

### 1. **Hero Section** (Inicio)
- Presentación principal de SANA
- Botones CTA para agendar
- Estadísticas de confiabilidad
- Animaciones atractivas

### 2. **Servicios**
Six service cards detalladas:
- Psicología Clínica
- Terapia Emocional
- Reflexoterapia
- Podología Clínica
- Talleres TEA & TDAH
- Consultoría Integral

### 3. **Por Qué Elegir SANA**
Beneficios principals:
- Profesionales certificados
- Enfoque integral
- Ambiente seguro
- Resultados medibles

### 4. **Equipo**
Showcase de profesionales
- Información de especialistas
- Enlaces a redes sociales
- Perfil profesional visual

### 5. **Contacto**
Formulario completo con:
- Validación en tiempo real
- Múltiples servicios
- Información de contacto
- Integración Chatwoot

### 6. **Footer**
- Links de navegación
- Redes sociales
- Política de privacidad
- Derechos de autor

---

## 💬 Integración Chatwoot

### Configuración Rápida

1. Abre `public/index.html`
2. Busca la sección comentada "CHATWOOT WIDGET PLACEMENT"
3. Reemplaza con tu código de Chatwoot
4. Guarda y despliega

**Consulta:** [CHATWOOT_INTEGRATION.md](./CHATWOOT_INTEGRATION.md) para instrucciones detalladas.

---

## ⚙️ Configuración de Nginx

### Características de Seguridad

- ✅ Headers de seguridad
- ✅ CSP (Content Security Policy)
- ✅ CORS configurado
- ✅ GZIP compression
- ✅ Caching inteligente

### Performance

- ✅ Compresión Brotli (opcional)
- ✅ Cache browser
- ✅ CDN ready
- ✅ Lazy loading

### Editar Configuración

```bash
# Editar configuración de Nginx
nano nginx/sana.conf

# Validar cambios
docker-compose exec sana-web nginx -t

# Recargar sin downtime
docker-compose exec sana-web nginx -s reload
```

---

## 🔐 Seguridad

### HTTPS/SSL (Futuro)

Para habilitar HTTPS:

1. Obtén certificados SSL:
   ```bash
   # Let's Encrypt (gratuito)
   sudo certbot certonly --standalone -d tu-dominio.com
   ```

2. Copia certificados:
   ```bash
   cp /etc/letsencrypt/live/tu-dominio.com/fullchain.pem nginx/ssl/cert.pem
   cp /etc/letsencrypt/live/tu-dominio.com/privkey.pem nginx/ssl/key.pem
   ```

3. Descomenta la sección SSL en `nginx/sana.conf`

4. Reinicia:
   ```bash
   docker-compose restart sana-web
   ```

### Headers de Seguridad

```
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Content-Security-Policy: (configurado)
```

---

## 📊 Monitoreo y Logs

### Ver Logs

```bash
# Logs en tiempo real
docker-compose logs -f sana-web

# Logs de Nginx acceso
docker logs sana-clinica-web | grep " 200 "

# Logs de error
docker logs sana-clinica-web | grep "error"
```

### Health Check

```bash
# Status de servicios
docker-compose ps

# Endpoint de salud
curl http://localhost/health

# Métricas Nginx (solo localhost)
curl http://localhost/status
```

### Estadísticas

```bash
# Tamaño de la imagen
docker images | grep sana

# Consumo de recurso
docker stats sana-clinica-web

# Espacio en disco
docker system df
```

---

## 🎨 Personalización

### Cambiar Colores

Edita `public/index.html`:

```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                'sana-blue': '#0ea5e9',      // Cambiar aquí
                'sana-green': '#10b981',     // Cambiar aquí
            }
        }
    }
}
```

O en `public/css/styles.css`:

```css
:root {
    --sana-blue: #0ea5e9;
    --sana-green: #10b981;
}
```

### Cambiar Logo

1. Coloca tu logo en `public/images/`
2. Edita en `public/index.html`:
   ```html
   <img src="images/tu-logo.svg" alt="SANA Logo">
   ```

### Actualizar Contenido

Edita directamente en `public/index.html`:
- Textos
- Descripciones
- Imágenes
- Links de contacto

---

## 📱 Testing

### Desktop

```bash
# Chrome
http://localhost

# Abrir DevTools (F12)
# Verificar responsive design
# Probar formularios
```

### Mobile

```bash
# Obtener IP local
ipconfig getifaddr en0  # macOS
hostname -I             # Linux

# Acceder desde móvil
http://tu-ip-local/
```

### Speed Test

```bash
# Google PageSpeed Insights
https://pagespeed.web.dev/

# GTmetrix
https://gtmetrix.com/

# WebPageTest
https://www.webpagetest.org/
```

---

## 🐛 Troubleshooting

### Problema: Puerto 80 en Uso

```bash
# Encontrar qué proceso usa el puerto
lsof -i :80

# Cambiar puerto en docker-compose.yml
ports:
  - "8080:80"  # Usar puerto 8080
```

### Problema: Permiso Denegado

```bash
# Ejecutar con permisos de administrador
sudo docker-compose up -d

# O agregar usuario a grupo docker
sudo usermod -aG docker $USER
newgrp docker
```

### Problema: Salud Fallida

```bash
# Verificar logs
docker logs sana-clinica-web

# Reintentar conexión
docker-compose restart sana-web

# Reconstruir imagen
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

---

## 📈 Optimizaciones

### Para Producción

1. **Compresión Brotli**
   - Descomentar en `nginx/sana.conf`

2. **CDN**
   - Servir archivos estáticos desde CDN
   - Cloudflare, CloudFront, etc.

3. **SSL/TLS**
   - Configurar certificados
   - Auto-renovación con Certbot

4. **Backups**
   - Automatizar copias de seguridad
   - Usar S3 o servicios cloud

5. **Monitoreo**
   - Datadog, New Relic
   - Prometheus + Grafana

---

## 🚀 Deployment

### En Servidor Ubuntu

```bash
# SSH a tu servidor
ssh usuario@tu-servidor

# Clonar repositorio
git clone https://github.com/tu-usuario/project-sana-crm-devops.git
cd project-sana-crm-devops

# Configurar DNS
# (Apunta tu dominio a la IP del servidor)

# Iniciar con docker-compose
docker-compose up -d

# Verificar
curl https://tu-dominio.com
```

### En Heroku

```bash
# Crear aplicación
heroku create sana-clinica

# Pushear código
git push heroku main

# Verificar
heroku open
```

### En AWS EC2

```bash
# Launcher EC2 instance
# Instalar Docker
# Clonar repo
# docker-compose up -d
```

---

## 🤝 Contribuir

1. Fork el proyecto
2. Crea rama feature (`git checkout -b feature/amazing`)
3. Commit cambios (`git commit -m 'Add amazing feature'`)
4. Push a la rama (`git push origin feature/amazing`)
5. Abre Pull Request

---

## 📝 Licencia

Este proyecto está bajo licencia MIT. Ver archivo [LICENSE](LICENSE) para detalles.

---

## 📧 Contacto y Soporte

- **Email:** contacto@sana-clinica.com
- **Website:** https://sana-clinica.com
- **Issues:** GitHub Issues
- **Documentación:** Ver archivos .md en el repo

---

## 🎯 Roadmap Futuro

- [ ] Blog/Artículos informativos
- [ ] Testimonios de pacientes
- [ ] Sistema de citas online
- [ ] Carrito de servicios
- [ ] Pago online integrado
- [ ] Sistema de avisos push
- [ ] App móvil nativa
- [ ] Multi-idioma
- [ ] Integración Google Calendar
- [ ] Analytics avanzado

---

## ✨ Credits

Desarrollado por equipo DevOps especializado en healthcare tech.

---

## 📞 ¿Necesitas Ayuda?

1. 📚 Consulta la documentación
2. 🔍 Busca en Issues anteriores
3. 💬 Crea una nueva Issue
4. 📧 Contacta al equipo

**¡Gracias por usar SANA! 💚**

---

*Última actualización: Marzo 2026*
*Versión: 1.0.0*
