class Ranking extends Phaser.Scene {
    constructor(){
        super("Ranking");
    }

    create(){

        this.btnBack = this.add.image(1024,800,'btnBack');
        this.btnBack.setOrigin(0,0);
        this.btnBack.setScale(1);
        this.btnBackP = this.add.image(1024,800,'btnBackP');
        this.btnBackP.setOrigin(0,0);
        this.btnBackP.setScale(1);
        this.btnBackP.visible=false;


        this.btnBack.setInteractive();

        this.btnBack.on("pointerover", ()=>{
            console.log("over back");
            this.game.canvas.style.cursor = "pointer";
            this.btnBackP.visible=true;
        });
        this.btnBackP.on("pointerout", ()=>{
            console.log("out back");
            this.game.canvas.style.cursor = "default";
            this.btnBackP.visible=false;
        });
        this.btnBack.on("pointerup", ()=>{
            console.log("up back");
            this.game.canvas.style.cursor = "default";
            this.scene.start("Menu1")
        });

        //var scoreBoard = this.cache.json.get('score');
        var scoreBoard=JSON.parse(localStorage.getItem('score'));
        if(scoreBoard==null){
            scoreBoard=[];
        }

        var sBlen = Object.keys(scoreBoard).length;
        var y = 210;
        var xBlank = 250;
        var xScore = 400;
        var list = [];


        for(var i=0;i<sBlen;i++){
            list.push(scoreBoard[i]);
        }
 
        list.sort(this.compare);



        for(var i=0;i<10;i++){
            if(i<sBlen){
                this.add.text(xBlank,y,(i+1)+'   '+list[i].nome,{font: "18px Helvetica", fill: 'white'});
                this.add.text(xScore,y,list[i].score,{font: "18px Helvetica", fill: 'white'});
            }
            else{
                this.add.text(xBlank,y,'00   ',{font: "18px Helvetica", fill: 'white'});
                this.add.text(xScore,y,'0000',{font: "18px Helvetica", fill: 'white'});
            }
            y+=30;
        }
    }
    compare(a, b){
        const pontA = a.score;
        const ontB = b.score;
  
        let comp = 0;
        if (pontA < ontB) {
            comp = -1;
        } else if (pontA > ontB) {
            comp = 1;
        }
        return comp;
    }   
    
}
