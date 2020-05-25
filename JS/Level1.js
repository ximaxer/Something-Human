
var gameSettings = {
	playerSpeed:200,playerHealth:1,
	room1:{total_enemies:1,cleared:0},
	room2:{total_enemies:1,cleared:0},
	room3:{total_enemies:1,cleared:0},
	room4:{total_enemies:1,cleared:0},
	room5:{total_enemies:1,cleared:0},
	left_rooms : ['Room_2','Room_5','Room_1'],
	bottom_rooms : ['Room_3'],
	top_rooms : ['Room_4'],
	available_rooms:['Room_1','Room_2','Room_3','Room_4','Room_5'],
	room_path:['Room_0'],
	currentScene:0,
};

function death(){
	gameSettings.playerHealth=1;
	gameSettings.room1.total_enemies=1;
	gameSettings.room1.cleared=0;
	gameSettings.room2.total_enemies=1;
	gameSettings.room2.cleared=0;
	gameSettings.room3.total_enemies=1;
	gameSettings.room3.cleared=0;
	gameSettings.room4.total_enemies=1;
	gameSettings.room4.cleared=0;
	gameSettings.room5.total_enemies=1;
	gameSettings.room5.cleared=0;
	gameSettings.left_rooms = ['Room_2','Room_5','Room_1'];
	gameSettings.bottom_rooms = ['Room_3'];
	gameSettings.top_rooms = ['Room_4'];
	gameSettings.available_rooms = ['Room_1','Room_2','Room_3','Room_4','Room_5'];
	gameSettings.room_path = ['Room_0'];
	gameSettings.currentScene = 0;
};

var config ={
	width:1280,
	height:960,
	scene: [Menu1,Load,Room_0,Room_1,Room_2,Room_3,Room_4,Room_5,Room_6],
	pixelArt: true,
	physics: {
		default: "arcade",
		arcade: {
			debug: false
		}
	}
}

var game= new Phaser.Game(config);