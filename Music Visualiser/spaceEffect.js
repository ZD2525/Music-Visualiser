var circleColour;
var starSpeed;
var barsC1;
var barsC2;
var w;
var Bars;

function spaceEffect() {

    //Name of the visualisation
    this.name = "Space";
    
    //Creating an empty array
    var stars = [];
    
    //Variables for Space Wave
    var spaceX;
    var spaceY;
    var spaceR;
    var flowIndex;
    
    var spaceGUI;
    
    this.setup = function() {    

        //Default GUI colour value for the Wave flow
        circleColour = "#000000";

        //Default star speed for the Wave flow
        starSpeed = 240;
        
        //Default spectrum colours
        barsC1 = "#8000FF";
        barsC2 = "#000000";
        
        //Default amount of bars for spectrum
        Bars = 200

        //Name for GUI
        spaceGUI = createGui("Space Adjustments");
        
        //Setting GUI position to top right hand corner
        spaceGUI.setPosition(width-215, 0);

        sliderRange(50, 500, 1);
        spaceGUI.addGlobals("Bars");
        
        sliderRange(0, 255, 1);
        spaceGUI.addGlobals("circleColour", "barsC1", "barsC2");

        //Hides the GUI at the start before the visualisation is selected
        spaceGUI.hide();
    }
    this.setup();

    //setting the position of the GUI to the topright of the screen even when resized
    this.onResize = function(){
        spaceGUI.setPosition(width-215, 0);
    }
    this.onResize();

    //Hides the gui when the visual is unselected
    this.unSelectVisual = function(){
        spaceGUI.hide();
    }

    //Shows the gui when the visual is selected
    this.selectVisual = function(){
        spaceGUI.show();
    }

    this.draw = function() {

        w = width/Bars;

        fourier.analyze();
        var amplitude = fourier.getEnergy(10, 100);

        push();
        //If the amplitude value is more than 230, the image will rotate randomly, causing a small vibration-like effect, to make it seem like the image is responsive
        if(amplitude > 230){
            rotate(random(-0.003, 0.003))
        }
        image(img1, 0, 0, width, height);
        pop();

        push();
        angleMode(DEGREES);
        
        //Calling the waveform method
        var flow = fourier.waveform();
        
        var spaceSpectrum = fourier.analyze();
        
        //Creating the spectrum Bars
        spaceSpectrums(spaceSpectrum);

        translate(width/2, height/2);

        //Creating the wave
        spaceWave(spaceX, spaceY, spaceR, flow, flowIndex);

        //Creating a new star every frame
        var star = new movingStar();

        //Pushing a star into the empty stars array
        stars.push(star);
        
        //For loop to control which stars are shown on the canvas
        for(var i=stars.length-1; i>=0; i-=1) {
            //Loops within the for loop to check if stars are within the canvas if yes then draw the stars. Otherwise, remove stars
            if(!stars[i].inCanvas()) {
                stars[i].starMovement(amplitude > starSpeed);
                stars[i].drawStars(); 
            } else {
                //Splice method to remove stars from canvas
                stars.splice(i, 1);
            }
               
        }
        angleMode(RADIANS);

        pop();
    }
    
    //Function to check if Mouse is in GUI
    this.isMouseInSpaceGUI = function() {
        var inSpaceGUI = false;
        
        //GUI Parameters
        var spaceGUI_x = spaceGUI.prototype._panel.style.left;
        var spaceGUI_y = spaceGUI.prototype._panel.style.top;
        var spaceGUI_width = spaceGUI.prototype._panel.style.clientWidth;
        var spaceGUI_height = spaceGUI.prototype._panel.style.clientHeight;
        
        //Converting text from CSS into integer values
        spaceGUI_x = parseInt(spaceGUI_x, 10);
        spaceGUI_y = parseInt(spaceGUI_y, 10);
        spaceGUI_width = parseInt(spaceGUI_width, 10);
        spaceGUI_height = parseInt(spaceGUI_height, 10);
        
        //If loop conditions to test if mouse is within the GUI
        if(mouseX > spaceGUI_x && mouseX < spaceGUI_x+spaceGUI_width) {
            if(mouseY > spaceGUI_y && mouseY < spaceGUI_y+spaceGUI_height) {
                inSpaceGUI = true;   
            }   
        }
        return inSpaceGUI;
    }

    //Function to draw a circular Wave
    function spaceWave(waveX, waveY, waveR, wave, waveIndex) {
        for(var w=-1; w<=1; w+=2) {
            beginShape();
            
            //For loop that goes in a circle
            for(var i=0; i<=360; i+=2) {
                stroke(circleColour);
                strokeWeight(5);
                noFill();

                //Index that maps the for loop index to the wave flow
                //Value of index has to be an integer so the floor function is used
                var waveIndex = floor(map(i, 0, 360, 0, wave.length-1));
            
                //Use the flowIndex to map the radius of the circle to the wave flow
                //Min radius of the circle = 50, max radius of the circle = 350
                var waveR = map(wave[waveIndex], -1, 1, 50, 350);
            
                //Draw the wave flow in a looping pattern
                var waveX = waveR * sin(i) * w;
                var waveY = waveR * cos(i);
                
                vertex(waveX, waveY);
            }
            endShape();     
        }
    }

    //Function to draw the spectrum waveform on the bottom of the window
    function spaceSpectrums(spaceSpectrum){
        noStroke();

        //Colors of the spectrum adjustable from the GUI
        var barsColor1 = color(barsC1);
        var barsColor2 = color(barsC2);

        //For loop to draw the spectrum waveform
        for(var i = 0; i < spaceSpectrum.length; i++){
            var amp = spaceSpectrum[i];
            var barsC = lerpColor(barsColor1, barsColor2, spaceSpectrum[i]/255);
            fill(barsC);
            var y = map(amp, 0, 255, height, height*3/4);
            rect(i * w, y, w, height-y);
        }
    }
    
        
}