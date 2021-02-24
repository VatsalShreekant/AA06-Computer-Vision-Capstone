let video;
let poseNet;
let pose;
let skeleton;

let brain;
let label;

function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);

    let options = {
        inputs: 14,
        outputs: 5,
        task: 'classification',
        debug: true
    }

    brain = ml5.neuralNetwork(options);
    const modelInfo = {
        model: 'model/model/model.json',
        metadata: 'model/model/model_meta.json',
        weights: 'model/model/model.weights.bin',
    };
    brain.load(modelInfo, brainLoaded);
}

function brainLoaded() {
    console.log('pose classification model ready');
    // if model is ready, then you can begin classification
    classifyPose();
}

function classifyPose(){
    // only classify if there is a pose detected from posenet
    if(pose){
        let inputs = [];
        for (let i = 0; i < pose.keypoints.length; i++){
            let x = pose.keypoints[i].position.x;
            let y = pose.keypoints[i].position.y;
            inputs.push(x);
            inputs.push(y);
        }
        brain.classify(inputs, gotResult);
    }
    else{
        // delay if it wasnt able to detect the initial pose
        setTimeout(classifyPose, 100);
    }
}

function gotResult(error, results){
    if(results[0].confidence > 0.75){
        label = results[0].label;
        console.log(label);
    }
    // after first classification, you want to keep classifying for new poses
    classifyPose();
}


function gotPoses(poses) {
    console.log(poses);
    if (poses.length > 0) {
        pose = poses[0].pose;
        skeleton = poses[0].skeleton;
    }
}

function modelLoaded () {
    console.log('poseNet ready');
}

function draw() {
    translate(video.width,0);
    scale(-1,1);
    image(video, 0, 0, video.width, video.height);

    if (pose) {
        for (let i = 0; i < pose.keypoints.length; i++){
            let x = pose.keypoints[i].position.x;
            let y = pose.keypoints[i].position.y;
            fill (100, 99, 82);
            ellipse(x, y, 16, 16);
        }

        for (let i = 0; i < skeleton.length; i++){
            let a = skeleton[i][0]; //skeleton is a 2D array, the second dimension holds the 2 locations that are connected on the keypoint
            let b = skeleton[i][1];
            strokeWeight(2);
            stroke(255);
            line(a.position.x, a.position.y, b.position.x, b.position.y);
        }
    }
}