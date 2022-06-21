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
        })
}

jQuery(document).on('submit', '#datos_usuario', function(event) {
    //alertify.alert("alertify");
    var datos_usuario = {
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
   
    event.preventDefault();

    //console.log(datos);
    jQuery.ajax({
            url: 'http://localhost:9085/personas/guardarPersona',
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
                    "persona":
                        {
                         "idPersona": idPersona
                        },
                    "tipoCuenta": $("#tipo_cuenta").val()
                }

                jQuery.ajax({
                    url: 'http://localhost:9085/cuentas/guardarCuenta',
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
                        alertify.alert("Fue creado el suario " + numeroDocumento +  " y la cuenta " + idCuenta );
                        setTimeout(function() { window.location = "crear_cuentas.html" }, 4000);
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