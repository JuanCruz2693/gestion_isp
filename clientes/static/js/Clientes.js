//alta con jquery
$("#btnNuevo").click(function () {
    $("#formClientes").trigger("reset");
    $(".modal-header").css("background-color", "#28a745");
    $(".modal-header").css("color", "white");
    $(".modal-title").text("Nuevo Cliente");
    $("#btnSubmit").text("Guardar");
    $("#formClientes").attr("data-action", "guardar");
    $("#modalCRUD").modal("show");
});

$(document).ready(function () {
    $("#formClientes").on("submit", function (event) {
        event.preventDefault();

        $.ajax({
            type: "POST",
            url: "http://127.0.0.1:8000/clientes/",
            data: $(this).serialize(),
            success: function (response) {
                Swal.fire(
                    'Perfecto!',
                    response,
                    'success'
                )
                $("#modalCRUD").modal("hide")
                initDataTable()
            }
        })
    })
})


let idCliente = null;
//botón INFO  
$(document).on("click", ".btnInfo", function () {
    var fila = $(this).closest("tr");
    idCliente = fila.find('td:eq(0)').text(); // Obtener el ID del cliente

    fetch('http://127.0.0.1:8000/cargar_clientes/')
        .then(response => response.json())
        .then(data => {
            var cliente = data.clientes.find(c => c.id === parseInt(idCliente)); // Buscar el cliente por su ID
            // Actualizar los elementos del modal con los datos del cliente
            $("#id-i").text(idCliente);
            $("#dni-i").text(cliente.dni);
            $("#nombre-i").text(cliente.nombre);
            $("#apellido-i").text(cliente.apellido);
            $("#direccion-i").text(cliente.direccion);
            $("#telefono-i").text(cliente.telefono);
            $("#router-i").text(cliente.router);
            $("#numero-serie-i").text(cliente.n_serie);
            // Mostrar el estado como un icono de FontAwesome
            var estadoElement = $("#estado-i");
            estadoElement.empty(); // Limpia el contenido existente
            if (cliente.estado == 'A') {
                estadoElement.append('<i class="fas fa-check-circle text-success"></i>');
            } if (cliente.estado == 'B') {
                estadoElement.append('<i class="fas fa-times-circle text-danger"></i>');
            } if (cliente.estado == 'S') {
                estadoElement.append('<i class="fas fa-circle-exclamation text-warning"></i>')
            }
            $("#observaciones-i").text(cliente.observaciones);
            $("#fechaAlta-i").text(cliente.fecha_alta);
            $("#servicio-i").text(cliente.idServicio__tipo_plan);
            $("#monto-i").text("$" + cliente.idServicio__monto);
            $("#zona-i").text(cliente.zona__nombre);
            $("#deuda-i").text("$" + cliente.clientedeuda__monto + " " + cliente.clientedeuda__deuda__mes);

            if (cliente.estado == 'B') {
                $("#btnBaja").removeClass("btn-danger").addClass("btn-success").text("Alta");
                $("#btnBaja").attr("id", "btnAlta");
                $("#btnSuspender").show();
            } else {
                $("#btnAlta").removeClass("btn-success").addClass("btn-danger").text("Baja");
                $("#btnAlta").attr("id", "btnBaja");
                $("#btnSuspender").show();
            }

            if (cliente.estado == 'S') {
                $("#btnBaja").removeClass("btn-danger").addClass("btn-success").text("Alta");
                $("#btnBaja").attr("id", "btnAlta");
                $("#btnSuspender").hide();

            }

            $(".modal-title").text("Informacion de Cliente");
            $("#modal-info").modal("show");
        })
        .catch(error => console.error(error));
});

//boton editar
$(document).on("click", "#btnEditar", function () {
    // Obtener los valores del modal de información del cliente
    var id = $("#id-i").text().trim();
    var dni = $("#dni-i").text().trim();
    var nombre = $("#nombre-i").text().trim();
    var apellido = $("#apellido-i").text().trim();
    var direccion = $("#direccion-i").text().trim();
    var telefono = $("#telefono-i").text().trim();
    var estado = $("#estado-i").text().trim();
    console.log(estado)
    var router = $("#router-i").text().trim();
    var n_serie = $("#numero-serie-i").text().trim();
    var observaciones = $("#observaciones-i").text().trim();
    var fecha_alta = $('#fechaAlta-i').text().trim();
    var servicio = $("#servicio-i").text().trim();
    var zona = $("#zona-i").text().trim();

    // Llenar el modal de edición con los valores obtenidos
    $("#formEdicion #form-edicion-id").val(id)
    $("#formEdicion #dni").val(dni);
    $("#formEdicion #nombre").val(nombre);
    $("#formEdicion #apellido").val(apellido);
    $("#formEdicion #direccion").val(direccion);
    $("#formEdicion #telefono").val(telefono);
    $("#formEdicion #router").val(router);
    $("#formEdicion #n_serie").val(n_serie);
    $("#formEdicion #estado").val(estado);
    $("#formEdicion #observaciones").val(observaciones);
    $('#formEdicion #fecha_alta').val(fecha_alta);
    $("#formEdicion #idServicio option:contains('" + servicio + "')").prop("selected", true);
    $("#formEdicion #zona option:contains('" + zona + "')").prop("selected", true);

    $("#titulo-edicion").text("Editar Cliente");
    $("#btnSubmit").text("Guardar");
    $("#modal-edicion-crud").modal("show");

    $(document).ready(function () {
        $("#formEdicion").on("submit", function (event) {
            event.preventDefault();

            $.ajax({
                type: "POST",
                url: "http://127.0.0.1:8000/editar/",
                data: $(this).serialize(),
                success: function (response) {
                    console.log(response)
                    Swal.fire(
                        'Perfecto!',
                        response.success,
                        'success'
                    )
                    $("#modal-edicion-crud").modal("hide")
                    $("#modal-info").modal("hide")
                }
            })
        })
    })


});

$(document).on("click", "#btnBaja", async function () {
    var id = $("#id-i").text().trim();

    try {
        Swal.fire({
            title: 'Estas seguro?',
            text: "Estas por dar de baja un cliente",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, realizar baja!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                const csrfToken = $("meta[name=csrf-token]").attr("value");  // Obtener el token CSRF
                console.log(csrfToken)
                const response = fetch(`http://127.0.0.1:8000/baja/${id}/`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRFToken": csrfToken,  // Agregar el token CSRF como encabezado
                    },
                });
                Swal.fire(
                    'Baja exitosa!',
                    "Tu cliente fue dado de baja!",
                    'success'
                )
                $("#modal-info").modal("hide")
            }
        })
    } catch (error) {
        // Manejar el error en caso de un problema con la petición Fetch
    }
});

$(document).on("click", "#btnAlta", async function () {
    var id = $("#id-i").text().trim();

    try {
        const csrfToken = $("meta[name=csrf-token]").attr("value");  // Obtener el token CSRF
        console.log(csrfToken)
        const response = await fetch(`http://127.0.0.1:8000/alta/${id}/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken,  // Agregar el token CSRF como encabezado
            },
        });
        if (response.ok) {
            Swal.fire(
                'Perfecto!',
                'Tu cliente fue dado de alta!',
                'success'
            )
            $("#modal-info").modal("hide")
        }
    } catch (error) {
        // Manejar el error en caso de un problema con la petición Fetch
    }
});

$(document).on("click", "#btnSuspender", async function () {
    var id = $("#id-i").text().trim();

    try {
        Swal.fire({
            title: 'Estas seguro?',
            text: "Estas suspender un cliente",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, suspender cliente!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                const csrfToken = $("meta[name=csrf-token]").attr("value");  // Obtener el token CSRF
                console.log(csrfToken)
                const response = fetch(`http://127.0.0.1:8000/suspender/${id}/`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRFToken": csrfToken,  // Agregar el token CSRF como encabezado
                    },
                });
                Swal.fire(
                    'Suspencion exitosa!',
                    "Tu cliente fue suspendido!",
                    'success'
                )
                $("#modal-info").modal("hide")
            }
        })
        if (response.ok) {
            location.reload();
        }
    } catch (error) {
        // Manejar el error en caso de un problema con la petición Fetch
    }
});

let dataTable;
let dataTableInicializada = false;

const initDataTable = async () => {
    // Si ya se inicializó un DataTable, destruirlo antes de reemplazarlo
    if (dataTableInicializada) {
        dataTable.destroy();
    }

    // Cargar datos y llenar la tabla
    await clientes();

    // Inicializar el DataTable en el elemento #tablaClientes
    dataTable = $('#Clientes').DataTable({
        scrollX: true,
        // botones editar y eliminar en la tabla
        "columnDefs": [{
            "targets": 4,
            "data": null,
            //se agrego el boton registrar el pago
            "defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-outline-info btnInfo'><i class='bx bx-plus-circle'></i></button><button class='btn btn-outline-success btnRegistrarPago'><i class='bx bx-dollar-circle'></i></button></div></div>"
        }],
        // lenguaje
        "language": {
            "lengthMenu": "Mostrar _MENU_ registros",
            "zeroRecords": "No se encontraron resultados",
            "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sSearch": "Buscar:",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
            },
            "sProcessing": "Procesando...",
        }
    });

    // Marcar el DataTable como inicializado
    dataTableInicializada = true;
};


const clientes = async () => {
    try {
        const response = await fetch('http://127.0.0.1:8000/cargar_clientes/');
        const data = await response.json()
        console.log(data)
        let contenido = ''
        data.clientes.forEach((cliente, index) => {
            contenido += `
            <tr>
                <td>${cliente.id}</td>
                <td>${cliente.dni}</td>
                <td>${cliente.apellido}</td>
                <td>${cliente.nombre}</td>
                <td><div class='text-center'><button class='btnMasInfo'>Info</button><button class='btnRegistrarPago'>Pago</button></div></td>
            </tr>
            `;
        });
        tablaClientes.innerHTML = contenido;
    } catch (ex) {
        alert(ex);
    }
};
window.addEventListener('load', async () => {
    await initDataTable();
});


//Generar Deuda
$(document).ready(function () {
    $('#btnGenerarDeuda').click(function () {
        $.ajax({
            type: "POST",
            url: "http://127.0.0.1:8000/generar_deuda/",
            success: function (response) {
                console.log(response)
            },
            error: function () {
                console.log('error')
            }
        })
    })
})