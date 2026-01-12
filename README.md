# 💳 Alke Wallet

Aplicación web de billetera virtual desarrollada como proyecto educativo para el aprendizaje de jQuery y manipulación del DOM.

## 📋 Descripción

Este proyecto es una evolución del Laboratorio 5 (L5) al Laboratorio 6 (L6), donde se migró el código JavaScript vanilla a jQuery, implementando mejores prácticas y funcionalidades adicionales solicitadas en el desafío.

La aplicación simula una billetera digital básica que permite a los usuarios gestionar su dinero virtual, realizar depósitos, enviar dinero a contactos y ver el historial de transacciones.

## ✨ Características Principales

- 🔐 **Sistema de autenticación** con localStorage
- 💰 **Gestión de saldo** en tiempo real
- 📤 **Envío de dinero** a contactos guardados
- 💵 **Depósitos** con actualización inmediata del saldo
- 📊 **Historial de transacciones** con filtros
- 👥 **Agenda de contactos** con validación de CBU
- 🔍 **Búsqueda de contactos** en tiempo real
- 🎨 **Diseño responsivo** con Bootstrap 5

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura de las páginas
- **CSS3** - Estilos personalizados con variables CSS
- **Bootstrap 5.3.8** - Framework CSS para diseño responsivo
- **JavaScript ES6** - Lógica de la aplicación
- **jQuery 3.7.1** - Manipulación del DOM y eventos
- **LocalStorage** - Persistencia de datos en el navegador

## 📁 Estructura del Proyecto

```
Alke-Wallet/
│
├── index.html              # Página de inicio
├── login.html              # Inicio de sesión
├── menu.html               # Menú principal
├── deposit.html            # Página de depósitos
├── sendmoney.html          # Página de envío de dinero
├── transactions.html       # Historial de transacciones
│
├── css/
│   └── style.css          # Estilos personalizados
│
└── js/
    ├── login.js           # Lógica de autenticación
    └── script.js          # Lógica principal de la app
```

## 🚀 Instalación y Uso

### Requisitos Previos

- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- No requiere instalación de servidor

### Pasos para Ejecutar

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/Alke-Wallet.git
   ```

2. **Navegar al directorio**
   ```bash
   cd Alke Wallet
   ```

3. **Abrir en el navegador**
   - Abre el archivo `index.html` en tu navegador
   - O usa Live Server en VS Code para mejor experiencia

### Credenciales de Prueba

```
Email: admin@email.com
Contraseña: 12345
```

## 📱 Funcionalidades Implementadas

### Login (login.html)
- ✅ Inicio de sesión con validación
- ✅ Recordar usuario con localStorage
- ✅ Opción para olvidar usuario guardado
- ✅ Alertas de Bootstrap para feedback
- ✅ Migrado a jQuery

### Menú Principal (menu.html)
- ✅ Visualización del saldo actual
- ✅ Botones de navegación principales
- ✅ Alertas de redirección antes de cambiar de página
- ✅ Cerrar sesión

### Depósitos (deposit.html)
- ✅ Formulario de depósito
- ✅ Validación de montos
- ✅ Actualización del saldo en tiempo real
- ✅ Registro en historial de transacciones
- ✅ Redirección automática después del depósito
- ✅ Migrado a jQuery

### Envío de Dinero (sendmoney.html)
- ✅ Selección de contacto desde agenda
- ✅ **Buscador de contactos** en tiempo real
- ✅ **Mostrar/ocultar botón** "Enviar dinero" según selección
- ✅ **Resaltado visual** del contacto seleccionado
- ✅ Modal de confirmación antes de enviar
- ✅ Validación de saldo insuficiente
- ✅ Validación de CBU (22 dígitos)
- ✅ Agregar nuevos contactos
- ✅ Migrado a jQuery

### Transacciones (transactions.html)
- ✅ Listado de todas las transacciones
- ✅ **Filtro por tipo** (Todos / Ingresos / Egresos)
- ✅ **Tipos de transacción legibles** (Depósito, Transferencia enviada, etc.)
- ✅ Mostrar fecha y hora de cada transacción
- ✅ Colores diferenciados (verde para ingresos, rojo para egresos)
- ✅ Botón para borrar historial
- ✅ Migrado a jQuery

## 🎯 Cambios de L5 a L6 (JavaScript Vanilla → jQuery)

### Principales Modificaciones

| Antes (Vanilla JS) | Después (jQuery) |
|-------------------|------------------|
| `document.getElementById()` | `$('#id')` |
| `document.querySelector()` | `$('.class')` |
| `.addEventListener()` | `.click()`, `.submit()`, `.change()` |
| `.innerHTML` | `.html()` |
| `.textContent` | `.text()` |
| `.value` | `.val()` |
| `document.createElement()` | `$('<elemento>')` |
| `.appendChild()` | `.append()` |
| `.setAttribute()` | `.attr()` |

### Nuevas Funcionalidades Agregadas en L6

1. **Búsqueda de contactos** - Filtrado en tiempo real
2. **Mostrar/ocultar botón dinámicamente** - Según selección de contacto
3. **Resaltado visual** - Feedback visual al seleccionar contacto
4. **Filtro de transacciones** - Por tipo (ingresos/egresos)
5. **Tipos de transacción legibles** - Mejor UX en el historial
6. **Alertas de redirección** - En el menú principal

## 🎨 Diseño

El proyecto utiliza una paleta de colores vibrante inspirada en aplicaciones fintech modernas:

- **Rosa (#ff6ec4)** - Color principal
- **Púrpura (#6e00ff)** - Color secundario
- **Cyan (#00ffe7)** - Botones secundarios
- **Verde (#76ff03)** - Ingresos y éxito
- **Rojo (#ff0044)** - Egresos y errores

### Características del Diseño

- ✨ Animaciones suaves con jQuery (`.fadeIn()`, `.fadeOut()`)
- 🌙 Tema oscuro por defecto
- 📱 Totalmente responsive
- 🎭 Efectos de hover y focus
- 🔔 Sistema de alertas no intrusivo

## 📝 Notas del Desarrollo

### Decisiones de Diseño

- **localStorage** para persistencia de datos (no requiere backend)
- **Bootstrap** para acelerar el desarrollo responsive
- **jQuery** para simplificar la manipulación del DOM
- **Validaciones del lado del cliente** para mejor UX

### Limitaciones Conocidas

- Los datos se pierden al limpiar el localStorage
- No hay backend real (simulación en frontend)
- Las transacciones no son persistentes entre dispositivos
- CBU solo valida formato (22 dígitos), no checksum real

## 🔮 Mejoras Futuras

- [ ] Integración con API backend
- [ ] Autenticación con JWT
- [ ] Base de datos real
- [ ] Notificaciones push
- [ ] Exportar historial a PDF/CSV
- [ ] Modo claro/oscuro toggle
- [ ] Gráficos de gastos e ingresos
- [ ] Categorías de transacciones

## 👨‍💻 Autor

Proyecto desarrollado como parte del curso de Desarrollo Web - Laboratorio 6

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

⭐ **Si te gustó el proyecto, no olvides darle una estrella en GitHub!**

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Contacto

Para preguntas o sugerencias sobre el proyecto, puedes abrir un issue en GitHub.

---

**💡 Proyecto Educativo** - Desarrollado con fines de aprendizaje de jQuery y desarrollo web fullstack.