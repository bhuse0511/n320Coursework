class Drop {
    constructor() {
        this.x = Math.random() * 400;
        this.y = 0;
    }

    update() {
        this.y ++;
        fill(0,0,200);
        circle(this.x, this.y, 5);
    }
}

class RainManager {
    constructor() {
        this.drops = [];
    }

    createDrop() {
        //make a new drop
        var newDrop = new Drop();
        
        //add this drop to our collection of drops
        this.drops.push(newDrop);
    }

    update() {
        for(var i = 0; i < this.drops.length; i++) {
            this.drops[i].update();
        }
    }
}

class Ground {
    //constructor 
    constructor() {
        //set the starting color
        
        //start the drop hit count
        this.dropCount = 0;
        this.b = 20;
        this.y = 275;
    }
    
    //update - draws the rectangle to the screen
    update() {
        fill(0,0,this.b);
        rect(0,this.y,2000,400);
    }
    //drop hit - called when a rain drop gets low enough (how do you inform it?)
    dropHit() {
        /*if (circle.y < 10) {
            dropCount = dropCount + 1;
            console.log(dropCount);
        } */
        
        for (var i =0; i < rainManager.drops.length; i++){
            
            if(rainManager.drops[i].y >= this.y) {
                rainManager.drops.splice(i,1);
                this.dropCount++;
                console.log(this.b)
                if(this.dropCount % 10 == 0){
                    this.b = this.b + 10;
                }
            }
        }
    }
        //change the color for every ten rain drops hit
    
}

//global variables
var rainManager = new RainManager();
var ground = new Ground();
//Run once before the application starts
function setup() {
    createCanvas(400,300);
}

//runs 60 times a second, or so
function draw() {

    //clear out background
    background(255);

    //create a new drop on a 1% chance
    if(Math.random() < .05) {
        rainManager.createDrop();
    }

    rainManager.update();
    ground.update();
    ground.dropHit();
}