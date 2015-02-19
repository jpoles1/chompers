//Start by creating a population of organisms, each with two chromosomes encoding selection instructions.
var popsize = 100;
var alive;
var worldsizex=window.screen.availWidth-200;
var worldsizey=window.screen.availHeight-200;
var initmaxmove = 9;
var pop;
var sprite = [];
var id = 0;
var foodct = 100;
var foodmax = 50;
var foodList = [];
function createPop(){
    for(var i=0; i<popsize; i++){
        pop.push(new Chomper(4, 1));
    }
    alive=popsize;
}
function nextPop(){

    for(var i=0; i<popsize; i++){
        pop.push(new Chomper(4, 1));
    }
}
function createFood(){
    for(var i=0; i<foodct; i++){
        foodList.push(new FoodBit(i));
    }
}
function addFood(){
    foodList.push(new FoodBit(foodct));
    foodct+=1;
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
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}
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
function checkFood(bbox){
    for(var i=0; i<foodList.length; i++){
        var food = foodList[i];
        if(Raphael.isBBoxIntersect(food.geom.getBBox(),bbox)){
            var val = food.value;
            food.changePos();
            console.log("Hit food! Value:"+val);
            return val;
        }
    }
    return 0;
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
var paper;
var delay = 100;
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
    pop=[];
    createPop();
    createFood();
    for(var i=0; i<pop.length; i++){
        pop[i].geom.attr("fill", pop[i].color)
    }
    for(var i=0; i<foodList.length; i++){
        foodList[i].geom.attr("fill", foodList[i].color)
    }
}
function update(){
    for(var i=0; i<pop.length; i++){
        if(pop[i]){
            var step = pop[i].nextStep();
            if(step==1){
                pop[i].geom.attr("fill", pop[i].color);
                var foodval = checkFood(pop[i].geom.getBBox());
                pop[i].food+=foodval;
                pop[i].score+=foodval;
            }
            else{
                console.log("Number "+String(i)+" has died with a final score of "+pop[i].score+". Remaining ="+alive);
                pop[i].geom.hide();
                delete pop[i]
                alive-=1;
                if(alive==0){
                    console.log(pop.sort(function(a,b) { console.log(a);return parseFloat(a.score) - parseFloat(b.score) }))
                    //create()
                }
            }
        }
    }
    for(i=0; i<foodList.length; i++){
        foodList[i].geom.attr("fill", foodList[i].color)
    }
    duration+=1;
    //console.log(duration);
}
