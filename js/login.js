const usuarioValido = "admin@email.com";
const contrasenaValida = "12345";

const formulario = document.getElementById("loginForm");
const areaMensaje = document.getElementById("mensaje");

// Cargar usuario guardado al iniciar
document.addEventListener("DOMContentLoaded", function() {
    const usuarioGuardado = localStorage.getItem("usuarioGuardado");
    if (usuarioGuardado) {
        const emailInput = document.getElementById("email");
        if (emailInput) emailInput.value = usuarioGuardado;
        console.log("Usuario guardado cargado:", usuarioGuardado);
    }
});

// botón olvidar
const btnOlvidar = document.getElementById("btnOlvidar");
if (btnOlvidar) {
    btnOlvidar.addEventListener("click", function() {
        localStorage.removeItem("usuarioGuardado");
        const emailInput = document.getElementById("email");
        if (emailInput) emailInput.value = "";
        
        areaMensaje.innerHTML = `<div class="alert alert-info" role="alert">
            Usuario olvidado.
        </div>`;
    });
}

formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    const usuario = document.getElementById("email").value;
    const contrasena = document.getElementById("password").value;

    if (usuario === usuarioValido && contrasena === contrasenaValida) {
        console.log("Inicio de sesión exitoso");
        console.log("Usuario:", usuario);

        localStorage.setItem("usuarioGuardado", usuario);
        console.log("Usuario guardado:", usuario);

        areaMensaje.innerHTML = `<div class="alert alert-success" role="alert">
            Inicio de sesión exitoso. ¡Bienvenido, ${usuario}!
        </div>`;

        // Redireccionar
        setTimeout(() => {
            window.location.href = "menu.html";
        }, 1000);
    } else {
        console.log("Error de inicio de sesión");
        console.log("Usuario ingresado:", usuario);
        console.log("Contraseña ingresada:", contrasena);

        areaMensaje.innerHTML = `<div class="alert alert-danger" role="alert">
            Usuario o contraseña incorrectos. Por favor, inténtelo de nuevo.
        </div>`;
    }
});


console.log("Sistema inicializado");
console.log("Esperando interacción del usuario");
console.log("Usuario válido: " + usuarioValido);
console.log("Contraseña válida: " + contrasenaValida);
