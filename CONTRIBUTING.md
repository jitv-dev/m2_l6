# 🤝 Guía de Contribución

¡Gracias por tu interés en contribuir a Billetera Digital! Este documento te guiará a través del proceso.

## 📋 Tabla de Contenidos

- [Código de Conducta](#código-de-conducta)
- [¿Cómo puedo contribuir?](#cómo-puedo-contribuir)
- [Configuración del Entorno](#configuración-del-entorno)
- [Estándares de Código](#estándares-de-código)
- [Proceso de Pull Request](#proceso-de-pull-request)

## 📜 Código de Conducta

Este proyecto se adhiere a un código de conducta. Al participar, se espera que mantengas un ambiente respetuoso y colaborativo.

## 🎯 ¿Cómo puedo contribuir?

### Reportar Bugs

Si encuentras un bug, por favor crea un issue incluyendo:

- Descripción clara del problema
- Pasos para reproducir el error
- Comportamiento esperado vs. comportamiento actual
- Capturas de pantalla si es relevante
- Navegador y versión utilizada

### Sugerir Mejoras

Para sugerir nuevas funcionalidades:

- Verifica que no exista un issue similar
- Describe claramente la funcionalidad
- Explica por qué sería útil
- Incluye ejemplos de uso si es posible

### Tu Primera Contribución

¿Primera vez contribuyendo? Busca issues etiquetados con:
- `good first issue` - Problemas ideales para principiantes
- `help wanted` - Áreas donde se necesita ayuda

## 🛠️ Configuración del Entorno

1. **Fork el repositorio**
   ```bash
   # Haz clic en el botón "Fork" en GitHub
   ```

2. **Clona tu fork**
   ```bash
   git clone https://github.com/TU-USUARIO/billetera-digital.git
   cd billetera-digital
   ```

3. **Configura el repositorio original como upstream**
   ```bash
   git remote add upstream https://github.com/USUARIO-ORIGINAL/billetera-digital.git
   ```

4. **Abre el proyecto**
   - Usa Live Server en VS Code
   - O simplemente abre `index.html` en tu navegador

## 📝 Estándares de Código

### JavaScript / jQuery

```javascript
// ✅ BIEN: Usa jQuery
$('#elemento').text('Nuevo texto');

// ❌ MAL: No mezcles con vanilla JS sin razón
document.getElementById('elemento').textContent = 'Nuevo texto';

// ✅ BIEN: Nombres descriptivos en español (consistencia del proyecto)
function guardarTransaccion(descripcion, monto, esIngreso) {
    // ...
}

// ✅ BIEN: Comentarios claros
// Filtrar transacciones por tipo
const transaccionesFiltradas = historial.filter(t => t.esIngreso);

// ✅ BIEN: Manejo de errores
if (monto <= 0 || isNaN(monto)) {
    mostrarAlerta('El monto debe ser mayor a 0', 'warning');
    return;
}
```

### HTML

```html
<!-- ✅ BIEN: Usa clases de Bootstrap -->
<button class="wallet-btn w-100 text-center py-2">Enviar</button>

<!-- ✅ BIEN: IDs en kebab-case -->
<div id="alerta-contenedor"></div>

<!-- ✅ BIEN: Atributos data para jQuery -->
<option data-nombre="Juan" data-alias="juan.perez">Juan Pérez</option>
```

### CSS

```css
/* ✅ BIEN: Usa variables CSS existentes */
.nuevo-elemento {
    background-color: var(--wallet-dark);
    border: 2px solid var(--wallet-pink);
    color: var(--wallet-light);
}

/* ✅ BIEN: Nomenclatura consistente con el proyecto */
.wallet-nuevo-boton {
    /* ... */
}
```

## 🔄 Proceso de Pull Request

### 1. Crea una rama

```bash
git checkout -b feature/nombre-descriptivo
# o
git checkout -b fix/descripcion-del-bug
```

### 2. Realiza tus cambios

- Escribe código limpio y documentado
- Prueba tus cambios en diferentes navegadores
- Asegúrate de que todo funcione correctamente

### 3. Commit tus cambios

```bash
git add .
git commit -m "Add: descripción clara del cambio"
```

**Prefijos de commit:**
- `Add:` - Nueva funcionalidad
- `Fix:` - Corrección de bug
- `Update:` - Actualización de funcionalidad existente
- `Remove:` - Eliminación de código
- `Refactor:` - Refactorización sin cambiar funcionalidad
- `Docs:` - Cambios en documentación
- `Style:` - Cambios de formato (CSS, indentación)

### 4. Push a tu fork

```bash
git push origin feature/nombre-descriptivo
```

### 5. Abre un Pull Request

- Ve a tu fork en GitHub
- Haz clic en "Compare & pull request"
- Describe claramente qué cambios realizaste y por qué
- Referencia cualquier issue relacionado

## ✅ Checklist antes de enviar PR

- [ ] Mi código sigue el estilo del proyecto
- [ ] He probado mis cambios en Chrome, Firefox y Edge
- [ ] He agregado comentarios donde el código es complejo
- [ ] Mis cambios no generan nuevos warnings
- [ ] He actualizado la documentación si es necesario
- [ ] He probado en móvil y desktop (responsive)

## 🎨 Estructura de Archivos

Al agregar nuevos archivos, sigue esta estructura:

```
billetera-digital/
├── index.html
├── login.html
├── menu.html
├── [tu-nueva-pagina].html    # Nueva página aquí
│
├── css/
│   └── style.css              # Todos los estilos aquí
│
└── js/
    ├── login.js               # Lógica de login
    ├── script.js              # Lógica principal
    └── [tu-nuevo-script].js   # Nuevo script aquí (si es necesario)
```

## 🐛 Debugging

Si encuentras problemas:

1. **Revisa la consola del navegador** (F12)
2. **Verifica que jQuery esté cargado** antes de tus scripts
3. **Usa `console.log()`** para depurar
4. **Revisa que los IDs y clases coincidan** entre HTML y JS

## 💡 Tips

- **Mantén los PRs pequeños** - Es más fácil revisar cambios pequeños
- **Un PR = Una funcionalidad** - No mezcles múltiples features
- **Comunica** - Si tienes dudas, pregunta en el issue
- **Sé paciente** - Las revisiones pueden tomar tiempo

## 📞 ¿Necesitas Ayuda?

- Abre un issue con tu pregunta
- Etiquétalo como `question`
- Sé específico sobre lo que necesitas

---

¡Gracias por contribuir! 😊