PixiGame.SpaceMusicScene = function() {
  PIXI.Graphics.call(this);

  this._menu = PixiGame.BaseScene.menu(this);
  this._camera = null;
  this._world = null;

  this._player = {
    score: 0,
    health: 100,
    body: null,
    shape: null,
    graphics: null,
    size: 50,
    speed: 75,
    strafeSpeed: 100,
    turnSpeed: 3,
    weaponCooldown: 500,
    weaponAvailable: true,
    bullets: {
      collection: [],
      speed: 50,
      max: 1,
      size: 5
    }
  };

  this._enemies = {
    collection: [],
    speed: 75,
    size: 50,
    amount: 0,
    max: 10
  };

  this._planets = {
    planetCount: 20,
    size: 100
  };

  this._rhythmPlanet = {};

  this.setup();
};

PixiGame.SpaceMusicScene.constructor = PixiGame.SpaceMusicScene;
PixiGame.SpaceMusicScene.prototype = Object.create(PIXI.Graphics.prototype);

PixiGame.SpaceMusicScene.prototype.setup = function() {
  this.setupWorld();
  this.setupCamera();
  this.setupPlayer();
  this.setupPlanets();
};

PixiGame.SpaceMusicScene.prototype.setupCamera = function() {
  this._camera = new PIXI.Container();
  this.addChild(this._camera);
};

PixiGame.SpaceMusicScene.prototype.setupWorld = function() {
  this._world = new PIXI.Container();
  this.addChild(this._world);
};

PixiGame.SpaceMusicScene.prototype.playerFire = function() {
  var magnitude = this._player.speed * 1.5,
    angle = this._player.body.angle - Math.PI / 2;

  var bullet = {
    graphics: new PIXI.Graphics(),
    body: new p2.Body({
      mass: 0.1,
      damping: 0,
      angularDamping: 0
    }),
    active: false
  };

  // adjust physics
  bullet.body.velocity[0] += magnitude * Math.cos(angle) + this._player.body.velocity[0];
  bullet.body.velocity[1] += magnitude * Math.sin(angle) + this._player.body.velocity[1];
  bullet.body.position[0] = (this._player.size / 2) * Math.cos(angle) + this._player.graphics.x;
  bullet.body.position[1] = (this._player.size / 2) * Math.sin(angle) + this._player.graphics.y;
  // bullet.body.position[0] = 50;
  // bullet.body.position[1] = 50;


  // Create bullet shape
  var bulletShape = new p2.Circle({
    radius: this._player.bullets.size
  });
  // bulletShape.collisionGroup = BULLET;
  // bulletShape.collisionMask = ASTEROID;
  bullet.body.addShape(bulletShape);
  PixiGame.world.addBody(bullet.body);

  // Keep track of the last time we shot
  // lastShootTime = world.time;

  // Remember when we should delete this bullet
  // bulletBody.dieTime = world.time + bulletLifeTime;

  //graphics
  bullet.graphics.beginFill(0xFFFFFF);
  bullet.graphics.lineStyle(1, 0xFF0000);
  bullet.graphics.drawRect(0, 0, this._player.bullets.size, this._player.bullets.size);
  bullet.graphics.drawCircle(0, 0, this._player.bullets.size);
  bullet.graphics.endFill();
  this._camera.addChild(bullet.graphics);

  this._player.bullets.collection.push(bullet);
};

PixiGame.SpaceMusicScene.prototype.setupPlanets = function() {

  for (var i = 0; i < this._planets.planetCount; i++) {
    var r = Math.random();

    var x = Math.round(Math.random() * r * (PixiGame.width * 2));
    var y = Math.round(Math.random() * r * (PixiGame.height * 2));

    var planetPosition = [x, y];
    var planet = {
      body: new p2.Body({
        position: planetPosition,
        mass: 0.001,
        damping: 0,
        angularDamping: 0
      }),
      graphics: new PIXI.Container(),
      size: this._planets.size
    };

    var planetShape = new p2.Circle({
      radius: planet.size
    });
    planet.body.addShape(planetShape);
    PixiGame.world.addBody(planet.body);

    var planetGraphics = new PIXI.Graphics();
    planetGraphics.beginFill(0x7AE68A);
    planetGraphics.drawCircle(0, 0, planet.size);
    planetGraphics.endFill();
    planet.graphics.addChild(planetGraphics);
    planet.graphics.x = planetPosition[0];
    planet.graphics.y = planetPosition[1];
    this._world.addChild(planet.graphics);

    this._rhythmPlanet = planet;
  }
};

PixiGame.SpaceMusicScene.prototype.setupPlayerBullets = function() {

  var player = this._player;
  var bullets = this._player.bullets;
  var x = 300,
    y = 300;
  // var x = this._player.body.position[0];
  // var y = this._player.body.position[1];

  // create bullets
  for (var i = 0; i < bullets.max; i++) {

    //bodies
    bullets.bodies[i] = new p2.Body({
      mass: 1,
      angularVelocity: 0,
      damping: 0,
      angularDamping: 0,
      position: [x, y]
    });

    //shapes
    bullets.shapes[i] = new p2.Box({
      width: bullets.size,
      height: bullets.size
    });
    bullets.bodies[i].addShape(bullets.shapes[i]);
    PixiGame.world.addBody(bullets.bodies[i]);

    //graphics
    bullets.graphics[i] = new PIXI.Graphics();
    bullets.graphics[i].beginFill(0xFFFFFF);
    bullets.graphics[i].lineStyle(5, 0xFF0000);
    bullets.graphics[i].drawRect(x, y, bullets.size, bullets.size);
    bullets.graphics[i].endFill();

    this._world.addChild(bullets.graphics[i]);
  }
};

PixiGame.SpaceMusicScene.prototype.setupPlayer = function() {

  var player = this._player;

  // create player body
  player.body = new p2.Body({
    mass: 1,
    angularVelocity: 0,
    damping: 0,
    angularDamping: 0,
    position: [PixiGame.width / 2, PixiGame.height / 2]
  });

  player.shape = new p2.Box({
    width: player.size,
    height: player.size
  });
  player.body.addShape(player.shape);
  PixiGame.world.addBody(player.body);

  //draw player
  player.graphics = new PIXI.Container();

  var shipHull = new PIXI.Graphics();
  shipHull.beginFill(0xBAC6D6);
  // player.graphics.lineStyle(5, 0xFF0000);
  shipHull.moveTo(0, player.size);
  shipHull.lineTo(0, player.size * (2 / 3));
  shipHull.lineTo(player.size / 2, 0);
  shipHull.lineTo(player.size, player.size * (2 / 3));
  shipHull.lineTo(player.size, player.size);
  shipHull.lineTo(player.size * (2 / 3), player.size * (2 / 3));
  shipHull.lineTo(player.size * (1 / 3), player.size * (2 / 3));
  shipHull.endFill();

  player.graphics.addChildAt(shipHull, 0);

  var shipEngine = new PIXI.Graphics();
  shipEngine.beginFill(0xF7ED60);
  // player.graphics.lineStyle(5, 0xFF0000);
  shipEngine.moveTo(player.size * (1 / 3), player.size * (2 / 3));
  shipEngine.lineTo(player.size * (2 / 3), player.size * (2 / 3));
  shipEngine.lineTo(player.size * (1 / 2), player.size);
  shipEngine.endFill();
  shipEngine.alpha = 0;

  player.graphics.addChildAt(shipEngine, 1);

  var playerShield = new PIXI.Graphics();
  playerShield.beginFill(0xF7ED60);
  playerShield.drawCircle(player.size / 2, player.size / 2, player.size);
  playerShield.endFill();
  playerShield.alpha = 0.1;

  player.graphics.addChildAt(playerShield, 2);

  var hitShield = new PIXI.Graphics();
  hitShield.beginFill(0xCF4061);
  hitShield.drawCircle(player.size / 2, player.size / 2, player.size);
  hitShield.endFill();
  hitShield.alpha = 0.0;

  player.graphics.addChildAt(hitShield, 3);

  player.graphics.pivot.x = player.size / 2;
  player.graphics.pivot.y = player.size / 2;

  player.graphics.x = PixiGame.width / 2;
    player.graphics.y = PixiGame.height / 2;
    // this.addChild(player.graphics);
    // PixiGame.camera.addChild(player.graphics);
    this._camera.addChild(player.graphics);
};

PixiGame.SpaceMusicScene.prototype.update = function() {

  var player = this._player;
  var enemies = this._enemies.collection;
  var controls = PixiGame.controls.state();
  var playerEngine = player.graphics.getChildAt(1);
  var bullets = player.bullets.collection;

  //player fire
  if (controls.fire) {

    if(this._player.weaponAvailable){
      this._player.weaponAvailable = false;
      this.playerFire();
    }

    setTimeout(function(){
      this._player.weaponAvailable = true;
    }.bind(this), this._player.weaponCooldown);
  }

  var warp = function(body, x, y) {
    if (x < 0) {
      body.position[0] = PixiGame.width;
    } else if (x > PixiGame.width) {
      body.position[0] = 0;
    }

    if (y < 0) {
      body.position[1] = PixiGame.height;
      console.log('stage pos: ' + PixiGame.stage.position.x);
      // PixiGame.stage.position.x += 50;
    } else if (y > PixiGame.height) {
      body.position[1] = 0;
    }
  };

  // move bullets
  for (var j = 0; j < bullets.length; j++) {
    var bullet = bullets[j];
    bullet.graphics.x = bullet.body.position[0];
    bullet.graphics.y = bullet.body.position[1];
  }

  // move enemies
  for (var i = 0; i < enemies.length; i++) {
    var enemy = enemies[i];

    // move towards player
    var dx = Math.abs(enemy.body.position[0] - player.body.position[0]);
    var dy = Math.abs(enemy.body.position[1] - player.body.position[1]);
    var playerAngle = Math.atan(dy / dx);

    var enemyAngle = playerAngle + Math.PI / 2;
    // enemy.body.force[0] = this._enemies.speed * Math.cos(enemyAngle);
    // enemy.body.force[1] = this._enemies.speed * Math.sin(enemyAngle);

    enemy.graphics.x = enemy.body.position[0];
    enemy.graphics.y = enemy.body.position[1];

    // warp(enemy.body, enemy.body.position[0], enemy.body.position[1]);
  }

  // player angles
  if (controls.left) {
    player.body.angularVelocity = -1 * player.turnSpeed;
  } else if (controls.right) {
    player.body.angularVelocity = player.turnSpeed;
  } else {
    player.body.angularVelocity = 0;
  }

  // veloctiy
  if (controls.up) {
    var angle = player.body.angle + Math.PI / 2;
    // console.log('angle: ' + angle);
    player.body.force[0] += player.speed * Math.cos(angle);
    player.body.force[1] += player.speed * Math.sin(angle);
    playerEngine.alpha = 1;
  } else {
    playerEngine.alpha = 0;
  }

  var strafeAngle = player.body.angle + Math.PI;
  if (controls.strafeLeft) {
    player.body.force[0] -= player.strafeSpeed * Math.cos(strafeAngle);
    player.body.force[1] -= player.speed * Math.sin(strafeAngle);
  }

  if (controls.strafeRight) {
    player.body.force[0] += player.strafeSpeed * Math.cos(strafeAngle);
    player.body.force[1] += player.speed * Math.sin(strafeAngle);
  }

  // warp player on boundaries
  var x = player.body.position[0],
    y = player.body.position[1];
  // warp(player.body, x, y);

  //update graphics
  this._world.x = player.body.position[0];
  this._world.y = player.body.position[1];
  // player.graphics.x = player.body.position[0];
  // player.graphics.y = player.body.position[1];
  player.graphics.rotation = player.body.angle;

  // handle collision
  PixiGame.world.on('beginContact', function(e) {

    var containsBody = function(bodyCollection, idA, idB) {
      for (var i = 0; i < bodyCollection.length; i++) {
        if (bodyCollection[i].body.id === idA || bodyCollection[i].body.id === idB) {
          return true;
        }
      }
      return false;
    };

    var planet = this._rhythmPlanet;
    //if planet involved
    if (e.bodyB.id === planet.body.id || e.bodyA.id === planet.body.id) {
      //if player bullets were also involved
      if (containsBody(player.bullets.collection, e.bodyA.id, e.bodyB.id)) {
        planet.graphics.alpha = 0.1;
        PixiGame.Synth.playSong();
      }
    }
  }.bind(this));

  // PixiGame.world.on('endContact', function(e) {
  //
  //   //player
  //   if (e.bodyB.id === player.body.id || e.bodyA.id === player.body.id) {
  //     var hitShield = player.graphics.getChildAt(3);
  //     hitShield.alpha = 0;
  //   }
  // }.bind(this));
};

PixiGame.SpaceMusicScene.prototype.gameEnd = function(event) {
  PixiGame.sceneController.requestSceneChange(PixiGame.EndGameScene);
};

PixiGame.SpaceMusicScene.prototype.destroy = function() {
  this.removeChildren();
};
