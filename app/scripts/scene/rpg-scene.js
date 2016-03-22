PixiGame.RPGScene = function() {
    PIXI.Graphics.call(this);

    this._menu = PixiGame.BaseScene.menu(this);

    this._colorMap = {
        'neutral': 0xB8D65C,
        'good': 0x5CD683,
        'evil': 0xD65C79
    };
    this.setup();
};

PixiGame.RPGScene.constructor = PixiGame.GameScene;
PixiGame.RPGScene.prototype = Object.create(PIXI.Graphics.prototype);

PixiGame.RPGScene.prototype.setup = function() {
    this.setupConvo();
    this.setupResponse();
};

PixiGame.RPGScene.prototype.setupResponse = function() {
    this._responseText = new PIXI.Text('adsf', {
        align: 'center' //,
            // fill: 'blue'
    });

    // responseText.style.fill = '#' + this._colorMap.good.toString(16);
    this._responseText.x = 0;
    this._responseText.y = 60;
    this.addChild(this._responseText);
};

PixiGame.RPGScene.prototype.setupConvo = function() {

    // var convo = ['How are you?', 'I am wonderful', 'Dogs are small wolves', 'Why is the sky blue?'];
    var convoX = PixiGame.width * 2 / 3;
    var convo = [{
        class: 'neutral',
        text: 'Which way to the sun?'
    }, {
        class: 'evil',
        text: 'If you tell me where the sun \nis, I won\'t kill you.'
    }, {
        class: 'good',
        text: 'Help me help you.'
    }];
    var convoContainer = new PIXI.Container();

    for (var ci = 0; ci < convo.length; ci++) {
        console.log('convo[i]: ' + convo[ci]);
        var convoOption = this.createConvoOption(convo[ci], ci);
        convoContainer.addChildAt(convoOption, ci);
    }
    convoContainer.x = convoX;
    this.addChild(convoContainer);
};

PixiGame.RPGScene.prototype.createConvoOption = function(option, index) {

    var optionSizeY = 60;
    var optionSizeX = PixiGame.width / 3;
    var optionLineSize = 5;
    var optionContainer = new PIXI.Container();

    var optionBox = new PIXI.Graphics();
    optionBox.beginFill(0xFFFFFF);
    optionBox.lineStyle(optionLineSize, this._colorMap[option.class]);
    optionBox.drawRect(0, 0, optionSizeX, optionSizeY - optionLineSize);
    optionBox.endFill();
    optionBox.y = optionSizeY * index;
    optionContainer.addChildAt(optionBox, 0);

    var optionText = new PIXI.Text(option.text, {
        font: '20px Lucia Console',
        fill: this._colorMap[option.class],
        align: 'center',
    });
    optionText.x = optionLineSize;
    optionText.y = optionSizeY * index + optionLineSize;
    optionText.wordWrap = true;
    optionText.wordWrapWidth = optionSizeX;
    optionContainer.addChildAt(optionText, 1);

    optionContainer.interactive = true;
    optionContainer.touchstart = optionContainer.mousedown = this.handleConvoOptionTouch.bind(this);

    // extend option pixi container
    optionContainer.oid = index;

    return optionContainer;
};

PixiGame.RPGScene.prototype.handleConvoOptionTouch = function(e) {
    var responses = [{
        class: 'neutral',
        text: 'I\'m reluctant, but okay.'
    }, {
        class: 'evil',
        text: 'I will kill you!'
    }, {
        class: 'good',
        text: 'Let me help you.'
    }];

    var response = responses[e.target.oid];
    this._responseText.text = response.text;
    this._responseText.style.fill = '#' + this._colorMap[response.class].toString(16);
    console.log('this._colorMap[response.class].toString(16): ' + this._colorMap[response.class].toString(16));
};

PixiGame.RPGScene.prototype.update = function() {
    //tick
    //move stuff
    //handle collisions
};

PixiGame.RPGScene.prototype.gameEnd = function(event) {
    PixiGame.sceneController.requestSceneChange(PixiGame.MainMenuScene);
};

PixiGame.RPGScene.prototype.destroy = function() {
    this.removeChildren();
};
