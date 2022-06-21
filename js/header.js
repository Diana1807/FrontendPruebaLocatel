$(document).ready(function() {
    head();
    pie();
});

function head(){
    head_dinamico = '<meta charset="UTF-8">' +
                    '<meta http-equiv="X-UA-Compatible" content="IE=edge">' +
                    '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
                    '<title>Document</title>' +
                    '<link href="../../librerias/bootstrap-5.0.2-dist/css/bootstrap.min.css" rel="stylesheet">' +
                
                    '<!-- Custom styles for this template -->' +
                    '<link href="../../css/style.css" rel="stylesheet">' +
                    '<link href="../../css/headers.css" rel="stylesheet">' +
                    '<link href="../../css/navbar.css" rel="stylesheet">' +
                    '<!-- Iconos Fontawesome --></link>' +
                    '<link rel="stylesheet" href="../../librerias/alertifyjs/css/alertify.css">' +
                    '<link rel="stylesheet" href="../../librerias/alertifyjs/css/themes/bootstrap.min.css">' +
                    '<script src="../../librerias/alertifyjs/alertify.js" type="text/javascript"></script>' +
                    '<link href="../../librerias/fontawesome/css/all.css" rel="stylesheet">';
    $('#head_dinamico').html(head_dinamico);                
}

function pie(){
    script_dinamico = '<script src="../../librerias/datatables/bootstrap.min.js"></script>' +
                    '<script src="../../librerias/datatables/jquery.dataTables.min.js"></script>' +
                    '<script src="../../librerias/datatables/dataTables.bootstrap.js"></script>' +
                    '<script src="../../librerias/datatables/dataTables.bootstrap.min.js"></script>' +
                    '<script src="../../librerias/datatables/dataTables.responsive.min.js"></script>' +
                    '<script src="../../librerias/datatables/responsive.bootstrap.min.js"></script>';
    $('#script_dinamico').html(script_dinamico);     
}
