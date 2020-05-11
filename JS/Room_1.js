class Room_1 extends Phaser.Scene {
	constructor(){
	super("Room_1");
	}

	preload(){
		this.load.image("background",("../resources/levels/level_1/room_1/background_f.png"));
		this.load.image("bg",("../resources/levels/level_1/room_1/bg.png"))
		this.load.image("terrain",("../resources/levels/level_1/room_1/room_1.png"));
		this.load.tilemapTiledJSON("map","../resources/levels/level_1/maps/room_1_tilemap.json")

		var grounded, escadas_dir, escadas_esq;
		//this.load.spritesheet()
		this.load.spritesheet("character","../resources/MainCharacter.png",{
			frameWidth:23, 
			frameHeight:70
		});
	}

	create(){
		this.grounded=0;
		this.escadas_dir=0;
		this.escadas_esq=0;
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
		this.physics.add.collider(this.character,groundLayer, () =>{this.grounded=1; this.jumps=2;});
		groundLayer.setCollisionByProperty({collides:true});
		groundLayer.setTileLocationCallback(39,13,1,3,()=>{console.log("saida direita\n");});
		groundLayer.setTileLocationCallback(0,23,1,3,()=>{console.log("saida esquerda\n");});

		//escadas
			//sobem para a direita
		groundLayer.setTileLocationCallback(7,25,1,1,()=>{console.log(this.escadas_dir);this.escadas_dir=1;});
		groundLayer.setTileLocationCallback(22,25,1,1,()=>{console.log(this.escadas_dir);this.escadas_dir=1;});
			//sobem para a esquerda
		groundLayer.setTileLocationCallback(17,25,1,1,()=>{console.log(this.escadas_esq);this.escadas_esq=1;});
		groundLayer.setTileLocationCallback(32,25,1,1,()=>{console.log(this.escadas_esq);this.escadas_esq=1;});
			

		//saidas de escadas
			//sobem para a direita
				//saidaEscadasDir(){if(this.escadas_dir==1){this.character.setVelocityY(0);this.escadas_dir=0;}}
		groundLayer.setTileLocationCallback(8,24,1,1,()=>{if(this.escadas_dir==1){this.character.setVelocityY(0);this.escadas_dir=0;}});
		groundLayer.setTileLocationCallback(6,24,1,1,()=>{if(this.escadas_dir==1){this.character.setVelocityY(0);this.escadas_dir=0;}})
		groundLayer.setTileLocationCallback(21,24,1,1,()=>{if(this.escadas_dir==1){this.character.setVelocityY(0);this.escadas_dir=0;}});
		groundLayer.setTileLocationCallback(23,24,1,1,()=>{if(this.escadas_dir==1){this.character.setVelocityY(0);this.escadas_dir=0;}});
			//sobrem para a esquerda
				//saidaEscadasEsq(){if(this.escadas_esq==1){this.character.setVelocityY(0);this.escadas_esq=0;}}
		groundLayer.setTileLocationCallback(16,24,1,1,()=>{if(this.escadas_esq==1){this.character.setVelocityY(0);this.escadas_esq=0;}});
		groundLayer.setTileLocationCallback(18,24,1,1,()=>{if(this.escadas_esq==1){this.character.setVelocityY(0);this.escadas_esq=0;}});
		groundLayer.setTileLocationCallback(31,24,1,1,()=>{if(this.escadas_esq==1){this.character.setVelocityY(0);this.escadas_esq=0;}});
		groundLayer.setTileLocationCallback(33,24,1,1,()=>{if(this.escadas_esq==1){this.character.setVelocityY(0);this.escadas_esq=0;}});		

		this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
		this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
		this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
		character.setGravityY(575);
	}



	movePlayerManager(){
		if(this.a.isDown){
			if(Phaser.Input.Keyboard.JustDown(this.a)){this.character.flipX = true}
			this.character.setVelocityX(-gameSettings.playerSpeed);
			if(this.escadas_dir>0){
				this.character.setVelocityY(gameSettings.playerSpeed); //desce para a dir
			}else if(this.escadas_esq>0){
				this.character.setVelocityY(-gameSettings.playerSpeed); //sobre para a dir
			}
		}else if(this.d.isDown){
			if(Phaser.Input.Keyboard.JustDown(this.d)){this.character.flipX = false}
			this.character.setVelocityX(gameSettings.playerSpeed);
			if(this.escadas_dir>0){
				this.character.setVelocityY(-gameSettings.playerSpeed); //desce para a esq
			}else if(this.escadas_esq>0){
				this.character.setVelocityY(gameSettings.playerSpeed);  //sobe para a esq
			}
		}else this.character.setVelocityX(0);

		if(Phaser.Input.Keyboard.JustDown(this.w)){
			if(this.jumps>0){
				this.escadas_dir=0;
				this.escadas_esq=0;
				this.character.setVelocityY(-275);
				this.jumps-=1;
			}
		}
	}



	update(){
		this.grounded=0;
		this.movePlayerManager();
		this.bg.tilePositionX -=.3;
	}

}