var ball, ballimage;
var ghost, ghostimge;
var goal, goalimage;
var grass, grassimage;
var cactus, cactus2, cactus3, cactusimage;
var playbutton, playbuttonimage;
var gameState = "SERVE";
var gameover,gameoverimage;
var score = 0;
var ballgroup;
var goalgroup;
var cactusgroup;
var ghostgroup;


function preload() {

  ballimage = loadImage("ball.png");
  ghostimage = loadImage("ghost-standing.png");
  goalimage = loadImage("goal.png");
  grassimage = loadImage("grass.jpg");
  cactusimage = loadImage("cactus.jpg");
  playbuttonimage = loadImage("playbutton.jpg")
  gameoverimage = loadImage("images.jpg");

}

function setup() {

  createCanvas(500, 700);

  ballgroup = new Group();
  goalgroup = new Group();
  cactusgroup = new Group();
  ghostgroup = new Group();



  grass = createSprite(250, 325);
  grass.addImage(grassimage);
  grass.velocityY = 2
  grass.scale = 2;

  ball = createSprite(250, 400);
  ball.addImage(ballimage);
  ball.scale = 0.025
  ballgroup.add(ball);

  cactus = createSprite(70, 690)
  cactus.addImage(cactusimage);
  cactus.scale = 0.18
  cactusgroup.add(cactus);

  cactus2 = createSprite(250, 690)
  cactus2.addImage(cactusimage);
  cactus2.scale = 0.18;
  cactusgroup.add(cactus2);

  cactus3 = createSprite(430, 690)
  cactus3.addImage(cactusimage);
  cactus3.scale = 0.18;
  cactusgroup.add(cactus3);



}

function draw() {
  background(174,55,55);

  console.log(grass.y);

  if (gameState === "SERVE") {
    grass.velocityY = 0;
    ball.velocityY = 0;
    playbutton = createSprite(250, 300);
    playbutton.addImage(playbuttonimage);
    playbutton.scale = 0.89;
  }

  if (mousePressedOver(playbutton)) {
    gameState = "PLAY"
  }

  if (gameState === "PLAY") {

    grass.velocityY = 2;

    if (frameCount % 200 === 0) {
      goal = createSprite(150, 150, 10, 10);
      goal.addImage(goalimage);
      goal.scale = 0.15;
      goal.velocityY = 2;
      goal.lifetime = 150;

      goal.x = Math.round(random(50, 500))
      goalgroup.add(goal);

    }

     if (frameCount % 200 === 0) {
      ghost = createSprite(150, 150, 10, 10);
      ghost.addImage(ghostimage);
      ghost.scale = 0.5;
      ghost.velocityY = 2;
      ghost.lifetime = 150;

      ghost.x = Math.round(random(50, 500))
      ghostgroup.add(ghost);

    }

    
    if (grass.y > 451) {
      grass.y = 250;
    }

    if (keyDown("space")) {
      ball.velocityY = -5;
    }

    if (keyDown("left")) {
      ball.velocityX = -5;
    }

    if (keyDown("right")) {
      ball.velocityX = 5;
    }


    if (keyDown("up")) {
      ball.velocityY = -5;
    }
    
    if(ballgroup.isTouching(goalgroup)){
      score = score+1;
      goalgroup.destroyEach();
    }
    
   // if(ghostgroup.isTouching(goalgroup)){
      //ghostgroup.destroyEach();
  //  }
    
    if(ballgroup.isTouching(cactusgroup)||ballgroup.isTouching(ghostgroup)){
      gameState = "END";
    }
    
    if(gameState === "END")
      {
        grass.destroy();
        cactusgroup.destroyEach();
        ballgroup.destroyEach();
        goalgroup.destroyEach();
        ghostgroup.destroyEach();
        gameover = createSprite(250,500,10,10);
        gameover.addImage(gameoverimage);
        
      }


    ball.velocityY = ball.velocityY + 0.5;


  }
  fill("yellow");
  textSize(50);
  text("GameOver..!",100,200);
  textSize(25);
  text("Well tryed.. Betterluck ! next time...",90,300)

  playbutton.lifetime = 0;
  drawSprites();
  fill("white");
  textSize(20);
  text("Score :" + score, 230, 30);




}