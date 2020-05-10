class Room_1 extends Phaser.Scene {
	constructor(){
	super("Room_1");
	}

	preload(){
		this.load.image("background",("../resources/levels/level_1/room_1/background.png"));
		this.load.image("terrain",("../resources/levels/level_1/room_1/room_1.png"));
		this.load.image("character",("../resources/MainCharacter.png"));
	}
	create(){
		this.background = this.add.image(0,0,"background");
		this.background.setOrigin(0,0);

		this.terrain = this.add.image(0,0,"terrain");
		this.terrain.setOrigin(0,0);

		this.character = this.add.image(0,765,"character");
		this.character.setOrigin(0,0);
	}
}