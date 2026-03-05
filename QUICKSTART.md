# SANA - Quick Start Guide

## 🚀 Comenzar Rápidamente (5 minutos)

### Opción 1: Instalación Automática (Recomendado)

#### macOS / Linux

```bash
# 1. Navega al directorio del proyecto
cd /path/to/project-sana-crm-devops

# 2. Dale permisos al script
chmod +x setup.sh

# 3. Ejecuta el instalador
./setup.sh

# 4. Abre en navegador
open http://localhost
# O manualmente: http://localhost
```

#### Windows (PowerShell)

```powershell
# 1. Navega al directorio
cd path\to\project-sana-crm-devops

# 2. Ejecuta Docker Compose
docker-compose build
docker-compose up -d

# 3. Abre navegador
Start-Process "http://localhost"
```

### Opción 2: Instalación Manual

```bash
# 1. Clonar repositorio (si no lo has hecho)
git clone <repo-url>
cd project-sana-crm-devops

# 2. Crear archivo .env
cp .env.example .env

# 3. Construir imagen
docker-compose build

# 4. Iniciar servicios
docker-compose up -d

# 5. Verificar
curl http://localhost/health
# Debería responder: healthy
```

---

## 📂 Estructura Importante

```
.
├── public/
│   ├── index.html          ← EDITA AQUÍ el contenido
│   ├── css/styles.css      ← Estilos personalizados
│   └── js/main.js          ← Funcionalidades
├── nginx/
│   └── sana.conf           ← Configuración servidor
├── docker-compose.yml      ← Orquestación
└── .env                    ← Tu configuración (crear)
```

---

## ✏️ Editar Contenido

### Cambiar Textos y Servicios

1. Abre **`public/index.html`**
2. Busca el texto que quieres cambiar
3. Edita y guarda
4. Recarga el navegador (Ctrl+F5 para limpiar caché)

**Secciones principales a editar:**

```html
<!-- Nombre de empresa -->
<h1>SANA</h1>

<!-- Descripción -->
<p>Centro Terapéutico Integral</p>

<!-- Servicios -->
<h3>Psicología Clínica</h3>
<p>Descripción del servicio...</p>

<!-- Contacto -->
<p>contacto@sana-clinica.com</p>
```

### Cambiar Colores

En `public/css/styles.css`:

```css
:root {
    --sana-blue: #0ea5e9;      /* Cambiar azul */
    --sana-green: #10b981;     /* Cambiar verde */
}
```

O en `public/index.html`:

```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                'sana-blue': '#TU-COLOR-AQUI',
            }
        }
    }
}
```

---

## 💬 Integrar Chatwoot (5 min)

### Pasos Rápidos

1. **Crear cuenta** en https://app.chatwoot.com

2. **Crear canal web:**
   - Settings → Channels → Add Channel → Website

3. **Copiar código de instalación**
   - Click en "View Installation Code"

4. **Pegar en HTML:**
   - Abre `public/index.html`
   - Busca `<!-- CHATWOOT WIDGET PLACEMENT -->`
   - Reemplaza el código comentado con el tuyo

5. **Guardar y listo!**
   - El chat aparecerá en tu web

**Ver guía completa:** [CHATWOOT_INTEGRATION.md](CHATWOOT_INTEGRATION.md)

---

## 🔄 Reiniciar Cambios

### Aplicar cambios de archivos

```bash
# Los cambios en HTML/CSS/JS se aplican automáticamente
# Solo recarga el navegador

# Cambios en Nginx config
docker-compose restart sana-web

# Reconstruir completamente
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

---

## 📱 Probar en Móvil

```bash
# Obtén tu IP local

# macOS
ipconfig getifaddr en0

# Linux
hostname -I

# Windows PowerShell
ipconfig | Select-String IPv4

# Desde móvil, abre navegador:
http://TU-IP-LOCAL/

# Ejemplo:
http://192.168.1.100/
```

---

## 🐛 Problemas Comunes

### Problema: "Port 80 already in use"

**Solución:**

```bash
# Opción 1: Usar puerto diferente
# Edita docker-compose.yml:
ports:
  - "8080:80"  # Usa 8080 en lugar de 80

# Luego:
docker-compose up -d
# Accede a: http://localhost:8080
```

### Problema: "Cannot connect to Docker daemon"

**Solución:**

```bash
# macOS
# Abre Docker Desktop

# Linux
sudo systemctl start docker

# Windows
# Abre Docker Desktop
```

### Problema: Ver cambios no aparecen

**Solución:**

```bash
# Limpiar caché del navegador
# Opción 1: Ctrl+Shift+Delete → Limpiar historial
# Opción 2: Ctrl+F5 (recarga forzada)
# Opción 3: Abre en navegador privado/incógnito
```

### Problema: Chatwoot no aparece

**Solución:**

1. Verifica Token en HTML
2. Abre Console (F12) busca errores
3. Recarga la página (Ctrl+Shift+Delete)

```javascript
// En DevTools Console:
console.log(window.chatwootSDK)
```

---

## 📊 Monitorear

### Ver logs en tiempo real

```bash
docker-compose logs -f sana-web
```

### Verificar estado

```bash
docker-compose ps
```

### Usar recurso

```bash
docker stats sana-clinica-web
```

---

## 🛑 Detener y Limpiar

### Parar servicios

```bash
docker-compose down
```

### Parar sin borrar datos

```bash
docker-compose stop
```

### Reiniciar

```bash
docker-compose restart
```

### Limpiar completamente

```bash
docker-compose down -v
docker system prune -a
```

---

## 📚 Recursos

- 📖 [Documentación Completa](README.md)
- 💬 [Guía de Chatwoot](CHATWOOT_INTEGRATION.md)
- 🐳 [Documentación Docker](https://docs.docker.com)
- 🌐 [Tailwind CSS](https://tailwindcss.com/docs)

---

## ✨ Consejos Pro

1. **Usar VS Code** para editar fácilmente
   - Extensión: "Live Server" para preview

2. **Git** para control de cambios
   ```bash
   git add .
   git commit -m "Actualizar contenido SANA"
   git push
   ```

3. **Backup automático** de tu carpeta del proyecto

4. **SSL/HTTPS** para producción (ver README.md)

5. **Analytics** después de lanzar:
   - Google Analytics
   - Hotjar
   - Chatwoot Dashboard

---

## 🎉 ¡Lista!

Tu web **SANA** está lista. Ahora:

1. ✅ Personaliza el contenido
2. ✅ Integra Chatwoot
3. ✅ Prueba en móvil
4. ✅ Comparte el link

**¿Necesitas ayuda?** Ver README.md o contacta al equipo.

---

*Happy coding! 💚*
