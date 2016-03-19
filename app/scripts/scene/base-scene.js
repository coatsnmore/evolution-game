PixiGame.BaseScene = (function() {

  //horizontal
  var menu = function(self){
    this.sizeX = 100;
    this.sizeY = 50;
    var options = [{
      text: 'Menu',
      action: mainMenu
    }];
    var optionSizeX = this.sizeX / options.length;


    var optionsContainer = new PIXI.Container();
    for (var oi = 0; oi < options.length; oi++) {
      var option = Utils.OptionFactory.createOption(options[oi], oi, this.sizeY, this.sizeX, 'menu');
      optionsContainer.addChild(option);
    }

    // position menu
    optionsContainer.x = 0;
    optionsContainer.y = 0;
    self.addChild(optionsContainer);
    return this;
  };

  var mainMenu = function(event) {
      PixiGame.sceneController.requestSceneChange(PixiGame.MainMenuScene);
  };

  var log = function(self) {
    var logDamageText;
    var logActionText;
    // var  = 'Log: ';
    this.drawDamage = function() {
      logDamageText = new PIXI.Text('', {
        font: '24px Arial',
        fill: 'red',
        align: 'center'
      });
      logDamageText.x = 100;
      logDamageText.y = PixiGame.height - 50;
      self.addChild(logDamageText);
    }.bind(self);

    this.drawDamage();

    this.updateDamage = function(logItem) {
      logDamageText.text = logItem;
    }.bind(self);

    this.drawAction = function() {
      logActionText = new PIXI.Text('', {
        font: '24px Arial',
        fill: 'red',
        align: 'center'
      });
      logActionText.x = 100;
      logActionText.y = PixiGame.height - 100;
      self.addChild(logActionText);
    }.bind(self);

    this.drawAction();

    this.updateAction = function(logItem) {
      logActionText.text = logItem;
    }.bind(self);

    return this;
  };

  return {menu: menu, log: log};
})();
