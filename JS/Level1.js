
var gameSettings = {
	playerSpeed:200,playerHealth:1,
	room1:{total_enemies:1,cleared:0},
	room2:{total_enemies:1,cleared:0},
	room3:{total_enemies:1,cleared:0},
	room4:{total_enemies:1,cleared:0},
	room5:{total_enemies:1,cleared:0},
	left_rooms : ['Room_2','Room_5'],
	bottom_rooms : ['Room_3'],
	top_rooms : ['Room_4'],
	available_rooms:['Room_2','Room_3','Room_4','Room_5']
};


var config ={
	width:1280,
	height:960,
	scene: [Menu1,Load,Room_1,Room_2,Room_3,Room_4,Room_5],
	pixelArt: true,
	physics: {
		default: "arcade",
		arcade: {
			debug: false
		}
	}
}

var game= new Phaser.Game(config);