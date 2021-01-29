// use data collected from posenet
let model_1;
let target;

function setup() {

    let options = {
        //dataUrl: 'model/data.json',
        inputs: 34,
        outputs: ['Pose'],
        task: 'classification',
        debug: true
    }

    model_1 = ml5.neuralNetwork(options);
    model_1.load('model/data.json', dataLoaded);

}

function dataLoaded(){
    console.log('data loaded');
    try {
        model_1.normalizeData();
        trainModel();
    }
    catch(e){
        console.log("something wrong with my json data file")
    }
}

function trainModel(){
    const trainingOptions = {
        epochs: 32,
        batchSize: 12
    }
    model_1.train(trainingOptions, finishedTraining);
}

function finishedTraining(){
    console.log('model trained');
    model_1.save();
}

function draw() {

}

function handleResults(error, result){
    if(error){
        console.error(error);
        return;
    }
    console.log(result);
}