// script to detect pose on video file for 1 class and saves keypoints to associated json file

// you can use collect_data_vid.js if you want to run multiple videos and save all keyposes
// into a json file

let pose;
let skeleton;
let poseNet;
let video;
let img;
let state = "stay";
let s = "start";
let json = {};
let sample = 0;
let label;
let current = 0;

// can change if you want to use other pose classes
//let labels = ["downwarddog", "mountain", "tree", "warrior1", "warrior2"];

// edit this for your target pose
let labels = ["warrior2"];
let file_size = 90;


function setup() {
    createCanvas(640, 480);

    // edit the path to suit yours in your local drive
    video = createVideo(["yoga-dataset/training-vid/" + labels[0] + ".mp4"], video_loaded);
    video.size(width, height);
    video.hide();
    console.log("video hidden");
    poseNet = ml5.poseNet(video, onloaded);
    poseNet.on("pose", getposes);

}

function video_loaded() {
    console.log("video is loaded");
}

function posenetmodel() {
    posenet = ml5.poseNet(video, onloaded);
    posenet.on("pose", getposes);
}

function onloaded(){
    console.log('posenet model loaded');
}

function getposes(poses){
    if (state = "collect"){
        console.log(poses);
    }
    if(poses.length > 0){
        pose = poses[0];
        skeleton = poses[0].skeleton;
    }
}

function mousePressed() {
    state = "collect";
    console.log("collecting");
    video.loop(); //set video to loop and start playing
}

function draw(){
        
    image(video, 0, 0, width, height);
    fill('green');
    if(pose && state == "collect" && s == "start"){
		let input = [];

		for (var i = 0; i < 17; i++) {
			var x = pose.pose.keypoints[i].position.x;
			var y = pose.pose.keypoints[i].position.y;
			input.push(x);
			input.push(y);
			ellipse(x,y,12,12);
        }
        
        let label = labels[current];
		json[sample] = input;
		console.log(input.length);
        sample = sample + 1;
        console.log("sample: " + sample);

        if((sample == 600) && (label == labels[current])){
            console.log("stop collecting for this pose");
			delete(poseNet);
			delete(video);
			state ='stop';
            saveJSON(json, label + '_data.json');
        }
	}
}