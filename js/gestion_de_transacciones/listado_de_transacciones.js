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

function consultarTransaccionesCuenta(){
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
            tablaListadoTransacciones(respuesta.idCuenta);
        }else{
            alertify.alert("La cuenta no existe o no esta activa");
        }
    })
    .fail(function(resp) {
       console.log(resp.responseText);
    });   
}

function tablaListadoTransacciones(idCuenta) {
    var table = $("#tabla_listado_transacciones").DataTable({
        ajax: {
            url: 'http://localhost:9085/movimientos/transaccionesCuenta/' + idCuenta,
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
            { data: "idMovimientoCuenta", title: "Id Movimiento Cuenta" },
            { data: "tipoTransaccion", title: "Tipo transaccion" },
            {
                data: function(row){
                   var tipoTransaccion = row.tipoTransaccion;
                   var valor;
                    if(tipoTransaccion == "Consignacion"){
                        valor = row.debe;
                    }else{
                        valor = row.haber;
                    }
                   return valor;
                },
                title: "Valor"
            },
            { data: "fechaCreacion", title: "Fecha transaccion" },
            
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
