const usuarioValido = "admin@email.com";
const contrasenaValida = "12345";

// Cargar usuario guardado al iniciar
$(document).ready(function() {
    const usuarioGuardado = localStorage.getItem("usuarioGuardado");
    if (usuarioGuardado) {
        $('#email').val(usuarioGuardado);
        console.log("Usuario guardado cargado:", usuarioGuardado);
    }
});

// botón olvidar
$('#btnOlvidar').click(function() {
    localStorage.removeItem("usuarioGuardado");
    $('#email').val("");
    $('#mensaje').html('<div class="alert alert-info" role="alert">Usuario olvidado.</div>');
});

// Formulario
$('#loginForm').submit(function(event) {
    event.preventDefault();
    const email = $('#email').val();
    const password = $('#password').val();

    if (email === usuarioValido && password === contrasenaValida) {
        localStorage.setItem("usuarioGuardado", email);
        $('#mensaje').html('<div class="alert alert-success" role="alert">Inicio de sesión exitoso.</div>');
        setTimeout(() => {
            window.location.href = "menu.html";
        }, 1000);
    } else {
        $('#mensaje').html('<div class="alert alert-danger" role="alert">Usuario o contraseña incorrectos.</div>');
    }
});

