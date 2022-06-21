$(document).ready(function() {
    obtener_token();
    alertify.defaults.theme.ok = "btn btn-primary";
    alertify.defaults.theme.cancel = "btn btn-danger";
    alertify.defaults.theme.input = "form-control";
});

var token;

function obtener_token() {

    let data = new URLSearchParams({
        "client_id": 'diana_id',
        "client_secret": "diana_secret"
    });
    fetch('http://localhost:9085/v1.0/oauth/client_credential/accesstoken?grant_type=client_credentials', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: data
        }).then(function(response) {
            return response.json();
        })
        .then(function(data) {
            //console.log(data)
            token = data['access_token'];
            //alert(token);
            tablaListadoCuentas();
        })
}

function tablaListadoCuentas() {
    var table = $("#tabla_listado_cuentas").DataTable({
        ajax: {
            url: 'http://localhost:9085/personas/personasActivas',
            type: 'GET',
            dataType: 'json',
            dataSrc: function(json){
                //console.log(json);
                return json;
            },
            headers: {
                "Authorization": "Bearer " + token,
                'Content-Type': 'application/json'
            },
        },
        lengthMenu: [
            [5, 10, 25, 50, -1],
            [5, 10, 25, 50, "Todo"]
        ],
        order: [
            [0, "asc"]
        ],
        bDestroy: true,
        columns: [
            // { data: "idPersona", title: "Id Persona" },
            {
                data: function(row) {
                    var fila = row;
                    var editar_cuenta = "<div class='editar icono' onclick='editar_cuenta("+JSON.stringify(fila)+");'><i class='fas fa-pencil-alt fa-lg' ></i>Editar Cuenta</div>";
                    return editar_cuenta;
                },
                title: "Editar"
            },
            {
                data: function(row) {
                    var fila = row;
                    var eliminar_cuenta = "<div class='eliminar icono' onclick='eliminar_cuenta("+JSON.stringify(fila)+");'><i class='far fa-trash-alt fa-lg'></i>Eliminar Cuenta</div>";
                    return eliminar_cuenta;
                },
                title: "Eliminar"
            },
           
            { data: "numeroDocumento", title: "Numero Documento" },
            { data: "primerNombre", title: "Primer nombre" },
            { data: "segundoNombre", title: "Segundo nombre" },
            { data: "primerApellido", title: "Primer apellido" },
            { data: "segundoApellido", title: "Segundo apellido" },
            { data: "fechaNacimiento", title: "Fecha de nacimiento" },
            {
                data: function(row){
                    var hoy = new Date();
                    var cumpleanos = new Date(row.fechaNacimiento);
                    
                    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
                    var m = hoy.getMonth() - cumpleanos.getMonth();

                    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
                        edad--;
                    }

                    return edad;
                },
                title: "Edad"
            },
            { data: "direccion", title: "Direccion" },
            { data: "telefono", title: "Telefono" },
            { data: "cuenta.idCuenta", title: "Numero Cuenta" },
            { data: "cuenta.tipoCuenta", title: "Tipo Cuenta" }
            
            
        ],
        language: idioma
    });
}

var idioma = {
    "sProcessing": "Procesando...",
    "sLengthMenu": "Mostrar _MENU_ registros",
    "sZeroRecords": "No se encontraron resultados",
    "sEmptyTable": "Ningún dato disponible en esta tabla",
    "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
    "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
    "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
    "sInfoPostFix": "",
    "sSearch": "Buscar:",
    "sUrl": "",
    "sInfoThousands": ",",
    "sLoadingRecords": "Cargando...",
    "oPaginate": {
        "sFirst": "Primero",
        "sLast": "Último",
        "sNext": "Siguiente",
        "sPrevious": "Anterior"
    },
    "oAria": {
        "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
    }
}

function editar_cuenta(fila){
    $("#id_persona").val(fila.idPersona);
    $("#tipo_documento").val(fila.tipoDocumento);
    $("#numero_documento").val(fila.numeroDocumento);
    $("#primer_nombre").val(fila.primerNombre);
    $('#segundo_nombre').val(fila.segundoNombre);
    $('#primer_apellido').val(fila.primerApellido);
    $('#segundo_apellido').val (fila.segundoApellido);
    $('#fecha_nacimiento').val(fila.fechaNacimiento);
    $('#direccion').val(fila.direccion);
    $('#telefono').val(fila.telefono);
    $('#numero_celular').val(fila.numero_celular);
    $("#id_cuenta").val(fila.cuenta.idCuenta);
    $('#tipo_cuenta').val(fila.cuenta.tipoCuenta);
    $('#update_cuenta').modal('show');  
}

jQuery(document).on('submit', '#actualizar_cuenta', function(event) {
    //alertify.alert("alertify");
    var datos_usuario = {
        "idPersona":$("#id_persona").val(),
        "tipoDocumento": $("#tipo_documento").val(),
        "numeroDocumento" :  $("#numero_documento").val(),
        "primerNombre" : $("#primer_nombre").val(),
        "segundoNombre" :  $("#segundo_nombre").val(),
        "primerApellido" :  $("#primer_apellido").val(),
        "segundoApellido" :  $("#segundo_apellido").val(),
        "fechaNacimiento" :  $("#fecha_nacimiento").val(),
        "direccion" :  $("#direccion").val(),
        "telefono" :  $("#telefono").val()
    }
    //var cadena = JSON.stringify(datos_usuario);
    //console.log(datos_usuario);
   
    event.preventDefault();

    //console.log(datos);
    jQuery.ajax({
        url: 'http://localhost:9085/personas/actualizarPersona',
        type: 'POST',
        contentType: 'application/json',
        data:  JSON.stringify(datos_usuario),
        headers: {
            "Authorization": "Bearer " + token,
            'Content-Type': 'application/json'
        },
    })
    .done(function(respuesta) {
        console.log(respuesta);
        if(respuesta.idPersona){
            var idPersona = respuesta.idPersona;
            var numeroDocumento = respuesta.numeroDocumento;
            var datos_cuenta = {
                "idCuenta": $("#id_cuenta").val(),
                "persona":
                    {
                     "idPersona": $("#id_persona").val(),
                    },
                "tipoCuenta": $("#tipo_cuenta").val()
            }

            jQuery.ajax({
                url: 'http://localhost:9085/cuentas/actualizarCuenta',
                type: 'POST',
                contentType: 'application/json',
                data:  JSON.stringify(datos_cuenta),
                headers: {
                    "Authorization": "Bearer " + token,
                    'Content-Type': 'application/json'
                },
            })
            .done(function(respuesta) {
                console.log(respuesta);
                if(respuesta.idCuenta){
                    var idCuenta = respuesta.idCuenta;
                    alertify.alert("Fue actualizado el usuario " + numeroDocumento +  " y la cuenta " + idCuenta );
                    setTimeout(function() { window.location = "listado_de_cuentas.html" }, 4000);
                }
            })
            .fail(function(respuesta) {
                console.log(respuesta.responseJSON);
                alertify.alert(respuesta.responseJSON.message );
            });
        }
    })
    .fail(function(respuesta) {
        console.log(respuesta.responseJSON);
        alertify.alert(respuesta.responseJSON.message );
    });
});

function eliminar_cuenta(fila){

    alertify.confirm('Eliminacion de cuenta', 'Esta Seguro de eliminar la cuenta?',
    function(){ 
        
        jQuery.ajax({
            url: 'http://localhost:9085/personas/actualizarEstadoPersona/'+ fila.idPersona +'/0',
            type: 'PUT',
            contentType: 'application/json',
            headers: {
                "Authorization": "Bearer " + token,
                'Content-Type': 'application/json'
            },
        })
        .done(function(respuesta) {
           console.log(respuesta);
            if(respuesta === "Persona Actualizada"){
                jQuery.ajax({
                    url: 'http://localhost:9085/cuentas/actualizarEstadoCuenta/'+ fila.cuenta.idCuenta +'/0',
                    type: 'PUT',
                    contentType: 'application/json',
                    headers: {
                        "Authorization": "Bearer " + token,
                        'Content-Type': 'application/json'
                    },
                })
                .done(function(respuesta) {
                   console.log(respuesta);
                    if(respuesta === "Cuenta Actualizada"){
                        alertify.alert("Cuenta Eliminada");
                        setTimeout(function() { window.location = "listado_de_cuentas.html" }, 4000);
                    }
                })
                .fail(function(resp) {
                   console.log(resp.responseText);
                });   
                
            }
        })
        .fail(function(resp) {
           console.log(resp.responseText);
        });   
     },
    function(){}).set('labels', {ok:'Si', cancel:'No'});
}




    