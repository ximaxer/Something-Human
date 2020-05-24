class Room_5 extends Phaser.Scene {
	constructor(){
	super("Room_5");
	}


	create(){

		this.character = {
			'controlable': null,
        	'jumps': null,
        	'grounded': null,
        	'invulnerable': null,
    	},
    	this.enemy1 = {
    		'current_velocity': null,
    		'spotted_player': null,
    		'health':null,
    		'dead':null,
    	};
	
		
		let health = this.hp_bar = this.physics.add.sprite(30,21,"hp_bar").setDepth(2);
		this.hp_bar.setOrigin(0,0);
		this.hp_bar.play("HP_bar");
		this.hp_outer = this.add.image(22,15,"hp_outer").setDepth(3);
		this.hp_outer.setOrigin(0,0);


//===========================================================TILEMAPS========================================================
		let map = this.add.tilemap("map_5");
		let background = map.addTilesetImage("backgrounds", "background_5");
		let terrain = map.addTilesetImage("room_5","terrain_5");

		this.bg= this.add.tileSprite(0,0,1280, 960,"bg_5").setDepth(-2);
		this.bg.setOrigin(0,0);

		//layers
		let wallLayer = map.createStaticLayer("walls", [terrain],0,0);
		let npc_pathLayer = map.createStaticLayer("npc_path", [background],0,0).setDepth(-5);
		let leftExitLayer = map.createStaticLayer("left_exit",[terrain],0,0).setDepth(-3);
		let downExitLayer = map.createStaticLayer("down_exit",[terrain],0,0).setDepth(-3);
		let groundLayer = map.createStaticLayer("platforms", [terrain],0,0);
		let bgLayer = map.createStaticLayer("backgrounds", [background],0,0).setDepth(-2);

		wallLayer.setCollisionByProperty({wall:true});
		groundLayer.setCollisionByProperty({collides:true});
		npc_pathLayer.setCollisionByProperty({turning_point:true});
		leftExitLayer.setCollisionByProperty({left_exit:true});
		downExitLayer.setCollisionByProperty({down_exit:true});


		groundLayer.setTileLocationCallback(19,29,2,1,()=>{
			if(gameSettings.available_rooms[i]>0){
				var aux = Phaser.Math.Between(0,gameSettings.top_rooms.length-1);
				var i;
				var next_lvl=gameSettings.top_rooms[aux];
				for (i=0;i<gameSettings.available_rooms.length;i++){
					if(gameSettings.available_rooms[i]==gameSettings.top_rooms[aux]){
						gameSettings.available_rooms.splice(i, 1);
						break;
					}
				}
				for (i=0;i<gameSettings.top_rooms.length;i++){
					if(gameSettings.available_rooms[i]==gameSettings.top_rooms[aux]){
						gameSettings.top_rooms.splice(aux,1);
						break;
					}
				}
				this.scene.start(next_lvl);
			}else{
				this.scene.start('Room_6');
			}
		});
		groundLayer.setTileLocationCallback(0,23,1,3,()=>{console.log("left exit\n");});

//===========================================================LASER========================================================
	//1
    	let laser_1 = this.laser_1 = this.physics.add.sprite(32,192,"laser");
    	this.laser_1.setOrigin(0,0);
    	this.laser_1.setImmovable(true);
    	this.laser_1.play("laser_anim");
    	let laser_2 = this.laser_2 = this.physics.add.sprite(572,864,"laser").setDepth(-1);
    	this.laser_2.setOrigin(0,0);
    	this.laser_2.setImmovable(true);
    	this.laser_2.setGravityY(0);
    	this.laser_2.play("laser_sideways_anim");

//===========================================================ENEMY========================================================
		let enemy1 = this.enemy1 = this.physics.add.sprite(960,160,"enemy_1");
		this.enemy1.setOrigin(0,0);
		this.enemy1.setCollideWorldBounds(true);
		this.enemy1.play("enemy1_walk");
		this.enemy1.setVelocityX(110);
		this.enemy1.current_velocity=110;
    	this.enemy1.spotted_player=0;
    	this.enemy1.health=100;
    	this.enemy1.dead=0;
		enemy1.body.setSize(enemy1.width,enemy1.height,true);
		enemy1.setGravityY(575);

//===========================================================PLAYER========================================================
		this.character = this.physics.add.sprite(96,192,"character_running");
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
	//enemy1
 		var enemyPlatformCollider=this.physics.add.collider(this.enemy1,groundLayer, () =>{});
		var enemyWallCollider=this.physics.add.collider(this.enemy1,wallLayer, () =>{
			this.enemy1.setVelocityX(-this.enemy1.current_velocity);
			this.enemy1.current_velocity=-this.enemy1.current_velocity;
		});
		var patrolCollider=this.physics.add.collider(this.enemy1,npc_pathLayer, () =>{
			if(this.enemy1.spotted_player==1){
				npc_pathLayer.setCollisionByProperty({turning_point: true}, false);
				this.physics.world.removeCollider(this.patrolCollider);}
			this.enemy1.setVelocityX(-this.enemy1.current_velocity);
			this.enemy1.current_velocity=-this.enemy1.current_velocity;
			});
		this.physics.add.overlap(this.character, this.enemy1, this.hitEnemy, null, this);


	//player
		var laserCollider=this.physics.add.collider(this.character,downExitLayer, () =>{
			if(gameSettings.room5.total_enemies==0){
				downExitLayer.setCollisionByProperty({down_exit: true}, false);
				this.physics.world.removeCollider(this.laserCollider);
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


	//lasers
    	var laser_1_ground = this.physics.add.collider(this.laser_1,groundLayer,() => {});
		var laser_2_ground = this.physics.add.collider(this.laser_2,groundLayer,() => {});
		this.physics.add.collider(this.character, this.laser_1, ()=>{});
		this.physics.add.collider(this.character, this.laser_2, ()=>{});

	
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
				if(Phaser.Math.Distance.Between(this.enemy1.width/2+this.enemy1.x,this.enemy1.height/2+this.enemy1.y, this.character.width/2+this.character.x,this.character.height/2+this.character.y) < 90+4){
					if(this.character.height==81){
						this.character.y=this.character.y-12;
						this.character.height=69;
					}
					this.enemy1.health-=10; // 10 + weapon damage
					if(this.enemy1.x>=this.character.x+this.character.width && this.character.y >= this.enemy1.y){
	        			this.enemy1.x=this.enemy1.x+this.enemy1.width/2;
					}else if(this.character.x>=this.enemy1.x+this.enemy1.width && this.character.y >= this.enemy1.y){
	        			this.enemy1.x=this.enemy1.x-this.enemy1.width/2;
					}
				}
			}
		}
	}

	enemySights(){
		if (this.character.top == this.enemy1.bottom && Phaser.Math.Distance.Between(this.enemy1.width/2+this.enemy1.x,this.enemy1.height/2+this.enemy1.y, this.character.width/2+this.character.x,this.character.height/2+this.character.y) < 250){		
			this.enemy1.spotted_player=1;
		}
	}

	enemyBehaviour(){
		if(this.enemy1.spotted_player==1 && this.character.invulnerable==0){
			if (this.character.x+this.character.width < this.enemy1.x && this.enemy1.body.velocity.x >= 0) {
				this.enemy1.setVelocityX(-110);
				this.enemy1.current_velocity=-110;
			}else if (this.character.x > this.enemy1.x + this.enemy1.width && this.enemy1.body.velocity.x <= 0) {
				this.enemy1.setVelocityX(110);
				this.enemy1.current_velocity=110;
			}
		}
	}

	enemyFront(){
		if(this.enemy1.current_velocity>0){
			this.enemy1.flipX=false;
		}else if(this.enemy1.current_velocity<0){
			this.enemy1.flipX=true;
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

	update(){
		this.text.setText(Math.floor(this.tempo+this.timer.getElapsedSeconds()));
		console.log('down: '+gameSettings.top_rooms);
		if (Math.floor(this.timer.getElapsedSeconds())==Math.floor(this.tempo_invuln+1)){
			this.character.invulnerable=0;
		}
		if(this.enemy1.health<=0 && this.enemy1.dead == 0){
			gameSettings.room5.total_enemies-=1;
			this.enemy1.dead=1;
			this.enemy1.disableBody(true, true);
			
		}
		if (gameSettings.room5.total_enemies == 0){
       		gameSettings.room5.cleared=1;
       		this.laser_1.disableBody(true,true);
       		this.laser_2.disableBody(true,true);
    	}
		this.hp_bar.scaleX=1*gameSettings.playerHealth;
		this.enemyFront();
		this.enemySights();
		this.enemyBehaviour();
		this.movePlayerManager();
		this.bg.tilePositionX -=.3;
	}
}