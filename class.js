function FoodBit(id){
    this.id = id;
    this.size = 4;
    this.x = randNum(worldsizex-this.size);
    this.y = randNum(worldsizey-this.size);
    this.color = "#FFFF00";
    this.geom = paper.rect(this.x, this.y, this.size, this.size);
    //Size of food reward.
    this.value = randNum(foodmax);
    this.changePos = function(){
        this.x = randNum(worldsizex-this.size);
        this.y = randNum(worldsizey-this.size);
        this.value = randNum(foodmax);
        this.geom = this.geom.attr({x: this.x, y: this.y});
    }
}
function Chomper(genomesize, autogen) {
    this.genomesize = genomesize;
    this.id=id;
    id+=1;
    this.size = 4;
    this.x = randNum(worldsizex-this.size);
    this.y = randNum(worldsizey-this.size);
    this.color = randColor();
    this.step = 0;
    this.food = 100;
    this.score=0;
    this.geom = paper.rect(this.x, this.y, this.size, this.size);
    var genome1 = "";
    var genome2 = "";
    if(autogen==1){
        for(var base=0; base<genomesize; base++){
            genome1 = genome1 + randSel(["u", "d", "l", "r"]);
            genome1 = genome1 + String(randNum(initmaxmove));
            genome2 = genome2 + randSel(["u", "d", "l", "r"]);
            genome2 = genome2 + String(randNum(initmaxmove));
            this.genome1 = genome1;
            this.genome2 = genome2;
        }
        this.genome = this.genome1+this.genome2;
    }
    var movement=0;
    this.changePos = function(letter){
        if(letter=="d" && this.y<worldsizey-this.size-2){
            this.y+=1;
        }
        else if(letter=="u" && this.y>0){
            this.y-=1;
        }
        else if(letter=="l" && this.x>0){
            this.x-=1;
        }
        else if(letter=="r" && this.x<worldsizex-this.size-2){
            this.x+=1;
        }
        this.geom = this.geom.attr({x: this.x, y: this.y});
    }
    var letter;
    this.nextStep = function(){
        if(this.movement>0){
            if(this.food-1==0) {
                return 0;
            }
            else {
                this.changePos(letter);
                this.geom.attr({x: this.x, y: this.y});
                this.movement-=1;
                this.food-=1;
                return 1;
            }

        }
        else{
            if(this.step>genomesize*2-2){this.step=0}
            letter = this.genome[this.step];
            var dist = this.genome[this.step+1];
            this.step+=2;
            this.movement = dist;
            return 1;
        }
    }
}
