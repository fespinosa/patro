// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults

//Opciones para el spinner
var spinner_opts = {
  lines: 10, // The number of lines to draw
  length: 3, // The length of each line
  width: 5, // The line thickness
  radius: 10, // The radius of the inner circle
  color: '#000', // #rgb or #rrggbb
  speed: 1, // Rounds per second
  trail: 60, // Afterglow percentage
  shadow: false, // Whether to render a shadow
  hwaccel: false // Whether to use hardware acceleration
};

//Opciones para el spinner
var spinner_opts_registro = {
  lines: 10, // The number of lines to draw
  length: 3, // The length of each line
  width: 5, // The line thickness
  radius: 10, // The radius of the inner circle
  color: '#000', // #rgb or #rrggbb
  speed: 3, // Rounds per second
  trail: 60, // Afterglow percentage
  shadow: false, // Whether to render a shadow
  hwaccel: false // Whether to use hardware acceleration
};


$(function(){

	//Para cerrar los dialogos flash notice
	$('.btn_close_notice').click(function(){
		$(this).closest('div[id^="flash"]').slideUp();
	});
	
  //Placeholders a traves de la aplicacion
  $("input[placeholder]").placeholder();

	//Agregar clase print para imprimir actual pagina
	$(".print").click( function() {
      window.print();
    });
});

//funcion para imprimir los terminos y condiciones
function imprimeTermsDiv(nombreDiv){

    var mywindow = window.open('', 'my div', 'height=400,width=600,scrolling=auto');
    mywindow.document.write('<html><head><title>Imprimir</title>');
    mywindow.document.write('<meta http-equiv="Content-Type" content="application/xhtml+xml;charset=utf-8" />');
    mywindow.document.write('<style type="text/css"> ');
    mywindow.document.write('@Media all {body{font-family: arial; font-size: 12px; color: #000000;}}');
    mywindow.document.write('</style>');
    mywindow.document.write('</head><body>');
    mywindow.document.write('<div class="cuadro-light"><h2>TÉRMINOS Y CONDICIONES PARA EL USO DE MULTIPAY</h2>');
    mywindow.document.write('<div id="terms" class="content">');
    mywindow.document.write($("#" + nombreDiv).html());
    mywindow.document.write('</div></div></body></html>');

  mywindow.print();
  mywindow.close();

    return true;
} 
