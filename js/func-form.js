﻿// Variables para setear
onload=function() 
{

	divTransparente=document.getElementById("transparencia");
	divMensaje=document.getElementById("transparenciaMensaje");
	form=document.getElementById("formulario");
	urlDestino="mail.php";
	
	claseNormal="input";
	claseError="inputError";
	

	
	preCarga("image/ok.png", "image/loading4.gif", "image/error.png");
}

function preCarga()
{
	imagenes=new Array();
	for(i=0; i<arguments.length; i++)
	{
		imagenes[i]=document.createElement("img");
		imagenes[i].src=arguments[i];
	}
}

function nuevoAjax()
{ 
	var xmlhttp=false; 
	try 
	{ 
		// No IE
		xmlhttp=new ActiveXObject("Msxml2.XMLHTTP"); 
	}
	catch(e)
	{ 
		try
		{ 
			// IE 
			xmlhttp=new ActiveXObject("Microsoft.XMLHTTP"); 
		} 
		catch(E) { xmlhttp=false; }
	}
	if (!xmlhttp && typeof XMLHttpRequest!="undefined") { xmlhttp=new XMLHttpRequest(); } 
	return xmlhttp; 
}

function limpiaForm()
{
	for(i=0; i<=4; i++)
	{
		form.elements[i].className=claseNormal;
	}
	document.getElementById("inputComentario").className=claseNormal;
}

function campoError(campo)
{
	campo.className=claseError;
	error=1;
}

function ocultaMensaje()
{
	divTransparente.style.display="none";
}

function muestraMensaje(mensaje)
{
	divMensaje.innerHTML=mensaje;
	divTransparente.style.display="block";
}

function eliminaEspacios(cadena)
{
	// Funcion para eliminar espacios delante y detras de cada cadena
	while(cadena.charAt(cadena.length-1)==" ") cadena=cadena.substr(0, cadena.length-1);
	while(cadena.charAt(0)==" ") cadena=cadena.substr(1, cadena.length-1);
	return cadena;
}

function validaLongitud(valor, permiteVacio, minimo, maximo)
{
	var cantCar=valor.length;
	if(valor=="")
	{
		if(permiteVacio) return true;
		else return false;
	}
	else
	{
		if(cantCar>=minimo && cantCar<=maximo) return true;
		else return false;
	}
}

function validaCorreo(valor)
{
	var reg=/(^[a-zA-Z0-9._-]{1,30})@([a-zA-Z0-9.-]{1,30}$)/;
	if(reg.test(valor)) return true;
	else return false;
}

function validaForm()
{
	limpiaForm();
	error=0;
	
	var nombre=eliminaEspacios(form.inputNombre.value);

	var web=eliminaEspacios(form.inputWeb.value);
	var correo=eliminaEspacios(form.inputCorreo.value);
	var comentarios=eliminaEspacios(form.inputComentario.value);
	
	if(!validaLongitud(nombre, 0, 4, 50)) campoError(form.inputNombre);

	if(!validaLongitud(web, 1, 4, 50)) campoError(form.inputWeb);
	if(!validaCorreo(correo)) campoError(form.inputCorreo);
	if(!validaLongitud(comentarios, 0, 5, 500)) campoError(form.inputComentario);
	
	if(error==1)
	{
		var texto="<img src='image/error.png' alt='Error'><br><br>Error: Complete los campos necesarios.<br><br><button style='width:45px; height:18px; font-size:10px;' onClick='ocultaMensaje()' type='button'>Ok</button>";
		muestraMensaje(texto);
	}
	else
	{
		var texto="<img src='image/loading4.gif' alt='Enviando'><br>Enviando. Por favor espere.<br><br><button style='width:60px; height:18px; font-size:10px;' onClick='ocultaMensaje()' type='button'>Ocultar</button>";
		muestraMensaje(texto);
		
		var ajax=nuevoAjax();
		ajax.open("POST", urlDestino, true);
		ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		ajax.send("nombre="+nombre+"&web="+web+"&correo="+correo+"&comentarios="+comentarios);
		
		ajax.onreadystatechange=function()
		{
			if (ajax.readyState==4)
			{
				var respuesta=ajax.responseText;
				if(respuesta=="OK")
				{
					var texto="<img src='image/ok.png' alt='Ok'><br>Gracias por su mensaje.<br>Le responderemos a la brevedad.<br><br><button style='width:45px; height:18px; font-size:10px;' onClick='ocultaMensaje()' type='button'>Ok</button>";
				}
				else var texto="<img src='image/error.png'><br><br>Error: intente más tarde.<br><br><button style='width:45px; height:18px; font-size:10px;' onClick='ocultaMensaje()' type='button'>Ok</button>";
				
				muestraMensaje(texto);
			}
		}
	}
}
// Mensajes de ayuda

if(navigator.userAgent.indexOf("MSIE")>=0) navegador=0;
else navegador=1;
