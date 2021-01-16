// script to detect pose on video file

let pose;
let skeleton;
let poseNet_dd, poseNet_mtn, poseNet_tree, poseNet_w1, poseNet_w2;
let video_dd, video_mtn, video_tree, video_w1, video_w2;
let state = "stay";
let s = "start";
let json = {};
let sample = 0;
let label;
let current = 0;
let labels = ["downwarddog", "mountain", "tree", "warrior1", "warrior2"];

function setup() {
    createCanvas(640, 480);
    // create 5 different videos objects for 5 diff yoga class poses in ur directory

    // downward dog
    video_dd = createVideo(["yoga-dataset/training-vid/" + ""], video_loaded);
    video_dd.hide();

    /* uncomment this for other testing

    // mountain
    video_mtn = createVideo("path");
    video_mtn.hide();

    // tree
    video_tree = createVideo("path");
    video_tree.hide();

    // warrior1
    video_w1 = createVideo("path");
    video_w1.hide();

    // warrior2
    video_w2 = createVideo("path");
    video_w2.hide();

    */

    // poseNet models for the diff poses

    // downward dog
    poseNet_dd = ml5.poseNet(video_dd, onloaded);

    /*

    // mtn
    poseNet_mtn = ml5.poseNet(video_mtn, onloaded);

    // tree
    poseNet_tree = ml5.poseNet(video_tree, onloaded);

    // warrior1
    poseNet_w1 = ml5.poseNet(video_w1, onloaded);

    // warrior2
    poseNet_w2 = ml5.poseNet(video_w2, onloaded);

    */

    // start with downward dog pos
    poseNet_dd.on("pose", getposes);

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
    video_dd.loop(); //set video to loop and start playing
}

function draw(){
	if(label == labels[0]){
	    image(video_dd, 0, 0);
	}
	else if(label == labels[1]){
	    image(video_mtn, 0, 0);		
	}
	else if(label == labels[2]){
	    image(video_tree, 0, 0);		
    }
    else if(label == labels[3]){
        image(video_w1, 0, 0);
    }
    else if(label == labels[4]){
        image(video_w2, 0, 0);
    }
		
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

        /*
        if((sample == 400) && (label == labels[current])){
            console.log("stop collecting for this pose");
            current = current + 1;
			delete(poseNet_dd);
			delete(video_dd);
			state ='stop';
            saveJSON(json, label + '_data.json');
            // clear for next sequence of data
            json = {};
        }
        */
        
		if(sample == 500 && label == labels[current]){
            console.log("stop collecting for this pose");
            current = current + 1;
			label = labels[current];
			video_dd.pause();
			delete(poseNet_dd);
			delete(video_dd);
			video_mtn.loop();
			state ='stop';
			poseNet_mtn.on("pose",getposes);
        }
        
		if(sample == 1000 && label == labels[current]){
            console.log("stop collecting for this pose");
            current = current + 1;
			label = labels[current];
			video_mtn.pause();
			delete(poseNet_mtn);
			delete(video_mtn);
			state =' stop';
			video_tree.loop();
			poseNet_tree.on("pose",getposes);
        }

        if(sample == 1500 && label == labels[current]){
            console.log("stop collecting for this pose");
			current = current + 1;
			label = labels[current];
			video_tree.pause();
			delete(poseNet_tree);
			delete(video_tree);
			state = 'stop';
			video_w1.loop();
			poseNet_w1.on("pose",getposes);
        }

        if(sample == 2000 && label == labels[current]){
            console.log("stop collecting for this pose");
			current = current + 1;
			label = labels[current];
			video_w1.pause();
			delete(poseNet_w1);
			delete(video_w1);
			state = 'stop';
			video_w2.loop();
			poseNet_w2.on("pose",getposes);
        }

		if(sample == 2500 && label == labels[current]){
            console.log("stop collecting for this pose");
			delete(poseNet_w2);
			delete(video_w2);
			state = 'stop';
			saveJSON(json,'data.json');
        }	
	}
}