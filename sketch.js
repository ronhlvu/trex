var play=1,end=0;
var gm_st=play;
var die,jump,chpo;
var ob_cac;
var trex, trex_running, trex_collided ,cac,rgob,o1,o2,o3,o4,o5,o6;
var ground, invisibleGround, groundImage,stcad;

var cloud, clouds, cloudImage;



var newImage,resta,gm_ov,rert,gr;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_co = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  jump=loadSound("jump.mp3")
  chpo=loadSound("checkPoint.mp3")
  die=loadSound("die.mp3")
  cloudImage = loadImage("cloud.png")
 o1=loadImage("obstacle1.png")
 o2=loadImage("obstacle2.png")
 o3=loadImage("obstacle3.png")
 o4=loadImage("obstacle4.png")
 o5=loadImage("obstacle5.png")
 o6=loadImage("obstacle6.png")
resta=loadImage("restart.png")
gm_ov=loadImage("gameOver.png")
}

function setup() {
  createCanvas(600, 200);
stcad=0
 gr=createSprite(300,70,1,1)
 gr.addImage("gr",gm_ov) 
gr.scale=0.7
  
  
  rert=createSprite(300,110,1,1)
  rert.addImage("rert",resta)
  rert.scale=0.5
  
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
   trex.addAnimation("collided",trex_co)
  trex.scale = 0.4;
 // trex.debug=true
  trex.setCollider("circle",0,0,40)
  
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
 
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  ob_cac=new Group();
  clouds=new Group();
  console.log("Hello"+5+"what")
  console.log(3+5)

}

  
function draw() {
  background(180);
  text("score="+stcad,500,30);
  if(gm_st===play){
    stcad=stcad+Math.round(getFrameRate()/50);
      ground.velocityX = -(4+2*stcad/100);
    gr.visible=false
    rert.visible=false
    if(stcad%100===0&&stcad>0){
      chpo.play();
    }
    if(keyDown("space")&& trex.y >= 150) {
    trex.velocityY = -13
    jump.play(); 
    }
    
    trex.velocityY = trex.velocityY + 1
 if (ground.x < 0){
    ground.x = ground.width/2; 
  }
   spawnClouds();
  sp_ob();
if(ob_cac.isTouching(trex)){
 //trex.velocityY=-13
  gm_st=end
  die.play();
}
  }
  else if(gm_st===end){
    ground.velocityX = 0;
  trex.velocityY = 0
    clouds.setVelocityXEach(0)
    ob_cac.setVelocityXEach(0)
    clouds.setLifetimeEach(-1)
    ob_cac.setLifetimeEach(-1)
    trex.changeAnimation("collided",trex_co)
    gr.visible=true
    rert.visible=true
    if(mousePressedOver(rert)){
    reset()
  }
  }
  console.log(getFrameRate())
 
  
  
  trex.collide(invisibleGround);
  
  //spawn the clouds
 
    drawSprites();
  
  
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.4;
    cloud.velocityX = -3;
    
    
    //assigning lifetime to the variable
    cloud.lifetime = 200
    
    //adjust the depth
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
    clouds.add(cloud)
    }
}
function sp_ob (){
  
  if (frameCount%60===0){ 
      cac=createSprite(600,160,20,30) 
  cac.velocityX=-(9+stcad/100) 
    cac.scale     =0.5
    
    rgob=Math.round(random(1,6))

    switch(rgob){
      case 1:cac.addImage(o1);
        break;
         case 2:cac.addImage(o2);
        break;
         case 3:cac.addImage(o3);
        break;
         case 4:cac.addImage(o4);
        break;
         case 5:cac.addImage(o5);
        break;
         case 6:cac.addImage(o6); 
        break;
        default:break;
      }
    cac.lifetime=120
  ob_cac.add(cac)
  } 
  
}

function reset(){
  gm_st=play
  score=0
  rert.visible=false
  gr.visible=false
  trex.changeAnimation("running", trex_running)
ob_cac.destroyEach()
  clouds.destroyEach()
}