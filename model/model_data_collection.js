let video;
let poseNet;
let pose;
let skeleton;

let brain;
let targetLabel;

let state = 'waiting';

function keyPressed(){
    if(keyCode === 49){ // denotes 1
        targetLabel = 'Downward Dog';
    }
    else if(keyCode === 50){ // denotes 2
        targetLabel = 'Mountain';
    }
    else if(keyCode === 51){ // denotes 3
        targetLabel = 'Tree';
    }
    else if(keyCode === 52){ // denotes 4
        targetLabel = 'Goddess';
    }
    else if(keyCode === 53){ // denotes 5
        targetLabel = 'Warrior 2';
    }
    else if(keyCode === 83){ // denotes s
        brain.saveData();
    }

    //targetLabel = key;
    console.log(targetLabel);

    setTimeout(function() {
        console.log('collecting');
        state = 'collecting';
        setTimeout(function(){
            console.log('not collecting');
            state = 'waiting';
        }, 10000)
    }, 10000); // wait 10 second
}

function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);

    let options = {
        inputs: 34,
        outputs: 5,
        task: 'classification',
        debug: true
    }

    brain = ml5.neuralNetwork(options);
}

function calculate_angle(P1,P2,P3) {
    var angle = (
        Math.atan2(
            P3.position.y - P1.position.y,
            P3.position.x - P1.position.x
        )
        - Math.atan2(
            P2.position.y - P1.position.y,
            P2.position.x - P1.position.x
        )
    ) * (180 / Math.PI);
    return angle;
}

function gotPoses(poses) {
    console.log(poses);
    if (poses.length > 0) {
        pose = poses[0].pose;
        skeleton = poses[0].skeleton;

        if (state == 'collecting'){
            let inputs = [];

            // let x = pose.keypoints[i].position.x;
            // let y = pose.keypoints[i].position.y;
            // inputs.push(x);
            // inputs.push(y);

            // angle calculations to adjust for user lengths
            /*
                0: nose
                1: leftEye
                2: rightEye
                3: leftEar
                4: rightEar
                5: leftShoulder
                6: rightShoulder
                7: leftElbow
                8: rightElbow
                9: leftWrist
                10: rightWrist
                11: leftHip
                12: rightHip
                13: leftKnee
                14: rightKnee
                15: leftAnkle
                16: rightAnkle
            */

            // angle is denoted by angle(P1,P2,P3) where P1 is the 'origin'
            let lKnee_lAnkle_lHip = calculate_angle(pose.keypoints[13], pose.keypoints[15], pose.keypoints[11]);
            let rKnee_rAnkle_rHip = calculate_angle(pose.keypoints[14], pose.keypoints[16], pose.keypoints[12]);
            inputs.push(lKnee_lAnkle_lHip);
            inputs.push(rKnee_rAnkle_rHip);

            let lHip_lKnee_lShoulder = calculate_angle(pose.keypoints[11], pose.keypoints[13], pose.keypoints[5]);
            let rHip_rKnee_rShoulder = calculate_angle(pose.keypoints[12], pose.keypoints[14], pose.keypoints[6]);
            inputs.push(lHip_lKnee_lShoulder);
            inputs.push(rHip_rKnee_rShoulder);

            let lShoulder_lHip_lElbow = calculate_angle(pose.keypoints[5], pose.keypoints[11], pose.keypoints[7]);
            let rShoulder_rHip_rElbow = calculate_angle(pose.keypoints[6], pose.keypoints[12], pose.keypoints[8]);
            inputs.push(lShoulder_lHip_lElbow);
            inputs.push(rShoulder_rHip_rElbow);

            let lElbow_lShoulder_lWrist = calculate_angle(pose.keypoints[7], pose.keypoints[5], pose.keypoints[9]);
            let rElbow_rShoulder_rWrist = calculate_angle(pose.keypoints[8], pose.keypoints[6], pose.keypoints[10]);
            inputs.push(lElbow_lShoulder_lWrist);
            inputs.push(rElbow_rShoulder_rWrist);

            let lShoulder_lAnkle_lWrist = calculate_angle(pose.keypoints[5], pose.keypoints[15], pose.keypoints[9]);
            let rShoulder_rAnkle_rWrist = calculate_angle(pose.keypoints[6], pose.keypoints[16], pose.keypoints[10]);
            inputs.push(lShoulder_lAnkle_lWrist);
            inputs.push(rShoulder_rAnkle_rWrist);

            let lShoulder_lKnee_lWrist = calculate_angle(pose.keypoints[5], pose.keypoints[13], pose.keypoints[9]);
            let rShoulder_rKnee_rWrist = calculate_angle(pose.keypoints[6], pose.keypoints[14], pose.keypoints[10]);
            inputs.push(lShoulder_lKnee_lWrist);
            inputs.push(rShoulder_rKnee_rWrist);

            let lShoulder_lHip_lWrist = calculate_angle(pose.keypoints[5], pose.keypoints[11], pose.keypoints[9]);
            let rShoulder_rHip_rWrist = calculate_angle(pose.keypoints[6], pose.keypoints[12], pose.keypoints[10]);
            inputs.push(lShoulder_lHip_lWrist);
            inputs.push(rShoulder_rHip_rWrist);

            let target = [targetLabel]
            brain.addData(inputs, target);
        }
    }
}

function modelLoaded () {
    console.log('poseNet ready');
}

function draw() {
    image(video, 0, 0);

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