//----------------------------------------------//	Sitio:		Multipay//	Seccion:	Como Funciona//	Vista:		How it Works//	Version:	1.0//	Creador:	Christian Pino//----------------------------------------------$(document).ready(function() {		//slide control	$(".comoFuncionaUI li:eq(0), .comoFuncionaPaso:eq(0)").click(function() {		$(".comoFuncionaUI li:not(this), .comoFuncionaFlechaPaso:not(#comoFuncionaFlechaPaso_1), .comoFuncionaPaso:not(eq(0)) ").removeClass("activo")		$(".comoFuncionaUI li:eq(0), .comoFuncionaPaso:eq(0), #comoFuncionaFlechaPaso_1").addClass("activo")		$(".comoFuncionaSlide img:not(:eq(0))").fadeOut();		$(".comoFuncionaSlide img:eq(0)").fadeIn();	});	$(".comoFuncionaUI li:eq(1), .comoFuncionaPaso:eq(1)").click(function() {		$(".comoFuncionaUI li:not(this), .comoFuncionaFlechaPaso:not(#comoFuncionaFlechaPaso_2), .comoFuncionaPaso:not(eq(1)) ").removeClass("activo")		$(".comoFuncionaUI li:eq(1), .comoFuncionaPaso:eq(1), #comoFuncionaFlechaPaso_2").addClass("activo")		$(".comoFuncionaSlide img:not(:eq(1))").fadeOut();		$(".comoFuncionaSlide img:eq(1)").fadeIn();	});	$(".comoFuncionaUI li:eq(2), .comoFuncionaPaso:eq(2)").click(function() {		$(".comoFuncionaUI li:not(this), .comoFuncionaFlechaPaso:not(#comoFuncionaFlechaPaso_3), .comoFuncionaPaso:not(eq(2)) ").removeClass("activo")		$(".comoFuncionaUI li:eq(2), .comoFuncionaPaso:eq(2), #comoFuncionaFlechaPaso_3").addClass("activo")		$(".comoFuncionaSlide img:not(:eq(2))").fadeOut();		$(".comoFuncionaSlide img:eq(2)").fadeIn();	});	$(".comoFuncionaUI li:eq(3), .comoFuncionaPaso:eq(3)").click(function() {		$(".comoFuncionaUI li:not(this), .comoFuncionaFlechaPaso:not(#comoFuncionaFlechaPaso_4), .comoFuncionaPaso:not(eq(3)) ").removeClass("activo")		$(".comoFuncionaUI li:eq(3), .comoFuncionaPaso:eq(3), #comoFuncionaFlechaPaso_4").addClass("activo")		$(".comoFuncionaSlide img:not(:eq(3))").fadeOut();		$(".comoFuncionaSlide img:eq(3)").fadeIn();	});	$(".comoFuncionaUI li:eq(4), .comoFuncionaPaso:eq(4)").click(function() {		$(".comoFuncionaUI li:not(this), .comoFuncionaFlechaPaso:not(#comoFuncionaFlechaPaso_5), .comoFuncionaPaso:not(eq(4)) ").removeClass("activo")		$(".comoFuncionaUI li:eq(4), .comoFuncionaPaso:eq(4), #comoFuncionaFlechaPaso_5").addClass("activo")		$(".comoFuncionaSlide img:not(:eq(4))").fadeOut();		$(".comoFuncionaSlide img:eq(4)").fadeIn();	});	});//cierra document.ready