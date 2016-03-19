Utils.OptionFactory = {
  createOption : function(option, index, optionSizeY, optionSizeX) {
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
      fill: 'red',
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
  }
};
