PixiGame.EndGameScene = function() {
    PIXI.Graphics.call(this);

    this._playButton = null;
    this.setup();
};

PixiGame.EndGameScene.constructor = PixiGame.EndGameScene;
PixiGame.EndGameScene.prototype = Object.create(PIXI.Graphics.prototype);

PixiGame.EndGameScene.prototype.setup = function() {
    this._playButton = new PIXI.Sprite.fromImage('images/game/play-game-btn.png');
    this._playButton.anchor = new PIXI.Point(0.5, 0.5);
    this._playButton.position.x = PixiGame.width / 2;
    this._playButton.position.y = PixiGame.height / 2;
    this._playButton.interactive = true;
    this._playButton.touchstart = this._playButton.mousedown = this.handlePlayButtonPressed.bind(this);
    console.log('this: ' + this);
    this.addChild(this._playButton);

    // display previous player score
    var scoreText = new PIXI.Text('Current Score: ' + PixiGame.score, {
      font: '24px Arial',
      fill: 0xff1010,
      align: 'center',
    });
    scoreText.x = PixiGame.width / 2 - 30;
    scoreText.y = PixiGame.height / 2 - 100;
    this.addChildAt(scoreText, 0);

    // high score
    if (PixiGame.score > PixiGame.highScore){
      PixiGame.highScore = PixiGame.score;
      var newHighScoreText = new PIXI.Text('New High Score!', {
        font: '24px Arial',
        fill: 0xff1010,
        align: 'center',
      });
      newHighScoreText.x = PixiGame.width / 2 - 30;
      newHighScoreText.y = PixiGame.height / 2 - 150;
      this.addChildAt(newHighScoreText, 0);
    }


    var highScoreText = new PIXI.Text('High Score: ' + PixiGame.score, {
      font: '24px Arial',
      fill: 0xff1010,
      align: 'center',
    });
    highScoreText.x = PixiGame.width / 2 - 30;
    highScoreText.y = PixiGame.height / 2 - 200;
    this.addChildAt(highScoreText, 0);
};

PixiGame.EndGameScene.prototype.handlePlayButtonPressed = function(event) {
    PixiGame.sceneController.requestSceneChange(PixiGame.GameScene);
};

PixiGame.EndGameScene.prototype.update = function() {};

PixiGame.EndGameScene.prototype.destroy = function() {
    this.removeChildren();
    this._playButton = null;
};
