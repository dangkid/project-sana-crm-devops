# 💬 Chatwoot - Guía Rápida de Integración

## ¿Qué es Chatwoot?

**Chatwoot** es un widget de chat para tu sitio web que permite que tus pacientes/clientes se comuniquen contigo en tiempo real sin necesidad de aplicaciones externas.

---

## Paso 1: Crear Cuenta Chatwoot (2 minutos)

### Opción A: Cloud (Gratuito, Recomendado)

1. Ve a: **https://app.chatwoot.com**
2. Haz clic en **"Sign Up"** (esquina superior derecha)
3. Completa:
   - Email
   - Nombre (tu nombre o empresa)
   - Contraseña
4. Click **"Create Account"**
5. **Verifica tu email** (busca el link)

### Opción B: Auto-hospedado (Avanzado)

```bash
# Consulta CHATWOOT_INTEGRATION.md sección "Opción 2"
```

---

## Paso 2: Configurar tu Sitio Web (3 minutos)

### Dentro de tu cuenta Chatwoot:

1. **Página Principal:**
   - Click en **"+ New Account"** (si es necesario)
   - Nombre: **SANA Clínica**
   - Click **"Create"**

2. **Crear Canal:**
   - Click en **Engranaje** (⚙️) esquina superior derecha
   - Settings → **Channels**
   - Click **"+ Add Channel"** (botón verde)
   - Selecciona **"Website"**

3. **Completar Datos:**
   - **Channel Name:** `SANA Website`
   - **Website URL:** `sana-clinica.com` (tu dominio real)
   - **Welcome Message:** `¡Bienvenido a SANA! ¿Cómo podemos ayudarte?`
   - **Timezone:** Selecciona tu zona horaria
   - Click **"Create"**

---

## Paso 3: Obtener el Código Chatwoot (1 minuto)

1. Después de crear el canal, verás un cuadro **"Installation Code"**
2. Haz clic en **"Copy Installation Code"** (botón azul)
3. Se copiará automáticamente el código HTML

**El código se verá así:**
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
        websiteToken: 'DQXBWXYZABC123DEF456GHI789',  // ← Tu token único
        baseUrl: BASE_URL
      })
    }
  })(document,"script");
</script>
```

---

## Paso 4: Pegar Código en Tu Web (2 minutos)

### Método Simple (Recomendado)

1. **Abre tu editor de código:**
   - VS Code, Sublime, o lo que uses

2. **Abre el archivo:** `public/index.html`

3. **Busca esta línea** (casi al final del archivo):
   ```html
   <!-- CHATWOOT WIDGET PLACEMENT -->
   ```

4. **Dentro de los comentarios, encontrarás:**
   ```html
   <!-- 
   <script>
       (function(d,t) {
   ...
   ```

5. **Reemplaza TODO EL BLOQUE COMENTADO** con el código que copiaste de Chatwoot

6. **Guarda el archivo** (Ctrl+S o Cmd+S)

7. **Recarga la web** en navegador:
   - Opción 1: Press `Ctrl+F5` (recarga forzada)
   - Opción 2: Abre incógnito/privado
   - Opción 3: Limpia caché de navegador

---

## ¡Listo! 🎉

### Verifica que funcione:

1. **Abre tu sitio:** `http://localhost` o `https://tu-dominio.com`
2. **Mira la esquina inferior derecha**
3. **Deberías ver un chat pequeño** (widget)
4. **Haz clic en el widget** - se expandirá un chat
5. **Envía un mensaje de prueba**
6. **En tu panel Chatwoot verás el mensaje**

---

## 🎨 Personalizar el Chat (Opcional)

### Cambiar Mensajes

En tu panel de Chatwoot:

1. Settings → Channels → Website
2. Busca **"Welcome Message"** y edita:
   - "¡Hola! Aquí estamos para ayudarte"
   - "¿En qué podemos ayudarte hoy?"

### Cambiar Color

En el mismo lugar, busca **"Widget Color"**:
- Selecciona color (azul SANA: `#0ea5e9`)

### Cambiar Posición

Si quieres el chat en la izquierda en lugar de derecha, agrega esto a tu código Chatwoot:

```javascript
window.chatwootSDK.run({
    websiteToken: 'TU_TOKEN_AQUI',
    baseUrl: BASE_URL,
    position: 'left'  // ← Agregar esta línea
})
```

---

## ❌ Problemas Comunes

### Problema: No Veo el Chat

**Solución:**
1. Verifica que copiaste el código completo
2. No borres partes del script
3. Recarga con `Ctrl+Shift+Delete` (limpia caché)
4. Abre DevTools (F12) → Console
5. Busca errores rojos

### Problema: El Token se ve "DQXBWXYZABC..." 

**No es error, es normal:**
- Cada cuenta Chatwoot tiene su token único
- El tuyo será diferente
- Déjalo tal cual esté

### Problema: Chat Aparece Pero Muy Arriba o Deformado

**Solución:**
- A veces los estilos entran en conflicto
- Agrega esto en `public/css/styles.css`:

```css
/* Arreglar Chatwoot */
iframe {
    max-width: 100%;
    max-height: 100vh;
}
```

### Problema: No puedo encontrar el código en el HTML

**Solución:**
1. Abre `public/index.html`
2. Presiona `Ctrl+F` (búsqueda)
3. Escribe: `CHATWOOT`
4. Te llevará a la sección

---

## 📞 Responder Mensajes

### Desde el Panel Chatwoot

1. Accede a https://app.chatwoot.com
2. Inicia sesión
3. Verás mensajes nuevos en **"Unassigned"**
4. Haz clic en la conversación
5. **Escribe tu respuesta en el cuadro de texto**
6. La respuesta aparecerá en el widget del cliente

---

## 👥 Agregar Más Agentes

Para que tu equipo responda mensajes:

1. Settings → **Agents**
2. Click **"Add Agent"**
3. Email, nombre, contraseña
4. Click **"Create"**
5. El nuevo agente puede iniciar sesión y responder

---

## 📊 Ver Estadísticas

1. Panel principal de Chatwoot
2. Verás **"Contacts"** - número de usuarios
3. Verás **"Messages"** - total de mensajes
4. Ver **"Reports"** para más detalles

---

## 🎓 Tips Profesionales

### 1. Mensaje de Bienvenida
```
"¡Bienvenido a SANA Clínica! 

Estamos disponibles de Lunes a Viernes 9:00 AM - 6:00 PM.

¿En qué servicio estás interesado?
- 🧠 Psicología
- 💚 Terapia Emocional
- 🌿 Reflexoterapia
- 🦶 Podología
- 👶 Talleres niños"
```

### 2. Horarios
- Configura disponibilidad de agentes
- Muestra mensaje cuando está cerrado
- Ofrece opción de email de respuesta

### 3. Pre-información
- Pide nombre y email al iniciar chat
- Así tienes datos del contacto

### 4. Integra con CRM
- Si tienes otro sistema, Chatwoot puede conectarse

---

## 🔗 Enlaces Útiles

- 📚 [Centro de Ayuda Chatwoot](https://chatwoot.waffle.im)
- 🐛 [Primeros Pasos](https://www.chatwoot.com/docs/product/channels/live-chat/create-live-chat-channel)
- 💬 [Comunidad](https://www.chatwoot.com/community/)

---

## ¡Listo para Chatear! 💬

Ya tienes tu chat funcionando. Tu equipo de SANA Clínica puede:
- ✅ Responder preguntas en tiempo real
- ✅ Agendar consultas
- ✅ Solucionar dudas
- ✅ Mejorar relación con clientes

**El chat estará disponible 24/7 en tu web. ¡Qué esperes muchos mensajes!** 🎉

---

## ¿Necesitas Más Ayuda?

- 📖 Ver guía completa: [CHATWOOT_INTEGRATION.md](CHATWOOT_INTEGRATION.md)
- 📖 Ver documentación general: [README.md](README.md)
- 🐛 Abrir un Issue en GitHub

---

*¡Felicidades! Tu landing page de SANA Clínica con chat está lista.* 💚
