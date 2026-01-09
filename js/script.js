// SEGURIDAD: VERIFICAR SESIÓN
const paginaActual = window.location.pathname;
if (!localStorage.getItem('usuarioGuardado') && !paginaActual.includes('index.html')) {
    window.location.href = 'login.html';
}

// ALERTA DE BOOTSTRAP
function mostrarAlerta(mensaje, tipo = 'success') {
    const alertaHTML = `
        <div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
            ${mensaje}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;

    const contenedor = document.getElementById('alerta-contenedor');
    if (contenedor) {
        contenedor.innerHTML = alertaHTML;

        // Autoeliminar después de 3 segundos
        setTimeout(() => {
            const alerta = contenedor.querySelector('.alert');
            if (alerta) {
                alerta.remove();
            }
        }, 3000);
    }
}

// MANEJO DE SALDO
function obtenerSaldo() {
    const saldo = localStorage.getItem('saldo');
    return saldo ? parseFloat(saldo) : 20000;
}

function guardarSaldo(nuevoSaldo) {
    localStorage.setItem('saldo', nuevoSaldo);
}

function mostrarSaldo() {
    const saldoActual = obtenerSaldo();
    const elementosSaldo = document.querySelectorAll('#saldo-actual');

    elementosSaldo.forEach(elemento => {
        elemento.textContent = saldoActual.toLocaleString('es-CL');
    });
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
    const lista = document.getElementById('lista-transacciones');
    if (!lista) return;

    const historial = JSON.parse(localStorage.getItem('historial')) || [];
    lista.innerHTML = '';

    if (historial.length === 0) {
        lista.innerHTML = '<p class="text-center text-muted">No hay movimientos registrados.</p>';
        return;
    }

    historial.forEach(t => {
        const signo = t.esIngreso ? '+' : '-';
        const color = t.esIngreso ? 'wallet-amount-positive' : 'wallet-amount-negative';
        
        lista.innerHTML += `
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
}

document.addEventListener('DOMContentLoaded', function () {
    mostrarSaldo();
    cargarHistorial();
});

const listaTransacciones = document.getElementById('lista-transacciones');

// Depositar
const formDeposito = document.getElementById('form-deposito');
if (formDeposito) {
    formDeposito.addEventListener('submit', function (e) {
        e.preventDefault();

        const monto = parseFloat(document.getElementById('monto-deposito').value);

        if (monto > 0) {
            const saldoActual = obtenerSaldo();
            const nuevoSaldo = saldoActual + monto;

            guardarSaldo(nuevoSaldo);
            mostrarSaldo();

            // Guardar en historial
            guardarTransaccion('Depósito en cuenta', monto, true);

            mostrarAlerta(`¡Depósito exitoso! Nuevo saldo: $${nuevoSaldo.toLocaleString('es-CL')}`);
            formDeposito.reset();
        }
    });
}

// Enviar platita
const formEnvio = document.getElementById('form-envio');
let transaccionPendiente = null; 

if (formEnvio) {
    formEnvio.addEventListener('submit', function (e) {
        e.preventDefault();

        const select = document.getElementById('select-contacto');
        const selectedOption = select.options[select.selectedIndex];
        const nombreContacto = selectedOption.getAttribute('data-nombre');
        const monto = parseFloat(document.getElementById('monto-envio').value);
        const saldoActual = obtenerSaldo();

        if (!select.value) {
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

        // Guardamos los datos temporalmente y mostramos el modal
        transaccionPendiente = {
            nombre: nombreContacto,
            monto: monto,
            saldoActual: saldoActual
        };

        document.getElementById('conf-nombre').textContent = nombreContacto;
        document.getElementById('conf-monto').textContent = `$${monto.toLocaleString('es-CL')}`;

        const modal = new bootstrap.Modal(document.getElementById('modalConfirmarEnvio'));
        modal.show();
    });
}

// Lógica del botón de confirmación dentro del modal
const btnConfirmarEnvio = document.getElementById('btn-confirmar-envio');
if (btnConfirmarEnvio) {
    btnConfirmarEnvio.addEventListener('click', function() {
        if (!transaccionPendiente) return;

        const { nombre, monto, saldoActual } = transaccionPendiente;
        const nuevoSaldo = saldoActual - monto;

        guardarSaldo(nuevoSaldo);
        mostrarSaldo();

        // Guardar en historial
        guardarTransaccion(`Envío a ${nombre}`, monto, false);

        mostrarAlerta(`¡Envío exitoso! Nuevo saldo: $${nuevoSaldo.toLocaleString('es-CL')}`);
        
        // Cerrar modal y limpiar
        const modalEl = document.getElementById('modalConfirmarEnvio');
        const modal = bootstrap.Modal.getInstance(modalEl);
        modal.hide();
        
        if (formEnvio) formEnvio.reset();
        transaccionPendiente = null;
    });
}

// contacto
const formContacto = document.getElementById('form-nuevo-contacto');
if (formContacto) {
    formContacto.addEventListener('submit', function (e) {
        e.preventDefault();

        // valores del formulario
        const nombre = document.getElementById('nombre-contacto').value;
        const alias = document.getElementById('alias-contacto').value;
        const banco = document.getElementById('banco-contacto').value;

        const contacto = { nombre, alias, banco };
        const contactos = JSON.parse(localStorage.getItem('contactos')) || [];
        contactos.push(contacto);

        // Guardar la lista de contactos en el localStorage
        localStorage.setItem('contactos', JSON.stringify(contactos));

        // Crear una nueva opción en el select de contactos
        const select = document.getElementById('select-contacto');
        const option = document.createElement('option');
        option.value = Date.now().toString();
        option.setAttribute('data-nombre', nombre);
        option.textContent = `${nombre} - Alias: ${alias} - ${banco}`;
        select.appendChild(option);

        formContacto.reset();
        const modal = bootstrap.Modal.getInstance(document.getElementById('modalAgregarContacto'));
        modal.hide();

        mostrarAlerta('¡Contacto agregado exitosamente!');
    });
}

// Cargar la lista de contactos en el select de contactos al cargar la página
window.addEventListener('load', function () {
    const contactos = JSON.parse(localStorage.getItem('contactos')) || [];

    const select = document.getElementById('select-contacto');
    if (select) {
        contactos.forEach((contacto, index) => {
            const option = document.createElement('option');
            option.value = `guardado-${index}`;
            option.setAttribute('data-nombre', contacto.nombre);
            option.textContent = `${contacto.nombre} - Alias: ${contacto.alias} - ${contacto.banco}`;
            select.appendChild(option);
        });
    }
});

// Cerrar sesion
const btnCerrarSesion = document.getElementById('btn-logout');
if (btnCerrarSesion) {
    btnCerrarSesion.addEventListener('click', function() {
        localStorage.removeItem('usuarioGuardado');
    });
}

// Borrar histoirial
const btnBorrarHistorial = document.getElementById('btn-borrar-historial');
if (btnBorrarHistorial) {
    btnBorrarHistorial.addEventListener('click', function() {
        localStorage.removeItem('historial');
        cargarHistorial();
        mostrarAlerta('Historial eliminado correctamente.');
    });
}
