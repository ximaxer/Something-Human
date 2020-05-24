class Room_1 extends Phaser.Scene {
	constructor(){
	super("Room_1");
	}

	preload(){
		this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
		this.load.image("hp_outer",("../resources/characters/healthBar_outer.png"));
		this.load.image("hp_bg",("../resources/characters/healthBar_bg.png"));
		this.load.image("background",("../resources/levels/level_1/room_1/background_f.png"));
		this.load.image("bg",("../resources/levels/level_1/room_1/bg.png"));
		this.load.image("terrain",("../resources/levels/level_1/room_1/room_1.png"));
		this.load.image("tileset",("../resources/levels/level_1/room_1/Tileset.png"));
		this.load.tilemapTiledJSON("map","../resources/levels/level_1/maps/room_1_tilemap.json");
		this.load.spritesheet("hp_bar","../resources/characters/hp_tileset.png",{frameHeight:22, frameWidth:200});
		this.load.spritesheet("enemy_4","../resources/characters/enemy4_tileset.png", {frameHeight: 114, frameWidth: 92});
		this.load.spritesheet("character_running","../resources/characters/running_tileset.png", {frameWidth: 36, frameHeight: 69});
		this.load.spritesheet("character_hurt","../resources/characters/hurt_tileset.png", {frameWidth: 23, frameHeight: 70});
		this.load.spritesheet("jumping_anim","../resources/characters/jump_tileset.png", {frameWidth: 36, frameHeight: 69});
		this.load.spritesheet("slash_anim","../resources/characters/slash_tileset.png", {frameWidth: 50, frameHeight: 81});

	}		

	create(){
		WebFont.load({
	        custom: {
	            families: [ 'pixel' ]
	        },
	    });
		var tempo_invuln=0;
		this.character = {
			'controlable': null,
        	'jumps': null,
        	'grounded': null,
        	'invulnerable': null,
    	},
    	this.enemy4 = {
    		'current_velocity': null,
    		'spotted_player': null,
    		'health':null,
    	},
		this.character.grounded=0;
		this.character.jumps=0;
		this.anims.create({
			key: "HP_bar",
			frames: this.anims.generateFrameNumbers("hp_bar"),
			frameRate: 10,
			repeat: -1
		});
		this.anims.create({
			key: "character_run",
			frames: this.anims.generateFrameNumbers("character_running"),
			frameRate: 14,
			repeat: -1
		});

		this.anims.create({
			key: "character_slash",
			frames: this.anims.generateFrameNumbers("slash_anim"),
			frameRate: 14,
			repeat: -1
		});

		this.anims.create({
			key: "character_damaged",
			frames: this.anims.generateFrameNumbers("character_hurt"),
			frameRate: 8,
			repeat: 0
		});

		this.anims.create({
			key: "character_jumping",
			frames: this.anims.generateFrameNumbers("jumping_anim"),
			frameRate: 10,
			repeat: 0
		});

		this.anims.create({
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
    	this.enemy4.spotted_player=0;
    	this.enemy4.health=100;

		let character = this.character = this.physics.add.sprite(32,764,"character_running");
		this.character.setOrigin(0,0);
		this.cursorKeys = this.input.keyboard.createCursorKeys();
		this.character.setCollideWorldBounds(true);
		character.body.setSize(character.width,character.height,true);
		this.enemy4.setCollideWorldBounds(true);
		enemy4.body.setSize(enemy4.width,enemy4.height,true);
		

		let health = this.hp_bar = this.physics.add.sprite(30,21,"hp_bar").setDepth(2);
		this.hp_bar.setOrigin(0,0);
		this.hp_bar.play("HP_bar");

		//this.hp_bg = this.add.image(0,0,"hp_bg").setDepth(1);
		//this.hp_bg.setOrigin(0,0);
		this.hp_outer = this.add.image(22,15,"hp_outer").setDepth(3);
		this.hp_outer.setOrigin(0,0);
		let map = this.add.tilemap("map");
		let background = map.addTilesetImage("background_f", "background");
		let terrain = map.addTilesetImage("room_1","terrain");
		let tileset_base = map.addTilesetImage("Tileset_base","tileset");

		this.bg= this.add.tileSprite(0,0,1280, 960,"bg").setDepth(-2);
		this.bg.setOrigin(0,0);

		//layers
		let wallLayer = map.createStaticLayer("walls", [terrain,tileset_base],0,0);
		let edgesLayer = map.createStaticLayer("edges", [terrain,tileset_base],0,0);
		let groundLayer = map.createStaticLayer("platforms", [terrain,tileset_base],0,0);
		let npc_pathLayer = map.createStaticLayer("npc_path", [background],0,0).setDepth(1);
		let bgLayer = map.createStaticLayer("backgrounds", [background],0,0).setDepth(-2);

		//collisions
		var enemyPlatformCollider=this.physics.add.collider(this.enemy4,groundLayer, () =>{});
		var enemyWallCollider=this.physics.add.collider(this.enemy4,wallLayer, () =>{
			this.enemy4.setVelocityX(-this.enemy4.current_velocity);
			this.enemy4.current_velocity=-this.enemy4.current_velocity;
		});
		var patrolCollider=this.physics.add.collider(this.enemy4,npc_pathLayer, () =>{
			if(this.enemy4.spotted_player==1){
				npc_pathLayer.setCollisionByProperty({turning_point: true}, false);
				this.physics.world.removeCollider(this.patrolCollider);}
			this.enemy4.setVelocityX(-this.enemy4.current_velocity);
			this.enemy4.current_velocity=-this.enemy4.current_velocity;
			});
		var playerPlatformCollider=this.physics.add.collider(this.character,groundLayer, () =>{
			this.character.grounded=1;
			this.character.jumps=2;
			this.character.controlable=1;
		});
		var enemy4EdgeCollider=this.physics.add.collider(this.enemy4,edgesLayer, () =>{});
		var playerEdgeCollider=this.physics.add.collider(this.character,edgesLayer, () =>{
			this.character.controlable=1;
		});
		var playerWallCollider=this.physics.add.collider(this.character,wallLayer, () =>{
			this.character.controlable=1;
		});

		wallLayer.setCollisionByProperty({wall:true});
		edgesLayer.setCollisionByProperty({edge:true});
		groundLayer.setCollisionByProperty({collides:true});
		npc_pathLayer.setCollisionByProperty({turning_point:true});

		groundLayer.setTileLocationCallback(39,13,1,3,()=>{console.log("right exit\n");});
		groundLayer.setTileLocationCallback(0,23,1,3,()=>{console.log("left exit\n");});


		


		this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
		this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
		this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
		this.j = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
		character.setGravityY(575);
		enemy4.setGravityY(575);



		//this.enemyGroup = this.add.group();
		//this.enemyGroup.add(this.enemy4);

		this.character.invulnerable=0;
		this.character.controlable=1;
		this.physics.add.overlap(this.character, this.enemy4, this.hitEnemy, null, this);


		this.total_enemies=1;



		this.timer = this.time.addEvent({
			loop: true,
			paused: false
			});

		this.text = this.add.text(1150,25, this.tempo, { fontFamily: 'pixel',fontSize:29,fill:'white'});

	}


	enemySights(){
		if (this.character.top == this.enemy4.bottom && Phaser.Math.Distance.Between(this.enemy4.width/2+this.enemy4.x,this.enemy4.height/2+this.enemy4.y, this.character.width/2+this.character.x,this.character.height/2+this.character.y) < 250){		
			this.enemy4.spotted_player=1;
		}
	}

	enemyBehaviour(){
		if(this.enemy4.spotted_player==1 && this.character.invulnerable==0){
			if (this.character.x+this.character.width < this.enemy4.x && this.enemy4.body.velocity.x >= 0) {
				console.log("enemy going left");
				this.enemy4.setVelocityX(-110);
				this.enemy4.current_velocity=-110;
			}else if (this.character.x > this.enemy4.x + this.enemy4.width && this.enemy4.body.velocity.x <= 0) {
				console.log("enemy going right");
				this.enemy4.setVelocityX(110);
				this.enemy4.current_velocity=110;
			}
		}
	}

	enemyFront(){
		if(this.enemy4.current_velocity>0){
			this.enemy4.flipX=false;
		}else if(this.enemy4.current_velocity<0){
			this.enemy4.flipX=true;
		}else{

		}
	}

	hitEnemy(character, enemy){
		if(character.invulnerable==0){
		this.tempo_invuln=this.timer.getElapsedSeconds();
			character.invulnerable=1;	
	        if(enemy.x+(enemy.width/2)>=character.x+character.width && character.y > enemy.y){
	        	gameSettings.playerHealth-=0.1;
	        	enemy.x=enemy.x+enemy.width/2;
	        	character.flipX=false;
		    	character.play("character_damaged");
		    	character.controlable=0;
		    	character.setVelocityX(-110);
		    	character.setVelocityY(-150);
	        }else if(enemy.x+(enemy.width/2)<character.x && character.y > enemy.y){
	        	gameSettings.playerHealth-=0.1;
	        	enemy.x=enemy.x-enemy.width/2;
	        	character.flipX=true;
		    	character.play("character_damaged");
		    	character.controlable=0;
		    	character.setVelocityX(110);
		    	character.setVelocityY(-150);
	        }
    	}
    }


	movePlayerManager(){
		if(this.character.controlable==1){
			if(this.a.isDown){
				if(Phaser.Input.Keyboard.JustDown(this.a)){
					if(this.character.grounded==1){
						this.character.play("character_run");
					}
					this.character.flipX = true;
				}
				this.character.setVelocityX(-gameSettings.playerSpeed);
				
			}else if(this.d.isDown){
				if(Phaser.Input.Keyboard.JustDown(this.d)){
					if(this.character.grounded==1){
						this.character.play("character_run");
					}
					this.character.flipX = false;
				}
				this.character.setVelocityX(gameSettings.playerSpeed);
			}else{
				this.character.setVelocityX(0);
				//this.character.stop("character_run");
			}
			if(Phaser.Input.Keyboard.JustDown(this.w)){
					this.character.setGravityY(575);
				if(this.character.jumps>0){
					this.character.play("character_jumping");
					this.character.setVelocityY(-275);
					this.character.jumps-=1;
				}
			}
					//subtituir 40 do if() por weapon range
					if(Phaser.Input.Keyboard.JustDown(this.j)){
					this.character.play("character_slash");
						if(Phaser.Math.Distance.Between(this.enemy4.width/2+this.enemy4.x,this.enemy4.height/2+this.enemy4.y, this.character.width/2+this.character.x,this.character.height/2+this.character.y) < 90+4){
				
					this.enemy4.health-=10; // 10 + weapon damage
					if(this.enemy4.x>=this.character.x+this.character.width && this.character.y >= this.enemy4.y){
	        			this.enemy4.x=this.enemy4.x+this.enemy4.width/2;
					}else if(this.character.x>=this.enemy4.x+this.enemy4.width && this.character.y >= this.enemy4.y){
	        			this.enemy4.x=this.enemy4.x-this.enemy4.width/2;
					}
				}
			}
		}
	}


	update(){
		this.text.setText(Math.floor(this.timer.getElapsedSeconds()));
		console.log(Phaser.Math.Distance.Between(this.enemy4.width/2+this.enemy4.x,this.enemy4.height/2+this.enemy4.y, this.character.width/2+this.character.x,this.character.height/2+this.character.y));
		if (Math.floor(this.timer.getElapsedSeconds())==Math.floor(this.tempo_invuln+1)){
			this.character.invulnerable=0;
		}
		if(this.enemy4.health<=0){
			this.enemy4.disableBody(true, true);
			if (this.total_enemies == 0)
        	{
           		gameSettings.clear_room_1=1;
        	}
		}
		this.hp_bar.scaleX=1*gameSettings.playerHealth;
		this.enemyFront();
		this.enemySights();
		this.enemyBehaviour();
		this.movePlayerManager();
		this.bg.tilePositionX -=.3;
	}

}