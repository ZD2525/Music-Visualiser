class movingStar {
    constructor() {
        //Star position defined as a vector placed randomly
        this.starPosition = p5.Vector.random2D().mult(200+5); 
        
        //Velocity and Acceleration vectors created in order to make the stars move
        this.starVelocity = createVector(0, 0);
        
        //Star acceleration will copy the star position to have the same direction
        this.starAcceleration = this.starPosition.copy().mult(random(0.00001, 0.0001));
        
    }
    
    //Function to check if the conditional statement is true
    starMovement(starCondition) {
        this.starVelocity.add(this.starAcceleration);
        this.starPosition.add(this.starVelocity);

        //If starCondition is true, the velocity will be added to the star position
        if(starCondition == true) {
            for(var i=0; i<random(5, 255); i++) {
                this.starPosition.add(this.starVelocity);    
            }
        }
    }
    
    //Check if the star position is within the canvas
    inCanvas() {
        if(this.starPosition.x < -width/2 || this.starPosition.x > width/2 ||
           this.starPosition.y < -height/2 || this.starPosition.y > height/2) {
            return true;    
        } else {
            return false;
        }   
    }
    
    //Method to draw stars on the canvas
    drawStars() {
        noStroke();
        fill(255, 255, 0);
        //Drawing the star shape
        beginShape();
        vertex(this.starPosition.x-2.0, this.starPosition.y+2.0);
        vertex(this.starPosition.x+0.0, this.starPosition.y+7.0);
        vertex(this.starPosition.x+2.0, this.starPosition.y+2.0);
        vertex(this.starPosition.x+7.0, this.starPosition.y+0.0);
        vertex(this.starPosition.x+2.0, this.starPosition.y-1.6);
        vertex(this.starPosition.x+0.0, this.starPosition.y-7.0);
        vertex(this.starPosition.x-2.0, this.starPosition.y-1.6);
        vertex(this.starPosition.x-7.0, this.starPosition.y+0.0);
        endShape(CLOSE);
    }
}