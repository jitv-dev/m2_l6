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

function getTipoTransaccion(transaccion) {
    if (transaccion.descripcion.includes('Depósito')) {
        return 'Depósito';
    } else if (transaccion.descripcion.includes('Envío')) {
        return 'Transferencia enviada';
    } else if (transaccion.esIngreso) {
        return 'Transferencia recibida';
    } else {
        return 'Compra';
    }
}

function cargarHistorial(filtro = 'todos') {
    // Obtener todas las transacciones del localStorage
    const historial = JSON.parse(localStorage.getItem('historial')) || [];

    // Variable para guardar las transacciones filtradas
    let transaccionesFiltradas = historial;

    // Aplicar el filtro según lo seleccionado
    if (filtro === 'ingreso') {
        transaccionesFiltradas = historial.filter(t => t.esIngreso === true);
    } else if (filtro === 'egreso') {
        transaccionesFiltradas = historial.filter(t => t.esIngreso === false);
    }

    // Si no hay transacciones, mostrar mensaje
    if (transaccionesFiltradas.length === 0) {
        $('#lista-transacciones').html('<p class="text-center text-muted">No hay movimientos registrados.</p>');
        return;
    }

    // Construir el HTML con las transacciones
    let htmlTransacciones = '';
    transaccionesFiltradas.forEach(t => {
        const signo = t.esIngreso ? '+' : '-';
        const color = t.esIngreso ? 'wallet-amount-positive' : 'wallet-amount-negative';
        const tipo = getTipoTransaccion(t);

        htmlTransacciones += `
            <div class="card wallet-card mb-3">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 class="mb-1">${t.descripcion}</h6>
                            <small class="text-muted">${tipo} - ${t.fecha}</small>
                        </div>
                        <h5 class="mb-0 ${color}">${signo}$${t.monto.toLocaleString('es-CL')}</h5>
                    </div>
                </div>
            </div>`;
    });

    $('#lista-transacciones').html(htmlTransacciones);
}

$('#filtro-tipo').change(function () {
    const filtroSeleccionado = $(this).val();
    cargarHistorial(filtroSeleccionado);
});

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

    // No me gusta como queda, pero el ejercicio lo pide
    setTimeout(() => {
        window.location.href = 'menu.html';
    }, 2000)
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

    // Validacion CBU 22 digitos
    if (cbu.length !== 22 || !/^\d+$/.test(cbu)) {
        mostrarAlerta('El CBU debe tener exactamente 22 dígitos', 'warning');
        return;
    }

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

// Buscador
$('#buscar-contacto').on('input', function () {
    const terminoBusqueda = $(this).val().toLowerCase();
    const select = $('#select-contacto');

    // Resetear
    select.val('');
    $('#btn-enviar-dinero').hide();

    // Filtrar opciones
    select.find('option').each(function () {
        const texto = $(this).text().toLowerCase();
        const valor = $(this).val();

        if (valor === '' || texto.includes(terminoBusqueda)) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
});

// Mostrar u ocultar boton envio dinero
$('#select-contacto').change(function () {
    const valorSeleccionado = $(this).val();

    if (valorSeleccionado !== '') {
        $('#btn-enviar-dinero').fadeIn(300);
        $(this).addClass('contacto-seleccionado');
    } else {
        $('#btn-enviar-dinero').fadeOut(300);
        $(this).removeClass('contacto-seleccionado');
    }
});

// Cargar contactos al iniciar
$(window).on('load', function () {
    const contactos = JSON.parse(localStorage.getItem('contactos')) || [];
    const select = $('#select-contacto');

    contactos.forEach((contacto, index) => {
        const option = $('<option>')
            .val(`guardado-${index}`)
            .attr('data-nombre', contacto.nombre)
            .attr('data-alias', contacto.alias)
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
