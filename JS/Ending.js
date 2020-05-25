class Ending extends Phaser.Scene {
    constructor(){
        super("Ending");
    }
    
    init(data){
        this.score=data.score;
    }
    create(){

        this.btnRestart = this.add.image(551,456,'btnRestart');
        this.btnRestart.setOrigin(0,0)
        this.btnRestart.setScale(1);
        this.btnRestartP = this.add.image(551,456,'btnRestartP');
        this.btnRestartP.setOrigin(0,0)
        this.btnRestartP.setScale(1);
        this.btnRestartP.visible=false;

        this.listaPaus=[];


        //this.resetRank();
        var scoreBoard = JSON.parse(localStorage.getItem('score'));
        if(scoreBoard==null){
            scoreBoard=[];
        }
        console.log(this.score);
        var novo={nome:" ",score:this.score};
        scoreBoard.push(novo);
        localStorage.setItem('score',JSON.stringify(scoreBoard)); 

         this.btnRestart.setInteractive();

         this.btnRestart.on("pointerover", ()=>{
             console.log("over restart");
             this.game.canvas.style.cursor = "pointer";
             this.btnRestartP.visible=true;
         });
         this.btnRestart.on("pointerout", ()=>{
             console.log("out restart");
             this.game.canvas.style.cursor = "default";
             this.btnRestartP.visible=false;
         });
         
         this.btnRestart.on("pointerup", ()=>{
             console.log("up restart");
             this.registry.destroy();
             this.events.off();
             death();
             this.scene.start('Menu1');
         });
    }

    resetRank(){
        var scoreBoard = JSON.parse(localStorage.getItem('score'));
        for(var i = 0;i<scoreBoard.length;i++){
            scoreBoard.pop();
        }
        localStorage.setItem('score',JSON.stringify(scoreBoard));
    }
}