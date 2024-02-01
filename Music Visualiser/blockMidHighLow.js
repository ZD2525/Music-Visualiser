var rotateThresh;
var progThresh;
var seedThresh;
var boxColour = "#0000FF";
var lineColour = "#00FF00";

function BlockMidHighLow(){

    this.name = "Block Mid High Low";
    var rot = 0;
    var noiseStep = 0.01;
    var prog = 0;

    //GUI for rotateThresh, progThresh and seedThresh
    var bmhlGUI;

    //to setup the GUI
    this.setup = function(){
        rotateThresh = 180;
        progThresh = 180;
        seedThresh = 100;

        bmhlGUI = createGui("Audio Visualiser");
        bmhlGUI.setPosition(width-215, 0);

        sliderRange(0.001,0,0.001);
        bmhlGUI.addGlobals("noiseStep");

        sliderRange(0,255,1);
        bmhlGUI.addGlobals("rotateThresh", "progThresh","seedThresh","boxColour", "lineColour");
        bmhlGUI.hide();
    }
    this.setup();

    this.onResize = function(){
        bmhlGUI.setPosition(width-215, 0);
    }
    this.onResize();

    this.draw = function(){
        fourier.analyze();
        var b = fourier.getEnergy("bass");
        var t = fourier.getEnergy("treble");
        rotatingBlocks(b);
        noiseLine(b,t);
    }

    this.unSelectVisual = function(){
        bmhlGUI.hide();
    }

    this.selectVisual = function(){
        bmhlGUI.show();
    }

    function rotatingBlocks(energy){
        if(energy<rotateThresh){
            rot+=0.01;
        }

        //r is the length of the block
        //map the energy level (0 to 255) to 20 to 100
        var r = map(energy,0,255,20,100);

        push();
        rectMode(CENTER);
        translate(width/2,height/2);
        rotate(rot);
        fill(boxColour);

        var incr = width/(10-1);
        //draw the row of squares
        for(var i=0; i < 10; i++){
            rect(i*incr - width/2,0,r,r);
        }
        pop();
    }

    function noiseLine(energy1, energy2){
        push();
        translate(width/2,height/2);

        //start drawing of the noise line using begin and end shape
        beginShape();
        noFill();
        stroke(lineColour);
        strokeWeight(3);

        //get the noise value
        for(var i = 0; i < 100; i++){
            var x = noise(i*noiseStep + prog);
            var y = noise(i*noiseStep + prog+1000);
            x = map(x,0,1,-250,250);
            y = map(y,0,1,-250,250);
            vertex(x,y);
        }
        endShape();

        if(energy1>progThresh){
            prog+=0.05;
        }

        //add in one more condition
        if(energy2>seedThresh){
            noiseSeed(); //randomise the noise value - make it more "random"
        }
        pop();
    }

    this.isMouseInGUI = function(){
        var inbmhlGUI = false;
        var bmhlGUI_x = bmhlGUI.prototype._panel.style.left;
        var bmhlGUI_y = bmhlGUI.prototype._panel.style.top;
        var bmhlGUI_height = bmhlGUI.prototype._panel.clientHeight;
        var bmhlGUI_width = bmhlGUI.prototype._panel.clientWidth;

        bmhlGUI_x = parseInt(bmhlGUI_x,10);
        bmhlGUI_y = parseInt(bmhlGUI_y,10);
        bmhlGUI_height = parseInt(bmhlGUI_height,10);
        bmhlGUI_width = parseInt(bmhlGUI_width,10);

        if(mouseX>bmhlGUI_x && mouseX<bmhlGUI_x+bmhlGUI_width){
            if(mouseY>bmhlGUI_y && mouseY<bmhlGUI_y+bmhlGUI_height){
                inbmhlGUI = true;
            }
        }

        return inbmhlGUI;
    }
}