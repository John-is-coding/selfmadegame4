var monkey, monkey_run_animation
var backgroundImg, bg
var ground
var rock1, rock2, rock3
var obstacle, obstacleGroup
var banana, bananaGroup, bananaImg
var score = 0
var monkeyEatingSound
function setup() {
  createCanvas(windowWidth,windowHeight);
  bg = createSprite(width/2,height/2)
  bg.addImage(backgroundImg)
  bg.scale = 7
  monkey = createSprite(300,width/4,50,50)
  monkey.addAnimation("running", monkey_run_animation)
  monkey.scale = 2
  //monkey.debug = true
  monkey.setCollider("circle",0,0,30)
  
  ground = createSprite(300,width/3,400,10)
  ground.visible = false
  obstacleGroup = new Group()
  bananaGroup = new Group()


}

function draw() 
{
  
  background("white");

  console.log(score)
  

  if (keyDown("space") && monkey.y > 445) {
    monkey.velocityY = -15
  }
  // gravity
  monkey.velocityY = monkey.velocityY + 0.5
  monkey.collide(ground)
  spawnRocks()
  // monkey go bye bye
  if (obstacleGroup.isTouching(monkey)) {
    monkey.destroy()
    monkeyEatingSound.play()
    swal({
      title: `gameover`,
      text: "Monkey died u lose",
      imageUrl:
      "assests/m5.png",
      imageSize: "100x100",
      confirmButtonText: "Ok"
    });
    //location.reload()
  }
  if (monkey.isTouching(bananaGroup)){
    score = score+1
    banana.destroy()
    monkeyEatingSound.play()
  }
  spawnBananas()
  drawSprites()



  textSize(25)
  fill("black")
  text("Score = " + score,100,100)
  



}

function preload() {
  monkey_run_animation = loadAnimation("assests/m1.png","assests/m2.png","assests/m3.png","assests/m4.png")
  backgroundImg = loadImage("assests/background.jpeg")
  rock1 = loadImage("assests/rock.jpeg")
  rock2 = loadImage("assests/rock2.jpeg")
  rock3 = loadImage("assests/rock3.jpeg")
  bananaImg = loadImage("assests/banana.png")
  monkeyEatingSound = loadSound("assests/monkey-128368.mp3")


}
function spawnRocks(){
  if (frameCount % 80 == 0) {
    obstacle = createSprite(width,height/1.5)
    obstacle.velocityX = -17
    obstacle.lifetime = width/17
    var randomNumber = Math.round(random(1,3))
    console.log(randomNumber)
    if (randomNumber == 1){
      obstacle.addImage(rock1)
      obstacle.scale = 0.85
    }
    if (randomNumber == 2){
      obstacle.addImage(rock2)
      obstacle.scale = 0.75
    }
    if (randomNumber == 3){
      obstacle.addImage(rock3)
      obstacle.scale = 0.70
    }
    obstacleGroup.add(obstacle)
  }
  

}
function spawnBananas(){
  if (frameCount % 120 == 0){
    var randomNumber2 = Math.round(random(125,height/2))
    banana = createSprite(width, randomNumber2)
    banana.velocityX = -13
    banana.addImage(bananaImg)
    banana.scale = 0.50
    banana.lifetime = width/13
    bananaGroup.add(banana)
  }
}