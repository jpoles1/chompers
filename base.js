//Start by creating a population of organisms, each with two chromosomes encoding selection instructions.
var popsize = 100;
var worldsizex=window.screen.availWidth-200;
var worldsizey=window.screen.availHeight-200;
var initmaxmove = 100;
var pop = [];
var sprite = [];
id = 0;
function createPop(){
    for(i=0; i<popsize; i++){
        pop.push(new Chomper(4));
    }
}
function randNum(maxval){
    return Math.floor(Math.random()*maxval);
}
function randSel(list){
    var size = list.length;
    var rand = randNum(size);
    return list[rand];
}
function randColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '0x';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function Chomper(genomesize) {
    this.genomesize = genomesize;
    this.size = 4;
    this.x = randNum(worldsizex-this.size);
    this.y = randNum(worldsizey-this.size);
    this.color = randColor();
    this.step = 0;
    this.food = 10000;
    this.geom = paper.rect(this.x, this.y, this.size, this.size);
    var genome = "";
    for(var base=0; base<genomesize; base++){
        genome = genome + randSel(["u", "d", "l", "r"]);
        genome = genome + String(randNum(initmaxmove));
        this.genome = genome;
    }
    this.stepani = function(){
        var letter = genome[this.step];
        var dist = genome[this.step+1];
        if(this.food-this.dist<=0){
            console.log("Dead")
            return 0;
        }
        else{
            if(letter=="u"){
                this.y+=dist;
            }
            else if(letter=="d"){
                this.y-=dist;
            }
            else if(letter=="l"){
                this.y-=dist;
            }
            else if(letter=="r"){
                this.y+=dist;
            }
            if(this.y<0){this.y=0}
            if(this.x<0){this.x=0}
            if(this.x+this.size>worldsizex){
                this.x = worldsizex-this.size
            }
            if(this.y+this.size>worldsizey){
                this.y = worldsizey-this.size
            }
            this.step+=2;
            this.geom.animate({x: this.x, y: this.y}, this.dist*5);
            return 1;
        }
    }
    this.id = id;
    id++;
}
var paper;
var delay = 500;
var duration = 0;
window.onload = function(){
    paper = Raphael(10, 50, worldsizex, worldsizey);
    create();
    window.setInterval(update, delay);
};
//Game Functions
// create an new instance of a pixi stage
//var stage = new PIXI.Stage(0xFFFFFF);
// create a renderer instance.
//var renderer = PIXI.autoDetectRenderer(worldsize, worldsize, document.getElementById('game'));

// add the renderer view element to the DOM
function create(){
    createPop();
    for(i=0; i<pop.length; i++){
        pop[i].geom.attr("fill", "#f00")
    }
}
function update(){
    for(i=0; i<pop.length; i++){
        if(pop[i]){
            var step = pop[i].stepani();
            if(step==1){
                pop[i].geom.attr("fill", "#f00")
            }
            else{
                console.log("Number "+String(i)+" has died");
                delete pop[i]
            }
        }
    }
    duration+=1;
    console.log(duration);
}
