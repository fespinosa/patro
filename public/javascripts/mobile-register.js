
// DEVELOPERS

  $(document).ready(function() {

  $("#phone").val(sessionStorage.user_cellphone);
  $("#phone_label").text('Tu número celular es ' + sessionStorage.user_cellphone);

  var regVacio = /^(\s)*$/;
  var regNombres = /^\D{2,30}$/;
  var regPassword = /^\d{4}$/;
  var regEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  var regPan = /^\d+$/;
  var regRut = /^\d{1,2}(\.)?\d{3}(\.)?\d{3}(\-)?(\d|k|K)$/;
  var regPass =[1111,2222,3333,4444,5555,6666,7777,8888,9999,0000,1234,2345,3456,4567,5678,6789,7890,0987,9876,8765,7654,6543,5432,4321,3210,0123];

  var fnamesInput = $("#fnames");
  var lnamesInput = $("#lnames");
  var emailInput = $("#email");
  var phoneInput = $("#phone");
  var fullRutInput = $("#full_user_rut");
  var passwordInput = $("#password");
  var passConfirmInput = $('#password_confirmation');
  var errorsOutput = $('#campo_de_errores');  

  //Validacion Total del Formulario
  $('form#formularioRegistroMobile').submit(function() {
    $("input", this).blur();

    if ( $('.Error').length == 0 ) {
      return true;
    }
    return false;
  });

  // $("#img_rut").mouseenter(function () {
  //   $(this).parent().children(".helpdisplay").css("display","block");
  // }).mouseleave(function () {
  //   $(this).parent().children(".helpdisplay").css("display","none");
  // });


  function EscribirError(){
    if(fnamesInput.parent().hasClass('Error')){
      if(fnamesInput.hasClass('error_empty')){
        fnamesInput.parent().children('.ErrorLabel').text('Debes ingresar tu nombre');
      } else if(fnamesInput.hasClass('error_invalid')){
        fnamesInput.parent().children('.ErrorLabel').text('Nombre inválido: 2 letras mínimo y sin números');
      }
    }
    if(lnamesInput.parent().hasClass('Error')){
      if(lnamesInput.hasClass('error_empty')){
        lnamesInput.parent().children('.ErrorLabel').text('Debes ingresar tu apellido.');
      } else if(lnamesInput.hasClass('error_invalid')){
        lnamesInput.parent().children('.ErrorLabel').text('Nombre inválido: 2 letras mínimo y sin números');
      }
    }
    if(emailInput.parent().hasClass('Error')){
      if(emailInput.hasClass('error_empty')){
        emailInput.parent().children('.ErrorLabel').text('Debes ingresar tu email.');
      } else if(emailInput.hasClass('error_email_registered')){
        emailInput.parent().children('.ErrorLabel').text('Email ya está en uso. Recupera tu clave arriba.');
      }else{
        emailInput.parent().children('.ErrorLabel').text('Email inválido.');
      }
    }
    if(fullRutInput.parent().hasClass('Error')){
      if(fullRutInput.hasClass('error_rut_registered')){
        fullRutInput.parent().children('.ErrorLabel').text('Rut ya está en uso. Recupera tu clave arriba.');
      }else{
        fullRutInput.parent().children('.ErrorLabel').text('Rut inválido.');
      }
    }
    if(passwordInput.parent().hasClass('Error')){
      if(passwordInput.hasClass('pass_invalido')){
        passwordInput.parent().children('.ErrorLabel').text('La clave debe tener 4 dígitos no iguales ni consecutivos');
      }else if(passwordInput.hasClass('pass_nums_consecutivos')){
        passwordInput.parent().children('.ErrorLabel').text('La clave no puede contener números consecutivos ni iguales.');
      }
    }
    if(passConfirmInput.parent().hasClass('Error')){
      if(passConfirmInput.hasClass('pass_confirm_invalid')){
        passConfirmInput.parent().children('.ErrorLabel').text('Las claves no coinciden.');
      }
    }
  }

  // Live Validation para Email.
  emailInput.blur(function() {
    email = Trim(emailInput.val());
    console.log('VALIDACION EMAIL ' + email);
    if(email=="")
    {
      console.log('email vacio');
      emailInput.parent().addClass('Error');
      emailInput.addClass('error_empty');
      emailInput.removeClass('error_email_registered');
      console.log('Escritura de errores');
      EscribirError();  
      console.log('FIN DE VALIDACION ' + email);
    }
    else
    {
      console.log('email no vacio');
      emailInput.parent().removeClass('Error');

      if (regEmail.test(email))
      {
        console.log('Email cumple expresion regular');
        $.getJSON("/checkemail/" + email, null, function(respuesta) 
          {
            console.log(respuesta);
            if(respuesta == false)
            {     
              console.log('Email repetido');
              emailInput.parent().addClass('Error');
              emailInput.removeClass('error_empty');
              emailInput.addClass('error_email_registered');
              console.log('Escritura de errores');
              EscribirError();  
              console.log('FIN DE VALIDACION ' + email);
            }
            else
            {
              console.log('Email OK');
              emailInput.parent().removeClass('Error');
              emailInput.removeClass('error_email_registered');
              emailInput.removeClass('error_empty');
              console.log('Escritura de errores');
              EscribirError();  
              console.log('FIN DE VALIDACION ' + email);           
            }
          });
      }
      else
      {
        console.log('Email cumple expresion regular');
        emailInput.parent().addClass('Error');
        emailInput.removeClass('error_email_registered');
        emailInput.removeClass('error_empty');
        console.log('Escritura de errores');
        EscribirError();  
        console.log('FIN DE VALIDACION ' + email);
      }
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
            fullRutInput.parent().addClass('Error');
            fullRutInput.addClass('error_rut_registered');
            EscribirError();
          }else{
            fullRutInput.parent().removeClass('Error');
            fullRutInput.removeClass('error_rut_registered');
            EscribirError();
          }
        });
      }
    }else{
      //Rut es inválido.
      fullRutInput.parent().addClass('Error');
      fullRutInput.addClass('inputTextError');
      EscribirError();
    }
  });

  // Validación para nombre.
  fnamesInput.blur(function() {
    if(regVacio.test($(this).val())) {
      fnamesInput.parent().addClass('Error');
      fnamesInput.addClass('error_empty');
      fnamesInput.removeClass('error_invalid');
    }else if(regNombres.test($(this).val())) {
        fnamesInput.parent().removeClass('Error');
    }
      else{
        fnamesInput.parent().addClass('Error');
        fnamesInput.addClass('error_invalid');
        fnamesInput.removeClass('error_empty');
      }
    EscribirError();
  });

  // Validación para apellido.
  lnamesInput.blur(function() {
    if(regVacio.test($(this).val())) {
      lnamesInput.parent().addClass('Error');
      lnamesInput.addClass('error_empty');
      lnamesInput.removeClass('error_invalid');
    }else if(regNombres.test($(this).val())){
      lnamesInput.parent().removeClass('Error');
    }
      else{
        lnamesInput.parent().addClass('Error');
        lnamesInput.addClass('error_invalid');
        lnamesInput.removeClass('error_empty');
      }
    EscribirError();
  });

  // Validación de password
  passwordInput.blur(function() {
    if(!regPassword.test($(this).val())) {
      passwordInput.addClass("pass_invalido");
      passwordInput.parent().addClass('Error');
    }
    else if(regVacio.test($(this).val())) {
      passwordInput.parent().addClass('Error');
      passwordInput.addClass('error_empty');
      passwordInput.removeClass('error_invalid');
    }
    else {
      var numeroPass = parseInt($(this).val());
      
      if($.inArray(numeroPass,regPass) != -1){
        passwordInput.parent().addClass('Error');
        passwordInput.addClass("inputTextError");
        passwordInput.addClass("pass_nums_consecutivos");
      }else{
        passwordInput.parent().removeClass("Error");
        passwordInput.removeClass("pass_nums_consecutivos");
        if(passConfirmInput.val() == passwordInput.val()){
          passConfirmInput.parent().removeClass("Error");
          passConfirmInput.removeClass("pass_confirm_invalid");
        }
      }
    }
    EscribirError();
  });

  // Validación de confirmación de password
  passConfirmInput.blur(function(){
    if(passConfirmInput.val() != passwordInput.val()){
      passConfirmInput.parent().addClass("Error");
      passConfirmInput.addClass("pass_confirm_invalid");
    }
    else if(regVacio.test($(this).val())) {
      passConfirmInput.parent().addClass('Error');
      passConfirmInput.addClass('error_empty');
      passConfirmInput.removeClass('error_invalid');
    }
    else{
      passConfirmInput.parent().removeClass("Error");
      passConfirmInput.removeClass("pass_confirm_invalid");      
    }
    EscribirError();
  });

});
