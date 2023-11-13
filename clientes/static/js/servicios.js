$("#btnNuevoServicios").click(function () {
    $("#formServicios").trigger("reset");
    $(".modal-header").css("background-color", "#28a745");
    $(".modal-header").css("color", "white");
    $(".modal-title").text("Nuevo Servicio");
    $("#btnNuevoServicios").text("Nuevo Servicio");
    $("#formServicios").attr("data-action", "guardar");
    $("#modalNuevoServicio").modal("show");
});

$(document).ready(function () {
    $("#formServicios").on("submit", function (event) {
        event.preventDefault();

        $.ajax({
            type: "POST",
            url: "http://127.0.0.1:8000/servicios/",
            data: $(this).serialize(),
            success: function (response) {
                Swal.fire(
                    'Perfecto!',
                    response.message,
                    'success'
                );
                $("#modalNuevoServicio").modal("hide");
                window.location.href = "http://127.0.0.1:8000/servicios/";
            },
            error: function (error) {
                console.log("Error:", error);
            }
        });
    });
});

$(document).ready(function () {
    $("#Servicios").DataTable({
        scrollX: true,
        "columnDefs": [{
            "targets": 4,
            "data": null,
            "defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-outline-info btnEditar'><i class='bx bx-edit'></i></button><button class='btn btn-outline-danger btnEliminar'><i class='bx bx-trash'></i></button></div></div>"
        }],
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

    dataTableInicializada = true;
});


$(document).on("click", ".btnEliminar", function () {
    // Obtén el ID del servicio desde el botón de eliminar
    var servicioId = $(this).closest("tr").find("td:first").text();

    // Confirma la eliminación con un cuadro de diálogo
    Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción eliminará el servicio seleccionado.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            // Envía una solicitud AJAX para eliminar el servicio
            $.ajax({
                type: "POST",
                url: "http://127.0.0.1:8000/eliminar_servicio/" + servicioId + "/",
                data: $(this).serialize(),
                dataType: "json",
                success: function (response) {
                    if (response.success) {
                        // Recargar la tabla de servicios o actualizar la vista
                        $('#Servicios').DataTable().ajax.reload();
                    } else {
                        // Mostrar un mensaje de error
                        Swal.fire(
                            "Error",
                            response.error,
                            "error"
                        );
                    }
                },
                error: function (error) {
                    console.log("Error:", error);
                }
            });            
        }
    });
});




$(document).on("click", ".btnEditar", function () {
    // Obtener los valores del servicio que se va a editar
    var servicioId = $(this).closest("tr").find("td:first").text();
    var monto = $(this).closest("tr").find("td:eq(1)").text().trim();
    var tipoPlan = $(this).closest("tr").find("td:eq(2)").text().trim();
    var cantidadMegas = $(this).closest("tr").find("td:eq(3)").text().trim();

    // Llenar el formulario de edición con los valores obtenidos
    $("#formEdicion #form-edicion-id").val(servicioId);
    $("#formEdicion #id_monto").val(monto);
    $("#formEdicion #id_tipo_plan").val(tipoPlan);
    $("#formEdicion #id_cantidad_megas").val(cantidadMegas);

    $("#modalEdicionServicioLabel").text("Editar Servicio");
    $("#btnSubmit").text("Guardar");
    $("#modalEdicionServicio").modal("show");
});

// Controlador de eventos para el formulario de edición
$("#formEdicion").on("submit", function (event) {
    event.preventDefault();
    // Obtener el valor del campo de ID
    var servicioId = $("#form-edicion-id").val();

    // Comprobar si el ID es válido antes de enviar la solicitud
    if (servicioId) {
        $.ajax({
            type: "POST",
            url: "http://127.0.0.1:8000/editar_servicio/" + servicioId + "/",
            data: $(this).serialize(),
            success: function (response) {
                console.log(response);
                Swal.fire(
                    "Perfecto!",
                    response.success,
                    "success"
                );
                $("#modalEdicionServicio").modal("hide");
                $('#Servicios').DataTable().ajax.reload();
            },
            error: function (error) {
                console.log("Error:", error);
            }
        });
    } else {
        // Manejar el caso en el que el ID no es válido
        console.log("ID de servicio no válido");
    }
});