class Room_1 extends Phaser.Scene {
	constructor(){
	super("Room_1");
	}

	preload(){
		this.load.image("background",("../resources/levels/level_1/room_1/background.png"));
		this.load.image("terrain",("../resources/levels/level_1/room_1/room_1.png"));



		//this.load.spritesheet()
		this.load.spritesheet("character","../resources/MainCharacter.png",{
			frameWidth:23, 
			frameHeight:70
		});
	}

	create(){
		this.background = this.add.image(0,0,"background");
		this.background.setOrigin(0,0);

		this.anims.create({
			key: "character_walk",
			frames: this.anims.generateFrameNumbers("character"),
			frameRate: 4,
			repeat: -1
		});

		this.terrain = this.physics.add.sprite(0,0,"terrain");
		this.terrain.setOrigin(0,0);
		var character = this.character = this.physics.add.sprite(200,200,"character");
		this.character.setOrigin(0,0);
		this.character.play("character_walk");
		this.cursorKeys = this.input.keyboard.createCursorKeys();
		this.character.setCollideWorldBounds(true);
		character.body.setSize(character.width,character.height,true);
		this.physics.add.collider(this.terrain, this.character, function(terrain,character){
			console.log("colisao efetuada");
		});





		this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
		this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
		character.setVelocity(0,160);
	}

	movePlayerManager(){
		if(this.a.isDown){
			if(Phaser.Input.Keyboard.JustDown(this.a)){this.character.flipX = true}
			this.character.setVelocityX(-gameSettings.playerSpeed);
		}else if(this.d.isDown){
			if(Phaser.Input.Keyboard.JustDown(this.d)){this.character.flipX = false}
			this.character.setVelocityX(gameSettings.playerSpeed);
		}else this.character.setVelocityX(0);

	}


	update(){
		this.movePlayerManager();
	}

}