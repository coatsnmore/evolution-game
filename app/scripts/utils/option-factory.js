Utils.OptionFactory = (function() {
  // var self = this,
    // methods;

  var createOption = function(option, index, optionSizeY, optionSizeX, type) {
    var optionLineSize = 5;
    var optionContainer = new PIXI.Container();

    var optionBox = new PIXI.Graphics();
    optionBox.beginFill(0xFFFFFF);
    optionBox.lineStyle(optionLineSize, 'red');
    optionBox.drawRect(0, 0, optionSizeX, optionSizeY - optionLineSize);
    optionBox.endFill();
    optionBox.y = optionSizeY * index;
    optionContainer.addChildAt(optionBox, 0);

    var optionText = new PIXI.Text(option.text, {
      font: '20px Lucia Console',
      fill: textColor(type),
      align: 'center',
    });
    optionText.x = optionLineSize;
    optionText.y = optionSizeY * index + optionLineSize;
    optionText.wordWrap = true;
    optionText.wordWrapWidth = optionSizeX;
    optionContainer.addChildAt(optionText, 1);
    optionContainer.interactive = true;
    optionContainer.touchstart = optionContainer.mousedown = option.action;

    optionContainer.meta = option;

    return optionContainer;
  };

  var textColor = function(type) {
    var color;
    switch(type){
      case 'attack':
        color = 'red';
        break;
      case 'conversation':
        color = 'blue';
        break;
      case 'menu':
        color = 'black';
        break;
      case 'trade':
        color = 'green';
        break;
      default:
        color = 'black';
    }
    return color;
  };

  return {
    createOption: createOption
  };
})();
