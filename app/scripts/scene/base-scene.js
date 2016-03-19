PixiGame.BaseScene = (function() {
  // var self = this;
  var drawMenu = function(self, menuSizeX){
    var options = [{
      text: 'Menu',
      action: mainMenu
    }];
    var optionSizeY = 50;
    var optionSizeX = menuSizeX / options.length;


    var optionsContainer = new PIXI.Container();
    for (var oi = 0; oi < options.length; oi++) {
      var option = Utils.OptionFactory.createOption(options[oi], oi, optionSizeY, optionSizeX, 'menu');
      optionsContainer.addChild(option);
    }

    // position menu
    optionsContainer.x = 0;
    optionsContainer.y = 0;
    self.addChild(optionsContainer);
  };

  var mainMenu = function(event) {
      PixiGame.sceneController.requestSceneChange(PixiGame.MainMenuScene);
  };

  return {drawMenu: drawMenu};
})();
