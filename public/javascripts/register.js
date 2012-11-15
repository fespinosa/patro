$(document).ready(function() {

  var regVacio = /^(\s)*$/;
  var regNumeroSerie = /^A\d{8,}$/;
  var regPassword = /^\d{4}$/;
  var regEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  var regPan = /^\d+$/;
  var regPhone = /^\d{8}$/;
  var regRut = /^\d{1,2}(\.)?\d{3}(\.)?\d{3}(\-)?(\d|k|K)$/;
  var phoneInput = $("#user_phone");

  function formatPhoneNumber(input, format) {
    var digits = input.replace(/\D/g, '');
    var count = 0;
    return format.replace(/X/g, function() {
      return digits.charAt(count++);
    });
  }

  //Modal para confirmar email
  var confirmPhoneBox = $('#confirm-phone-box');
  confirmPhoneBox.data("confirmed", false);
  confirmPhoneBox.dialog({
    title: "Validación de celular",
    autoOpen: false, 
    modal: true,
    minWidth: 500,
    minHeight: 300,
    draggable: false,
    resizable: false,
    buttons: {
      "Confirmar": function() {
        confirmPhoneBox.data("confirmed", true);
        $('#btn_sgte')[0].disabled = true;
        $('form#new_user').submit();
        $( this ).dialog( "close" );
      },
      "Ups, me equivoqué": function() {
        $( this ).dialog( "close" );
      }
    }
  });


  //Validacion Total del Formulario
  $('form#new_user').submit(function() {
    $("input", this).blur();

    if($("#elem_celular").consultarEstatus()=="error" 
        || $("#elem_nombres").consultarEstatus()=="error" 
        || $("#elem_apellidos").consultarEstatus()=="error"
        || $("#elem_pass").consultarEstatus()=="error"
        || $("#elem_passconf").consultarEstatus()=="error"
        || $("#elem_email").consultarEstatus()=="error"
        || $("#elem_rut").consultarEstatus()=="error")
      return false;
    
    if ( !$("input", this).hasClass("inputTextError") ) {
      //Form sin errores
      if ( !confirmPhoneBox.data("confirmed") ) {
        $('#confirm-phone-box #phone-to-confirm').html(phoneInput.val());
        confirmPhoneBox.dialog('open');
      } else {
        return true;
      }
    }
    return false;
  });


  $("#elem_celular").cambiarEstatus("ok");

  $("#elem_rut").cambiarEstatus("ok");

  $("#elem_email").cambiarEstatus("ok");

  $("#user_phone").blur(function() {
    if (regPhone.test($("#user_phone").val())){
      $.getJSON("/checkphone/" + $("#user_phone").val(), null,
        function(respuesta) {
          if(respuesta == false) {
            var cel = $("#user_phone").val();
            $("#lnk_login").attr("href","/?cel="+cel);
            $("#elem_celular").cambiarEstatus("error_secundario", "celular_ya_existe"); }
            else{
              $("#elem_celular").cambiarEstatus("ok");
            }
          });
    } else {
      $("#elem_celular").cambiarEstatus("error");
    }
  }).click(function() {
    if ($(this).val() == 'Ej: 90303456') $(this).val('');
  });

	var fullRutInput = $("#user_full_user_rut");
	
  fullRutInput.blur(function() {

    var cleanedRutInput = fullRutInput.val().replace (/[^\dKk]/g, "");
    cleanedRutInput = cleanedRutInput.substr(0,cleanedRutInput.length-1);

    if( regRut.test(Trim(fullRutInput.val())) && checkRut(fullRutInput, "El rut no es v&aacute;lido", true, cleanedRutInput))
    {
      //Rut es válido, chequeando que no está registrado
      $("#elem_rut").cambiarEstatus("ok");

      if (fullRutInput.val() != "")
      {
        $.getJSON("/checkrut/" + cleanedRutInput, null, function(respuesta) {
          if(!respuesta)
          {
            $("#elem_rut").cambiarEstatus("error_secundario", "rut_ya_existe");
          }
        });
      }
    } else {
      //Rut es inválido
      $("#elem_rut").cambiarEstatus("error");
    }
  }).click(function(){
    if ($(this).val() == 'Ej:17.675.546-4') $(this).val('');
  });

  $("#user_email").blur(function() {
    email = Trim($("#user_email").val());
    if (regEmail.test(email)){
      $("#elem_email").cambiarEstatus("ok");
      $.getJSON("/checkemail/" + email, null,
      function(respuesta) {
        if(respuesta == false) { 
          $("#elem_email").cambiarEstatus("error_secundario", "email_ya_existe"); 
        }
        else{
          $("#elem_email").cambiarEstatus("ok");
        }
      });
    } else {
      $("#elem_email").cambiarEstatus("error");
    }
  }).click(function() {
    if ($(this).val() == 'Ej: mimail@correos.com') $(this).val('');
  });

  $("#user_fnames").blur(function() {
  $("#elem_nombres").cambiarEstatus("ok");
  if(regVacio.test($(this).val())) { $("#elem_nombres").cambiarEstatus("error"); }
  });
  $("#user_lnames").blur(function() {
  $("#elem_apellidos").cambiarEstatus("ok");
  if(regVacio.test($(this).val())) { $("#elem_apellidos").cambiarEstatus("error"); }
  });
  $("#user_password").blur(function() {
  $("#elem_pass").cambiarEstatus("ok");
  if(!regPassword.test($(this).val())) { $("#elem_pass").cambiarEstatus("error"); }
  else {
  var numeroPass = parseInt($(this).val());
  $([1111,2222,3333,4444,5555,6666,7777,8888,9999,0000,1234,2345,3456,4567,5678,6789,7890,0987,9876,8765,7654,6543,5432,4321,3210,0123]).each(function(i,v) {
  if(numeroPass == v) { $("#elem_pass").cambiarEstatus("error_clave_insegura", "clave_insegura"); }
  });
  }
  });
  $("#user_password_confirmation").blur(function() {
  $("#elem_passconf").cambiarEstatus("ok");
  if($(this).val() != $("#user_password").val()) { $("#elem_passconf").cambiarEstatus("error"); }
  });

  $("#user_nserie").blur(function() {
    $(this).val( $(this).val().toUpperCase() );
    $("#elem_nserie").cambiarEstatus("ok");
      if(!regNumeroSerie.test($(this).val())) { $("#elem_nserie").cambiarEstatus("error"); }
    }).click(function() {
    if ($(this).val() == 'Ej: A09191919') $(this).val('');
  });

  $("#user_pan").blur(function() {
    $("#elem_pan").cambiarEstatus("ok");
    if(!regPan.test($(this).val())) { 
      $("#elem_pan").cambiarEstatus("error"); 
    }
  }).click(function() {
    if ($(this).val() == 'Ej: 1234 1234 1234 1234') $(this).val('');
  });
  
  $("#img_rut").mouseenter(function () {
    $(this).parent().children(".helpdisplay").css("display","block");
  }).mouseleave(function () {
    $(this).parent().children(".helpdisplay").css("display","none");
  });

});