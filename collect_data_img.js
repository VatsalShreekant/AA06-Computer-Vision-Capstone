let pose;
let skeleton;
let poseNet;
let img;
let state = "stay";
let s = "start";
let json = {};
let label;
let mouse_press = false;
let file_size = 90;
var file_location = 0;

let labels = ["downwarddog"];

let poseNet_models = [];
let files = [];
let bg;

function setup() {
    bg = createCanvas(640,480);
    load_imageFiles();
    load_poseNetModels();
    //singlePoseEstimation();
    //img = createImg("yoga-dataset/training/downwarddog/" + files[file_location], imageLoaded);
    //img.hide();
    //noLoop();
}

function load_imageFiles() {
    for (var i = 1; i < file_size+1; i++){
        files[i-1] = loadImage("yoga-dataset/training/downwarddog/" + i + ".jpg", imageLoaded);
    }
}

function load_poseNetModels(){
    for (var i = 0; i < file_size; i++){
        poseNet_models[i] = ml5.poseNet(poseNet_loaded);
    }
}

function singlePoseEstimation() {
    for (var j = 0; j < poseNet_models.length; j++){
        poseNet_models[j].singlePose(files[j]);
    }
}

function mousePressed() {
    if (mouse_press == false){
        state = "collect";
        mouse_press = true;
    }
    else {
        state = "stay";
        mouse_press = false;
    }
    console.log(mouse_press);
    console.log(state);
}

function imageLoaded() {
    console.log("image loaded");
}

function poseNet_loaded() {
    console.log("posenet loaded");
    poseNet_models[file_location].singlePose(files[file_location], getposes);
    console.log(file_location);
    console.log("single pose on " + files[file_location]);
    file_location++;
}

function getposes(poses) {
    if (poses.length > 0){
        console.log("pose detected");
        pose = poses[0];
        skeleton = poses[0].skeleton;   
    }
    else{
        console.log("no pose detected");
    }
}

function draw() {
    if(pose){
        image(files[file_location], width, height);
        drawKeypoints(pose);
        drawSkeleton(pose);
        noLoop();
    }
}

function drawKeypoints() {
    for (let i = 0; i < pose.keypoints.length; i++){
        let x = pose.keypoints[i].position.x;
        let y = pose.keypoints[i].position.y;
        fill("yellow");
        ellipse(x, y, 10, 10);
    }
}

function drawSkeleton() {
    for (let i = 0; i < skeleton.length; i++){
        let a = skeleton[i][0];
        let b = skeleton[i][1];
        line(a.position.x, a.position.y, b.position.x, b.position.y);
    }
}