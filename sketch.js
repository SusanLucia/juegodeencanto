var PLAY1=1;
var PLAY2=2;
var PLAY3=3;
var PLAY4=4;

var END=0;
var mirabel, mirabel_running, mirabel_collided;
var ground, invisibleGround, groundImage;
var pisoinvisible;
var alternativo;
var mariposaImage;
var obstaculos;
var obstaculo1;
var obstaculo2;
var obstaculo3;
var obstaculo4;
var obstaculo5;
var obstaculo6;
var numeros;
var puntaje=0;
var grupodeobstaculos;
var grupodemariposa;
var estadodejuego=PLAY1;
var gameover;
var restart;
var gameoverImg;
var restartImg;
var soundmirabel;
var soundbounce;
var soundpuntaje;
var Casita;
function preload() {
  mirabel_running = loadAnimation("mirabel1.png", "mirabel3.png", "mirabel4.png");
  mirabel_collided = loadImage("mirabel_collided.png");
  Casita = loadImage("Casita.jpg");
  groundImage = loadImage("ground2.png");
  
  mariposaImage = loadImage("mariposas.gif");
  
  obstaculo1 = loadImage("teja.png");
  obstaculo2 = loadImage("teja.png");
  obstaculo3 = loadImage("teja.png");
  obstaculo4 = loadImage("teja.png");
  obstaculo5 = loadImage("teja.png");
  obstaculo6 = loadImage("teja.png");
  
  gameoverImg = loadImage ("gameOver.png");
  restartImg = loadImage ("restart.png");
  soundmirabel = loadSound("jump.mp3");
  soundbounce = loadSound("die.mp3");
  soundpuntaje = loadSound("checkPoint.mp3");
  
}
function crearmariposa(){
  if (frameCount%50===0){
    
  
  mariposa = createSprite(600,100,20,50);
  mariposa.addImage(mariposaImage);
  mariposa.y = Math.round(random(20,100));
  mariposa.velocityX = -3;
  mariposa.lifetime = 210;
  mariposa.scale = 0.2;
  //console.log(nube.depth);
  mariposa.depth=mirabel.depth; 
  mirabel.depth=mirabel.depth+1;
  grupodemariposa.add(mariposa);
  }}
 function crearobstaculos(){
 if (frameCount%50===0){
 obstaculos = createSprite(610,windowHeight-80,2,80);
 obstaculos.velocityX=-(4+puntaje/100);
 numeros = Math.round(random(1,6));
 switch (numeros){
   case 1:obstaculos.addImage(obstaculo1);
   
   break;
   case 2:obstaculos.addImage(obstaculo2);
   
   break;
   case 3:obstaculos.addImage(obstaculo3);
  
   break;
   case 4:obstaculos.addImage(obstaculo4);
   
   break;
   case 5:obstaculos.addImage(obstaculo5);
  
   break;
   case 6:obstaculos.addImage(obstaculo6);
   
   break;
   default:break;    
   
 }
   obstaculos.scale = 0.07;     
   obstaculos.lifetime = 210;
   grupodeobstaculos.add(obstaculos);
  }
   
 }
 function setup() {
  createCanvas(500, 350);
  

  //crea el sprite del mirabel
  mirabel = createSprite(50,160,20,50);
  mirabel.addAnimation("running", mirabel_running);
  mirabel.addAnimation("mirabelcollide",mirabel_collided);
  mirabel.scale = 0.2;
  mirabel.debug = false;
   
  //crea el sprite del suelo
  ground = createSprite(200,windowHeight-20,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.visible = false;
  
  
  pisoinvisible = createSprite (200,windowHeight-80,400,10);
  pisoinvisible.visible = false;
  alternativo = Math.round(random(1,111));
   
  grupodeobstaculos=new Group();
  grupodemariposa=new Group();
  mirabel.setCollider("circle",0,0,40);
  //trex.setCollider("rectangle",0,0,130,trex.height);
   
  gameover = createSprite(300,100,100,40);
  gameover.addImage("gameover",gameoverImg);
  restart = createSprite(300,150,20,40);
  restart.addImage("restart",restartImg);
  gameover.scale = 0.5;
  restart.scale = 0.5;
}

function draw() {
  fill("red");
  text("puntaje: "+puntaje,10,40);
  background(140);
  //image(Casita,0,0);
  
  if(estadodejuego===PLAY1){
    text("puntaje: "+puntaje,10,40);
    background(140);
    image(Casita,0,0);
     ground.velocityX = -4;
     gameover.visible=false;
     restart.visible=false;
  //salta cuando se presiona la barra espaciadora
    if (keyDown("space")&& mirabel.y>=140) {       
      mirabel.velocityY = -10;
      soundmirabel.play();
    }
      mirabel.velocityY = mirabel.velocityY + 0.8;
      //Junta los pisos
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    crearmariposa();
    crearobstaculos();
    puntaje=puntaje+1//Math.round(getFrameRate()/70);
    console.log (puntaje);
    if (puntaje>0&&puntaje%100===0){
    soundpuntaje.play();
    }
    if(puntaje===700){
    estadodejuego=PLAY2;
    }
    if(grupodeobstaculos.isTouching(mirabel)){
    estadodejuego=END;   
    soundbounce.play();
      //trex.velocityY=-10;
      //soundtrex.play();
       } 
      }
      else if(estadodejuego===PLAY2){
      
      }
  else if(estadodejuego===END){
       gameover.visible=true;
       restart.visible=true;
       ground.velocityX = 0;   
       mirabel.velocityY = 0;
       mirabel.changeAnimation("mirabelcollide",mirabel_collided);
       grupodeobstaculos.setVelocityXEach(0);  
       grupodemariposa.setVelocityXEach(0); 
       grupodemariposa.setLifetimeEach(-1);
       grupodemariposa.setLifetimeEach(-1);
       if(mousePressedOver(restart)){
       console.log("funcionar");
       reset();
  }
       
          }
  //console.log(trex.depth);
 
  //Para trex no se caiga
  mirabel.collide(pisoinvisible);
  
  
  drawSprites();
  }
  function reset(){
  estadodejuego=PLAY1;
  restart.visible=false;
  gameover.visible=false;
  grupodeobstaculos.destroyEach();
  grupodemariposa.destroyEach();
  mirabel.changeAnimation("running", mirabel_running);  
  puntaje=0;
  }
