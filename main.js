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
