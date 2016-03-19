Utils.OptionFactory = (function() {
  // var self = this,
    // methods;

  var createOption = function(option, index, optionSizeY, optionSizeX, type) {
    var optionLineSize = 5;
    var optionContainer = new PIXI.Container();

    // box
    var optionBox = new PIXI.Graphics();
    optionBox.beginFill(0xFFFFFF);
    optionBox.lineStyle(optionLineSize, textColor(type).box);
    optionBox.drawRect(0, 0, optionSizeX, optionSizeY - optionLineSize);
    optionBox.endFill();
    optionBox.y = optionSizeY * index;
    optionContainer.addChildAt(optionBox, 0);

    // text
    var optionText = new PIXI.Text(option.text, {
      font: 'bold 20px Arial',
      fill: textColor(type).font,
      align: 'center'
    });

    optionText.x = optionSizeX / 2;
    optionText.y = (optionSizeY * index + optionLineSize) + optionSizeY / 3;
    optionText.anchor.x = 0.5;
    optionText.anchor.y = 0.5;
    optionText.wordWrap = true;
    optionText.wordWrapWidth = optionSizeX;
    optionContainer.addChildAt(optionText, 1);

    optionContainer.interactive = true;
    optionContainer.touchstart = optionContainer.mousedown = option.action;

    //extend for specific use
    optionContainer.meta = option;

    return optionContainer;
  };

  var textColor = function(type) {
    var color = {};
    switch(type){
      case 'attack':
        color.font = 0xE34242;
        color.box = 0xE34242;
        break;
      case 'conversation':
        color.font = 0x4267E3;
        color.box = 0x4267E3;
        break;
      case 'menu':
        color.font = 0x353D57;
        color.box = 0x000000;
        break;
      case 'trade':
        color.font = 0x3C8025;
        color.box = 0x3C8025;
        break;
      default:
        color.font = 0x000000;
        color.box = 0x000000;
    }
    return color;
  };

  return {
    createOption: createOption
  };
})();
