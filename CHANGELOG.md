# Changelog

Todos los cambios notables de este proyecto serán documentados en este archivo.

## [L6] - 2026-01-11

### ✨ Agregado
- Migración completa de JavaScript vanilla a jQuery
- Búsqueda en tiempo real de contactos en la agenda
- Mostrar/ocultar botón "Enviar dinero" dinámicamente según selección
- Resaltado visual del contacto seleccionado (borde verde + sombra)
- Filtro de transacciones por tipo (Todos / Ingresos / Egresos)
- Tipos de transacción en formato legible (Depósito, Transferencia enviada, etc.)
- Alertas de redirección en el menú principal
- Validación mejorada de CBU (22 dígitos numéricos)
- Animaciones suaves con jQuery (fadeIn, fadeOut)
- Archivo README.md completo
- Archivo .gitignore
- Archivo CHANGELOG.md

### 🔄 Cambiado
- `document.getElementById()` → `$('#id')`
- `document.querySelector()` → `$('.class')`
- `.addEventListener()` → `.click()`, `.submit()`, `.change()`
- `.innerHTML` → `.html()`
- `.textContent` → `.text()`
- `.value` → `.val()`
- `document.createElement()` → `$('<elemento>')`
- Función `cargarHistorial()` ahora acepta parámetro de filtro
- Estructura de contactos incluye atributo `data-alias` para búsqueda

### 🐛 Corregido
- Contenedor de alertas faltante en menu.html
- jQuery no cargado en algunos archivos HTML
- Inconsistencias en nombres de variables
- Filtro de transacciones no aplicaba después de borrar historial

### 📝 Mejorado
- Código más limpio y legible con jQuery
- Menos líneas de código
- Mejor manejo de errores
- UX mejorada con feedback visual
- Comentarios más descriptivos en el código

## [L5] - 2026-01-05

### ✨ Inicial
- Sistema de login con localStorage
- Gestión de saldo
- Formulario de depósitos
- Envío de dinero a contactos
- Historial de transacciones
- Agregar contactos a la agenda
- Validación de formularios
- Diseño responsive con Bootstrap
- Tema oscuro personalizado