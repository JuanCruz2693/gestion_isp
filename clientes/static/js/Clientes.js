
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

//boton editar
$(document).on("click", "#btnEditar", function () {
    // Obtener los valores del modal de información del cliente
    var dni = $("#dni-i").text().trim();
    var nombre = $("#nombre-i").text().trim();
    var apellido = $("#apellido-i").text().trim();
    var direccion = $("#direccion-i").text().trim();
    var telefono = $("#telefono-i").text().trim();
    var observaciones = $("#observaciones-i").text().trim();
    var servicio = $("#servicio-i").text().trim();
    var zona = $("#zona-i").text().trim();

    // Llenar el modal de edición con los valores obtenidos
    $("#dni").val(dni);
    $("#nombre").val(nombre);
    $("#apellido").val(apellido);
    $("#domicilio").val(direccion);
    $("#telefono").val(telefono);
    $("#observaciones").val(observaciones);
    $("#servicio").val(servicio);
    $("#zona").val(zona);

    $(".modal-title").text("Editar Cliente");
    $("#btnSubmit").text("Guardar");
    $("#formClientes").attr("data-action", "editar");
    $("#modalCRUD").modal("show");
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
        }});

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