class Room_2 extends Phaser.Scene {
	constructor(){
	super("Room_2");
	}

	init(data){
		this.characterX=data.posX;
		this.characterY=data.posY;

		this.tempo_atual = data.elapsed;

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
		let map = this.add.tilemap("map_2");
		let background = map.addTilesetImage("background_f", "background_2");
		let terrain = map.addTilesetImage("room_2","terrain_2");

		this.bg= this.add.tileSprite(0,0,1280, 960,"bg_2").setDepth(-2);
		this.bg.setOrigin(0,0);

		//layers
		let wallLayer = map.createStaticLayer("walls", [terrain],0,0);
		let upExitLayer = map.createStaticLayer("up_exit",[terrain],0,0).setDepth(-3);
		let leftExitLayer = map.createStaticLayer("left_exit",[terrain],0,0).setDepth(-3);
		let npc_pathLayer = map.createStaticLayer("npc_path", [terrain],0,0).setDepth(-4);
		let groundLayer = map.createStaticLayer("platforms", [terrain],0,0);
		let bgLayer = map.createStaticLayer("backgrounds", [background],0,0).setDepth(-2);
		this.laserLayer = map.createStaticLayer("laser",[terrain],0,0).setDepth(-5);


		wallLayer.setCollisionByProperty({wall:true});
		groundLayer.setCollisionByProperty({collides:true});
		npc_pathLayer.setCollisionByProperty({turning_point:true});
		leftExitLayer.setCollisionByProperty({left_exit:true});
		upExitLayer.setCollisionByProperty({up_exit:true});
		this.laserLayer.setCollisionByProperty({laser:true});


//===========================================================LASER========================================================
	//1
    	let laser_1 = this.laser_1 = this.physics.add.sprite(32,608,"laser");
    	this.laser_1.setOrigin(0,0);
    	this.laser_1.setImmovable(true);
    	this.laser_1.play("laser_anim");
    	let laser_2 = this.laser_2 = this.physics.add.sprite(32,704,"laser");
    	this.laser_2.setOrigin(0,0);
    	this.laser_2.setImmovable(true);
    	this.laser_2.setGravityY(0);
    	this.laser_2.play("laser_anim");

    //2
    	let laser_3 = this.laser_3 = this.physics.add.sprite(448,128,"laser");
    	this.laser_3.setOrigin(0,0);
    	this.laser_3.setImmovable(true);
    	this.laser_3.play("laser_sideways_anim");
		
//===========================================================ENEMY========================================================
		if(gameSettings.room2.total_enemies>0){
			let enemy1 = this.enemy1 = this.physics.add.sprite(320,160,"enemy_1");
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
		}

//===========================================================PLAYER========================================================
		var character = this.character = this.physics.add.sprite(this.characterX,this.characterY,"character_running");
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
		var leftExitCollision = this.physics.add.collider(this.character,leftExitLayer,()=>{
			gameSettings.currentScene-=1;
			if(gameSettings.room_path[gameSettings.currentScene]=="Room_4"){
				this.scene.start(gameSettings.room_path[gameSettings.currentScene],{posX:1184,posY:800,elapsed:this.elapsed});
			}else if(gameSettings.room_path[gameSettings.currentScene]=="Room_1"){
				this.scene.start(gameSettings.room_path[gameSettings.currentScene],{posX:1152,posY:416,elapsed:this.elapsed});
			}else{
				gameSettings.currentScene+=1;
			}
		});
	    var topExitCollision = this.physics.add.collider(this.character,upExitLayer,()=>{
			if(gameSettings.available_rooms.length>0 && gameSettings.room2.cleared!=1){
       			gameSettings.room2.cleared=1;
				var aux = Phaser.Math.Between(0,gameSettings.bottom_rooms.length-1);
				var i;
				var next_lvl=gameSettings.bottom_rooms[aux];
				for (i=0;i<gameSettings.available_rooms.length;i++){
					if(gameSettings.available_rooms[i]==gameSettings.bottom_rooms[aux]){
						gameSettings.available_rooms.splice(i, 1);
						gameSettings.bottom_rooms.splice(aux,1);
						break;
					}
				}
				gameSettings.currentScene+=1;
				gameSettings.room_path.push(next_lvl);
				if(next_lvl=="Room_3"){
					this.scene.start(next_lvl,{posX:320,posY:800,elapsed:this.elapsed});
				}
			}else if(gameSettings.room2.cleared==1 && typeof gameSettings.room_path[gameSettings.currentScene+1] !== 'undefined'){
				gameSettings.currentScene+=1;
				if(gameSettings.room_path[gameSettings.currentScene]=="Room_3"){
					this.scene.start(gameSettings.room_path[gameSettings.currentScene],{posX:320,posY:800,elapsed:this.elapsed});
				}else{
					gameSettings.currentScene-=1;
				}
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
		this.laserCollision=this.physics.add.collider(this.character,this.laserLayer,()=>{});


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
		this.pause = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);



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
		this.elapsed = Math.floor(this.timer.getElapsedSeconds())+this.tempo_atual;
		this.text.setText(Math.floor(this.tempo_atual+this.timer.getElapsedSeconds()));
		//console.log(this.getScenes(true));
		if (Math.floor(this.timer.getElapsedSeconds())==Math.floor(this.tempo_invuln+1)){
			this.character.invulnerable=0;
		}
		if(this.enemy1.health<=0 && this.enemy1.dead == 0){
			gameSettings.room2.total_enemies-=1;
			this.enemy1.dead=1;
			this.enemy1.disableBody(true, true);
			
		}
		if (gameSettings.room2.total_enemies == 0){
			this.laserLayer.setCollisionByProperty({laser: true}, false);
			this.physics.world.removeCollider(this.laserCollision);
       		this.laser_1.disableBody(true,true);
       		this.laser_2.disableBody(true,true);
       		this.laser_3.disableBody(true,true);
    	}
		if(gameSettings.playerHealth<=0){
			death();
			this.scene.start('Room_0');
		}
		this.hp_bar.scaleX=1*gameSettings.playerHealth;
		this.enemyFront();
		this.enemySights();
		this.enemyBehaviour();
		this.movePlayerManager();
		this.bg.tilePositionX -=.3;

		 if(Phaser.Input.Keyboard.JustDown(this.pause)){
            this.scene.pause();
            this.scene.launch("Pausa",{background:this.background, sceneName:"Room_2"});
        }
	}

}