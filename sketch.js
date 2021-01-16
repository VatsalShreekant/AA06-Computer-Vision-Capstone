let video;
let img;
let poseNet;
let pose;
let skeleton;
// variable to store target label pose
let targetPose;

let w = 640;
let h = 480;

// object to store the neural network
let instructor;

// keep track of state of progress
let state = 'waiting';

function setup() {
	createCanvas(w, h);
	//video = createCapture(VIDEO);
	//video.hide();
	load_data();

	// after everything is setup, can now initialize neural network
	let options = {
		inputs: 24,
		outputs: 5,
		task: 'classification',
		debug: true
	}
	instructor = ml5.neuralNetwork(options);
}

function load_data(){
	// testing this on an image
	img = createImg('yoga-dataset/training/tree/File61.jpg', imageReady);
	img.size(w, h);
	img.hide();
	frameRate(1);
}

// when the image is ready, load up poseNet
function imageReady() {
	let options = {
		imageScaleFactor: 1,
		minConfidence: 0.7
	}
	poseNet = ml5.poseNet(modelLoaded, options);
	poseNet.on('pose', gotPoses);
}

function train_model(){
	poseNet.singlePose(img, gotPoses);
}

function gotPoses(poses){
	// if a pose is detected
	console.log(poses)
	if(poses.length > 0){
		pose = poses[0].pose;
		skeleton = poses[0].skeleton;

		// flatten the data here into array
		let inputs = [];
		for (let i = 5; i < pose.keypoints.length; i++){
			let x = pose.keypoints[i].position.x;
			let y = pose.keypoints[i].position.y;
			inputs.push(x);
			inputs.push(y);
		}
		let target = [targetPose];

		instructor.addData(inputs, target);
	}
}

function modelLoaded(){
	console.log('model ready');
	// can train model now
	train_model();
}

function draw() {
	// for the video version through webcam, you will need to enable the 3 lines below
	//translate(video.width, 0);
	//scale(-1, 1);
	//image(video, 0, 0, video.width, video.height);

	// if it detects a pose then do the following
	if (pose){
		image(img, 0, 0, w, h);
		//img.size(w,h);
		drawKeyPoints(pose);
		drawSkeleton(pose);
		// stop looping after the poses are estimated
		noLoop();
	}
}

// draw keypoints
function drawKeyPoints() {
	// ignore the face features
	// start loop at index 5 so that the face features are not included
	for (let i = 5; i < pose.keypoints.length; i++){
		let x = pose.keypoints[i].position.x;
		let y = pose.keypoints[i].position.y;
		fill(0, 255, 0);
		ellipse(x, y, 10, 10);
	}
}

// function to draw the skeleton
function drawSkeleton() {
	for (let i = 0; i < skeleton.length; i++){
		let a = skeleton[i][0];
		let b = skeleton[i][1];
		strokeWeight(3);
		stroke(0, 255, 0);
		line(a.position.x, a.position.y, b.position.x, b.position.y);
	}
}