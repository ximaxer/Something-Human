"use strict";

const totPages = 3;

(function()
{	
	window.addEventListener("load", main);
}());


function main()
{
	//var btn = document.getElementsByTagName("button")[0];
	//btn.addEventListener("click", btnNextPageHandler);  escutar clicks no botão de navegação

	var startPage = 1;
	showPage(startPage);
	window.addEventListener("message", messageHandler);
}


//---- Navegação e gestão de janelas
function showPage(pageNum)
{
	//carregar página na frame e enviar mensagem para a página logo que esteja carregada (frameLoadHandler)
	var frm = document.getElementsByTagName("iframe")[0];
	frm.src = "menu_main"+ ".html";

}

function hidePage(pageNum)  //não é necessário (excepto se páginas diferentes tivessem zonas de navegação diferentes)
{
	var frm = document.getElementsByTagName("iframe")[0];
	frm.src = "";
}



function btnNextPageHandler(ev)
{
	var frm = document.getElementsByTagName("iframe")[0];
	var frmName = frm.src;
	var pageNum = Number(frmName.charAt(frmName.length - 6));  

	hidePage(pageNum);
	showPage(pageNum + 1);
}	


function messageHandler(ev)
{
	var frm = document.getElementsByTagName("iframe")[0];
	var frmName = frm.src;
	var pageNum = Number(frmName.charAt(frmName.length - 6));  
	console.log("main: got message: " + ev.data);
	if(ev.data == "next"){
		showPage(pageNum + 1);
	}
	if(ev.data == "fim"){
		window.close();
	}

}