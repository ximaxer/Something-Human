class Menu1 extends Phaser.Scene {
    constructor(){
        super("Menu1");
    }
    preload(){
        this.load.image("play_button",("../resources/main_menu/buttons/button_default_base_blue_play.png"));
        this.load.image("options_button",("../resources/main_menu/buttons/button_default_base_blue_options.png"));
        this.load.image("quit_button",("../resources/main_menu/buttons/button_default_base_blue_quit.png"));
        this.load.image("play_button_dark",("../resources/main_menu/buttons/button_pressed_base_blue_play.png"));
        this.load.image("options_button_dark",("../resources/main_menu/buttons/button_pressed_base_blue_options.png"));
        this.load.image("quit_button_dark",("../resources/main_menu/buttons/button_pressed_base_blue_quit.png"));
        this.load.image("menu_window",("../resources/main_menu/menu_window/menu_window.png"));
        this.load.image("background",("../resources/main_menu/menu_background/frame6.png"));
        this.load.image("rankings_button",("../resources/main_menu/buttons/button_default_base_blue_rankings.png"));
        this.load.image("rankings_button_dark",("../resources/main_menu/buttons/button_pressed_base_blue_rankings.png"));
        this.load.spritesheet("menu_title","../resources/main_menu/menu_title/menu_title_tileset.png", {frameWidth: 811, frameHeight: 102});

    }
    create(){
        this.anims.create({
            key:"titulo",
            frames: this.anims.generateFrameNumbers("menu_title"),
            frameRate: 11,
            repeat: -1
        });

        this.menu_title = this.physics.add.sprite(240,150, "menu_title");
        this.menu_title.setOrigin(0,0);
        this.menu_title.setScale(1);
        this.menu_title.play("titulo");
        
        //image set up
        this.background = this.physics.add.image(0,0,"background").setDepth(-2);
        this.background.setScale(1);
        this.background.setOrigin(0,0);

        this.bg_window = this.add.image(500,350,"menu_window").setDepth(-1)
        this.bg_window.setOrigin(0,0);

        this.play_button= this.add.image(552,435,'play_button');
        this.play_button.setScale(1);
        this.play_button.setOrigin(0,0);
        this.play_button_dark = this.add.image(552,435,'play_button_dark');
        this.play_button_dark.setScale(1);
        this.play_button_dark.setOrigin(0,0);
        this.play_button_dark.visible=false;

        this.options_button = this.add.image(552,510,'options_button');
        this.options_button.setScale(1);
        this.options_button.setOrigin(0,0);
        this.options_button_dark = this.add.image(552,510,'options_button_dark');
        this.options_button_dark.setScale(1);
        this.options_button_dark.setOrigin(0,0);
        this.options_button_dark.visible=false;

        this.ranking_button= this.add.image(552,585,'rankings_button');
        this.ranking_button.setScale(1);
        this.ranking_button.setOrigin(0,0);
        this.ranking_button_dark= this.add.image(552,585,'rankings_button_dark');
        this.ranking_button_dark.setScale(1);
        this.ranking_button_dark.setOrigin(0,0);
        this.ranking_button_dark.visible=false;

        this.quit_button = this.add.image(552,660,'quit_button');
        this.quit_button.setScale(1);
        this.quit_button.setOrigin(0,0);
        this.quit_button_dark = this.add.image(552,660,'quit_button_dark');
        this.quit_button_dark.setScale(1);
        this.quit_button_dark.setOrigin(0,0);
        this.quit_button_dark.visible=false;

    

        //interações do btnJogar
        this.play_button.setInteractive();

        this.play_button.on("pointerover", ()=>{
            console.log("over jogar");
            this.game.canvas.style.cursor = "pointer";
            this.play_button_dark.visible=true;
        });
        this.play_button.on("pointerout", ()=>{
            console.log("out jogar");
            this.game.canvas.style.cursor = "default";
            this.play_button_dark.visible=false;
        });
        this.play_button.on("pointerup", ()=>{
            this.game.canvas.style.cursor = "default";
            this.scene.start("Load")
            console.log("up jogar");
        });

        //interações do btnOpcoes
        this.options_button.setInteractive();

        this.options_button.on("pointerover", ()=>{
            console.log("over Opcoes");
            this.game.canvas.style.cursor = "pointer";
            this.options_button_dark.visible=true;
        });
        this.options_button.on("pointerout", ()=>{
            console.log("out Opcoes");
            this.game.canvas.style.cursor = "default";
            this.options_button_dark.visible=false;
        });
        this.options_button.on("pointerup", ()=>{
            this.game.canvas.style.cursor = "default";
            console.log("up Opcoes");
            this.scene.start("opcoes")
        });

        this.ranking_button.setInteractive();

        this.ranking_button.on("pointerover", ()=>{
            console.log("over Ranking");
            this.game.canvas.style.cursor = "pointer";
            this.ranking_button_dark.visible=true;
            
        });
        this.ranking_button.on("pointerout", ()=>{
            console.log("out Ranking");
            this.game.canvas.style.cursor = "default";
            this.ranking_button_dark.visible=false;
        });
        this.ranking_button.on("pointerup", ()=>{
            console.log("up Ranking");
            this.game.canvas.style.cursor = "default";
            this.scene.start("ranking")
        });


        this.quit_button.setInteractive();

        this.quit_button.on("pointerover", ()=>{
            console.log("over quit");
            this.game.canvas.style.cursor = "pointer";
            this.quit_button_dark.visible=true;
            
        });
        this.quit_button.on("pointerout", ()=>{
            console.log("out quit");
            this.game.canvas.style.cursor = "default";
            this.quit_button_dark.visible=false;
        });
        this.quit_button.on("pointerup", ()=>{
            console.log("up quit");
            this.game.canvas.style.cursor = "default";
            this.scene.start("Quit")
        });

    }

}