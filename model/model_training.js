let video;
let poseNet;
let pose;
let skeleton;

let numOutputs = 4;

let brain;
let targetLabel;

let state = 'waiting';

// function keyPressed(){
//     if(keyCode === 49){ // denotes 1
//         targetLabel = 'Downward Dog';
//     }
//     else if(keyCode === 50){ // denotes 2
//         targetLabel = 'Mountain';
//     }
//     else if(keyCode === 51){ // denotes 3
//         targetLabel = 'Tree';
//     }
//     else if(keyCode === 52){ // denotes 4
//         targetLabel = 'Goddess';
//     }
//     else if(keyCode === 53){ // denotes 5
//         targetLabel = 'Warrior 2';
//     }
//     else if(keyCode === 83){ // denotes s
//         brain.saveData();
//     }

//     //targetLabel = key;
//     console.log(targetLabel);

//     setTimeout(function() {
//         console.log('collecting');
//         state = 'collecting';
//         setTimeout(function(){
//             console.log('not collecting');
//             state = 'waiting';
//         }, 10000)
//     }, 10000); // wait 10 second
// }

function setup() {
    createCanvas(640, 480);
    // video = createCapture(VIDEO);
    // video.hide();
    // poseNet = ml5.poseNet(video, modelLoaded);
    // poseNet.on('pose', gotPoses);

    let options = {
        inputs: 14,
        outputs: numOutputs,
        task: 'classification',
        debug: true
    }

    brain = ml5.neuralNetwork(options);
    brain.loadData('model/datapoints-ml5/soumya-training.json', dataReady);
}

function dataReady(){
    brain.normalizeData();
    brain.train({epochs: 50}, finished);
}

function finished(){
    console.log('model trained');
    brain.save();
}


// function gotPoses(poses) {
//     console.log(poses);
//     if (poses.length > 0) {
//         pose = poses[0].pose;
//         skeleton = poses[0].skeleton;

//         // if (state == 'collecting'){
//         //     let inputs = [];

//         //     for (let i = 0; i < pose.keypoints.length; i++){
//         //         let x = pose.keypoints[i].position.x;
//         //         let y = pose.keypoints[i].position.y;
//         //         inputs.push(x);
//         //         inputs.push(y);
//         //     }
//         //     let target = [targetLabel]
//         //     brain.addData(inputs, target);
//         // }
//     }
// }

function modelLoaded () {
    console.log('poseNet ready');
}

function draw() {
    // image(video, 0, 0);

    // if (pose) {
    //     for (let i = 0; i < pose.keypoints.length; i++){
    //         let x = pose.keypoints[i].position.x;
    //         let y = pose.keypoints[i].position.y;
    //         fill (100, 99, 82);
    //         ellipse(x, y, 16, 16);
    //     }

    //     for (let i = 0; i < skeleton.length; i++){
    //         let a = skeleton[i][0]; //skeleton is a 2D array, the second dimension holds the 2 locations that are connected on the keypoint
    //         let b = skeleton[i][1];
    //         strokeWeight(2);
    //         stroke(255);
    //         line(a.position.x, a.position.y, b.position.x, b.position.y);
    //     }
    // }
}
