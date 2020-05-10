"use strict";

const totPages = 3;

(function()
{	
	window.addEventListener("load", main);
}());


function main()
{
	var iframe = document.getElementById('mainIframe');
	var audio = document.getElementsByTagName('audio')[0];
	audio.controls = true;
	audio.onplay = function() {
		audio.controls = false;
	};
	audio.play().catch(function(){
		console.log("Audio started playing");
	});
	audio.volume = 0.5;

	window.addEventListener("message", windowListener);


	function windowListener(ev)
   	 	{
			var message = ev.data;
   	 		console.log("Recieved event " + message);
			iframe.src = message;
		}

}