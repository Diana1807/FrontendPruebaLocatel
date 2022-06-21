$(document).ready(function() {
    menu();
});

function menu(){
    menu_iconos = '<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">' +
                        '<symbol id="home" viewBox="0 0 16 16">' +
                        '<path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z"/>' +
                        '</symbol>' +
                        '<symbol id="people-circle" viewBox="0 0 16 16">' +
                        '<path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>' +
                        '<path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>' +
                        '</symbol>' +
                        '<symbol id="transacciones" viewBox="0 0 16 16">' +
                            '<path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>' +
                            '<path d="M4.5 12.5A.5.5 0 0 1 5 12h3a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm0-2A.5.5 0 0 1 5 10h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm1.639-3.708 1.33.886 1.854-1.855a.25.25 0 0 1 .289-.047l1.888.974V8.5a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5V8s1.54-1.274 1.639-1.208zM6.25 6a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5z"/>' +
                        '</symbol>' +
                    '</svg>';
    menu_dinamico = '<header>' +
                        '<div class="px-3 py-2 bd-navbar text-white">' +
                            '<div class="container">' +
                                '<div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">' +
                                    '<a href="#" class="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">' +
                                        '<i class="fas fa-address-card fa-2x paddin_logo"></i> Sistema Financiero' +
                                    '</a>' +
                                    '<ul class="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">' +
                                        '<li>' +
                                            '<a href="../../index.html" class="nav-link text-white menu_activo">' +
                                                '<svg class="bi d-block mx-auto mb-1" width="24" height="24"><use xlink:href="#home"/></svg> Home' +
                                            '</a>' +
                                        '</li>' +
                                        '<li class="nav-item dropdown">' +
                                            '<a class="nav-link text-white dropdown-toggle" href="#" id="dropdown08" data-bs-toggle="dropdown" aria-expanded="false">' +
                                                '<svg class="bi d-block mx-auto mb-1" width="24" height="24"><use xlink:href="#people-circle"/></svg> Gestion de cuentas' +
                                            '</a>' +
                                            '<ul class="dropdown-menu" aria-labelledby="dropdown08">' +
                                                '<li><a class="dropdown-item" href="../../templates/gestion_de_cuentas/crear_cuentas.html">Crear cuenta</a></li>' +
                                                '<li><a class="dropdown-item" href="../../templates/gestion_de_cuentas/listado_de_cuentas.html">Listado de cuentas</a></li>' +
                                            '</ul>' +
                                        '</li>' +
                                        '<li class="nav-item dropdown">' +
                                            '<a class="nav-link text-white dropdown-toggle" href="#" id="dropdown08" data-bs-toggle="dropdown" aria-expanded="false">' +
                                                '<svg class="bi d-block mx-auto mb-1" width="24" height="24"><use xlink:href="#transacciones"/></svg> Gestion de transacciones' +
                                            '</a>' +
                                            '<ul class="dropdown-menu" aria-labelledby="dropdown08">' +
                                                '<li><a class="dropdown-item" href="../../templates/gestion_de_transacciones/crear_transaccion.html">Transaccion</a></li>' +
                                                 '<li><a class="dropdown-item" href="../../templates/gestion_de_transacciones/listado_de_transacciones.html">Listado de transacciones</a></li>' +
                                            '</ul>' +
                                        '</li>' +
                                    '</ul>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</header>' +
                    '<script src="../../librerias/bootstrap-5.0.2-dist/js/bootstrap.bundle.min.js"></script>';

    $('#menu_iconos').html(menu_iconos);
    $('#menu_dinamico').html(menu_dinamico);
}
