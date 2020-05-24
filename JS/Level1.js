
var gameSettings = {
	playerSpeed:200,playerHealth:1,clear_room_1:0,
	left_rooms : {
		'room2','room5','room1'
	},
	bottom_rooms : {
		'room3'
	},
	top_rooms : {
		'room4'
	}
};



var config ={
	width:1280,
	height:960,
	scene: [Menu1,Room_1,Room_2,Room_3,Room_4,Room_5,Room_preboss],
	pixelArt: true,
	physics: {
		default: "arcade",
		arcade: {
			debug: false
		}
	}
}

var game= new Phaser.Game(config);