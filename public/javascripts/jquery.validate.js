(function ($) {
  var CLASES = [
    "ok", "error", "error_secundario", "error_clave_insegura"
  ];
  function eliminarClases(elem) {
    for(var i in CLASES) { $(elem).removeClass(CLASES[i]); }
    $("div.msg_error span", elem).hide(); 
  }

  $.fn.cambiarEstatus = function(nuevaClase, id_error_a_destacar) {
    eliminarClases(this);
    $(this).addClass(nuevaClase);
		if(nuevaClase.indexOf("error")!=-1) $(this).addClass('error');
    if(nuevaClase == "error_secundario") $("#" + id_error_a_destacar, this).show();
    if(nuevaClase == "error_clave_insegura") $("#" + id_error_a_destacar, this).show();
    if(nuevaClase == "error") $("span.por_omision", this).show();

  }
  
  $.fn.consultarEstatus = function() {
    for(var i in CLASES) { 
      var clase = CLASES[i];
      if($(this).hasClass(clase)) {
        return clase;
      }
    }
    return null;
  }

})(jQuery);
