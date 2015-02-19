//Creation Functions
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
//Utility Functions
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
//Interaction Functions
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