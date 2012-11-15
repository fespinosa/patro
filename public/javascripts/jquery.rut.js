$(function(){
  //utilidades mediante jQuery.
  
	$.fn.reformatRut = function(){
		var el = $(this);
		if ( isValidRut(el.val()) ) {
		  new_rut = formatRut(el.val());
  		el.val(new_rut);
		}
	}
});

var regRut = /^\d{1,2}(\.)?\d{3}(\.)?\d{3}(\-)?(\d|k|K)$/;

/********* Utilidades Javascript *********/ 

function removeChar(s,ch){
  var i,c,newStr;

  newStr = "";
  for (i = 0; i < s.length; i++){
    var c = s.charAt(i);
    if (c != ch){
      newStr = newStr + c
    }
  }
  return newStr;
}

function isEmpty(s){
  return ((s == null) || (s.length == 0));
}

function isInteger (s){
  var i;

  if (isEmpty(s)) {return false;}

  for (i = 0; i < s.length; i++){
    if (!isDigit(s.charAt(i))){return false;}
  }
  return true;
}

function isDigit (c){
  return ((c >= "0") && (c <= "9"));
}

function LTrim(str){
  var re = /\s*((\S+\s*)*)/;
  return str.replace(re, "$1");
}

function RTrim(str){
  var re = /((\s*\S+)*)\s*/;
  return str.replace(re, "$1");
}

function Trim(theStr){
  theStr = RTrim(theStr);
  theStr = LTrim(theStr);
  return theStr
}
function getNChars(n,ch){
  var i,newStr;
  newStr = "";
  for (i = 0; i < n; i++){
    newStr = newStr + ch;
  }
  return newStr;
} 

// This returns a string with everything BUT the digits removed.
function getDigits (s) {
  return s.replace (/[^\d]/g, "");
}




/******************************************
VALIDACIONES PARA EL RUT
******************************************/



/******************************************
cleanRut: Limpia todo los que no sean digitos y la letra K o k

(String)
cleanRut("123") ==> "123"
cleanRut("123123123") ==> "123123123"
cleanRut("12312312k") ==> "12312312k"
cleanRut("12312312K") ==> "12312312K"
cleanRut("1231KKK") ==> "1231KKK"
cleanRut("1231A") ==> "1231"
cleanRut("1231B") ==> "1231"
******************************************/

function cleanRut(rut) {
  try {
    return rut.replace (/[^\dKk]/g, "");
  } catch(Error) {
    return ""
  }
}

/******************************************
formatRut10Digits

(String)    | (Integer/String)
rut Digits  | checkDigit
"123123123" | 1                ===>	"1231231231"
"123"       | 1                ===>	"0000001231"
******************************************/

function formatRut10Digits(rutDigits, checkDigit) {
  var tmpStr;

  // Remove trailing and add zeros at begining
  tmpStr = Trim(rutDigits);
  newRut = getNChars(9 - tmpStr.length, "0") + tmpStr + checkDigit;
  return newRut;
}

/******************************************
formatRut: Agrega puntuacion y dash a rut

(String)	
rut
formatRut("1231231")    ==> "1231231"
formatRut("12312312")   ==> "1.231.231-2"
formatRut("123123123")  ==> "12.312.312-3"
formatRut("1231231233") ==> "1231231233"
******************************************/
function formatRut(rut) {
  var rutDigits, checkDigit, rutValue, newRut;

  rutValue = cleanRut(rut);
  if ( rutValue == 0 ) 
  { 
    return "" 
  } 
  else if (!isValidRut(rut)) 
  {
    return rut;
  }
  
  rutDigits = rutValue.substr(0, rutValue.length - 1);
  checkDigit = rutValue.substr(rutValue.length - 1, 1);

  // Build new rut with . and -
  newRut = rutDigits.substr(0, rutDigits.length - 6) + "." + rutDigits.substr(rutDigits.length - 6, 3) + "." + rutDigits.substr(rutDigits.length - 3, 3);

  // Remove trailing 0 
  while (newRut.substr(0, 1) == "0" || newRut.substr(0, 1) == ".") {
    newRut = newRut.substr(1, newRut.length);
  }
  
  return newRut + "-" + checkDigit;
}

/*******************************************
digito(rut): Retorna el digito verificador que corresponde al RUT 

digito("1234567")    ==> "4"
digito("12345678")   ==> "5"
digito("123123123")  ==> "0"
digito("12312312")   ==> "3"
******************************************/
function digito(rut) {
  var i, total, cnt, div, resto, c, digver;

  total = 0;
  cnt = 2;
  for (i = rut.length - 1; i >= 0; i--) {
    c = rut.charAt(i);
    if (c < "0" || "9" < c)
    return "";
    total += parseInt(c, 10) * cnt;
    cnt++;
    if (cnt == 8) {
      cnt = 2;
    }
  }

  div = Math.round(total / 11 - 0.5);
  resto = total - div * 11;
  if ((11 - resto) == 10) {
    digver = "K";
  } else if ((11 - resto) == 11) {
    digver = "0";
  } else {
    digver = (11 - resto) + "";
  }
  return digver;
}

function doError(theField, doingSubmit, errorMessage) {
  if (doingSubmit) {
    if(!theField.val()) {
      theField.value = "";
    }
  }
  return false;
}

function allTrim(varStr) {
  var posBeg = 0;
  var posEnd = 0;
  for (var i = 0; i < varStr.length; i++) {
    if (varStr.substr(i, 1) != ' ') {
      posBeg = i
      i = varStr.length;
    }
  }
  for (var j = (varStr.length - 1); j > -1; j--) {
    if (varStr.substr(j, 1) != ' ') {
      posEnd = j
      j = -1;
    }
  }
  return varStr.substr(posBeg, posEnd + 1);

}

/**************************************
isValidRut: Valida un rut contra su ultimo digito

isValidRut("123123123")     ==> true
isValidRut("12.312.312-3")  ==> true
isValidRut(".......123123123.....") ==> true
isValidRut("12312314k") ==> true
isValidRut("12312314K") ==> true
isValidRut("000000000") ==> false
isValidRut("0")         ==> false

**************************************/
function isValidRut(rut) {
  try {
    rut = cleanRut(rut); //Eliminamos todo lo que no sean digitos o la letra K

    if (rut.length > 9 || rut.length < 8) {
      //Rut no es valido segun largo, devolvemos sin cambios
      return false;
    }

    checkDigit = rut.substr(rut.length - 1, 1).toUpperCase();

    digits = rut.substr(0, rut.length - 1);

    if ( checkDigit != digito(digits) ) {
      return false;
    } else {
      return true;
    }
  } catch(error) {
    console.log(error);
    return false;
  }  
}

//rutField, clearRutField son jQuery objects
function checkRut(rutField, errorMessage, doingSubmit, clearRutField) {
  var rutDigits, checkDigit, rutValue, minusChar;

  // Get digits separeted
  rutField.val(allTrim(rutField.val()));
  rutValue = rutField.val();

  if (errorMessage) {
    //Viene mensaje de error, queremos validar el rut
    rutDigits = rutValue.substr(0, rutValue.length - 1);
    rutDigits = removeChar(rutDigits, '.');
    checkDigit = rutValue.substr(rutValue.length - 1, 1).toUpperCase();  // Convertir a mayscula
    if (isEmpty(rutDigits) || isEmpty(checkDigit)) {
      return true;
    }

    if ( !isValidRut(rutValue) ) {
       doError(rutField, doingSubmit, errorMessage);
       return false;
    }
  } else {
    //No estamos validando el rut, sino poniéndole el dígito verificador
    checkDigit = digito(rutValue);
  }
  rutField.val(formatRut(rutValue));
  return true;
}

function unFormatRut(rutFieldName) {
  rutFieldName = removeChar(rutFieldName, '.');
  rutFieldName = removeChar(rutFieldName, '-');

  return rutFieldName;
}

function LimpiarPasswd(theForm, rutFieldName, passwdFieldName) {
  theForm.elements[passwdFieldName].value = "";
  theForm.elements[rutFieldName].focus();
}

function checkClave(theForm, rutFieldName, errorMessage) {
  var rutField, rutDigits, checkDigit, rutValue, minusChar;

  // Check if field exists
  rutField = theForm.elements[rutFieldName];
  if (typeof (rutField) == "undefined") {
    alert("Campo " + rutFieldName + " no existe en form");
    return false;
  }

  // Get digits separeted
  if (theForm.elements[rutFieldName].value.length < 4) {
    alert(errorMessage);
    theForm.elements[rutFieldName].focus();
    return false;
  }
}
