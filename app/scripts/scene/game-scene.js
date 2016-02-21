PixiGame.GameScene = function() {
  PIXI.Graphics.call(this);

  this._player = {
    body : null,
    shape : null,
    graphics : null,
    size : 50,
    speed : 100,
    turnSpeed : 2
  };

  this.setup();
};

PixiGame.GameScene.constructor = PixiGame.GameScene;
PixiGame.GameScene.prototype = Object.create(PIXI.Graphics.prototype);

PixiGame.GameScene.prototype.setup = function() {

  var player = this._player;

  // create player body
  player.body = new p2.Body({
    mass: 1,
    angularVelocity: 0,
    damping: 0,
    angularDamping: 0,
    position: [PixiGame.width/2, PixiGame.height/2]
  });

  player.shape = new p2.Box({ width: player.size, height: player.size });
  player.body.addShape(player.shape);
  PixiGame.world.addBody(player.body);

  //draw player
  player.graphics = new PIXI.Container();

  var shipHull = new PIXI.Graphics();
  shipHull.beginFill(0xBAC6D6);
  // player.graphics.lineStyle(5, 0xFF0000);
  shipHull.moveTo(0,player.size);
  shipHull.lineTo(0, player.size * (2 / 3));
  shipHull.lineTo(player.size / 2, 0);
  shipHull.lineTo(player.size, player.size * (2 / 3));
  shipHull.lineTo(player.size,player.size);
  shipHull.lineTo(player.size * (2 / 3),player.size * (2 / 3));
  shipHull.lineTo(player.size * (1 / 3),player.size * (2 / 3));
  shipHull.endFill();

  player.graphics.addChildAt(shipHull, 0);

  var shipEngine = new PIXI.Graphics();
  shipEngine.beginFill(0xF7ED60);
  // player.graphics.lineStyle(5, 0xFF0000);
  shipEngine.moveTo(player.size * (1 / 3), player.size * (2 / 3));
  shipEngine.lineTo(player.size * (2 / 3), player.size * (2 / 3));
  shipEngine.lineTo(player.size * (1 / 2), player.size );
  shipEngine.endFill();
  shipEngine.alpha = 0;

  player.graphics.addChildAt(shipEngine, 1);

  player.graphics.pivot.x = player.size / 2;
  player.graphics.pivot.y = player.size / 2;
  this.addChild(player.graphics);
};

PixiGame.GameScene.prototype.update = function() {

  var player = this._player;
  var controls = 	PixiGame.controls.state();
  var playerEngine = player.graphics.getChildAt(1);


  // angles
  if(controls.left){
    player.body.angularVelocity = -1 * player.turnSpeed;
  } else if(controls.right){
    player.body.angularVelocity = player.turnSpeed;
  } else {
    player.body.angularVelocity = 0;
  }

  // veloctiy
  if(controls.up){
    var angle = player.body.angle + Math.PI / 2;
    // console.log('angle: ' + angle);
    player.body.force[0] -= player.speed * Math.cos(angle);
    player.body.force[1] -= player.speed * Math.sin(angle);
    playerEngine.alpha = 1;
  } else {
    playerEngine.alpha = 0;
  }

  // test for boundaries
  var x = player.body.position[0], y = player.body.position[1];
  if(x < 0){
    player.body.position[0] = PixiGame.width;
  } else if (x > PixiGame.width){
    player.body.position[0] = 0;
  }

  if(y < 0){
    player.body.position[1] = PixiGame.height;
  } else if (y > PixiGame.height){
    player.body.position[1] = 0;
  }

  //update graphics
  player.graphics.x = player.body.position[0];
  player.graphics.y = player.body.position[1];
  player.graphics.rotation = player.body.angle;

  console.log('player.x: ' + player.body.position[0]);
  console.log('player.y: ' + player.body.position[1]);
};

PixiGame.GameScene.prototype.destroy = function() {
  this.removeChildren();
};
