window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  let canvas = document.getElementById('my-canvas');
  let ctx = canvas.getContext('2d');
  
  let birdImg = new Image();
  birdImg.src = 'images/flappy.png';

  let objImg = new Image();
  objImg.src = 'images/obstacle_top.png';
    
    
    
  class Component{
  
    constructor(img,width,height,speedX,speedY, gravitySpeed) {

      this.width = width;
      this.height = height;
      this.speedX = speedX;
      this.speedY = speedY;
      this.gravity = 1;
      this.gravitySpeed = gravitySpeed;
      this.x = canvas.width / 3;
      this.y = canvas.height / 2;
      this.img = img;
    }

    update() {

      ctx.drawImage(this.img,this.x,this.y,this.width,this.height)
      
    }

    newPos() {
      
      this.y += this.speedY * this.gravity;
      console.log(this.y);

    }



  }
  
  let player = new Component(birdImg, 20, 20, 0, 0.5, 0);
  let obj = [];
  let frames = [];

  function startGame() {

    window.requestAnimationFrame(updateGame);

  }

  function clear() {
    
    ctx.clearRect(0,0,600,400);
  }


  function updateGame() {
    clear();
    player.newPos();
    player.update();
    window.requestAnimationFrame(updateGame);

  }


  function updateObstacles() {
    
    frames += 1;

    if (frames % 120 === 0) {
      
      let minHeight = 0;
      let maxHeight = 280;
      let randomHeight = Math.floor(Math.random() * (maxHeight + 1) + minHeight);
      let minGap = 50;
      let maxGap = 200;
      let gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
      obj.push(new Component(10,randomHeight, 1, 0, 0, objImg));
      obj.push(new Component(10, canvas.width - randomHeight - gap, 1, 0, 0, objImg));
    }


  }

  window.addEventListener('keydown', (event) => {

    if (event.keycode === 32) {

      player.gravity = -50;
      event.preventDefault();
      
    }
    
  })

  window.addEventListener('keyup', (event) => {

    if (event.keycode === 32) {

      player.gravity = 10;
      event.preventDefault();

    }
    
  })


};
