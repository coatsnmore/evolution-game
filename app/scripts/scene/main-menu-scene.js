PixiGame.MainMenuScene = function() {
  PIXI.Graphics.call(this);

  this._playButton = null;
  this.setup();
};

PixiGame.MainMenuScene.constructor = PixiGame.MainMenuScene;
PixiGame.MainMenuScene.prototype = Object.create(PIXI.Graphics.prototype);

PixiGame.MainMenuScene.prototype.setup = function() {

  var menuWidth = PixiGame.width / 3;
  var optionSizeY = 60;

  var welcomeText = new PIXI.Text('Evolution Game Components', {
    font: 'bold 48px Arial',
    fill: 0xFFFFFF,
    align: 'center',
    wordWrap: true,
    wordWrapWidth: menuWidth
  });
  welcomeText.x = menuWidth;
  welcomeText.y = 10;
  this.addChild(welcomeText);

  var options = [{
    text: 'Space',
    action: this.handlePlayButtonPressed.bind(this)
  }, {
    text: 'Conversation',
    action: this.handleRPGPlayButtonPressed.bind(this)
  }, {
    text: 'Combat',
    action: this.handleCombatPlayButtonPressed.bind(this)
  }];

  var optionsContainer = new PIXI.Container();
  for (var oi = 0; oi < options.length; oi++) {
    var option = Utils.OptionFactory.createOption(options[oi], oi, optionSizeY, menuWidth, 'menu');
    optionsContainer.addChild(option);
  }

  // position menu
  optionsContainer.x = PixiGame.width / 3;
  optionsContainer.y = PixiGame.height / 3;
  this.addChild(optionsContainer);
};

PixiGame.MainMenuScene.prototype.handleRPGPlayButtonPressed = function(event) {
  PixiGame.sceneController.requestSceneChange(PixiGame.RPGScene);
};

PixiGame.MainMenuScene.prototype.handlePlayButtonPressed = function(event) {
  PixiGame.sceneController.requestSceneChange(PixiGame.GameScene);
};

PixiGame.MainMenuScene.prototype.handleCombatPlayButtonPressed = function(event) {
  PixiGame.sceneController.requestSceneChange(PixiGame.CombatScene);
};

PixiGame.MainMenuScene.prototype.update = function() {};

PixiGame.MainMenuScene.prototype.destroy = function() {
  this.removeChildren();
  this._playButton = null;
};
