var Trex, Trexanim, edges, ground, groundimage, groundelevator,cloud,cloudimg,o1img,o2img,o3img,o4img,o5img,o6img,Score=0,TrexGameover,GameoverText,RestartImg,jumpSound,OOF,checkpoint,HS=0
var PLAY=0
var END=1
var gameState=PLAY
var cloudsGroup,obsGroup
var Restart,GOver
function preload() {
  Trexanim = loadAnimation("trex1.png",
    "trex3.png", "trex4.png")
  groundimage = loadImage("ground2.png")
  cloudimg = loadImage("cloud.png")
  o1img = loadImage("obstacle1.png")
  o2img = loadImage("obstacle2.png")
  o3img = loadImage("obstacle3.png")
  o4img = loadImage("obstacle4.png")
  o5img = loadImage("obstacle5.png")
  o6img = loadImage("obstacle6.png")
  TrexGameover =          loadImage("trex_collided.png")
  GameOverText = loadImage("gameOver.png")
  RestartImg = loadImage("restart.png")
  jumpSound = loadSound("jump.mp3")
  OOF = loadSound("die.mp3")
  checkpoint = loadSound("checkPoint.mp3")
  
}

function setup() {
  createCanvas(600, 200);
  Trex = createSprite(200, 170, 10, 10)
  Trex.addAnimation("T1", Trexanim)
  Trex.scale = 0.6
  Trex.x = 50
  //Trex.debug=true;
  Trex.setCollider("circle",-10,0,40)
  edges = createEdgeSprites()
  ground = createSprite(300, 185, 600, 10)
  ground.addImage("desert", groundimage)
  
  groundelevator = createSprite(300, 188, 600, 4)
  groundelevator.visible = false
  var r1=Math.round(random(1,3))
  cloudsGroup=createGroup();
  obsGroup=createGroup();
  GOver = createSprite(250,110,10,10)
    GOver.addImage("GameOver",GameOverText)
   Restart =createSprite(250,150,10,10)
    Restart.addImage("Loop",RestartImg)
    Restart.scale= 0.50
    GOver.scale = 0.60
  
}

function draw() {

  background("black");
 // console.log("Hello"+Math.round(random(1,6)))
  drawSprites()
  textSize(20)
  text(Score,500,50)
  text("HI  "+HS,400,50)
 // console.log(Trex.y)
  if(gameState===PLAY)
  {
    GOver.visible=false
    Restart.visible=false
    Score=Math.round(frameCount/4)
    ground.velocityX =-(10+3*Score/20)
     spawnObstacle();
  spawnClouds();
    if (Trex.y > 141 && keyDown("space")) {
    Trex.velocityY =-12
    jumpSound.play()
  }
    //if(Score%50===0&&Score>0)
    //{
    //ground.velocityX=ground.velocityX*3
   // }
  Trex.velocityY = Trex.velocityY + 0.8
  Trex.collide(groundelevator)
  if (ground.x < 0) {
    //ground.x=300
    ground.x = ground.width / 2
  }
    if(Trex.isTouching(obsGroup)) {
      gameState=END
      OOF.play()
    }
    if (Score>0&&Score%50===0){
      checkpoint.play()
    }
    if(frameCount===50)
    {
      background("white")
    }
  }
  else if(gameState===END)
  {
    GOver.visible=true
    Restart.visible=true
    ground.velocityX=0
    Trex.collide(groundelevator)
    obsGroup.setVelocityXEach(0)
    cloudsGroup.setVelocityXEach(0)
    cloudsGroup.setLifetimeEach(-1)
    obsGroup.setLifetimeEach(-1)
    Trex.velocityY=0
    Trex.addImage("T1",TrexGameover)
    
    
  }
if(mousePressedOver(Restart)&&gameState===END)
{
  reset();
}
  
  
 
}
function reset()
{
  gameState=PLAY;
  if(Score>=HS)
  {
  HS=Score;
  }
  Score=0;
  Trex.addAnimation("T1",Trexanim)
  obsGroup.destroyEach();
  cloudsGroup.destroyEach();
  cloudsGroup.setVelocityXEach(-(5+3*Score/20))
  frameCount=0;
}

function spawnClouds()
{
  if(frameCount%60===0){
 cloud = createSprite(600,100,10,10)
  cloud.velocityX = -(5+3*Score/20)
     cloud.lifetime=160
  cloud.addImage("cloud",cloudimg)
    cloud.y=random(30,130)
   // console.log(cloud.depth)
    Trex.depth=cloud.depth+1
    Restart.depth=cloud.depth+1
    cloudsGroup.add(cloud)
    GOver.depth=cloud.depth+1
  }
   
  
}





function spawnObstacle()
  {
    if(frameCount%120===0){
    var ob1 = createSprite(600,170,10,10)
    ob1.velocityX=-(10+3*Score/20)
      ob1.scale = 0.75
      var r2=Math.round(random(1,6))
      obsGroup.add(ob1)
      switch(r2){
        case 1: ob1.addImage("o1",o1img)
          break
        case 2: ob1.addImage("o2",o2img)
          break
        case 3: ob1.addImage("o3",o3img)
          break
        case 4: ob1.addImage("o4",o4img)
          break
        case 5: ob1.addImage("o5",o5img)
          break
        case 6: ob1.addImage("o6",o6img) 
          break
          default: break
      }     
    }
    
    
  }