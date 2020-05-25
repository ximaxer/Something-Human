class Opcoes extends Phaser.Scene {
    constructor(){
        super("Opcoes");
    }
    preload(){
        this.load.image("quit_button",("../resources/main_menu/buttons/button_default_base_blue_quit.png"));
        this.load.image("quit_button_dark",("../resources/main_menu/buttons/button_pressed_base_blue_quit.png"));
        this.load.image("sound_plus_not_pressed",("../resources/main_menu/buttons/not_pressed_raise_volume.png"));
        this.load.image("sound_minus_not_pressed",("../resources/main_menu/buttons/not_pressed_lower_volume.png"));
        this.load.image("sound_plus_pressed",("../resources/main_menu/buttons/pressed_raise_volume.png"));
        this.load.image("sound_minus_pressed",("../resources/main_menu/buttons/pressed_lower_volume.png"));
        this.load.image("credits_not_pressed",("../resources/main_menu/buttons/button_default_base_blue_credits.png"));
        this.load.image("credits_pressed",("../resources/main_menu/buttons/button_pressed_base_blue_credits.png"));
        this.load.image("menu_window",("../resources/main_menu/menu_window/menu_window.png"));
    }
    create(){
        //image set up
        this.bg_window = this.add.image(500,350,"menu_window").setDepth(-1)
        this.bg_window.setOrigin(0,0);

        this.sound_plus_not_pressed = this.add.image(552,450,'sound_plus_not_pressed');
        this.sound_plus_not_pressed.setScale(1);
        this.sound_plus_not_pressed.setOrigin(0,0);
        this.sound_plus_pressed = this.add.image(552,450,'sound_plus_pressed');
        this.sound_plus_pressed.setScale(1);
        this.sound_plus_pressed.setOrigin(0,0);
        this.sound_plus_pressed.visible=false;

        this.sound_minus_not_pressed = this.add.image(552,550,'sound_minus_not_pressed');
        this.sound_minus_not_pressed.setScale(1);
        this.sound_minus_not_pressed.setOrigin(0,0);
        this.sound_minus_pressed = this.add.image(552,550,'sound_minus_pressed');
        this.sound_minus_pressed.setScale(1);
        this.sound_minus_pressed.setOrigin(0,0);
        this.sound_minus_pressed.visible=false;

        this.credits_not_pressed= this.add.image(552,585,'credits_not_pressed');
        this.credits_not_pressed.setScale(1);
        this.credits_not_pressed.setOrigin(0,0);
        this.credits_pressed= this.add.image(552,585,'credits_pressed');
        this.credits_pressed.setScale(1);
        this.credits_pressed.setOrigin(0,0);
        this.credits_pressed.visible=false;

        this.quit_button = this.add.image(552,660,'quit_button');
        this.quit_button.setScale(1);
        this.quit_button.setOrigin(0,0);
        this.quit_button_dark = this.add.image(552,660,'quit_button_dark');
        this.quit_button_dark.setScale(1);
        this.quit_button_dark.setOrigin(0,0);
        this.quit_button_dark.visible=false;
    

        //interações do btnSom+
        this.sound_plus_not_pressed.setInteractive();

        this.sound_plus_not_pressed.on("pointerover", ()=>{
            console.log("over sound+");
            this.game.canvas.style.cursor = "pointer";
            this.sound_plus_pressed.visible=true;
        });
        this.sound_plus_not_pressed.on("pointerout", ()=>{
            console.log("out sound+");
            this.game.canvas.style.cursor = "default";
            this.sound_plus_pressed.visible=false;
        });
        this.sound_plus_not_pressed.on("pointerup", ()=>{
            this.game.canvas.style.cursor = "default";
            this.scene.start("sound+")
            console.log("sound+");
        });

        //interações do btnSom-
        this.sound_minus_not_pressed.setInteractive();

        this.sound_minus_not_pressed.on("pointerover", ()=>{
            console.log("over sound-");
            this.game.canvas.style.cursor = "pointer";
            this.sound_minus_pressed.visible=true;
        });
        this.sound_minus_not_pressed.on("pointerout", ()=>{
            console.log("out sound-");
            this.game.canvas.style.cursor = "default";
            this.sound_minus_pressed.visible=false;
        });
        this.sound_minus_not_pressed.on("pointerup", ()=>{
            this.game.canvas.style.cursor = "default";
            this.scene.start("sound-")
            console.log("sound-");
        });

        //interações do btnCredits
        this.credits_not_pressed.setInteractive();

        this.credits_not_pressed.on("pointerover", ()=>{
            console.log("over Credits");
            this.game.canvas.style.cursor = "pointer";
            this.credits_pressed.visible=true;
            
        });
        this.credits_not_pressed.on("pointerout", ()=>{
            console.log("out Credits");
            this.game.canvas.style.cursor = "default";
            this.credits_pressed.visible=false;
        });
        this.credits_not_pressed.on("pointerup", ()=>{
            console.log("up Credits");
            this.game.canvas.style.cursor = "default";
            this.scene.start("credits")
        });

        //interações do btnQuit
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
