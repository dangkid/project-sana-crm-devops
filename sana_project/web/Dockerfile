# Multi-stage build para optimizar tamaño de imagen

# Stage 1: Base
FROM ubuntu:22.04 as base

RUN apt-get update && apt-get install -y \
    nginx \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Stage 2: Aplicación
FROM base

# Crear directorios necesarios
RUN mkdir -p /var/www/sana-clinica
WORKDIR /var/www/sana-clinica

# Copiar archivos de la aplicación
COPY public/ /var/www/sana-clinica/

# Configurar permisos
RUN chown -R www-data:www-data /var/www/sana-clinica

# Copiar configuración de Nginx
COPY nginx/sana.conf /etc/nginx/sites-available/default

# Crear enlace simbólico de configuración
RUN ln -sf /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default

# Validar configuración de Nginx
RUN nginx -t

# Exponer puerto
EXPOSE 80 443

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/index.html || exit 1

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
