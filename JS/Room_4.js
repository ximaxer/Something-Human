class Room_4 extends Phaser.Scene {
	constructor(){
	super("Room_4");
	}

	preload(){
		this.load.image("background",("../resources/levels/level_1/room_4/background_f.png"));
		this.load.image("bg",("../resources/levels/level_1/room_4/bg.png"))
		this.load.image("terrain",("../resources/levels/level_1/room_4/room_4.png"));
		this.load.tilemapTiledJSON("map","../resources/levels/level_1/maps/room_4_tilemap.json")
		//this.load.spritesheet("enemy_4","../resources/characters/enemy4_tileset.png", {frameHeight: 114, frameWidth: 92});
		this.load.spritesheet("character","../resources/characters/MainCharacter.png", {frameWidth: 23, frameHeight: 70});

		var escadas_dir, escadas_esq;
	}		

	create(){

		this.character = {
        	'jumps': null,
        	'grounded': null,
    	},
    	/*this.enemy4 = {
    		'current_velocity': null,
    	},*/
		this.character.grounded=0;
		this.character.jumps=0;
		this.escadas_dir=0;
		this.escadas_esq=0;
		this.anims.create({
			key: "character_walk",
			frames: this.anims.generateFrameNumbers("character"),
			frameRate: 4,
			repeat: -1
		});

		/*this.anims.create({
			key: "enemy4_walk",
			frames: this.anims.generateFrameNumbers("enemy_4"),
			frameRate: 8,
			repeat: -1
		});
		let enemy4 = this.enemy4 = this.physics.add.sprite(512,303,"enemy_4");
		this.enemy4.setOrigin(0,0);
		this.enemy4.play("enemy4_walk");
		this.enemy4.setVelocityX(110);
		this.enemy4.current_velocity=110;
		*/


		let character = this.character = this.physics.add.sprite(1000,200,"character");
		this.character.setOrigin(0,0);
		this.character.play("character_walk");
		this.cursorKeys = this.input.keyboard.createCursorKeys();
		this.character.setCollideWorldBounds(true);
		character.body.setSize(character.width,character.height,true);
		//this.enemy4.setCollideWorldBounds(true);
		//enemy4.body.setSize(enemy4.width,enemy4.height,true);
		
		let map = this.add.tilemap("map");
		let background = map.addTilesetImage("background_f", "background");
		let terrain = map.addTilesetImage("room_4","terrain");

		this.bg= this.add.tileSprite(0,0,1280, 960,"bg").setDepth(-2);
		this.bg.setOrigin(0,0);

		//layers
		let wallLayer = map.createStaticLayer("walls", [terrain],0,0);
		//let npc_pathLayer = map.createStaticLayer("npc_path", [background],0,0).setDepth(1);
		let upExitLayer = map.createStaticLayer("up_exit",[terrain],0,0).setDepth(-3);
		let downExitLayer = map.createStaticLayer("down_exit",[terrain],0,0).setDepth(-3);
		let groundLayer = map.createStaticLayer("platforms", [terrain],0,0);
		let bgLayer = map.createStaticLayer("backgrounds", [background],0,0).setDepth(-2);

		//collisions
		/*this.physics.add.collider(this.enemy4,groundLayer, () =>{});
		this.physics.add.collider(this.enemy4,wallLayer, () =>{});
		this.physics.add.collider(this.enemy4,npc_pathLayer, () =>{
			this.enemy4.setVelocityX(-this.enemy4.current_velocity);
			if(this.enemy4.flipX==false)this.enemy4.flipX=true;
			else if(this.enemy4.flipX==true)this.enemy4.flipX=false;
			this.enemy4.current_velocity=-this.enemy4.current_velocity;
		});*/
		this.physics.add.collider(this.character,groundLayer, () =>{
			this.character.grounded=1;
			this.character.jumps=2;
		});
		this.physics.add.collider(this.character,wallLayer, () =>{});
		this.physics.add.collider(this.character,downExitLayer,() =>{
			console.log("saida baixo!");
		});
		this.physics.add.collider(this.character,upExitLayer,() =>{
			console.log("saida direita!");
		});
		wallLayer.setCollisionByProperty({wall:true});
		groundLayer.setCollisionByProperty({collides:true});
		upExitLayer.setCollisionByProperty({up_exit:true});
		downExitLayer.setCollisionByProperty({down_exit:true});
		//npc_pathLayer.setCollisionByProperty({turning_point:true});

		/*groundLayer.setTileLocationCallback(39,13,1,3,()=>{console.log("right exit\n");});
		groundLayer.setTileLocationCallback(0,23,1,3,()=>{console.log("left exit\n");});


		groundLayer.setTileLocationCallback(15,12,1,1,()=>{console.log("left turning point\n");});
		groundLayer.setTileLocationCallback(26,12,1,1,()=>{console.log("right turning point\n");});*/

		//stairs
			//stairs to the right
		/*groundLayer.setTileLocationCallback(7,25,1,1,()=>{this.escadas_dir=1;});
		groundLayer.setTileLocationCallback(22,25,1,1,()=>{this.escadas_dir=1;});
			//stairs to the left
		groundLayer.setTileLocationCallback(17,25,1,1,()=>{this.escadas_esq=1;});
		groundLayer.setTileLocationCallback(32,25,1,1,()=>{this.escadas_esq=1;});
			

		//stairs exits
			//stairs to the right
				//saidaEscadasDir(){if(this.escadas_dir==1){this.character.setVelocityY(0);this.escadas_dir=0;}}
		groundLayer.setTileLocationCallback(8,24,1,1,()=>{if(this.escadas_dir==1){this.character.setVelocityY(0);this.escadas_dir=0;character.setGravityY(575);}});
		groundLayer.setTileLocationCallback(6,24,1,1,()=>{if(this.escadas_dir==1){this.character.setVelocityY(0);this.escadas_dir=0;character.setGravityY(575);}})
		groundLayer.setTileLocationCallback(21,24,1,1,()=>{if(this.escadas_dir==1){this.character.setVelocityY(0);this.escadas_dir=0;character.setGravityY(575);}});
		groundLayer.setTileLocationCallback(23,24,1,1,()=>{if(this.escadas_dir==1){this.character.setVelocityY(0);this.escadas_dir=0;character.setGravityY(575);}});
			//stairs to the left
				//saidaEscadasEsq(){if(this.escadas_esq==1){this.character.setVelocityY(0);this.escadas_esq=0;}}
		groundLayer.setTileLocationCallback(16,24,1,1,()=>{if(this.escadas_esq==1){this.character.setVelocityY(0);this.escadas_esq=0;character.setGravityY(575);}});
		groundLayer.setTileLocationCallback(18,24,1,1,()=>{if(this.escadas_esq==1){this.character.setVelocityY(0);this.escadas_esq=0;character.setGravityY(575);}});
		groundLayer.setTileLocationCallback(31,24,1,1,()=>{if(this.escadas_esq==1){this.character.setVelocityY(0);this.escadas_esq=0;character.setGravityY(575);}});
		groundLayer.setTileLocationCallback(33,24,1,1,()=>{if(this.escadas_esq==1){this.character.setVelocityY(0);this.escadas_esq=0;character.setGravityY(575);}});
		*/




		


		this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
		this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
		this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
		character.setGravityY(575);
		//enemy4.setGravityY(575);
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
		}else{
			if(this.escadas_esq==1 || this.escadas_dir==1){
				this.character.setGravityY(0);
				this.character.setVelocityY(0);
			}
			this.character.setVelocityX(0);
		}
		if(Phaser.Input.Keyboard.JustDown(this.w)){
				this.character.setGravityY(575);
			if(this.character.jumps>0){
				this.escadas_dir=0;
				this.escadas_esq=0;
				this.character.setVelocityY(-275);
				this.character.jumps-=1;
			}
		}
	}



	update(){
		this.movePlayerManager();
		this.bg.tilePositionX -=.3;
	}

}