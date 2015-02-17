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
function preload() {

}
function create(){
    var graphics = game.add.graphics(0, 0);
    createPop();
    for(i=0; i<pop.length; i++){
        var x = pop[i].x;
        var y = pop[i].y;
        var size = pop[i].size;
        graphics.beginFill(pop[i].color, 1);
        sprite[i] = graphics.drawRect(x, y, size, size);
    }
}
function update(){
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
var game = new Phaser.Game(worldsize, worldsize, Phaser.AUTO, 'game', {create: create, update: update});