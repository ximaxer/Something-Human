class Load extends Phaser.Scene {
	constructor(){
	super("Load");
	}

	preload(){
		this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');

		this.load.image("hp_outer",("../resources/characters/healthBar_outer.png"));
		this.load.image("hp_bg",("../resources/characters/healthBar_bg.png"));
		this.load.image("background_1",("../resources/levels/level_1/room_1/background_f.png"));
		this.load.image("bg_1",("../resources/levels/level_1/room_1/bg.png"));
		this.load.image("terrain_1",("../resources/levels/level_1/room_1/room_1.png"));
		this.load.image("tileset_1",("../resources/levels/level_1/room_1/Tileset.png"));
		this.load.tilemapTiledJSON("map_1","../resources/levels/level_1/maps/room_1_tilemap.json");
		this.load.image("background_2",("../resources/levels/level_1/room_2/background_f.png"));
		this.load.image("bg_2",("../resources/levels/level_1/room_2/bg.png"))
		this.load.image("terrain_2",("../resources/levels/level_1/room_2/room_2.png"));
		this.load.tilemapTiledJSON("map_2","../resources/levels/level_1/maps/room_2_tilemap.json")
		this.load.image("background_3",("../resources/levels/level_1/room_3/background_f.png"));
		this.load.image("bg_3",("../resources/levels/level_1/room_3/bg.png"))
		this.load.image("terrain_3",("../resources/levels/level_1/room_3/room_3.png"));
		this.load.tilemapTiledJSON("map_3","../resources/levels/level_1/maps/room_3_tilemap.json");
		this.load.image("background_4",("../resources/levels/level_1/room_4/background_f.png"));
		this.load.image("bg_4",("../resources/levels/level_1/room_4/bg.png"));
		this.load.image("terrain_4",("../resources/levels/level_1/room_4/room_4.png"));
		this.load.tilemapTiledJSON("map_4","../resources/levels/level_1/maps/room_4_tilemap.json");
		this.load.image("background_5",("../resources/levels/level_1/room_5/background_f.png"));
		this.load.image("bg_5",("../resources/levels/level_1/room_5/bg.png"))
		this.load.image("terrain_5",("../resources/levels/level_1/room_5/room_5.png"));
		this.load.tilemapTiledJSON("map_5","../resources/levels/level_1/maps/room_5_tilemap.json")
		this.load.spritesheet("laser","../resources/levels/level_1/laser_purp.png",{frameHeight:96,frameWidth:32});
		this.load.spritesheet("laser_sideways","../resources/levels/level_1/laser_purp_sideways.png",{frameHeight:32,frameWidth:128});
		this.load.spritesheet("hp_bar","../resources/characters/hp_tileset.png",{frameHeight:22, frameWidth:200});
		this.load.spritesheet("enemy_1","../resources/characters/enemy4_tileset.png", {frameHeight: 114, frameWidth: 92});
		this.load.spritesheet("character_running","../resources/characters/running_tileset.png", {frameWidth: 36, frameHeight: 69});
		this.load.spritesheet("character_hurt","../resources/characters/hurt_tileset.png", {frameWidth: 23, frameHeight: 69});
		this.load.spritesheet("jumping_anim","../resources/characters/jump_tileset.png", {frameWidth: 36, frameHeight: 69});
		this.load.spritesheet("slash_anim","../resources/characters/slash_tileset.png", {frameWidth: 50, frameHeight: 81});

	}	
	create(){
		this.anims.create({
			key:"laser_anim",
			frames: this.anims.generateFrameNumbers("laser"),
			frameRate: 11,
			repeat: -1
		});
		this.anims.create({
			key:"laser_sideways_anim",
			frames: this.anims.generateFrameNumbers("laser_sideways"),
			frameRate: 11,
			repeat: -1
		});
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
			frameRate: 50,
			repeat: 0
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
			key: "enemy1_walk",
			frames: this.anims.generateFrameNumbers("enemy_1"),
			frameRate: 8,
			repeat: -1
		});

		this.scene.start("Room_1");
	}
}