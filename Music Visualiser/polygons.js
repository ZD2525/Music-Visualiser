var lines;
var radius;
var bassColor;
var trebleColor;
var midColor;
var amplitude;

function Polygons(){

    //Name of the Visualisation
    this.name = "Polygons";

    var polygonGUI;

    //To Setup the GUI
    this.setup = function(){

        //Default amount of lines
        lines = 10;

        //Default starting radius of the 'circle'
        radius = 180;

        //Default colors for the different frequencies
        bassColor = "#FBFF00";
        trebleColor = "#BB00FF";
        midColor = "#5900FF";

        //Creating the GUI
        polygonGUI = createGui("Polygon Adjustments");

        //Setting the GUI position to the top right hand corner
        polygonGUI.setPosition(width-215, 0);

        //Setting the range of the sliders and creating the adjustable values
        sliderRange(3, 50, 1);
        polygonGUI.addGlobals("lines");

        sliderRange(0, 250, 1);
        polygonGUI.addGlobals("radius");

        sliderRange(0,255,1);
        polygonGUI.addGlobals("bassColor","trebleColor","midColor", "circleColor");

        //Hides the GUI at the start before the visualisation is selected
        polygonGUI.hide();
    }
    this.setup();

    //setting the position of the GUI to the topright of the screen even when resized
    this.onResize = function(){
        polygonGUI.setPosition(width-215, 0);
    }
    this.onResize();

    //Hides the gui when the visual is unselected
    this.unSelectVisual = function(){
        polygonGUI.hide();
    }

    //Shows the gui when the visual is selected
    this.selectVisual = function(){
        polygonGUI.show();
    }

    this.draw = function(){
        amplitude = fourier.getEnergy(20, 200);
        push();
        //If the amplitude value is more than 230, the image will rotate randomly, causing a small vibration-like effect, to make it seem like the image is responsive
        if(amplitude > 230){
            rotate(random(-0.001, 0.001))
        }
        image(img, 0, 0, width, height);
        pop();

        //Getting the respective frequencies (bass, mids and treble)
        fourier.analyze();
        var b = fourier.getEnergy("bass");
        var t = fourier.getEnergy("treble");
        var m = fourier.getEnergy("mid");
        spinningPolygons(b, m, t);
    }


    //function for the spinning polygons
    function spinningPolygons(bass, mid, treble){
        
        //Mapping the respective frequencies to the radius and scaling it accordingly

        //Mids
        var mapMid = map(mid, 0, 255, -radius, radius);
        var scaleMid = map(mid, 0, 255, 1, 1.5);

        //Trebles
        var mapTreble = map(treble, 0, 255, -radius, radius);
        var scaleTreble = map(treble, 0, 255, 1, 1.5);
        
        //Bass
        var mapBass = map(bass, 0, 255, -radius, radius);
        var scaleBass = map(bass, 0, 255, 0, 0.8);
        push();

        //translates the objects to the middle of the canvas
        translate(width/2, height/2);

        //for loop to rotate and draw the lines
        for(i = 0; i < lines; i += 0.5){
            rotate(TWO_PI/lines);

            //Bass
            push();
            strokeWeight(5);
            stroke(bassColor); //color that is controlled by the gui
            scale(scaleBass);
            rotate(frameCount * -0.5);
            line(mapBass, radius/2, radius, radius);
            line(-mapBass, -radius/2, radius, radius);
            pop();

            //Mids
            push();
            strokeWeight(0.5);
            stroke(midColor); //color that is controlled by the gui
            scale(scaleMid);
            line(mapMid, radius / 2, radius, radius);
            line(-mapMid, -radius / 2, radius, radius);
            pop();

            //Treble
            push();
            stroke(trebleColor); //color that is controlled by the gui
            scale(scaleTreble);
            line(mapTreble, radius / 2, radius, radius);
            line(-mapTreble, -radius / 2, radius, radius);
            pop();
        }
        pop();
    }

    //Function to check if Mouse is in GUI
    this.isMouseInGUI = function(){
        var inPolygonGUI = false;
        
        //GUI Parameters
        var polygonGUI_x = polygonGUI.prototype._panel.style.left;
        var polygonGUI_y = polygonGUI.prototype._panel.style.top;
        var polygonGUI_height = polygonGUI.prototype._panel.clientHeight;
        var polygonGUI_width = polygonGUI.prototype._panel.clientWidth;

        //Converting text from CSS into integer values
        polygonGUI_x = parseInt(polygonGUI_x,10);
        polygonGUI_y = parseInt(polygonGUI_y,10);
        polygonGUI_height = parseInt(polygonGUI_height,10);
        polygonGUI_width = parseInt(polygonGUI_width,10);

        //Conditional Loop to check if mouse is within the GUI
        if(mouseX>polygonGUI_x && mouseX<polygonGUI_x+polygonGUI_width){
            if(mouseY>polygonGUI_y && mouseY<polygonGUI_y+polygonGUI_height){
                inPolygonGUI = true;
            }
        }
        return inPolygonGUI;
    }
}