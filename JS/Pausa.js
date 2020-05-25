class Pausa extends Phaser.Scene {
    constructor(){
        super("Pausa");
    }

    init(data){
        this.background=data.background;
        this.sceneName=data.sceneName;
    }
    create(){
        this.background=this.background;
        //this.veil=this.add.graphics({x:0,y:0});
        //this.veil.fillStyle('0x000000',0.3);
        //this.veil.fillRect(0,0,config.width, config.height);
        this.imagem = this.add.image(config.width/2,config.height/2,'pausa');
        this.imagem.setScale(1.3);

        this.btnSoundL = this.add.image(576,300,'btnSoundL');
        this.btnSoundL.setOrigin(0,0)
        this.btnSoundL.setScale(1);
        this.btnSoundLP = this.add.image(576,300,'btnSoundLP');
        this.btnSoundLP.setOrigin(0,0)
        this.btnSoundLP.setScale(1);
        this.btnSoundLP.visible=false;
        
        this.btnSoundR = this.add.image(576,360,'btnSoundR');
        this.btnSoundR.setOrigin(0,0)
        this.btnSoundR.setScale(1);
        this.btnSoundRP = this.add.image(576,360,'btnSoundRP');
        this.btnSoundRP.setOrigin(0,0)
        this.btnSoundRP.setScale(1);
        this.btnSoundRP.visible=false;
        
        
        this.btnMute = this.add.image(576,420,'btnMute');
        this.btnMute.setOrigin(0,0);
        this.btnMute.setScale(1);
        // this.btnMuteM.visible=false;
        this.btnMuteP = this.add.image(576,420,'btnMuteP');
        this.btnMuteP.setOrigin(0,0);
        this.btnMuteP.setScale(1);
        this.btnMuteP.visible=false;

        this.btnUnmute = this.add.image(576,480,'btnUnmute');
        this.btnUnmute.setOrigin(0,0);
        this.btnUnmute.setScale(1);
        //this.btnUnmute.visible=false;
        this.btnUnmuteP = this.add.image(576,480,'btnUnmuteP');
        this.btnUnmuteP.setOrigin(0,0);
        this.btnUnmuteP.setScale(1);
        this.btnUnmuteP.visible=false;

        
        //btn voltar
        this.btnResume = this.add.image(576,540,'btnResume');
        this.btnResume.setOrigin(0,0);
        this.btnResume.setScale(1);
        this.btnResumeP = this.add.image(576,540,'btnResumeP');
        this.btnResumeP.setOrigin(0,0);
        this.btnResumeP.setScale(1);
        this.btnResumeP.visible=false;

        /*this.btnAjuda = this.add.image(350,425,'btnAjuda');
        this.btnAjuda.setScale(0.07);
        this.btnAjudac = this.add.image(350,425,'btnAjudac');
        this.btnAjudac.setScale(0.3);
        this.btnAjudac.visible=false;
        */
        //btn sair
        this.btnQuit = this.add.image(576,600,'btnQuit');
        this.btnQuit.setOrigin(0,0);
        this.btnQuit.setScale(1);
        this.btnQuitP = this.add.image(576,600,'btnQuitP');
        this.btnQuitP.setOrigin(0,0);
        this.btnQuitP.setScale(1);
        this.btnQuitP.visible=false;
        

        //interações do btnVoltar
        this.btnResume.setInteractive();

        this.btnResume.on("pointerover", ()=>{
            //console.log("over Voltar");
            this.game.canvas.style.cursor = "pointer";
            this.btnResumeP.visible=true;
        });
        this.btnResume.on("pointerout", ()=>{
            //console.log("out Voltar");
            this.game.canvas.style.cursor = "default";
            this.btnResumeP.visible=false;
        });
        this.btnResume.on("pointerup", ()=>{
            //console.log("up Voltar");
            this.game.canvas.style.cursor = "default";
            this.scene.stop();
            this.scene.resume(this.sceneName);
        });


        //interações do btnMaisM
        this.btnSoundR.setInteractive();

        this.btnSoundR.on("pointerover", ()=>{
            //console.log("over MaisM");
            this.game.canvas.style.cursor = "pointer";
            this.btnSoundRP.visible=true;
        });
        this.btnSoundR.on("pointerout", ()=>{
            //console.log("out MaisM");
            this.game.canvas.style.cursor = "default";
            this.btnSoundRP.visible=false;
        });
        this.btnSoundR.on("pointerup", ()=>{
            //console.log("up MaisM");
            if(music.volume < 1){
                music.volume += 0.2;
                console.log(music.volume)
            }
        });

        //interações do btnMenosM
        this.btnSoundL.setInteractive();

        this.btnSoundL.on("pointerover", ()=>{
            //console.log("over MenosM");
            this.game.canvas.style.cursor = "pointer";
            this.btnSoundLP.visible=true;
        });
        this.btnSoundL.on("pointerout", ()=>{
            //console.log("out MenosM");
            this.game.canvas.style.cursor = "default";
            this.btnSoundLP.visible=false;
        });
        this.btnSoundL.on("pointerup", ()=>{
            //console.log("up MenosM");
            if(music.volume > 0){
                var cond = 0.2;
                if((music.volume - cond) < 0){
                    music.volume = 0;
                } else{
                    music.volume -= cond;
                }
                console.log(music.volume)
            }
            
        });

        //interações do btnMuteM
        this.btnMute.setInteractive();

        this.btnMute.on("pointerover", ()=>{
            //console.log("over MuteM");
            this.game.canvas.style.cursor = "pointer";
            this.btnMuteP.visible=true;
        });
        this.btnMute.on("pointerout", ()=>{
            //console.log("out MuteM");
            this.game.canvas.style.cursor = "default";
            this.btnMuteP.visible=false;
        });
        this.btnMute.on("pointerup", ()=>{
            //console.log("up MuteM");
            this.btnMute.visible = false;
            this.btnMuteP.visible = false;
            this.btnUnmute.visible = true;
            music.mute = false;
        });

        //interações do btnMuteM
        this.btnUnmute.setInteractive();

        this.btnUnmute.on("pointerover", ()=>{
            //console.log("over UnmuteM");
            this.game.canvas.style.cursor = "pointer";
            this.btnUnmuteP.visible=true;
        });
        this.btnUnmute.on("pointerout", ()=>{
            //console.log("out UnmuteM");
            this.game.canvas.style.cursor = "default";
            this.btnUnmuteP.visible=false;
        });
        this.btnUnmute.on("pointerup", ()=>{
            //console.log("up UnmuteM");
            this.btnUnmuteP.visible = false;
            this.btnUnmute.visible = false;
            this.btnMute.visible = true;
            music.mute = true;
        });
        

        //interações do btnSair
        this.btnQuit.setInteractive();

        this.btnQuit.on("pointerover", ()=>{
            //console.log("over Sair");
            this.game.canvas.style.cursor = "pointer";
            this.btnQuitP.visible=true;
        });
        this.btnQuit.on("pointerout", ()=>{
            //console.log("out Sair");
            this.game.canvas.style.cursor = "default";
            this.btnQuitP.visible=false;
        });
        this.btnQuit.on("pointerup", ()=>{
            //this.game.canvas.style.cursor = "default";
            this.scene.stop();
            this.scene.stop("Room_0");
            this.scene.stop("Room_1");
            this.scene.stop("Room_2");
            this.scene.stop("Room_3");
            this.scene.stop("Room_4");
            this.scene.stop("Room_5");
            this.scene.stop("Room_preboss");
            this.scene.stop(sceneName);
            this.scene.start("Menu1");
        
        });
        
    }
}