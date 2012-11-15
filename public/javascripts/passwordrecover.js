var regPassword = /^\d{4}$/;

function formatPhoneNumber(input, format) {
    var digits = input.replace(/\D/g, '');
    var count = 0;
    return format.replace(/X/g, function() {
        return digits.charAt(count++);
    });
}


$(document).ready(function() {
  $("form").submit(function () {
    $("input", formLogin).blur(); //valida con js todos los campos del formulario
    //no deja hacer el POST si no valida un campo
    return $(".elem_pass").consultarEstatus() == "ok" && $(".elem_confirmpass").consultarEstatus() == "ok";
  });

  $(".elem_pass").cambiarEstatus("ok");
  $(".elem_confirmpass").cambiarEstatus("ok");

  $(".user_pass").blur(function() {
    $(".elem_pass").cambiarEstatus("ok");
    if(!regPassword.test($(this).val())) { $(".elem_pass").cambiarEstatus("error"); }
  });

  $(".confirmation").blur(function() {
    $(".elem_confirmpass").cambiarEstatus("ok");
    if(!regPassword.test($(this).val())) { $(".elem_confirmpass").cambiarEstatus("error"); }
  });
});
