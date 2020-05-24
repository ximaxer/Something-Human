class Menu1 extends Phaser.Scene {
    constructor(){
        super("menu1");
    }
    preload(){
        this.load.image("play_button",("../resources/main_menu/buttons/button_default_base_blue_play.png"));
        this.load.image("options_button",("../resources/main_menu/buttons/button_default_base_blue_options.png"));
        this.load.image("quit_button",("../resources/main_menu/buttons/button_default_base_blue_quit.png"));
        this.load.image("play_button_dark",("../resources/main_menu/buttons/button_pressed_base_blue_play.png"));
        this.load.image("options_button_dark",("../resources/main_menu/buttons/button_pressed_base_blue_options.png"));
        this.load.image("quit_button_dark",("../resources/main_menu/buttons/button_pressed_base_blue_quit.png"));
        this.load.image("menu_window",("../resources/main_menu/menu_window/menu_window.png"));
        this.load.spritesheet("background","../resources/main_menu/menu_background/backgrounf_tileset.png", {frameWidth: 1280, frameHeight: 960});
        this.load.spritesheet("menu_title","../resources/main_menu/menu_title/menu_title_tileset.png", {frameWidth: 811, frameHeight: 102});
    }
    create(){
        //image set up
        this.background = this.add.spritesheet(0,0,"background");
        this.background.setOrigin(0,0);

        this.play_button= this.add.image(360,245,'play_button');
        this.play_button.setScale(0.09);
        this.play_button_dark = this.add.image(360,245,'play_button_dark');
        this.play_button_dark.setScale(0.38);
        this.play_button_dark.visible=false;

        this.options_button = this.add.image(360,340,'options_button');
        this.options_button.setScale(0.09);
        this.options_button_dark = this.add.image(360,340,'options_button_dark');
        this.options_button_dark.setScale(0.38);
        this.options_button_dark.visible=false;

        this.quit_button= this.add.image(360,435,'quit_button');
        this.quit_button.setScale(0.09);
        this.quit_button_dark= this.add.image(360,435,'quit_button_dark');
        this.quit_button_dark.setScale(0.38);
        this.quit_button_dark.visible=false;

        this.quit_button = this.add.image(360,530,'quit_button');
        this.quit_button.setScale(0.09);
        this.quit_button_dark = this.add.image(360,530,'quit_button_dark');
        this.quit_button_dark.setScale(0.38);
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
            this.scene.start("jogar1")
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

        //interações do btnRanking
        this.quit_button.setInteractive();

        this.quit_button.on("pointerover", ()=>{
            console.log("over Ranking");
            this.game.canvas.style.cursor = "pointer";
            this.quit_button_dark.visible=true;
            
        });
        this.quit_button.on("pointerout", ()=>{
            console.log("out Ranking");
            this.game.canvas.style.cursor = "default";
            this.quit_button_dark.visible=false;
        });
        this.quit_button.on("pointerup", ()=>{
            console.log("up Ranking");
            this.game.canvas.style.cursor = "default";
            this.scene.start("ranking")
        });

    }

}