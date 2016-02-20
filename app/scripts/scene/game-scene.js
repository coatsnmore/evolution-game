PixiGame.GameScene = function() {
  PIXI.Graphics.call(this);

  this._player = null;
  this.setup();
};

PixiGame.GameScene.constructor = PixiGame.GameScene;
PixiGame.GameScene.prototype = Object.create(PIXI.Graphics.prototype);

PixiGame.GameScene.prototype.setup = function() {

  // draw player
  var player = this._player;
  player = new PIXI.Graphics();
  player.beginFill(0xFFFF00);
  // player.lineStyle(1, 0xFF0000);

  player.drawCircle(0, 0, 50);
  player.x = 100;
  player.y = 100;
  player.endFill();

  this.addChild(player);

};

PixiGame.GameScene.prototype.update = function() {

};

PixiGame.GameScene.prototype.destroy = function() {
  this.removeChildren();
};
