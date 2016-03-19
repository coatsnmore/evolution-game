PixiGame.MainMenuScene = function() {
  PIXI.Graphics.call(this);

  this._playButton = null;
  this.setup();
};

PixiGame.MainMenuScene.constructor = PixiGame.MainMenuScene;
PixiGame.MainMenuScene.prototype = Object.create(PIXI.Graphics.prototype);

PixiGame.MainMenuScene.prototype.setup = function() {

  var options = [{
    text: 'Evolution',
    action: this.handlePlayButtonPressed
  }, {
    text: 'RPG',
    action: this.handleRPGPlayButtonPressed
  }, {
    text: 'Combat',
    action: this.handleCombatPlayButtonPressed
  }];

  var optionSizeY = 60;
  var optionSizeX = PixiGame.width / 3;

  var optionsContainer = new PIXI.Container();
  for (var oi = 0; oi < options.length; oi++) {
    // var option = this.creatOption(options[oi], oi, optionSizeY, optionSizeX);
    var option = Utils.OptionFactory.createOption(options[oi], oi, optionSizeY, optionSizeX);
    optionsContainer.addChild(option);
  }

  optionsContainer.x = PixiGame.width / 3;
  optionsContainer.y = PixiGame.height / 3;
  this.addChild(optionsContainer);
};

// PixiGame.MainMenuScene.prototype.creatOption = function(option, index, optionSizeY, optionSizeX) {
//   var optionLineSize = 5;
//   var optionContainer = new PIXI.Container();
//
//   var optionBox = new PIXI.Graphics();
//   optionBox.beginFill(0xFFFFFF);
//   optionBox.lineStyle(optionLineSize, 'red');
//   optionBox.drawRect(0, 0, optionSizeX, optionSizeY - optionLineSize);
//   optionBox.endFill();
//   optionBox.y = optionSizeY * index;
//   optionContainer.addChildAt(optionBox, 0);
//
//   var optionText = new PIXI.Text(option.text, {
//     font: '20px Lucia Console',
//     fill: 'red',
//     align: 'center',
//   });
//   optionText.x = optionLineSize;
//   optionText.y = optionSizeY * index + optionLineSize;
//   optionText.wordWrap = true;
//   optionText.wordWrapWidth = optionSizeX;
//   optionContainer.addChildAt(optionText, 1);
//   optionContainer.interactive = true;
//   optionContainer.touchstart = optionContainer.mousedown = option.action;
//   return optionContainer;
// };


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
