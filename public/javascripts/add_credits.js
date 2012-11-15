  $(function(){

    $('.confirm').click(function(e){
      var conf = confirm('¿Seguro que desea salir del flujo de pago?');
      e.preventDefault();
      if(conf){
        document.location = '#{abort_button_path}';
      }
    });

    //select all the a tag with name equal to modal
    $('a[name=modal]').click(function(e) {
      //Cancel the link behavior
      e.preventDefault();

      //Get the A tag
      var id = $(this).attr('href');

      //Get the screen height and width
      var maskHeight = $(document).height();
      var maskWidth = $(window).width();

      //Set heigth and width to mask to fill up the whole screen
      $('#mask').css({'width':maskWidth,'height':maskHeight});

      //transition effect   
      $('#mask').fadeIn(1000);  
      $('#mask').fadeTo("slow",0.8);  

      //Get the window height and width
      var winH = $(window).height();
      var winW = $(window).width();

      //Set the popup window to center
      $(id).css('top',  winH/2-$(id).height()/2);
      $(id).css('left', winW/2-$(id).width()/2);

      //transition effect
      $(id).fadeIn(2000); 
    });   

    //if close button is clicked
    $('.window .close').click(function (e) {
      //Cancel the link behavior
      e.preventDefault();

      $('#mask').hide();
      $('.window').hide();
    });   

    //if mask is clicked
    $('#mask').click(function () {
      $(this).hide();
      $('.window').hide();
    });     

		//Para clipboard de datos

		$(".to_clipboard").qtip({
			position: {
				corner: {
					target: 'topMiddle',
					tooltip: 'bottomMiddle'
				}
			},
			style: { 
				padding: 3,
				background: '#333',
				color: 'white',
				textAlign: 'center',
				border: {
					width: 7,
					radius: 5,
					color: '#333'
				},
				tip: 'bottomMiddle',
				name: 'dark'
			},
			hide: {
				fixed: true,
				when: {
					event: 'mouseleave'
				}
			}
		});
    $('a#copy_account_number').zclip({
        path:'/javascripts/jquery.zclip/ZeroClipboard.swf',
        copy:$('#account_number').text(),
				afterCopy:function(){
					tooltip = $(this).closest('.to_clipboard');
					api = $(tooltip).qtip("api");
					api.updateContent('Copiado!');
					setTimeout(function(){
						api.updateContent('Copiar al portapapeles!');
					},1000);
				}
    });
    $('a#copy_account_rut').zclip({
        path:'/javascripts/jquery.zclip/ZeroClipboard.swf',
        copy:Trim(unFormatRut($('#account_rut').text())),
				afterCopy:function(){
					tooltip = $(this).closest('.to_clipboard');
					var api = $(tooltip).qtip("api");
					api.updateContent('Copiado!');
					setTimeout(function(){
						api.updateContent('Copiar al portapapeles!');
					},1000);
				}
    });
    $('a#copy_account_email').zclip({
        path:'/javascripts/jquery.zclip/ZeroClipboard.swf',
        copy:$('#account_email').text(),
				afterCopy:function(){
					tooltip = $(this).closest('.to_clipboard');
					var api = $(tooltip).qtip("api");
					api.updateContent('Copiado!');
					setTimeout(function(){				
						api.updateContent('Copiar al portapapeles!');						
					},1000);
				}
    });

    $('a#copy_account_name').zclip({
        path:'/javascripts/jquery.zclip/ZeroClipboard.swf',
        copy:$('#account_name').text(),
				afterCopy:function(){
					tooltip = $(this).closest('.to_clipboard');
					var api = $(tooltip).qtip("api");
					api.updateContent('Copiado!');
					setTimeout(function(){
						// api.hide();
						api.updateContent('Copiar al portapapeles!');
					},1000);
				}
    });
  });     

