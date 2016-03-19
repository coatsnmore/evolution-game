Utils.OptionFactory = (function() {
  // var self = this,
    // methods;

  var createOption = function(option, index, optionSizeY, optionSizeX, type) {
    var optionLineSize = 5;
    var optionContainer = new PIXI.Container();
    var colors = Utils.Colors.options;

    // box
    var optionBox = new PIXI.Graphics();
    optionBox.beginFill(0xFFFFFF);
    optionBox.lineStyle(optionLineSize, colors(type).box);
    optionBox.drawRect(0, 0, optionSizeX, optionSizeY - optionLineSize);
    optionBox.endFill();
    optionBox.y = optionSizeY * index;
    optionContainer.addChildAt(optionBox, 0);

    // text
    var optionText = new PIXI.Text(option.text, {
      font: 'bold 20px Arial',
      fill: colors(type).font,
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

  return {
    createOption: createOption
  };
})();
