//Start by creating a population of organisms, each with two chromosomes encoding selection instructions.
var popsize = 100;
var worldsize=800;
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
    this.x = randNum(worldsize);
    this.y = randNum(worldsize);
    this.color = randColor();
    this.step = 0;
    this.size = 6;
    this.food = 10000;
    g.beginFill(pop[i].color, 1);
    this.geom = g.drawRect(this.x, this.y, this.size, this.size);
    var genome = "";
    for(var base=0; base<genomesize; base++){
        genome = genome + randSel(["u", "d", "l", "r"]);
        genome = genome + String(randNum(initmaxmove));
        this.genome = genome;
    }
    this.step = function(){
        var letter = genome[this.step];
        var dist = genome[this.step+1];
        if(this.food-this.dist<=0){
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
            if(this.x+this.size>worldsize){
                this.x = worldsize-this.size
            }
            if(this.y+this.size>worldsize){
                this.y = worldsize-this.size
            }
            this.step+=2
            return 1;
        }
    }
    this.step();
    this.id = id;
    id++;
}
//Game Functions
// create an new instance of a pixi stage
//var stage = new PIXI.Stage(0xFFFFFF);
var paper = Raphael(10, 50, worldsize, worldsize);
// create a renderer instance.
//var renderer = PIXI.autoDetectRenderer(worldsize, worldsize, document.getElementById('game'));

// add the renderer view element to the DOM
requestAnimFrame(update);
var g = new PIXI.Graphics();
function create(){
    createPop();
    for(i=0; i<pop.length; i++){
        var x = pop[i].x;
        var y = pop[i].y;
        var size = pop[i].size;
    }
}
function update(){
    console.log("TEST");
    for(i=0; i<pop.length; i++){
        if(pop[i]){
            var step = pop[i].step;
            if(step==1){
                console.log(pop[i].id)
                //sprite[i].position.x = pop[i].x;
                //sprite[i].position.y = pop[i].y;
                sprite[i].moveTo(pop[i].x, pop[i].y)
            }
            else{
                delete pop[i]
                delete sprite[i]
            }
        }
    }
}
