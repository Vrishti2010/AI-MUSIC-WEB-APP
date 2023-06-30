music1 = "";
music2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
music1_status = "";
music2_status = "";

function preload(){
music1 = loadSound("music.mp3");
music2 = loadSound("music2.mp3");
}

function setup(){
    canvas = createCanvas(400,400);
    canvas.center();
    canvas.position(570,250);
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, model_loaded);
    poseNet.on('pose', got_poses);
}

function draw(){
    image(video, 0,0,400,400);
    circle(leftWristX, leftWristY, 20);
    fill("red");
    stroke("black");
    music1_status = music1.isPlaying();
    music2_status = music2.isPlaying();

    if(scoreLeftWrist > 0.2){
        circle(leftWristX, leftWristY, 20);
        fill("red");
        stroke("black");
        music2.stop();
    
    if(music1 == false ){
        music1.play();
      document.getElementById("song_change").innerHTML = "Music 1 is playing" ; 
    }
    }

    if(scoreRightWrist > 0.2){
        circle(rightWristX, rightWristY, 20);
        fill("red");
        stroke("black");
        music1.stop();
    
    if(music2 == false ){
        music2.play();
      document.getElementById("song_change").innerHTML = "Music 2 is playing"  ;
    }
    }

}

function model_loaded(){
    console.log("Posenet is intialized");
}

function got_poses(results){
    if(results.length > 0){
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = "+ leftWristX + "leftWristY = "+ leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
 
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = "+scoreLeftWrist);
    }
}