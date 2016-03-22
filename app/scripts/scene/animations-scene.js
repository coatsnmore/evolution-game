PixiGame.AnimationsScene = function() {
  PIXI.Graphics.call(this);

  this._menu = PixiGame.BaseScene.menu(this);

  this._box = {};
  this._laser = {};

  //do this last
  this.setup();
};

PixiGame.AnimationsScene.constructor = PixiGame.AnimationsScene;
PixiGame.AnimationsScene.prototype = Object.create(PIXI.Graphics.prototype);

PixiGame.AnimationsScene.prototype.setup = function() {
  this._box = this.box();
  this._laser = this.laser();
  this.controls();
};

PixiGame.AnimationsScene.prototype.controls = function() {

  var menuWidth = PixiGame.width / 5;
  var optionSizeY = 40;
  var options = [{
    text: 'Box Twitch',
    action: this._box.twitch
  }, {
    text: 'Box Right',
    action: this._box.moveRight
  }, {
    text: 'Box Left',
    action: this._box.moveLeft
  }, {
    text: 'Laser Right',
    action: this._laser.moveRight
  }, {
    text: 'Laser Left',
    action: this._laser.moveLeft
  }, {
    text: 'Play Song',
    action: PixiGame.Synth.playSong
  }];

  var optionsContainer = new PIXI.Container();
  for (var oi = 0; oi < options.length; oi++) {
    var option = Utils.OptionFactory.createOption(options[oi], oi, optionSizeY, menuWidth, 'menu');
    optionsContainer.addChild(option);
  }

  // position menu
  optionsContainer.x = 0;
  optionsContainer.y = 0;
  this.addChild(optionsContainer);
};

PixiGame.AnimationsScene.prototype.box = function() {
  var box = new PIXI.Container();
  // this._box = box;

  var boxMain = new PIXI.Graphics();
  boxMain.beginFill(0xE34242);
  boxMain.lineStyle(1, 0xE34242);
  boxMain.drawRect(0, 0, 50, 50);
  boxMain.endFill();
  boxMain.x = 0;
  boxMain.y = 0;
  box.addChild(boxMain);

  box.x = PixiGame.width / 2;
  box.y = PixiGame.height / 2;

  this.addChild(box);
  // this._box = box;

  box.moveRight = function() {
    var coords = {
      x: box.x,
      y: box.y
    };
    var tween = new TWEEN.Tween(coords)
      .to({
        x: coords.x + 100,
        y: coords.y
      }, 100)
      .onUpdate(function() {
        box.x = this.x;
        box.y = this.y;
      })
      .start();
  };

  box.moveLeft = function() {
    var coords = {
      x: box.x,
      y: box.y
    };
    var tween = new TWEEN.Tween(coords)
      .to({
        x: coords.x - 100,
        y: coords.y
      }, 100)
      .onUpdate(function() {
        box.x = this.x;
        box.y = this.y;
      })
      .start();
  };

  box.twitch = function() {
    var coords = {
      x: box.x,
      y: box.y
    };
    var tweenRight = new TWEEN.Tween(coords)
      .to({
        x: coords.x + 10,
        y: coords.y
      }, 300)
      .onUpdate(function() {
        box.x = this.x;
        box.y = this.y;
      });
    var tweenLeft = new TWEEN.Tween(coords)
      .to({
        x: coords.x - 10,
        y: coords.y
      }, 300)
      .onUpdate(function() {
        box.x = this.x;
        box.y = this.y;
      });

      tweenRight.chain(tweenLeft);
      tweenLeft.chain(tweenRight);
      tweenRight.start();
  };

  return box;
};

PixiGame.AnimationsScene.prototype.laser = function() {
  var laser = new PIXI.Container();
  // this._box = box;

  var laserMain = new PIXI.Graphics();
  laserMain.beginFill(0x3C8025);
  laserMain.lineStyle(1, 0x3C8025);
  laserMain.drawRect(0, 0, 50, 2);
  laserMain.endFill();
  laserMain.x = 0;
  laserMain.y = 0;
  laser.addChild(laserMain);

  laser.x = PixiGame.width / 2;
  laser.y = PixiGame.height / 2;

  this.addChild(laser);
  // this._box = laser;

  laser.start = function() {
    laser.alpha = 1;
    PixiGame.Synth.playLaser();
  };

  laser.complete = function() {
    laser.alpha = 0;
  };

  laser.update = function() {
    laser.x = this.x;
    laser.y = this.y;
  };

  laser.moveRight = function() {
    var coords = {
      x: laser.x,
      y: laser.y
    };
    var tween = new TWEEN.Tween(coords)
      .to({
        x: coords.x + 100,
        y: coords.y
      }, 100)
      .onStart(laser.start)
      .onComplete(laser.complete)
      .onUpdate(laser.update)
      .start();
  };

  laser.moveLeft = function() {
    var coords = {
      x: laser.x,
      y: laser.y
    };
    var tween = new TWEEN.Tween(coords)
      .to({
        x: coords.x - 100,
        y: coords.y
      }, 100)
      .onStart(laser.start)
      .onComplete(laser.complete)
      .onUpdate(laser.update)
      .start();
  };

  return laser;
};

PixiGame.AnimationsScene.prototype.update = function() {
  // this._box.moveRight();
};

PixiGame.AnimationsScene.prototype.gameEnd = function(event) {
  PixiGame.sceneController.requestSceneChange(PixiGame.MainMenuScene);
};

PixiGame.AnimationsScene.prototype.destroy = function() {
  this.removeChildren();
};
