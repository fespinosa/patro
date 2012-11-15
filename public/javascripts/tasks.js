  cont = 0;
  function chequeaTarea() {
  $
  if (cont++ >= '#{@count_limit}') {
  document.location = '#{@url_timeout}';
  }
  $.post('#{@url_check} ',function (respuesta){
  if (respuesta == #{Button::JOB_STATUS[:done]} ){
  document.location = '#{@url_after}';
  } else if (respuesta == #{Button::JOB_STATUS[:failed]}){
  document.location = '#{@url_error}';
  } else if (respuesta == #{Button::JOB_STATUS[:notify_failed]}){
  document.location = '#{notify_error_button_path}';
  }
  });
  }
  $(function() {
  $('.tip_help').click(function(e){
  $('.tip_content').hide();
  $('.tip_content_help').show();
  });
  $('.tip_content input[type="submit"]').click(function(e){
  $(this).closest('form').submit();
  });

  $('.close').click(function(){
  $('.tip_content, .tip_content_help').fadeOut();
  });
  });


  $(function(){
  $('.confirm').click(function(e){
  var conf = confirm('¿Seguro que desea salir del flujo de pago?');
  e.preventDefault();
  if(conf){
  document.location = '#{abort_button_path}';
  }
  });
  });



