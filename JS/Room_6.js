class Room_6 extends Phaser.Scene {
	constructor(){
	super("Room_6");
	}


	create(){
		
		this.character = {
			'controlable': null,
        	'jumps': null,
        	'grounded': null,
        	'invulnerable': null,
    	};
	
		let health = this.hp_bar = this.physics.add.sprite(30,21,"hp_bar").setDepth(2);
		this.hp_bar.setOrigin(0,0);
		this.hp_bar.play("HP_bar");
		this.hp_outer = this.add.image(22,15,"hp_outer").setDepth(3);
		this.hp_outer.setOrigin(0,0);


//===========================================================TILEMAPS========================================================
		let map = this.add.tilemap("map_6");
		let background = map.addTilesetImage("background_f", "background_6");
		let terrain = map.addTilesetImage("room_preboss","terrain_6");
		let door = map.addTilesetImage("door","door");

		this.bg= this.add.tileSprite(0,0,1280, 960,"bg_6").setDepth(-2);
		this.bg.setOrigin(0,0);

		//layers
		let wallLayer = map.createStaticLayer("walls", [terrain],0,0);
		let leftExitLayer = map.createStaticLayer("left_exit",[terrain],0,0).setDepth(-3);
		let groundLayer = map.createStaticLayer("platforms", [terrain],0,0);
		let belowDoorL = map.createStaticLayer("below_door",[terrain],0,0)
		let doorL = map.createStaticLayer("Door",[door],0,0).setDepth(-1);
		let bgLayer = map.createStaticLayer("backgrounds", [background],0,0).setDepth(-2);
		this.laserLayer = map.createStaticLayer("laser",[terrain],0,0).setDepth(-5);


		wallLayer.setCollisionByProperty({wall:true});
		groundLayer.setCollisionByProperty({collides:true});
		belowDoorL.setCollisionByProperty({below_door:true})
		leftExitLayer.setCollisionByProperty({left_exit:true});
		this.laserLayer.setCollisionByProperty({laser:true});


//===========================================================LASER========================================================
	//1
    	let laser_1 = this.laser_1 = this.physics.add.sprite(64,160,"laser");
    	this.laser_1.setOrigin(0,0);
    	this.laser_1.setImmovable(true);
    	this.laser_1.play("laser_anim");
    	
		


//===========================================================PLAYER========================================================
		var character = this.character = this.physics.add.sprite(128,160,"character_running");
		this.character.setOrigin(0,0);
		this.cursorKeys = this.input.keyboard.createCursorKeys();
		this.character.setCollideWorldBounds(true);
		character.body.setSize(character.width,character.height,true);
		character.setGravityY(575);
		var tempo_invuln=0;
		this.character.grounded=0;
		this.character.jumps=0;
		this.character.invulnerable=0;
		this.character.controlable=1;

//===========================================================COLLISIONS========================================================
		this.laserCollision=this.physics.add.collider(this.character,this.laserLayer,()=>{});
		var playerPlatformCollider=this.physics.add.collider(this.character,groundLayer, () =>{
			this.character.grounded=1;
			this.character.jumps=2;
			this.character.controlable=1;
		});
		var playerWallCollider=this.physics.add.collider(this.character,wallLayer, () =>{
			this.character.controlable=1;
		});
		var x=0
		var belowDoorCollider=this.physics.add.collider(this.character,belowDoorL, () =>{	
			if(x==0){
				alert("press 'e' ");
				x=1;
			}
			if(Phaser.Input.Keyboard.JustDown(this.e)){
				this.scene.start("ending");
			}
		});

	//lasers
    	var laser_1_ground = this.physics.add.collider(this.laser_1,groundLayer,() => {});
		this.physics.add.collider(this.character, this.laser_1, ()=>{});

	
//===========================================================INPUTS========================================================
		this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
		this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
		this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
		this.j = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
		this.e = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
		



//===========================================================TEMPO========================================================
		this.timer = this.time.addEvent({
			loop: true,
			paused: false
			});

		this.text = this.add.text(1150,25, this.tempo, { fontFamily: 'pixel',fontSize:29,fill:'white'});
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
				
			}
		}
	}

	update(){
		this.text.setText(Math.floor(this.tempo+this.timer.getElapsedSeconds()));
		//console.log(this.getScenes(true));
		this.hp_bar.scaleX=1*gameSettings.playerHealth;

		this.movePlayerManager();
		this.bg.tilePositionX -=.3;
	}

}