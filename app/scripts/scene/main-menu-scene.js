PixiGame.MainMenuScene = function() {
  PIXI.Graphics.call(this);

  this._playButton = null;
  this.setup();
};

PixiGame.MainMenuScene.constructor = PixiGame.MainMenuScene;
PixiGame.MainMenuScene.prototype = Object.create(PIXI.Graphics.prototype);

PixiGame.MainMenuScene.prototype.setup = function() {

  var welcomeText = new PIXI.Text('Evolution Game Components - Experimental', {
    font: 'bold 48px Lucia Console',
    fill: 'blue',
    align: 'center',
  });
  welcomeText.x = PixiGame.width / 3;
  welcomeText.y = 10;
  welcomeText.wordWrap = true;
  welcomeText.wordWrapWidth = 100;
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

  var optionSizeY = 60;
  var optionSizeX = PixiGame.width / 3;

  var optionsContainer = new PIXI.Container();
  for (var oi = 0; oi < options.length; oi++) {
    var option = Utils.OptionFactory.createOption(options[oi], oi, optionSizeY, optionSizeX, 'menu');
    optionsContainer.addChild(option);
  }

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
