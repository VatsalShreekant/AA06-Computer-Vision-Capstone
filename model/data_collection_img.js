var input; 
let img; 
let pose;
let skeleton;
let poseNet;
let json = {};
let sample = 0;
let img_ctr = -1;
let img_num = 0;
let image_list = [];
// let label;

// let brain;

function setup() {
  createCanvas(640, 480);

  // here you pass how many images of a specific class you have
  //create_imageList(173);

  input = createFileInput(handleFile); 
  input.position(640, 240); 

  poseNet = ml5.poseNet(onloaded);
  poseNet.on("pose", getposes);

  // let options = {
  //   inputs: 34,
  //   outputs: 5,
  //   task: 'classification',
  //   debug: true
  // }

  // brain = ml5.neuralNetwork(options);

  // call for the first image here
  //openImage(image_list[img_num]);
}

/*
function create_imageList(num_images){
  for (var i = 0; i < num_images; i++){
    image_name = i.toString() + '.jpg';
    image_list.push(image_name);
  }
}
*/

function handleFile(file) { 
    print(file); 
    if (file.type === 'image') { 
      img = createImg(file.data, imageReady); 
      img.size(640, 480);
      img.hide(); 
      img_ctr++;
      console.log(img_ctr);
    } 
}

/*
function openImage(image_path) {
  // will need to change the path below for obtaining other data
  img = createImg(["yoga-dataset/training/downwarddog-2/"] + image_path, "", imageReady);

  img.size(width, height);
  img.hide();
  img_ctr++;
  img_num++;
  console.log(img_ctr);
}
*/

function imageReady(){
    console.log('image ready');
}

function onloaded(){
  console.log("model is loaded");
}

function getposes(poses){
  if(poses.length > 0){
    pose = poses[0];
    skeleton = poses[0].skeleton;
  }
}

function draw() {
  background(220);
  if (img) { 
    poseNet.singlePose(img);
    image(img, 0, 0); 
    if(pose){
      let input_points = [];
      for (var i = 0; i < 17; i++){
        var x = pose.pose.keypoints[i].position.x;
        var y = pose.pose.keypoints[i].position.y;
        input_points.push(x);
        input_points.push(y);
        ellipse(x,y,12,12);
      }
      json[img_ctr] = input_points;
      // let target_label = [label];
      // brain.addData(input_points, target_label);
    }
  }
  //openImage(image_list[img_num]);
}

// just change the label here for reference
function keyPressed(){
  saveJSON(json, 'downwarddog' + '_data.json');
    // if(keyCode === 97){
    //   label = 'Downward Dog';
    // }
    // if(keyCode === 98){
    //   label = 'Mountain';
    // }
    // if(keyCode === 99){
    //   label = 'Tree';
    // }
    // if(keyCode === 100){
    //   label = 'Goddess';
    // }
    // if(keyCode === 101){
    //   label = 'Warrior2'
    // }
    // if(keyCode === 83){
    //   brain.saveData();
    // }
    // console.log(label);
}