#!/bin/bash

# ==============================================
# SANA - Centro Terapéutico Integral
# Script de Instalación y Despliegue
# ==============================================

set -e  # Exit on error

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
print_header() {
    echo -e "${BLUE}========================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}========================================${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ $1${NC}"
}

# Start
print_header "SANA - Centro Terapéutico Integral"
echo "Script de Instalación y Despliegue"
echo ""

# Check requirements
print_header "Verificando Requisitos Previos"

# Check Docker
if ! command -v docker &> /dev/null; then
    print_error "Docker no está instalado"
    echo "Instálalo en: https://docs.docker.com/get-docker/"
    exit 1
fi
print_success "Docker instalado: $(docker --version)"

# Check Docker Compose
if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose no está instalado"
    echo "Instálalo en: https://docs.docker.com/compose/install/"
    exit 1
fi
print_success "Docker Compose instalado: $(docker-compose --version)"

# Check Git
if ! command -v git &> /dev/null; then
    print_error "Git no está instalado"
    exit 1
fi
print_success "Git instalado: $(git --version)"

# Setup
echo ""
print_header "Configuración"

# Copy .env file if not exists
if [ ! -f .env ]; then
    print_info "Creando archivo .env..."
    cp .env.example .env
    print_success "Archivo .env creado"
    print_warning "Por favor, edita .env con tu configuración específica"
else
    print_success "Archivo .env ya existe"
fi

# Build Docker image
echo ""
print_header "Construcción de Imagen Docker"

print_info "Construyendo imagen..."
docker-compose build

if [ $? -eq 0 ]; then
    print_success "Imagen construida exitosamente"
else
    print_error "Error al construir la imagen"
    exit 1
fi

# Start services
echo ""
print_header "Iniciando Servicios"

print_info "Iniciando contenedores..."
docker-compose up -d

if [ $? -eq 0 ]; then
    print_success "Servicios iniciados"
else
    print_error "Error al iniciar servicios"
    exit 1
fi

# Wait for service to be ready
print_info "Esperando que el servicio esté listo..."
sleep 3

# Test connectivity
echo ""
print_header "Pruebas de Conectividad"

if curl -s http://localhost/health > /dev/null; then
    print_success "Health check: OK"
else
    print_warning "Health check: Retry..."
    sleep 2
    if curl -s http://localhost/health > /dev/null; then
        print_success "Health check: OK"
    else
        print_warning "Health check: Sin respuesta (el servicio podría estar iniciándose)"
    fi
fi

# Check if page loads
if curl -s http://localhost/index.html | grep -q "SANA"; then
    print_success "Página principal: CARGADA"
else
    print_warning "No se pudo verificar la página"
fi

# Show status
echo ""
print_header "Estado de Servicios"
docker-compose ps

# Show next steps
echo ""
print_header "¡Instalación Completada!"
echo ""
print_success "SANA está listo para usar"
echo ""
print_info "Accede a: ${BLUE}http://localhost${NC}"
echo ""
echo "Próximos pasos:"
echo "1. Abre http://localhost en tu navegador"
echo "2. Edita .env con tu configuración"
echo "3. Para Chatwoot, sigue: CHATWOOT_INTEGRATION.md"
echo "4. Para producción, ver README.md"
echo ""

# Show useful commands
echo -e "${YELLOW}Comandos Útiles:${NC}"
echo "  Ver logs:           docker-compose logs -f sana-web"
echo "  Parar servicios:    docker-compose down"
echo "  Reiniciar:          docker-compose restart"
echo "  Reconstruir:        docker-compose build --no-cache && docker-compose up -d"
echo ""

print_info "Para más información, consulta README.md"
echo ""
