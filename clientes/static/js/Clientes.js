
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
            $("#estado-i").text(cliente.estado);
            $("#observaciones-i").text(cliente.observaciones);
            $("#fechaAlta-i").text(cliente.fecha_alta);
            $("#servicio-i").text(cliente.idServicio__tipo_plan);
            $("#monto-i").text("$" + cliente.idServicio__monto);
            $("#zona-i").text(cliente.zona__nombre);

            if(cliente.estado == 'B'){
                $("#btnBaja").removeClass("btn-danger").addClass("btn-success").text("Alta")
                $("#btnBaja").attr("id", "btnAlta");
            }else{
                $("#btnAlta").removeClass("btn-success").addClass("btn-danger").text("Baja")
                $("#btnAlta").attr("id", "btnBaja");
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
    $("#formEdicion #estado").val(estado);
    $("#formEdicion #observaciones").val(observaciones);
    $('#formEdicion #fecha_alta').val(fecha_alta);
    $("#formEdicion #idServicio option:contains('" + servicio + "')").prop("selected", true);
    $("#formEdicion #zona option:contains('" + zona + "')").prop("selected", true);

    $("#titulo-edicion").text("Editar Cliente");
    $("#btnSubmit").text("Guardar");
    $("#formEdicion").attr("action", "http://127.0.0.1:8000/editar/");
    $("#modal-edicion-crud").modal("show");
});

$(document).on("click", "#btnBaja", async function () {
    var id = $("#id-i").text().trim();

    try {
        const csrfToken = $("meta[name=csrf-token]").attr("value");  // Obtener el token CSRF
        console.log(csrfToken)
        const response = await fetch(`http://127.0.0.1:8000/baja/${id}/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken,  // Agregar el token CSRF como encabezado
            },
        });

        if (response.ok) {
            location.reload();
        }
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
            location.reload();
        }
    } catch (error) {
        // Manejar el error en caso de un problema con la petición Fetch
    }
});

$(document).on("click", "#btnSuspender", async function () {
    var id = $("#id-i").text().trim();

    try {
        const csrfToken = $("meta[name=csrf-token]").attr("value");  // Obtener el token CSRF
        console.log(csrfToken)
        const response = await fetch(`http://127.0.0.1:8000/suspender/${id}/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken,  // Agregar el token CSRF como encabezado
            },
        });

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


