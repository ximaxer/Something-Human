class Room_1 extends Phaser.Scene {
	constructor(){
	super("Room_1");
	}

	preload(){
		this.load.image("background",("../resources/levels/level_1/room_1/background_f.png"));
		this.load.image("bg",("../resources/levels/level_1/room_1/bg.png"))
		this.load.image("terrain",("../resources/levels/level_1/room_1/room_1.png"));
		this.load.tilemapTiledJSON("map","../resources/levels/level_1/maps/room_1_tilemap.json")

		var grounded;
		//this.load.spritesheet()
		this.load.spritesheet("character","../resources/MainCharacter.png",{
			frameWidth:23, 
			frameHeight:70
		});
	}

	create(){
		this.grounded=0;
		this.anims.create({
			key: "character_walk",
			frames: this.anims.generateFrameNumbers("character"),
			frameRate: 4,
			repeat: -1
		});

		
		let character = this.character = this.physics.add.sprite(200,200,"character");
		this.character.setOrigin(0,0);
		this.character.play("character_walk");
		this.cursorKeys = this.input.keyboard.createCursorKeys();
		this.character.setCollideWorldBounds(true);
		character.body.setSize(character.width,character.height,true);
		
		let map = this.add.tilemap("map");
		let background = map.addTilesetImage("background_f", "background");
		let terrain = map.addTilesetImage("room_1","terrain");

		this.bg= this.add.tileSprite(0,0,1280, 960,"bg").setDepth(-2);
		this.bg.setOrigin(0,0);
		//layers
		let groundLayer = map.createStaticLayer("platforms", [terrain],0,0);
		let bgLayer = map.createStaticLayer("backgrounds", [background],0,0).setDepth(-1);

		//collisions
		this.physics.add.collider(this.character,groundLayer, () =>{console.log("colision detected\n"); this.grounded=1; this.jumps=2;});
		groundLayer.setCollisionByProperty({collides:true});
		//this.physics.add.collider(groundLayer, this.character, isColliding(groundLayer,this.character));

		this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
		this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
		this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
		character.setGravityY(680);
	}

	movePlayerManager(){
		if(this.a.isDown){
			if(Phaser.Input.Keyboard.JustDown(this.a)){this.character.flipX = true}
			this.character.setVelocityX(-gameSettings.playerSpeed);
		}else if(this.d.isDown){
			if(Phaser.Input.Keyboard.JustDown(this.d)){this.character.flipX = false}
			this.character.setVelocityX(gameSettings.playerSpeed);
		}else this.character.setVelocityX(0);
		if(Phaser.Input.Keyboard.JustDown(this.w)){
			if(this.jumps>0){
				this.character.setVelocityY(-275);
				this.jumps-=1;
			}
		}
	}

	/*isColliding(a,b){
		if()
	}*/


	update(){
		console.log(this.grounded);
		this.grounded=0;
		this.movePlayerManager();
		this.bg.tilePositionX -=.3;
	}

}