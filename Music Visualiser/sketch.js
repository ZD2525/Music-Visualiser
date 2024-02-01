//global for the controls and input 
var controls = null;
//store visualisations in a container
var vis = null;
//variable for the p5 sound object
var sound = null;
//variable for p5 fast fourier transform
var fourier;


var blockMidHighLow;
var wavepattern;
var spectrum;
var needles;
var ridgePlots;
var polygons;
var cube;
var img;
var img1; 

function preload(){
	sound = loadSound('assets/Good_Day.mp3');
	img = loadImage('assets/night.jpg');
	img1 = loadImage('assets/space.jpg');
}

function setup(){
	createCanvas(windowWidth, windowHeight);
	background(0);
	controls = new ControlsAndInput();

	//instantiate the fft object
	fourier = new p5.FFT();

	//create a new visualisation container and add visualisations
	vis = new Visualisations();
	wavepattern = new WavePattern();
	spectrum = new Spectrum();
	needles = new Needles();
	ridgePlots = new RidgePlots();
	blockMidHighLow = new BlockMidHighLow();
	polygons = new Polygons();
	sEffect = new spaceEffect();
	vis.add(wavepattern);
	vis.add(spectrum);
	vis.add(needles);
	vis.add(ridgePlots);
	vis.add(blockMidHighLow);
	vis.add(polygons);
	vis.add(sEffect);

	//Blurs the background Images
	img.filter(BLUR,12);
	img1.filter(BLUR,12);

}

function draw(){
	background(0);
	//draw the selected visualisation
	vis.selectedVisual.draw();
	//draw the controls on top.
	controls.draw();
}

function mouseClicked(){
	controls.mousePressed();
}

function keyPressed(){
	controls.keyPressed(keyCode);
}

//when the window has been resized. Resize canvas to fit 
//if the visualisation needs to be resized call its onResize method
function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
	if(vis.selectedVisual.hasOwnProperty('onResize')){
		vis.selectedVisual.onResize();
	}
}
