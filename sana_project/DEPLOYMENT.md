# 🚀 Guía de Deployment - Sana Clínica

## 📋 Requisitos Previos
- Docker v28+ y Docker Compose v2+
- Ubuntu 24.04 LTS (recomendado)
- DNS configurados: `sana-clinica.online`, `crm.sanaclinica.online`
- Puertos 80, 81, 443 disponibles en el host

## 🔧 Instalación desde Cero

### 1️⃣ Clonar/Preparar Proyecto
```bash
# Si es primera vez
mkdir -p /sana_project
cd /sana_project

# Crear estructura de carpetas
mkdir -p nginx/data nginx/letsencrypt
mkdir -p web/public web/nginx

# Copiar archivos desde el repositorio
# (Asegúrate de que web/public contiene index.html, css/, js/)
# (Asegúrate de que web/nginx contiene sana.conf)
# (Asegúrate de que web/ contiene Dockerfile)
```

### 2️⃣ Levantar Stack Completo
```bash
cd /sana_project

# Construir imagen personalizada de web
docker-compose build

# Iniciar todos los servicios
docker-compose up -d

# Verificar status
docker-compose ps
```

### 3️⃣ Configurar Nginx Proxy Manager
Accede a `http://localhost:81` con:
- **Email**: `admin@example.com`
- **Password**: `changeme`

#### Agregar Proxy Host para Web:
1. Click en **Proxy Hosts** → **Add Proxy Host**
2. **Domain Names**: `sana-clinica.online`, `www.sana-clinica.online`
3. **Scheme**: `http`
4. **Forward Hostname/IP**: `sana-clinica-web` (nombre del contenedor)
5. **Forward Port**: `80`
6. **SSL Certificate**: 
   - Enable SSL
   - Click "Request a new SSL Certificate"
   - Email: `contacto@sana-clinica.com`
   - Accept Let's Encrypt TOS
7. **Advanced**:
   - ✅ Block Common Exploits
   - ✅ Websockets Support (para Chatwoot widget)
   - ✅ HTTP/2 Support
8. **Save**

#### Agregar Proxy Host para CRM:
1. Click en **Proxy Hosts** → **Add Proxy Host**
2. **Domain Names**: `crm.sanaclinica.online`
3. **Scheme**: `http`
4. **Forward Hostname/IP**: `chatwoot` (nombre del contenedor)
5. **Forward Port**: `3000`
6. **SSL Certificate**: Request new (mismo email)
7. **Advanced**:
   - ✅ Block Common Exploits
   - ✅ Websockets Support
   - ✅ HTTP/2 Support
8. **Save**

---

## ✅ Verificar que Todo Funciona

### A) Verificar Contenedores
```bash
# Listar todos los contenedores
docker ps -a

# Esperado:
# ✓ nginx-app-1 (running)
# ✓ sana-clinica-web (running, healthy)
# ✓ chatwoot-app (running)
# ✓ chatwoot-postgres (running, healthy)
# ✓ chatwoot-redis (running, healthy)
```

### B) Verificar Conectividad entre Contenedores
```bash
# Desde Nginx hacia la web
docker exec nginx-app-1 curl -v http://sana-clinica-web:80/

# Desde Nginx hacia Chatwoot
docker exec nginx-app-1 curl -v http://chatwoot:3000/

# Esperado: HTTP 200 OK (no 502 Bad Gateway)
```

### C) Verificar Health Checks
```bash
docker ps --format "table {{.Names}}\t{{.Status}}"

# Esperado: "healthy" para sana-clinica-web y chatwoot
```

### D) Ver Logs en Tiempo Real
```bash
# Web application
docker logs -f sana-clinica-web

# Nginx Proxy Manager
docker logs -f nginx-app-1

# Chatwoot
docker logs -f chatwoot-app

# Presiona Ctrl+C para salir
```

---

## 🔍 Solucionar Problemas de 502

### Síntoma: "502 Bad Gateway"

**Paso 1: Verificar conectividad de red**
```bash
docker exec nginx-app-1 curl -v http://sana-clinica-web:80/
```
Si falla → problema de red/firewall

**Paso 2: Verificar que el contenedor está healthyHealthy**
```bash
docker ps | grep sana-clinica-web
# Busca "healthy" en el estado
```

**Paso 3: Ver logs de nginx dentro del contenedor**
```bash
docker logs sana-clinica-web | tail -30
```

**Paso 4: Reiniciar web y nginx**
```bash
cd /sana_project
docker-compose restart sana-web nginx-proxy

# Esperar 10 segundos
sleep 10

# Verificar estado
docker ps
```

**Paso 5: Si persiste - Recrear contenedores**
```bash
docker-compose down sana-web
docker-compose up -d sana-web

# Esperar a que sea healthy (30-60 segundos)
docker ps
```

---

## 📝 Configuración Importante

### Variables de Entorno (web/docker-compose.yml)
```yaml
environment:
  - VIRTUAL_HOST=sana-clinica.online,www.sana-clinica.online
  - LETSENCRYPT_HOST=sana-clinica.online,www.sana-clinica.online
  - LETSENCRYPT_EMAIL=contacto@sana-clinica.com
```
**Personalizar**: Cambiar dominio y email según tu caso

### Credenciales Chatwoot
```yaml
environment:
  - POSTGRES_USERNAME=chatwoot
  - POSTGRES_PASSWORD=rnd8f53Utkf$
```
**⚠️ SEGURIDAD**: Cambiar password en producción
```bash
# Generar contraseña segura
openssl rand -base64 32
```

### Base de Datos PostgreSQL
- **Usuario**: `chatwoot`
- **BD**: `chatwoot`
- **Volumen**: `postgres_data`
- **Port**: 5432 (interno, no expuesto)

---

## 🔐 Backup y Mantenimiento

### Backup de Base de Datos
```bash
# Backup PostgreSQL
docker exec chatwoot-postgres pg_dump -U chatwoot chatwoot > backup_$(date +%Y%m%d).sql

# Restaurar desde backup
docker exec -i chatwoot-postgres psql -U chatwoot chatwoot < backup_20240101.sql
```

### Actualizar Imágenes
```bash
cd /sana_project

# Descargar versiones más recientes
docker-compose pull

# Recrear contenedores con nuevas imágenes
docker-compose up -d

# Verificar
docker ps
```

### Limpiar Espacio
```bash
# Remover contenedores detenidos
docker container prune -f

# Remover redes no usadas
docker network prune -f

# Remover imágenes no usadas
docker image prune -f
```

---

## 📊 Monitoreo

### Ver uso de recursos
```bash
docker stats

# Ctrl+C para salir
```

### Ver eventos Docker
```bash
docker events --filter type=container
```

---

## 🚀 Producción - Checklist Final

- [ ] Cambiar contraseñas por défecto en Chatwoot
- [ ] Cambiar credenciales NPM admin
- [ ] Configurar dominios DNS correctamente
- [ ] Verificar certificados SSL Let's Encrypt (NPM → Certificates)
- [ ] Configurar backups automáticos de PostgreSQL
- [ ] Habilitar firewall (UFW)
  ```bash
  sudo ufw allow 80/tcp
  sudo ufw allow 443/tcp
  sudo ufw allow 81/tcp  # Para admin de NPM
  sudo ufw enable
  ```
- [ ] Configurar logs centralizados
- [ ] Probar endpoint `/health` de ambas aplicaciones
- [ ] Verificar CORS si hay llamadas cross-domain

---

## 📞 Soporte

Si encuentras problemas:
1. Revisa los logs: `docker logs <nombre-contenedor>`
2. Verifica conectividad de red: `docker network inspect nginx_default`
3. Reinicia stack: `docker-compose down && docker-compose up -d`
4. Revisa configuración de NPM en `http://localhost:81`

**¡Listo para producción!** 🎉
