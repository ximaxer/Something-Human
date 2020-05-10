"use strict";

(function()
{
	window.addEventListener("load", main);
}());


function main(){

	var mainSource = window.parent;
    var btnStart = document.getElementById("StartGameBtn");
	var btnOptions = document.getElementById("OptionsBtn");
	var btnExit = document.getElementById("ExitBtn");


	btnStart.addEventListener("click", startClick);
    btnOptions.addEventListener("click", optionsClick);
	btnExit.addEventListener("click", exitClick);

    function startClick(ev) {
		mainSource.postMessage('../HTML/Level1.html', '*');
    }
	function optionsClick(ev) {
		mainSource.postMessage('Options.html', '*');
    }
	function exitClick(ev) {
		mainSource.postMessage('Quit.html', '*');
    }
}