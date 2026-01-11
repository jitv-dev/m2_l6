// Redireccion a login si no se inicio sesion
const paginaActual = window.location.pathname;
if (!localStorage.getItem('usuarioGuardado') && !paginaActual.includes('index.html')) {
    window.location.href = 'login.html';
}

// Alerta Bootstrap
function mostrarAlerta(mensaje, tipo = 'success') {
    const alertaHTML = `
        <div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
            ${mensaje}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;

    $('#alerta-contenedor').html(alertaHTML);

    // Autoeliminar despues de 3 segundos
    setTimeout(() => {
        $('#alerta-contenedor .alert').remove();
    }, 3000);
}

// Manejo de saldo
function obtenerSaldo() {
    const saldo = localStorage.getItem('saldo');
    return saldo ? parseFloat(saldo) : 20000;
}

function guardarSaldo(nuevoSaldo) {
    localStorage.setItem('saldo', nuevoSaldo);
}

function mostrarSaldo() {
    const saldoActual = obtenerSaldo();
    $('#saldo-actual').text(saldoActual.toLocaleString('es-CL'));
}

function guardarTransaccion(descripcion, monto, esIngreso) {
    const fecha = new Date();
    // Formato simple: 05/01/2025 - 14:30
    const fechaFormateada = `${fecha.getDate().toString().padStart(2, '0')}/${(fecha.getMonth() + 1).toString().padStart(2, '0')}/${fecha.getFullYear()} - ${fecha.getHours().toString().padStart(2, '0')}:${fecha.getMinutes().toString().padStart(2, '0')}`;

    const nuevaTransaccion = {
        descripcion: descripcion,
        monto: monto,
        fecha: fechaFormateada,
        esIngreso: esIngreso
    };

    // Obtener historial actual o crear uno nuevo
    const historial = JSON.parse(localStorage.getItem('historial')) || [];
    historial.unshift(nuevaTransaccion);
    localStorage.setItem('historial', JSON.stringify(historial));
}

function cargarHistorial() {
    const historial = JSON.parse(localStorage.getItem('historial')) || [];

    if (historial.length === 0) {
        $('#lista-transacciones').html('<p class="text-center text-muted">No hay movimientos registrados.</p>');
        return;
    }

    let htmlTransacciones = '';
    historial.forEach(t => {
        const signo = t.esIngreso ? '+' : '-';
        const color = t.esIngreso ? 'wallet-amount-positive' : 'wallet-amount-negative';

        htmlTransacciones += `
            <div class="card wallet-card mb-3">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 class="mb-1">${t.descripcion}</h6>
                            <small class="text-muted">${t.fecha}</small>
                        </div>
                        <h5 class="mb-0 ${color}">${signo}$${t.monto.toLocaleString('es-CL')}</h5>
                    </div>
                </div>
            </div>`;
    });

    $('#lista-transacciones').html(htmlTransacciones);
}

$(document).ready(function () {
    mostrarSaldo();
    cargarHistorial();
});

// Alertas al cambiar en el menu
$('a[href="deposit.html"]').click(function (e) {
    if ($(this).parent().hasClass('d-grid')) {
        e.preventDefault();
        mostrarAlerta('Redirigiendo a depositar...', 'info');
        setTimeout(() => {
            window.location.href = 'deposit.html';
        }, 1000);
    }
});

$('a[href="sendmoney.html"]').click(function (e) {
    if ($(this).parent().hasClass('d-grid')) {
        e.preventDefault();
        mostrarAlerta('Redirigiendo a enviar dinero...', 'info');
        setTimeout(() => {
            window.location.href = 'sendmoney.html';
        }, 1000);
    }
});

$('a[href="transactions.html"]').click(function (e) {
    if ($(this).parent().hasClass('d-grid')) {
        e.preventDefault();
        mostrarAlerta('Redirigiendo a últimos movimientos...', 'info');
        setTimeout(() => {
            window.location.href = 'transactions.html';
        }, 1000);
    }
});


// Depositar
$('#form-deposito').submit(function (e) {
    e.preventDefault();
    const monto = parseFloat($('#monto-deposito').val());
    if (monto > 0) {
        const saldoActual = obtenerSaldo();
        const nuevoSaldo = saldoActual + monto;

        guardarSaldo(nuevoSaldo);
        mostrarSaldo();
        guardarTransaccion('Depósito en cuenta', monto, true);
        mostrarAlerta(`¡Depósito exitoso! Nuevo saldo: $${nuevoSaldo.toLocaleString('es-CL')}`);
        $('#form-deposito')[0].reset();
    }
});

// Enviar platita
let transaccionPendiente = null; 

$('#form-envio').submit(function (e) {
    e.preventDefault();

    const select = $('#select-contacto')
    const nombreContacto = select.find('option:selected').data('nombre');
    const monto = parseFloat($('#monto-envio').val());
    const saldoActual = obtenerSaldo();

    if (!select.val()) {
        mostrarAlerta('Por favor selecciona un contacto', 'warning');
        return;
    }

    if (monto > saldoActual) {
        mostrarAlerta('Saldo insuficiente', 'danger');
        return;
    }

    if (monto <= 0 || isNaN(monto)) {
        mostrarAlerta('El monto debe ser mayor a 0', 'warning');
        return;
    }

    transaccionPendiente = {
        nombre: nombreContacto,
        monto: monto,
        saldoActual: saldoActual
    };

    $('#conf-nombre').text(nombreContacto);
    $('#conf-monto').text(`$${monto.toLocaleString('es-CL')}`);

    const modal = new bootstrap.Modal($('#modalConfirmarEnvio')[0]);
    modal.show();
});


// Boton confirmar envio saldo
$('#btn-confirmar-envio').click(function() {
    if (!transaccionPendiente) return;

    const { nombre, monto, saldoActual } = transaccionPendiente;
    const nuevoSaldo = saldoActual - monto;

    guardarSaldo(nuevoSaldo);
    mostrarSaldo();
    guardarTransaccion(`Envío a ${nombre}`, monto, false);
    mostrarAlerta(`¡Envío exitoso! Nuevo saldo: $${nuevoSaldo.toLocaleString('es-CL')}`);

    // Cerrar modal y limpiar
    const modalEl = $('#modalConfirmarEnvio')[0];
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();

    $('#form-envio')[0].reset();
    transaccionPendiente = null;
});


// Agregar contacto
$('#form-nuevo-contacto').submit(function (e) {
    e.preventDefault();
    const nombre = $('#nombre-contacto').val();
    const alias = $('#alias-contacto').val();
    const cbu = $('#cbu-contacto').val();
    const banco = $('#banco-contacto').val();

    const contacto = { nombre, alias, banco };
    const contactos = JSON.parse(localStorage.getItem('contactos')) || [];
    contactos.push(contacto);
    localStorage.setItem('contactos', JSON.stringify(contactos));

    const select = $('#select-contacto');
    const option = $('<option>')
        .val(Date.now().toString())
        .attr('data-nombre', nombre)
        .text(`${nombre} - Alias: ${alias} - ${banco}`);

    select.append(option);

    $('#form-nuevo-contacto')[0].reset();

    const modal = bootstrap.Modal.getInstance($('#modalAgregarContacto')[0]);
    modal.hide();

    mostrarAlerta('¡Contacto agregado exitosamente!');
});

// Cargar la lista de contactos en el select de contactos al cargar la página
$(window).on('load', function () {
    const contactos = JSON.parse(localStorage.getItem('contactos')) || [];
    const select = $('#select-contacto');

    contactos.forEach((contacto, index) => {
        const option = $('<option>')
            .val(`guardado-${index}`)
            .attr('data-nombre', contacto.nombre)
            .text(`${contacto.nombre} - Alias: ${contacto.alias} - ${contacto.banco}`);

        select.append(option);
    });
});

// Cerrar sesion
$('#btn-logout').click(function () {
    localStorage.removeItem('usuarioGuardado');
});

// Borrar histoirial
$('#btn-borrar-historial').click(function () {
    localStorage.removeItem('historial');
    cargarHistorial();
    mostrarAlerta('Historial eliminado correctamente.');
});
