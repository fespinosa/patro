(function ($) {

  //Carga un datepicker en un campo con un valor preexistente en el formato 
  //yy-mm-dd. No hay problema si el campo no posee un valor.
  $.fn.cargarDatepicker = function() {
    var arrFecha = $(this).val().split("-");
    var fecha = arrFecha.length == 3 ? new Date(arrFecha[0], (arrFecha[1]-1), arrFecha[2]) : null;
    $(this)
      .datepicker()
      .datepicker("setDate", fecha)
      .datepicker("option", "dateFormat", "yy-mm-dd");
  }

})(jQuery);
