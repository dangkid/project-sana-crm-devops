# 🚀 Guía de Despliegue en Producción - SANA Clínica

## 📋 Tabla de Contenidos
1. [Pre-Requisitos](#pre-requisitos)
2. [Seleccionar Proveedor](#seleccionar-proveedor)
3. [Configuración de Dominio](#configuración-de-dominio)
4. [SSL/HTTPS](#sslhttps)
5. [Optimizaciones](#optimizaciones)
6. [Seguridad](#seguridad)
7. [Monitoreo](#monitoreo)
8. [Mantenimiento](#mantenimiento)

---

## Pre-Requisitos

Antes de desplegar, asegúrate de tener:

- ✅ Dominio registrado (ej: sana-clinica.com)
- ✅ Servidor con al menos 2GB RAM
- ✅ Docker instalado en el servidor
- ✅ Acceso SSH/Terminal al servidor
- ✅ Certificado SSL (gratuito con Let's Encrypt)
- ✅ Contenidos finales y personalizados
- ✅ Chatwoot configurado (opcional pero recomendado)

---

## Seleccionar Proveedor

### 1. Ubuntu Server en AWS EC2 (Recomendado)

**Pro:**
- Escalable
- Confiable
- Precio competitivo
- Capa free el primer año

**Pasos:**

```bash
# 1. Crear instancia EC2
# - AMI: Ubuntu 22.04 LTS
# - Tipo: t3.small (mínimo)
# - Almacenamiento: 20GB-50GB
# - Security Group: Abrir 80, 443, 22

# 2. SSH a la instancia
ssh -i tu-key.pem ubuntu@ip-pública

# 3. Actualizar sistema
sudo apt update && sudo apt upgrade -y

# 4. Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker ubuntu

# 5. Instalar Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# 6. Clonar proyecto
git clone https://github.com/tu-usuario/project-sana-crm-devops.git
cd project-sana-crm-devops

# 7. Configurar .env
nano .env  # Editar con tus valores

# 8. Iniciar
docker-compose up -d
```

### 2. DigitalOcean App Platform

**Pro:**
- Simple
- Deployt directo desde GitHub
- Precio fijo
- Servicio gestionado

**URL:** https://www.digitalocean.com/products/app-platform/

### 3. Heroku

**Pro:**
- Muy fácil
- Git push to deploy
- Escalado automático

**Pasos:**

```bash
# 1. Crear app
heroku create sana-clinica

# 2. Push código
git push heroku main

# 3. Abrir
heroku open
```

### 4. Vercel (Recomendado para JAMstack)

**Pro:**
- Ultra rápido
- CDN global
- Git integration
- HTTPS automático

**URL:** https://vercel.com

---

## Configuración de Dominio

### Paso 1: Apuntar DNS

En tu registrador de dominio (GoDaddy, Namecheap, etc.):

```
Tipo: A
Host: @
Valor: IP-DE-TU-SERVIDOR

Tipo: A
Host: www
Valor: IP-DE-TU-SERVIDOR

# Opcional: CNAME para www
Tipo: CNAME
Host: www
Valor: sana-clinica.com
```

**Esperar:** 24-48 horas para propagación DNS

### Paso 2: Verificar

```bash
# Desde terminal
nslookup sana-clinica.com
# Debe mostrar tu IP

ping sana-clinica.com
# Debe responder
```

---

## SSL/HTTPS

### Opción 1: Let's Encrypt con Certbot (Gratuito)

```bash
# 1. Instalar Certbot
sudo apt install certbot python3-certbot-nginx -y

# 2. Generar certificado
sudo certbot certonly --standalone -d sana-clinica.com -d www.sana-clinica.com

# 3. Copiar certificados
sudo cp /etc/letsencrypt/live/sana-clinica.com/fullchain.pem ~/proyecto/nginx/ssl/cert.pem
sudo cp /etc/letsencrypt/live/sana-clinica.com/privkey.pem ~/proyecto/nginx/ssl/key.pem
sudo chown $USER:$USER ~/proyecto/nginx/ssl/*

# 4. Habilitar en nginx/sana.conf
# Descomenta la sección SSL

# 5. Reiniciar Nginx
docker-compose restart sana-web

# 6. Auto-renovación
sudo certbot renew --dry-run  # Test
# Se auto-renueva automáticamente cada 60 días
```

### Paso 3: Validar HTTPS

```bash
curl -I https://sana-clinica.com
# HTTP/2 200 - ¡Funcionando!

# O en navegador: https://sana-clinica.com
```

---

## Optimizaciones

### 1. Compresión Brotli

En `nginx/sana.conf`:

```nginx
http {
    # Habilitar Brotli
    brotli on;
    brotli_comp_level 6;
    brotli_types text/plain text/css text/xml text/javascript 
                 application/json application/javascript application/xml+rss
                 font/truetype font/opentype application/vnd.ms-fontobject 
                 image/svg+xml;
}
```

### 2. CDN (Cloudflare)

1. Registrarse en https://cloudflare.com
2. Agregar sitio
3. Cambiar nameservers en registrador
4. Habilitar:
   - Auto HTTPS
   - Minificación
   - Chaching
   - DDoS Protection

### 3. Image Optimization

```html
<!-- Usar formatos modernos -->
<img src="image.webp" alt="...">
<!-- Con fallback -->
<img srcset="image.webp 1x, image@2x.webp 2x" 
     src="image.jpg" alt="...">
```

### 4. Lazy Loading

```html
<img loading="lazy" src="..." alt="...">
```

---

## Seguridad

### 1. Firewall

```bash
# Instalar UFW
sudo apt install ufw

# Habilitar y permitir puertos
sudo ufw enable
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Verificar
sudo ufw status
```

### 2. SSH Hardening

```bash
# Editar configuración SSH
sudo nano /etc/ssh/sshd_config

# Cambiar:
Port 2222  # Puerto no estándar
PermitRootLogin no
PasswordAuthentication no  # Solo keys
```

### 3. Actualizaciones Automáticas

```bash
# Instalar unattended-upgrades
sudo apt install unattended-upgrades -y

# Habilitar
sudo dpkg-reconfigure -plow unattended-upgrades
```

### 4. Backup Automático

```bash
# Crear script de backup
cat > /home/ubuntu/backup.sh << 'EOF'
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/home/ubuntu/backups"
mkdir -p $BACKUP_DIR

# Backup volúmenes Docker
docker run --rm \
  -v sana-clinica-web:/data \
  -v $BACKUP_DIR:/backup \
  alpine tar czf /backup/sana_$DATE.tar.gz -C /data .

# Limpiar backups viejos (mayores a 30 días)
find $BACKUP_DIR -type f -mtime +30 -delete

echo "Backup completado: sana_$DATE.tar.gz"
EOF

chmod +x /home/ubuntu/backup.sh

# Ejecutar diariamente con cron
(crontab -l 2>/dev/null; echo "0 2 * * * /home/ubuntu/backup.sh") | crontab -
```

---

## Monitoreo

### 1. Health Checks

```bash
# Test automático
curl -o /dev/null -s -w "%{http_code}" https://sana-clinica.com

# Monitoreo con Uptime Robot
# URL: https://uptimerobot.com
# Monitorear: https://sana-clinica.com/health
```

### 2. Logs

```bash
# Ver logs en tiempo real
docker-compose logs -f sana-web

# Guardar logs
docker-compose logs sana-web > logs.txt

# Analizar errores
docker-compose logs sana-web | grep ERROR
```

### 3. Monitoreo con Monitoring Tools

#### Datadog (Recomendado)

```bash
# Agent Docker
docker run -d \
  --name datadog-agent \
  -e DD_AGENT_MAJOR_VERSION=7 \
  -e DD_API_KEY=tu-api-key \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v /proc/:/host/proc/:ro \
  -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
  datadog/agent:latest
```

#### Prometheus + Grafana (Open Source)

```bash
# Agregar sección a docker-compose.yml
prometheus:
  image: prom/prometheus
  ports:
    - "9090:9090"
  volumes:
    - ./prometheus.yml:/etc/prometheus/prometheus.yml

grafana:
  image: grafana/grafana
  ports:
    - "3000:3000"
  depends_on:
    - prometheus
```

---

## Mantenimiento

### Actualizaciones Regulares

```bash
# Actualizar imagen Docker
docker-compose pull
docker-compose down
docker-compose up -d

# Actualizar Let's Encrypt (manual)
sudo certbot renew

# Actualizar Nginx
# (Se actualiza automáticamente con Docker)
```

### Limpieza

```bash
# Limpiar imágenes no usadas
docker image prune -a

# Limpiar volúmenes no usados
docker volume prune

# Limpiar contenedores detenidos
docker container prune

# Cuidado: Limpiar TODO
docker system prune -a --volumes
```

### Mejora Continua

```bash
# Analizar rendimiento
docker stats sana-clinica-web

# Ver recursos
df -h  # Espacio en disco
free -h  # Memoria

# Uptime del servidor
uptime

# Carga del sistema
top
```

---

## Checklist Final

Antes de ir a producción:

- ✅ Dominio configurado
- ✅ SSL/HTTPS activo
- ✅ Todos los textos revisados
- ✅ Contacto actualizado
- ✅ Chatwoot integrado
- ✅ Formularios funcionando
- ✅ Mobile responsive probado
- ✅ Analytics configurado
- ✅ Backups automáticos
- ✅ Monitoreo activo
- ✅ Firewall configurado
- ✅ Certificados renovables
- ✅ Performance optimizado

---

## URLs Útiles

- 📊 [Uptime Robot](https://uptimerobot.com)
- 🔍 [Google PageSpeed](https://pagespeed.web.dev)
- 🛡️ [SSL Labs](https://www.ssllabs.com/ssltest/)
- 📈 [GTmetrix](https://gtmetrix.com)
- 🚀 [Can I Use](https://caniuse.com)

---

## Soporte Post-Lanzamiento

```bash
# Reiniciar en caso de problema
docker-compose restart

# Regenerar certificados
sudo certbot renew --force-renewal

# Restaurar from backup
docker run --rm -v sana-clinica-web:/data -v /path/to/backup:/backup \
  alpine tar xzf /backup/sana_YYYYMMDD_HHMMSS.tar.gz -C /data

# Escalar a más poder
# (Actualizar tipo de instancia en AWS, DigitalOcean, etc.)
```

---

## Conclusión

¡Tu **SANA Clínica** está lista para el mundo! 🎉

Monitorea regularmente, mantén backups, y sigue optimizando para mejorar la experiencia de tus usuarios.

**Para soporte:** Ver README.md o contacta al equipo DevOps.

---

*Última actualización: Marzo 2026*
