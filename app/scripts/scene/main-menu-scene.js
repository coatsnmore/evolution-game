PixiGame.MainMenuScene = function() {
    PIXI.Graphics.call(this);

    this._playButton = null;
    this.setup();
};

PixiGame.MainMenuScene.constructor = PixiGame.MainMenuScene;
PixiGame.MainMenuScene.prototype = Object.create(PIXI.Graphics.prototype);

PixiGame.MainMenuScene.prototype.setup = function() {

    // game title
    var titleText = new PIXI.Text('Evolution', {
        font: '48px Arial',
        fill: 0xff1010,
        align: 'center',
    });
    titleText.x = PixiGame.width / 4 - 75;
    titleText.y = PixiGame.height / 2 - 100;
    this.addChildAt(titleText, 0);

    this._playButton = new PIXI.Sprite.fromImage('images/game/play-game-btn.png');
    this._playButton.anchor = new PIXI.Point(0.5, 0.5);
    this._playButton.position.x = PixiGame.width / 4;
    this._playButton.position.y = PixiGame.height / 2;
    this._playButton.interactive = true;
    this._playButton.touchstart = this._playButton.mousedown = this.handlePlayButtonPressed.bind(this);
    console.log('this: ' + this);
    this.addChild(this._playButton);

    // game title
    var rpgText = new PIXI.Text('RPG', {
        font: '48px Arial',
        fill: 0xff1010,
        align: 'center',
    });
    rpgText.x = PixiGame.width / 2 - 75;
    rpgText.y = PixiGame.height / 2 - 100;
    this.addChildAt(rpgText, 0);

    this._playButton = new PIXI.Sprite.fromImage('images/game/play-game-btn.png');
    this._playButton.anchor = new PIXI.Point(0.5, 0.5);
    this._playButton.position.x = PixiGame.width / 2;
    this._playButton.position.y = PixiGame.height / 2;
    this._playButton.interactive = true;
    this._playButton.touchstart = this._playButton.mousedown = this.handleRPGPlayButtonPressed.bind(this);
    console.log('this: ' + this);
    this.addChild(this._playButton);

    // basic combat
    var combatText = new PIXI.Text('Combat', {
        font: '48px Arial',
        fill: 0xff1010,
        align: 'center',
    });
    combatText.x = PixiGame.width * (3 /4) - 75;
    combatText.y = PixiGame.height / 2 - 100;
    this.addChildAt(combatText, 0);

    this._playButton = new PIXI.Sprite.fromImage('images/game/play-game-btn.png');
    this._playButton.anchor = new PIXI.Point(0.5, 0.5);
    this._playButton.position.x = PixiGame.width * (3 /4);
    this._playButton.position.y = PixiGame.height / 2;
    this._playButton.interactive = true;
    this._playButton.touchstart = this._playButton.mousedown = this.handleCombatPlayButtonPressed.bind(this);
    console.log('this: ' + this);
    this.addChild(this._playButton);
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
