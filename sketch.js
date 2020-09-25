
let monkey , monkey_running;
let banana ,bananaImage, obstacle, obstacleImage;
let FoodGroup, obstacleGroup;
let score;
let ground,groundImage;
let PLAY = 1;
let END = 0;
let gameState = PLAY;
let gameOverImage;
let survivalTime=0;
let highScore;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  groundImage = loadImage("download-1.png");
  gameOverImage = loadAnimation("gameOver.png");
 
}



function setup() {
  createCanvas(600,500);
  
  

 
  
 ground = createSprite(50,488,790,40); 
 ground.shapeColor="green"; 
  //ground.scale=1;
  ground.x=ground.width / 2;
 
  //ground.addImage(groundImage);
  
  
 //ground.addImage(groundImage);
  //ground.scale.width=2500;
 //ground 
  
   monkey = createSprite(50,445,20,20);
 monkey.addAnimation("sprite_0.png",monkey_running); 
 monkey.scale=0.1; 
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
  
  score=0;
  highScore=0;
  
  
  
  
}
// 50,170

function draw() {
  background(100);
  
  if(gameState == PLAY){
    
    ground.velocityX=-(5+(survivalTime/5));
    monkey.velocityY=monkey.velocityY+0.8;
    
     if(keyDown("space") && monkey.y  > 400){
    monkey.velocityY=-14;
  }
    
    if(ground.x<200){
    ground.x=ground.width / 2;
  }
    
  food();
  obstacles();
    
    
    fill("white");
    stroke("white");
    strokeWeight(1.5);
    
    survivalTime = Math.ceil(frameCount/frameRate());
  text("SURVIVAL TIME: " + survivalTime,260,50);
    // 50,44
    text("HIGH SCORE: " + highScore,50,50);
    
   if(monkey.isTouching(FoodGroup)){
    score=score+1;
    FoodGroup.destroyEach();
  } 
    
    
    if(score > highScore){
      highScore=score;
    }
    
    if(monkey.isTouching(obstacleGroup)){
      
      gameState=END;
    }
    
  }
  
  if(gameState == END){
    
    ground.velocityX=0;
    
    FoodGroup.velocityX=0;
    FoodGroup.destroyEach();
    
    obstacleGroup.velocityX=0;
    obstacleGroup.destroyEach();
    
    monkey.visible=false;
    
    fill("white");
    stroke("white");
    strokeWeight(2);
    
    frameRate();
    frameCount=0;
    survivalTime=0;
    
    text("YOU LOSE",210,280);
    text("PRESS SPACE KEY TO RESTART",170,315);
    
    
    
  }
  createEdgeSprites();
  monkey.collide(ground);
  
  if(keyDown("space") && gameState == END){
    gameState = PLAY;
    score=0;
    
    monkey.visible=true;
  }

  
  

  drawSprites();
 
  
  stroke("white");
  fill("white");
  strokeWeight(1.5);
  text("SCORE: " + score,450,50);
  
  
  

  
}

function food(){
  if(World.frameCount % 80 ==0){
    banana = createSprite(600,380,20,20);
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.velocityX=-(4*(survivalTime/2));
    banana.lifetime=120;
    FoodGroup.add(banana);
    //banana.debug=true;
    banana.setCollider("rectangle",0,0,500,300);
    return banana;
    
  }
}

function obstacles(){
  if(World.frameCount % 300 == 0){
    obstacle = createSprite(600,434,20,20);
    obstacle.addImage( obstaceImage);
    obstacle.scale=0.2;
    obstacle.velocityX=-(3*(survivalTime/2));
    obstacle.lifetime=120;
    //obstacle.debug=true;
    obstacle.setCollider("circle",0,0,200);
    
    obstacleGroup.add(obstacle);
  }
}






