//Constructor function to handle the onscreen menu, keyboard and mouse
//controls
function ControlsAndInput(){
	
	this.menuDisplayed = false;
	
	//playback button displayed in the top left of the screen
	this.playbackButton = new PlaybackButton();

	//make the window fullscreen or revert to windowed
	this.mousePressed = function(){
		//check if the playback button has been clicked
		var isButtonClicked = this.playbackButton.hitCheck();
        var isMouseInBlockGUI1 = blockMidHighLow.isMouseInGUI();
		var isMouseInBlockGUI2 = polygons.isMouseInGUI();

        // //if not make the visualisation fullscreen
        // if(isButtonClicked==false && isMouseInBlockGUI1==false && isMouseInBlockGUI2==false){
        //     let fs = fullscreen();
        //     fullscreen(!fs);
        // }
        
	};

	//responds to keyboard presses
	//@param keycode the ascii code of the keypressed
	this.keyPressed = function(keycode){
		if(keycode == 32){
			this.menuDisplayed = !this.menuDisplayed;
		}

		if(this.menuDisplayed){
			if(keycode > 48 && keycode < 56){
				var visNumber = keycode - 49;
				vis.selectVisual(vis.visuals[visNumber].name); 
			}
		}
	};

	//draws the playback button and potentially the menu
	this.draw = function(){
		push();
		fill("white");
		stroke("black");
		strokeWeight(2);
		textSize(34);

		//playback button 
		this.playbackButton.draw();
		//only draw the menu if menu displayed is set to true.
		if(this.menuDisplayed){

			text("Select a visualisation:", 100, 30);
			this.menu();
		}else{
			textSize(15);
			textAlign(CENTER, BOTTOM);
			text("Press Spacebar to Open the Visualisation Menu", 0, height, width);
		}
		pop();

	};

	this.menu = function(){
		//draw out menu items for each visualisation
        for(var i=0;i<vis.visuals.length;i++){
            text((i+1)+":"+vis.visuals[i].name,100,30+(i+1)*35);
        }
	};
}


