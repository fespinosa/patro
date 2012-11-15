
// DEVELOPERS

  $(document).ready(function() {
  var regVacio = /^(\s)*$/;
  var regNombres = /^\D{2,30}$/;
  var regNumeroSerie = /^A\d{8,}$/;
  var regPassword = /^\d{4}$/;
  var regEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  var regPan = /^\d+$/;
  var regPhone = /^\d{8}$/;
  var regRut = /^\d{1,2}(\.)?\d{3}(\.)?\d{3}(\-)?(\d|k|K)$/;
  var regPass =[1111,2222,3333,4444,5555,6666,7777,8888,9999,0000,1234,2345,3456,4567,5678,6789,7890,0987,9876,8765,7654,6543,5432,4321,3210,0123];

  var fnamesInput = $("#user_fnames");
  var lnamesInput = $("#user_lnames");
  var emailInput = $("#user_email");
  var phoneInput = $("#user_phone");
  var fullRutInput = $("#user_full_user_rut");
  var nserieInput = $('#user_nserie');
  var passwordInput = $("#user_password");
  var passConfirmInput = $('#user_password_confirmation');
  var errorsOutput = $('#campo_de_errores');
  
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
        $('#btn_registro')[0].disabled = true;
        $('form#formularioRegistroHome').submit();
        $(".ui-dialog-buttonset button")[0].disabled=true;
        $(".ui-dialog-buttonset button")[1].disabled=true;
      },
      "Ups, me equivoqué": function() {
        $( this ).dialog( "close" );
      }
    }
  });

  //Validacion Total del Formulario
  $('form#formularioRegistroHome').submit(function() {
    $("input", this).blur();

    if ( !$("input", this).hasClass("inputTextError") ) {
      //Form sin errores
      if ( !confirmPhoneBox.data("confirmed") ) {
        $('#confirm-phone-box #phone-to-confirm').html(phoneInput.val());
        confirmPhoneBox.dialog('open');
      } else {

        var spinner = new Spinner(spinner_opts_registro).spin($('#spinnerTransferencia')[0]);
        setTimeout(function(){
          //Si tiene errores...
          if ($("#campo_de_errores").css('display') == 'block'){
            spinner.stop();
          }
        },1500);

        return true;
      }
    }
    return false;
  });

  $("#img_rut").mouseenter(function () {
    $(this).parent().children(".helpdisplay").css("display","block");
  }).mouseleave(function () {
    $(this).parent().children(".helpdisplay").css("display","none");
  });


  function EscribirError(){
    if(fnamesInput.hasClass('inputTextError')){
      if(fnamesInput.hasClass('error_empty')){
        errorsOutput.html('Debes ingresar tu nombre');
      } else if(fnamesInput.hasClass('error_invalid')){
        errorsOutput.html('Nombre inválido');
      }
      errorsOutput.show();
    }else if(lnamesInput.hasClass('inputTextError')){
      if(lnamesInput.hasClass('error_empty')){
        errorsOutput.html('Debes ingresar tu apellido');
      } else if(lnamesInput.hasClass('error_invalid')){
        errorsOutput.html('Apellido inválido');
      }
      errorsOutput.show();
    }else if(emailInput.hasClass('inputTextError')){
      if(emailInput.hasClass('error_email_registered')){
        errorsOutput.html('Email ya está en uso. Recupera tu clave arriba');
      }else{
        errorsOutput.html('Email incorrecto');
      }
      errorsOutput.show();
    }else if(phoneInput.hasClass('inputTextError')){
      if(phoneInput.hasClass('error_telefono_registrado')){
        errorsOutput.html('Celular en uso. Recupera tu clave arriba');
      }else{
        errorsOutput.html('Celular incorrecto');
      }
      errorsOutput.show();
    }else if(fullRutInput.hasClass('inputTextError')){
      if(fullRutInput.hasClass('error_rut_registered')){
        errorsOutput.html('RUT ya está en uso. Recupera tu clave arriba');
      }else{
        errorsOutput.html('RUT inválido');
      }
      errorsOutput.show();
    }else if(nserieInput.hasClass('inputTextError')){
      if(nserieInput.hasClass('nserie_invalido')){
        errorsOutput.html('El número de serie es inválido');
      }
      errorsOutput.show();
    }else if(passwordInput.hasClass('inputTextError')){
      if(passwordInput.hasClass('pass_invalido')){
        errorsOutput.html('La clave debe tener 4 dígitos que no sean consecutivos ni repetidos');
      }else if(passwordInput.hasClass('pass_nums_consecutivos')){
        errorsOutput.html('La clave no puede contener números consecutivos ni iguales');
      }
      errorsOutput.show();
    }else if(passConfirmInput.hasClass('inputTextError')){
      if(passConfirmInput.hasClass('pass_confirm_invalid')){
        errorsOutput.html('Las claves no coinciden');
      }
      errorsOutput.show();
    }else{
      errorsOutput.hide();
    }
  }

  // Live Validation de Teléfono.
  phoneInput.blur(function() {
    phone = Trim(phoneInput.val());
    if(regPhone.test(phone)){
      $.getJSON("/checkphone/" + phone, null,
        function(respuesta) {
          if(respuesta == false) {
            phoneInput.addClass('inputTextError');
            phoneInput.addClass('error_telefono_registrado');
            EscribirError();
          }
          else {
            phoneInput.removeClass('inputTextError');
            phoneInput.removeClass('error_telefono_registrado');
            EscribirError();
          }
        }
      );
    }
    else{
      phoneInput.addClass("inputTextError");
      phoneInput.removeClass('error_telefono_registrado');
      EscribirError();
    }
  });

  // Live Validation para Email.
  emailInput.blur(function() {
    email = Trim(emailInput.val());
    if (regEmail.test(email)){
      $.getJSON("/checkemail/" + email, null,
      function(respuesta) {
        if(respuesta == false) {
          emailInput.addClass('inputTextError');
          emailInput.addClass('error_email_registered');
          EscribirError();
        }
        else{
          emailInput.removeClass('inputTextError');
          emailInput.removeClass('error_email_registered');
          EscribirError();
        }
      });
    } else {
      emailInput.addClass('inputTextError');
      emailInput.removeClass('error_email_registered');
      EscribirError();
    }
  });

  // Validación de Rut
  fullRutInput.blur(function() {
    var cleanedRutInput = fullRutInput.val().replace (/[^\dKk]/g, "");
    cleanedRutInput = cleanedRutInput.substr(0,cleanedRutInput.length-1);
    if(regRut.test(Trim(fullRutInput.val())) && checkRut(fullRutInput, "El rut no es v&aacute;lido", true, cleanedRutInput)){
      //Rut es válido; chequeando que no está registrado.
      if (fullRutInput.val() != ""){
        $.getJSON("/checkrut/" + cleanedRutInput, null, function(respuesta) {
          if(!respuesta)
          {
            fullRutInput.addClass('inputTextError');
            fullRutInput.addClass('error_rut_registered');
            EscribirError();
          }else{
            fullRutInput.removeClass("inputTextError");
            fullRutInput.removeClass('error_rut_registered');
            EscribirError();
          }
        });
      }
    }else{
      //Rut es inválido.
      fullRutInput.addClass('inputTextError');
      EscribirError();
    }
  });

  // Validación para nombre.
  fnamesInput.blur(function() {
    if(regVacio.test($(this).val())) {
      fnamesInput.addClass('inputTextError');
      fnamesInput.addClass('error_empty');
      fnamesInput.removeClass('error_invalid');
    }else if(regNombres.test($(this).val())) {
        fnamesInput.removeClass('inputTextError');
    }
      else{
        fnamesInput.addClass('inputTextError');
        fnamesInput.addClass('error_invalid');
        fnamesInput.removeClass('error_empty');
      }
    EscribirError();
  });

  // Validación para apellido.
  lnamesInput.blur(function() {
    if(regVacio.test($(this).val())) {
      lnamesInput.addClass('inputTextError');
      lnamesInput.addClass('error_empty');
      lnamesInput.removeClass('error_invalid');
    }else if(regNombres.test($(this).val())){
        lnamesInput.removeClass('inputTextError');
    }
      else{
        lnamesInput.addClass('inputTextError');
        lnamesInput.addClass('error_invalid');
        lnamesInput.removeClass('error_empty');
      }
    EscribirError();
  });

  // Validación de password
  passwordInput.blur(function() {
    passwordInput.removeClass("inputTextError");
    if(!regPassword.test($(this).val())) {
      passwordInput.addClass("pass_invalido");
      passwordInput.addClass("inputTextError");
    }else {

      var numeroPass = parseInt($(this).val());
      if($.inArray(numeroPass,regPass) != -1){
        passwordInput.addClass("inputTextError");
        passwordInput.addClass("pass_nums_consecutivos");
      }else{
          passwordInput.removeClass("inputTextError");
          passwordInput.removeClass("pass_nums_consecutivos");
          if(passConfirmInput.val() == passwordInput.val()){
            passConfirmInput.removeClass("inputTextError");
            passConfirmInput.removeClass("pass_confirm_invalid");
          }
      }
    }
    EscribirError();
  });

  // Validación de confirmación de password
  passConfirmInput.blur(function(){
    if($(this).val() != $("#user_password").val()){
      passConfirmInput.addClass("inputTextError");
      passConfirmInput.addClass("pass_confirm_invalid");
    }else{
      passConfirmInput.removeClass("inputTextError");
      passConfirmInput.removeClass("pass_confirm_invalid");
    }
    EscribirError();
  });

  // Validación de NSERIE
  nserieInput.blur(function() {
    nserieInput.removeClass("inputTextError");
    nserieInput.val( nserieInput.val().toUpperCase() );
    if(!regNumeroSerie.test($(this).val())) {
      nserieInput.addClass("inputTextError");
      nserieInput.addClass("nserie_invalido");
    }
    EscribirError();
  });

});
