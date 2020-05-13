var gameSettings = {
	playerSpeed: 200;
	enemy4Speed: 110,
}




var config ={
	width:1280,
	height:960,
	scene: [Room_1],
	pixelArt: true,
	physics: {
		default: "arcade",
		arcade: {
			debug: false
		}
	}
}

var game= new Phaser.Game(config);