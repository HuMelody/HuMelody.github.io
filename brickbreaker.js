let x=300;
let y= 350;
let xvel=5;
let yvel=6;
let bricks=[];

function setup() {
  createCanvas(1000, 800);
  //makes the array of bricks
  for(let j=0; j<3; j++){
    for(let i=0; i<16; i++){

      bricks.push(new Brick(i*60+30,40+30*j));
      reset();

    }
  }
}

function draw() {
  background("black");
  fill(250);
  //make ball
ellipse(x, y, 40, 40);
//make ball move and bounce off the edges
 x=x+xvel;
  y=y+yvel;
  if (x+20>=width)
    {
      xvel=-xvel;
    }
    if (y-20<=0)
    {
     yvel=-yvel;
    }
  if (x-20<=0)
    {
     xvel=-xvel;
    }
    // if the x coordinate of the ball is to the greater than the x coordinate of the left side of the paddle and is less than the x coordinate of the right side of the paddle and the y coordinate of the ball+ the radius is greater than or equal to the y coordinate of the top of the paddle

     // check if the ball has hit the paddle
    if (x >= mouseX && x <= mouseX+100 && y +20>= height-40 && y+20<= height-30) {
        yvel = -yvel;
    }
    // check if ball fell out the bottom
    if (y >= height) {
        ballMoving = false;
        textSize(50);
        fill(250);
        text("GAME OVER", 350, height/2);
    }

//make paddle move
  rect(mouseX, height-40, 100, 10);

  // if ball touching brick then brick will be deleted from array. have to iterate backwards since if doing it foward
  //it would change positon and array will break
 for (let i = bricks.length - 1; i >= 0; i--) {

    if (bricks[i].isCollidingBall(x, y, 20)) {
      // This is JavaScript's awkward way of deleting a single item from an array.
      bricks.splice(i, 1);
      yvel= -yvel;
    }
  }
  // End of brick collision check

  for(let brick of bricks){
    brick.display();
  }
}
//make the brick
class Brick {
  constructor(x,y) {
    this.x=x;
    this.y=y;
    this.width=50;
    this.height = 20;
    this.color = "coral";
  }

  display() {
    fill(this.color);
    rect(this.x, this.y, this.width, this.height);
  }

  isCollidingBall(x, y, r) {
    return y - r <= this.y + this.height &&
           y + r >= this.y &&
           x + r >= this.x &&
           x - r <= this.x + this.width;
  }
}





function reset(){
    y = 300;
}

function mousePressed(){
    reset();
}

//need another rows of brick, make ball bounce off paddle as well as if is gameover it will restart.