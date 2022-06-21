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

function consultarCuenta(){
    idCuenta = $("#idCuenta").val();
    jQuery.ajax({
        url: 'http://localhost:9085/cuentas/cuentaByIdActiva/'+ idCuenta,
        type: 'GET',
        contentType: 'application/json',
        headers: {
            "Authorization": "Bearer " + token,
            'Content-Type': 'application/json'
        },
    })
    .done(function(respuesta) {
       console.log(respuesta);
        if(respuesta.idCuenta){
            alertify.alert("Cuenta Activa");
            $("#div_transaccion").removeClass("oculto");
        }else{
            alertify.alert("La cuenta no existe o no esta activa");
            $("#div_transaccion").addClass("oculto");
        }
    })
    .fail(function(resp) {
       console.log(resp.responseText);
    });   
}

function mostrar_valor(){
    dato = $("#tipoTransaccion").val();
    if (dato == "Retiro" || dato == "Consignacion") {
        $("#div_valor").removeClass("oculto");
        $('#valor').prop("required", true);
    } else {
        $("#div_valor").addClass("oculto");
        $('#valor').removeAttr("required");
    }
}

jQuery(document).on('submit', '#datos_transaccion', function(event) {
    //alertify.alert("alertify");
    dato = $("#tipoTransaccion").val();
    idCuenta = $("#idCuenta").val();
    if(dato == "Consignacion"){
        var datos_transaccion = {
            "cuenta":
                {
                    "idCuenta":idCuenta
                },
            "tipoTransaccion": dato,
            "debe": $("#valor").val(),
            "haber": 0
        }
    }else if(dato == "Retiro"){
        var datos_transaccion = {
            "cuenta":
                {
                    "idCuenta":idCuenta
                },
            "tipoTransaccion": dato,
            "debe": 0,
            "haber": $("#valor").val()
        }
    }
    
    event.preventDefault();

    if(dato == "Retiro" || dato == "Consignacion"){
        jQuery.ajax({
            url: 'http://localhost:9085/movimientos/guardarMovimientoCuenta',
            type: 'POST',
            contentType: 'application/json',
            data:  JSON.stringify(datos_transaccion),
            headers: {
                "Authorization": "Bearer " + token,
                'Content-Type': 'application/json'
            },
        })
        .done(function(respuesta) {
            console.log(respuesta);
            if(respuesta.idMovimientoCuenta){
                alertify.alert("Transaccion de " + dato +  " realizada con exito ");
                setTimeout(function() { window.location = "crear_transaccion.html" }, 5000);
            }
        })
        .fail(function(respuesta) {
            console.log(respuesta.responseJSON);
            alertify.alert(respuesta.responseJSON.message );
        });
    }else{
        jQuery.ajax({
            url: 'http://localhost:9085/movimientos/saldoCuenta/'+idCuenta,
            type: 'GET',
            contentType: 'application/json',
            data:  JSON.stringify(datos_transaccion),
            headers: {
                "Authorization": "Bearer " + token,
                'Content-Type': 'application/json'
            },
        })
        .done(function(respuesta) {
            console.log(respuesta);
            if(respuesta){
                alertify.alert("Saldo de la cuenta $" + respuesta);
                //setTimeout(function() { window.location = "crear_transaccion.html" }, 5000);
            }
        })
        .fail(function(respuesta) {
            console.log(respuesta.responseJSON);
            alertify.alert(respuesta.responseJSON.message );
        });

    }
   
});
