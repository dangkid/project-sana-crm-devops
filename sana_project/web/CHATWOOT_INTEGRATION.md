# GUÍA DE INTEGRACIÓN: Chatwoot Widget para SANA Clínica

## 📋 Tabla de Contenidos
1. [Introducción](#introducción)
2. [Requisitos Previos](#requisitos-previos)
3. [Pasos de Instalación](#pasos-de-instalación)
4. [Configuración del Widget](#configuración-del-widget)
5. [Personalización](#personalización)
6. [Troubleshooting](#troubleshooting)

---

## Introducción

Chatwoot es una plataforma de atención al cliente de código abierto que permite ofrecer soporte mediante chat, correo electrónico y más. Esta guía te mostrará cómo integrar el widget de Chatwoot en tu página de SANA Clínica.

**Ventajas:**
- ✅ Chat en tiempo real con tus clientes
- ✅ Historial de conversaciones
- ✅ Múltiples canales de comunicación
- ✅ Agentes disponibles/ocupados
- ✅ Estadísticas de atención
- ✅ Disponible 24/7

---

## Requisitos Previos

1. **Cuenta de Chatwoot**
   - Opción A: Usar Chatwoot Cloud (hospedado)
   - Opción B: Desplegar Chatwoot en tu servidor (auto-hospedado)

2. **Acceso a la carpeta del proyecto**
   - Archivo: `public/index.html`

3. **Información necesaria:**
   - Website Token de Chatwoot
   - URL base de tu instancia Chatwoot

---

## Pasos de Instalación

### Opción 1: Chatwoot Cloud (Recomendado para comenzar)

#### Paso 1: Crear una Cuenta
1. Ve a https://app.chatwoot.com
2. Haz clic en "Sign Up"
3. Completa el formulario con:
   - Email
   - Nombre
   - Contraseña
4. Verifica tu email

#### Paso 2: Crear tu Cuenta de Trabajo
1. En el panel de control, haz clic en "Create New Account"
2. Nombre de la cuenta: "SANA Clínica"
3. Selecciona tu zona horaria

#### Paso 3: Configurar un Canal Web
1. Ve a **Settings → Channels**
2. Haz clic en **"Add Channel"**
3. Selecciona **"Website"**
4. Completa los detalles:
   - **Name:** SANA Website
   - **Website URL:** tu-dominio.com (ej: sana-clinica.com)
   - **Logo:** (opcional) Carga el logo de SANA
   - **Welcome Message:** "¡Bienvenido a SANA! ¿Cómo podemos ayudarte?"
5. Haz clic en **"Create Channel"**

#### Paso 4: Obtener el Website Token
1. Después de crear el canal, verás la sección **"Widget Settings"**
2. Copia el **"Website Token"** (cadena larga de caracteres)
3. También encontrarás el **"Installation Code"** listo para usar

---

### Opción 2: Auto-hospedado en tu Servidor Ubuntu

#### Paso 1: Requisitos del Sistema
```bash
# Actualizar sistema
sudo apt update
sudo apt upgrade -y

# Instalar dependencias
sudo apt install -y \
    curl \
    gnupg \
    lsb-release \
    ca-certificates \
    apt-transport-https
```

#### Paso 2: Instalar Docker y Docker Compose
```bash
# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Instalar Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

#### Paso 3: Desplegar Chatwoot
```bash
# Crear directorio
mkdir -p /opt/chatwoot
cd /opt/chatwoot

# Descargar docker-compose.yml
curl https://raw.githubusercontent.com/chatwoot/chatwoot/develop/docker-compose.yml -o docker-compose.yml

# Generar claves secretas
echo "SECRET_KEY_BASE=$(openssl rand -hex 32)" > .env
echo "RAILS_ENV=production" >> .env

# Iniciar servicios
docker-compose up -d
```

#### Paso 4: Acceder a Chatwoot
```
http://tu-servidor-ip:3000
```

---

## Configuración del Widget

### Método 1: Usar el HTML Comentado (Recomendado)

El proyecto ya tiene un espacio preparado en `public/index.html`. Sigue estos pasos:

#### Paso 1: Obtener el Script
Desde tu panel de Chatwoot:
1. Ve a **Settings → Channels → Website**
2. Haz clic en el botón **"View Installation Code"**
3. Copia todo el código HTML

#### Paso 2: Actualizar el HTML
1. Abre `public/index.html`
2. Busca la sección comentada "CHATWOOT WIDGET PLACEMENT" (cerca del final)
3. Reemplaza el código comentado con tu código real

**Ejemplo (antes):**
```html
<!-- 
<script>
    (function(d,t) {
        var BASE_URL="https://chatwoot_domain.com";
        var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
        g.src=BASE_URL+"/packs/js/sdk.js";
        g.defer = true;
        g.async = true;
        s.parentNode.insertBefore(g,s);
        g.onload=function(){
            window.chatwootSDK.run({
                websiteToken: 'YOUR_WEBSITE_TOKEN',
                baseUrl: BASE_URL
            })
        }
    })(document,"script");
</script>
-->
```

**Ejemplo (después):**
```html
<script>
    (function(d,t) {
        var BASE_URL="https://app.chatwoot.com";
        var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
        g.src=BASE_URL+"/packs/js/sdk.js";
        g.defer = true;
        g.async = true;
        s.parentNode.insertBefore(g,s);
        g.onload=function(){
            window.chatwootSDK.run({
                websiteToken: 'YOUR_ACTUAL_TOKEN_HERE_12345abcde',
                baseUrl: BASE_URL
            })
        }
    })(document,"script");
</script>
```

### Método 2: Usar NPM/Webpack (Para aplicaciones más complejas)

```bash
npm install @chatwoot/web-sdk
```

```javascript
// En tu JavaScript
import { createChatwootWidget } from '@chatwoot/web-sdk'

createChatwootWidget({
    websiteToken: 'YOUR_WEBSITE_TOKEN',
    baseUrl: 'https://chatwoot_domain.com'
})
```

---

## Personalización

### Cambiar Colores del Widget

Después de agregar el script, puedes personalizar el widget:

```html
<script>
    (function(d,t) {
        var BASE_URL="https://app.chatwoot.com";
        var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
        g.src=BASE_URL+"/packs/js/sdk.js";
        g.defer = true;
        g.async = true;
        s.parentNode.insertBefore(g,s);
        g.onload=function(){
            window.chatwootSDK.run({
                websiteToken: 'YOUR_WEBSITE_TOKEN',
                baseUrl: BASE_URL,
                // Personalización del Widget
                widgetColor: '#0ea5e9',           // Color principal (azul SANA)
                position: 'right',                // 'left' o 'right'
                hideMessageBubble: false,         // Mostrar/ocultar burbuja
                showPopoutButton: true,           // Botón para expandir
                locale: 'es'                      // Idioma español
            })
        }
    })(document,"script");
</script>
```

### Mensajes Personalizados

En tu panel de Chatwoot:

1. Ve a **Settings → Channels → Website → Widget Settings**
2. Personaliza:
   - **Welcome Message:** "Hola, ¿en qué podemos ayudarte?"
   - **Widget Title:** "Soporte SANA"
   - **Greeting Toggle:** Habilitar/deshabilitar
   - **Greeting Message:** Mensaje personalizado

### Pre-llenar Datos del Usuario

```html
<script>
    (function(d,t) {
        // ... código anterior ...
        g.onload=function(){
            window.chatwootSDK.run({
                websiteToken: 'YOUR_WEBSITE_TOKEN',
                baseUrl: BASE_URL
            })
            
            // Pre-llenar información del usuario
            window.$chatwoot.setUserProperties({
                email: 'usuario@example.com',
                name: 'Nombre del Usuario',
                phone_number: '+57 123 456 7890',
                avatar_url: 'https://...',
                custom_attributes: {
                    servicio_interesado: 'Psicología',
                    fecha_contacto: new Date().toISOString()
                }
            })
        }
    })(document,"script");
</script>
```

### Ejecutar Código Personalizado

```javascript
// Abrir widget cuando se hace click en botón específico
document.getElementById('miBoton').addEventListener('click', () => {
    window.$chatwoot.toggleBubble()
})

// Enviar mensaje automático
document.addEventListener('chatwoot:ready', () => {
    window.$chatwoot.setCustomAttributes({
        navegador: navigator.userAgent,
        idioma: navigator.language
    })
})
```

---

## Configuración en el Servidor

### Con Docker Compose

El archivo `docker-compose.yml` ya incluye el servicio web. Solo necesitas:

```bash
# Construir y iniciar
docker-compose up -d

# Verificar que Nginx sirve los archivos correctamente
curl http://localhost/index.html
```

### Variables de Entorno

Si usas Chatwoot auto-hospedado, configura en `.env`:

```env
# Chatwoot Configuration
CHATWOOT_DOMAIN=chatwoot.tu-dominio.com
CHATWOOT_WEBSITE_TOKEN=tu_token_aqui
CHATWOOT_BASE_URL=https://tu-servidor-chatwoot
```

---

## Testing y Validación

### Verificar Carga del Widget

1. Abre tu página en navegador
2. Abre las DevTools (F12)
3. Ve a **Console**
4. Deberías ver:
   ```
   [Chatwoot] Widget loaded successfully
   ```

### Prueba de Chat

1. Haz clic en el widget (esquina inferior derecha)
2. Envía un mensaje de prueba
3. En tu panel Chatwoot, deberías ver la conversación

### Mobile Testing

1. Abre en tu teléfono
2. El widget debe mostrarse responsive
3. Las conversaciones deben funcionar sin problemas

---

## Troubleshooting

### Problema: Widget No Aparece

**Solución 1: Verificar Token**
```javascript
// En DevTools Console
console.log(window.chatwootSDK)
console.log(window.$chatwoot)
```

Si es `undefined`, el script no se cargó correctamente.

**Solución 2: Verificar CORS**
```bash
# Si usas auto-hospedado, asegúrate que CORS está configurado
# En tu instancia Chatwoot, ve a Settings → Channels → Website
```

**Solución 3: Limpiar Cache**
```bash
# Borrar cookies y caché del navegador
# O usar Ctrl+F5 para recarga forzada
```

### Problema: Widget Carga Muy Lentamente

**Solución:**
El script es asíncrono y no afecta la carga de la página. Si sigue lento:

1. Verifica tu conexión a Chatwoot
2. Usa CDN más cercano
3. Habilita caching en Nginx

### Problema: Mensajes No Se Envían

**Solución:**
1. Verifica que Chatwoot está disponible: `https://tu-chatwoot-url/`
2. Revisa la consola de navegador para errores
3. Asegúrate que el canal está activo en Chatwoot

### Problema: Widget Aparece en Móvil Pero No en Desktop

**Solución:**
Puede ser un problema de CSS. Agrega esta configuración:

```css
/* En tu CSS personalizado */
iframe[src*="chatwoot"] {
    display: block !important;
}
```

---

## Mejores Prácticas

### 1. Ubicación del Script
✅ **Correcto:** Al final del `</body>`
❌ **Incorrecto:** En el `<head>` (afecta velocidad)

### 2. Manejo de Errores
```javascript
window.addEventListener('error', (e) => {
    if (e.filename && e.filename.includes('chatwoot')) {
        console.error('Error de Chatwoot:', e)
    }
})
```

### 3. Privacidad
- No envíes datos sensibles en pre-fill
- Implementa GDPR compliance
- Ofrece opción de No Rastrear

### 4. Performance
- Carga el script asincronamente (por defecto)
- Implementa lazy loading
- Monitorea tiempos de carga

### 5. Experiencia del Usuario
- Posiciona el widget en lugar visible
- Personaliza mensajes naturalmente
- Ofrece alternativas (email, teléfono)

---

## Recursos Útiles

- 📚 [Documentación oficial de Chatwoot](https://www.chatwoot.com/docs)
- 🐳 [Chatwoot Docker Hub](https://hub.docker.com/r/chatwoot/chatwoot)
- 💬 [Comunidad Chatwoot](https://www.chatwoot.com/community/)
- 🔧 [API de Chatwoot](https://www.chatwoot.com/docs/product/apis/rest-api/)

---

## Próximos Pasos

1. ✅ Integrar Chatwoot
2. ✅ Personalizar el widget
3. ✅ Entrenar a tu equipo
4. ✅ Monitorear conversaciones
5. ✅ Optimizar respuestas

---

## Soporte

Si tienes problemas:
1. Revisa esta guía completamente
2. Consulta la documentación oficial de Chatwoot
3. Abre un issue en el repositorio
4. Contacta al equipo de Chatwoot

**¡Felicidades! Tu widget de chat está listo para mejorar la experiencia de tus clientes.** 🎉
