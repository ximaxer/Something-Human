"use strict";

(function()
{
	window.addEventListener("load", main);
}());


function main(){


	const audio = new Audio("../resources/main_menu/soundtrack/main_menu.mp3");
	audio.play();
	audio.volume=1;
	var mainSource = window.parent;
    var btnStart = document.getElementById("StartGameBtn");
	var btnOptions = document.getElementById("OptionsBtn");
	var btnExit = document.getElementById("ExitBtn");

	
	var aux = document.getElementById("popup_contentStartButton").style.backgroundImage;
	aux = startImg;
	aux2 = startImg;


    btnStart.onclick = function() {
		mainSource.postMessage('Level1.html', '*');
    }
	
	btnOptions.onclick = function() {
		mainSource.postMessage('Options.html', '*');
    }
	btnExit.onclick = function() {
		mainSource.postMessage('Quit.html', '*');
    }
   
}