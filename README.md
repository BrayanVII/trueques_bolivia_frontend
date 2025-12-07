# TRUEQUES BOLIVIA - FRONTEND

## Descripción

Frontend de la plataforma **Trueques Bolivia**, una aplicación web moderna que facilita el intercambio de productos entre usuarios bolivianos de forma segura y organizada. Desarrollado con React, TypeScript y Tailwind CSS.

## Tecnologías Principales

- **React** - Biblioteca para interfaces de usuario
- **TypeScript** - Tipado estático para JavaScript
- **Vite** - Herramienta de desarrollo rápida
- **Tailwind CSS** - Framework de estilos CSS
- **React Router DOM** - Manejo de rutas
- **Lucide React** - Biblioteca de iconos SVG

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** versión 16 o superior
- **npm** o **pnpm** gestor de paquetes
- **Git** para clonar el repositorio


## Instalación

### 1. Clonar el repositorio

git clone https://github.com/tu-usuario/trueques-bolivia-frontend.git
## luego
cd trueques-bolivia-frontend

### 2. Instalar todas las dependencias

npm install

Este comando instalará automáticamente todas las dependencias listadas en `package.json`.

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

VITE_API_URL=http://localhost:3000/api


##  Dependencias del Proyecto

### Dependencias de Producción

#### React y React DOM

npm install react react-dom

- **react**: Biblioteca principal para construir interfaces de usuario con componentes reutilizables
- **react-dom**: Permite renderizar componentes React en el DOM del navegador

#### React Router DOM

npm install react-router-dom

Maneja la navegación entre páginas sin recargar el navegador:
- `/` → Página principal
- `/login` → Inicio de sesión
- `/usuario` → Panel de usuario
- `/admin` → Panel de administrador

#### Lucide React

npm install lucide-react

Biblioteca de iconos SVG escalables y personalizables:
- Más de 1000 iconos disponibles
- Totalmente vectoriales (no se pixelan)
- Ligeros y optimizados

### Dependencias de Desarrollo

#### TypeScript

npm install -D typescript @types/react @types/react-dom

Añade tipado estático al proyecto:
- Detección de errores en tiempo de desarrollo
- Mejor autocompletado (IntelliSense)
- Documentación automática del código
- Refactorización más segura

#### Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

Framework CSS basado en clases utilitarias:
- Desarrollo más rápido
- Diseño responsive por defecto
- Personalizable
- Sin CSS no utilizado en producción

## Comandos Disponibles

### Modo Desarrollo

npm run dev

Inicia el servidor de desarrollo en `http://localhost:5173`

## 📁 Estructura del Proyecto

trueques_bolivia_frontend/
├── public/               # Archivos públicos estáticos
│   ├── trueque_logo.jpg
│   └── vite.svg
├── src/
│   ├── MainP/           # Pantalla principal
│   │   └── MainScreen.tsx
│   ├── assets/          # Recursos (imágenes, iconos)
│   ├── components/      # Componentes reutilizables
│   │   ├── ArticleCard.tsx      # Tarjeta de artículo
│   │   ├── ArticleList.tsx      # Lista de artículos
│   │   ├── DashboardAdmin.tsx   # Panel administrador
│   │   ├── DashboardUsuario.tsx # Panel usuario
│   │   ├── LoginForm.tsx        # Formulario login
│   │   ├── Navbar.tsx           # Barra de navegación
│   │   └── Sidebar.tsx          # Menú lateral
│   ├── pages/           # Páginas principales
│   │   ├── AdminPage.tsx
│   │   ├── Home.tsx
│   │   ├── LoginPage.tsx
│   │   └── UsuarioPage.tsx
│   ├── services/        # Servicios API
│   │   └── authService.ts       # Autenticación
│   ├── types/           # Tipos TypeScript
│   │   └── index.ts
│   ├── App.tsx          # Componente raíz
│   ├── main.tsx         # Punto de entrada
│   └── index.css        # Estilos globales
├── .env                 # Variables de entorno
├── package.json         # Dependencias
├── tailwind.config.js   # Configuración Tailwind
├── tsconfig.json        # Configuración TypeScript
└── vite.config.ts       # Configuración Vite


## Características Principales

### Para Usuarios
-  Registro e inicio de sesión
-  Publicación de artículos para trueque
-  Búsqueda y filtrado por categorías
-  Sistema de comentarios
-  Envío y recepción de ofertas
-  Panel de perfil personalizado

###  Para Administradores
-  Dashboard administrativo
-  Gestión de usuarios
-  Moderación de publicaciones
-  Gestión de categorías

###  Técnicas
-  Diseño responsive (móvil, tablet, desktop)
-  Carga rápida con Vite
-  Rutas protegidas por autenticación
-  Componentes modulares y reutilizables
-  Gestión de estado eficiente


##  Autenticación

El sistema utiliza autenticación basada en JWT:

1. El usuario ingresa credenciales en `LoginForm`
2. `authService` envía la petición al backend
3. El backend retorna un token JWT
4. El token se almacena localmente
5. Las peticiones posteriores incluyen el token en los headers

## Conexión con el Backend

El frontend se comunica con el backend mediante una API REST:

```typescript
// Ejemplo de petición
const response = await fetch(`${VITE_API_URL}/productos`, {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});
```

## Personalización de Estilos

### Tailwind CSS
Los estilos se definen mediante clases utilitarias:

```tsx
<div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
  Contenido
</div>
```

### Estilos Personalizados
Modifica `tailwind.config.js` para personalizar colores, fuentes, etc:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#your-color',
      }
    }
  }
}
```

##  Solución de Problemas

### Error: "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
```
### Puerto 5173 ocupado
Cambia el puerto en `vite.config.ts`:
```typescript
export default defineConfig({
  server: {
    port: 3001
  }
})
```
### Errores de TypeScript
Verifica que todos los tipos estén correctamente definidos en `src/types/`

##  Contribución

Si deseas contribuir al proyecto:

1. Haz un fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

---

## Licencia

Este proyecto es parte de un trabajo académico de desarrollo de software.

## Contacto

Para dudas o sugerencias sobre el frontend:
- **Proyecto**: Trueques Bolivia
- **Repositorio**: [GitHub](https://github.com/tu-usuario/trueques-bolivia-frontend)


## Agradecimientos

- Equipo de desarrollo de React
- Comunidad de Tailwind CSS
- Documentación de TypeScript
- Desarrolladores de Vite

**Desarrollado en Bolivia**