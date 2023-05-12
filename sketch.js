var fish, fishIMG, shark, sharkIMG
var coral, coralIMG, seaweed, seaweedIMG, turtle, turtleIMG
var turtles, corals, seaweeds
var underwater, underwaterIMG
var animal1, animal1PIC, animal2, animal2PIC, animal, animals
var animal3, animal3PIC, animal4, animal4PIC
var gameState = "play"
var gameOver, gameOverIMG, restart, restartButton
var score=0

function preload(){
fishIMG=loadImage("fish escaping.png")
sharkIMG=loadImage("shark.png")
coralIMG=loadImage("coral.png")
seaweedIMG=loadImage("grass.png")
turtleIMG=loadImage("fish eater.png")
underwaterIMG=loadImage("underwater.png")
animal1PIC=loadImage("animal1.png")
animal2PIC=loadImage("animal2.png")
animal3PIC=loadImage("animal3.png")
animal4PIC=loadImage("animal4.png")
restartButton=loadImage("restart.png")
gameOverIMG=loadImage("game over.png")
}

function setup() {
createCanvas(800,300)
underwater=createSprite(670,-110,3,3)
underwater.addImage("bg", underwaterIMG)
underwater.scale=1.3
shark=createSprite(90,6,30,30)
shark.addImage("shark", sharkIMG)
shark.scale=0.09


gameOver=createSprite(400,130,20,20)
gameOver.addImage("you lost", gameOverIMG)
gameOver.scale=0.25


restart=createSprite(400,195,50,50)
restart.addImage("restart", restartButton)
restart.scale=0.1

fish=createSprite(240,210,40,40)
fish.addImage("fish", fishIMG)
fish.scale=0.04


turtles= new Group()
seaweeds= new Group()
corals= new Group()
animals= new Group()


}

function draw() {
 background("skyBlue")
 shark.y=fish.y


if (gameState=="play"){
    restart.visible=false
    gameOver.visible=false
    shark.x=90
 if(keyDown("up")){
    fish.y=fish.y-6
 }
 if(keyDown("down")){
    fish.y=fish.y+6
 }
 if(underwater.x<140){
    underwater.x=620
 }
 if(shark.y>263){
    shark.y=263
 }
 if(fish.y>286){
    fish.y=286
 }
 if(fish.y<14){
    fish.y=14
 }
 if(shark.y<46){
    shark.y=46
 }
 spawnTurtles()
 spawnCorals()
 spawnAnimals()
 spawnSeaweeds()



 underwater.velocityX=-4


}
else if (gameState=="end"){

youLost()

 }

console.log(score)

 if (fish.isTouching (turtles)|| fish.isTouching (corals)|| fish.isTouching(seaweeds)){
    gameState = "end"
 }

 if(mousePressedOver(restart)){
    reset()
  }

  underwater.depth=1
    drawSprites()
    score = score + Math.round(getFrameRate()/60);
    fill("black")
     text ("score"+ score, 700, 10)
}





function spawnTurtles(){
    var randomm = Math.round(random(80,250))
    if(frameCount%50==0){
      turtle=createSprite(820,randomm,20,20)
      turtle.setCollider("rectangle",0,0,250,300)
      turtle.addImage("turtle", turtleIMG)
      turtle.scale=0.25
      turtle.velocityX=-25
      turtle.lifetime=250
      turtles.add(turtle)
      
    }
    }

    function spawnCorals(){
        var rand = (random(0.15,0.23))
        if(frameCount%80==0){
          coral=createSprite(820,253,20,20)
          coral.setCollider("circle",0,0,250)
          coral.addImage("coral", coralIMG)
          coral.depth=10
          coral.scale=rand
          coral.velocityX=-4
          coral.lifetime=250
          corals.add(coral)
          
        }
        }

        function spawnAnimals(){
            var ran= Math.round(random(1,4))
            var ra= Math.round(random(20,250))
            if(frameCount%30==0){
              animal=createSprite(820,ra,10,10)
              animal.scale=0.02
              animal.velocityX=-5
              animal.lifetime=250
              animal.depth=1
              animals.add(animal)
                switch(ran){
              case 1: animal.addImage(animal1PIC);
                      break;
              case 2: animal.addImage(animal2PIC);
                      break;
              case 3: animal.addImage(animal3PIC);
                      break;
              case 4: animal.addImage(animal4PIC);
              animal.scale=0.07
                      break;
            }
            }
          }

          function spawnSeaweeds(){
            if(frameCount%235==0){
              seaweed=createSprite(820,213,20,20)
              seaweed.setCollider("obb",0,0,230, 330)
              seaweed.addImage("grass", seaweedIMG)
              seaweed.scale=0.45
              seaweed.velocityX=-4
              seaweed.lifetime=250
              seaweeds.add(seaweed)
              seaweed.depth=9
            }
            }


            
function youLost(){
  underwater.velocityX=0
  corals.setVelocityXEach(0)
  seaweeds.setVelocityXEach(0)
  turtles.setVelocityXEach(0)
  animals.setVelocityXEach(0)
  animals.setLifetimeEach(-1)
  corals.setLifetimeEach(-1)
  seaweeds.setLifetimeEach(-1)
  turtles.setLifetimeEach(-1)
  restart.visible=true
  gameOver.visible=true
  shark.x=shark.x+3
  if(shark.x>250){
    shark.x=250
  }
  shark.depth=shark.depth+2
  gameOver.depth=turtle.depth
  gameOver.depth=shark.depth+2
}


function reset(){
    gameState = "play"
    score=0
    corals.destroyEach()
    seaweeds.destroyEach()
    animals.destroyEach()
    turtles.destroyEach()
  
  }