"use strict";

(function()
{	
	window.addEventListener("load", main);
}());


function main()
{
	var sWidth = window.screen.availWidth;
	var wWidth = 1280;
	var wHeight = 960;
	var wLeft = (sWidth - wWidth)/2;	//center window on the screen
	var myWindow = window.open("../HTML/projeto.html", "mainWindow", "width = " + wWidth + ", height = " + wHeight + ", left = " + wLeft);
}

