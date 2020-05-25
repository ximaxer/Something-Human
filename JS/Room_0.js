class Room_0 extends Phaser.Scene {
	constructor(){
	super("Room_0");
	}

	init(data){
		this.tempo_atual=0;
	}
	create(){
		this.music= this.sound.add("music");

		var musicConfig = {
			mute:false,
			volume: 1,
			rate:1,
			detune:1,
			seek:0,
			loop:true,
			delay:0,
		}
		this.music.play(musicConfig);


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
		let map = this.add.tilemap("map_0");
		let background = map.addTilesetImage("background_f", "background_0");
		let terrain = map.addTilesetImage("cockpit","terrain_0");

		this.bg= this.add.tileSprite(0,0,1280, 960,"bg_0").setDepth(-2);
		this.bg.setOrigin(0,0);

		//layers
		let wallLayer = map.createStaticLayer("walls", [terrain],0,0);
		let rightExitLayer = map.createStaticLayer("right_exit",[terrain],0,0).setDepth(-3);
		let groundLayer = map.createStaticLayer("platforms", [terrain],0,0);
		let bgLayer = map.createStaticLayer("backgrounds", [background],0,0).setDepth(-2);


		wallLayer.setCollisionByProperty({wall:true});
		groundLayer.setCollisionByProperty({collides:true});
		rightExitLayer.setCollisionByProperty({right_exit:true});


//===========================================================PLAYER========================================================
		this.laserCollision=this.physics.add.collider(this.character,this.laserLayer,()=>{});
		this.character = this.physics.add.sprite(320,736,"character_running");
		this.character.setOrigin(0,0);
		this.cursorKeys = this.input.keyboard.createCursorKeys();
		this.character.setCollideWorldBounds(true);
		this.character.setGravityY(575);
		var tempo_invuln=0;
		this.character.grounded=0;
		this.character.jumps=0;
		this.character.invulnerable=0;
		this.character.controlable=1;

//===========================================================COLLISIONS========================================================
	//player
	
		var rightExitCollision = this.physics.add.collider(this.character,rightExitLayer,()=>{
				var aux = Phaser.Math.Between(0,gameSettings.left_rooms.length-1);
				var i;
				var next_lvl=gameSettings.left_rooms[aux];
				for (i=0;i<gameSettings.available_rooms.length;i++){
					if(gameSettings.available_rooms[i]==gameSettings.left_rooms[aux]){
						gameSettings.available_rooms.splice(i, 1);
						gameSettings.left_rooms.splice(aux,1);
						break;
					}
				}
				gameSettings.currentScene+=1;
				gameSettings.room_path.push(next_lvl);
				if(next_lvl=="Room_1"){
					this.scene.start(next_lvl,{posX:64,posY:764,elasped:this.elapsed});
				}else if(next_lvl=="Room_2"){
					this.scene.start(next_lvl,{posX:64,posY:732,elapsed:this.elapsed});
				}else if(next_lvl=="Room_5"){
					this.scene.start(next_lvl,{posX:96,posY:192,elapsed:this.elapsed});
				}
			});

		var playerPlatformCollider=this.physics.add.collider(this.character,groundLayer, () =>{
			this.character.grounded=1;
			this.character.jumps=2;
			this.character.controlable=1;
		});
		var playerWallCollider=this.physics.add.collider(this.character,wallLayer, () =>{
			this.character.controlable=1;
		});


//===========================================================INPUTS========================================================
		this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
		this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
		this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
		this.j = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
		



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
		this.elapsed = Math.floor(this.timer.getElapsedSeconds())+this.tempo_atual;
		this.text.setText(Math.floor(this.tempo_atual+this.timer.getElapsedSeconds()));
		//console.log(this.getScenes(true));
		this.hp_bar.scaleX=1*gameSettings.playerHealth;

		this.movePlayerManager();
		this.bg.tilePositionX -=.3;
	}
}