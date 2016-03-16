PixiGame.CombatScene = function() {
  PIXI.Graphics.call(this);

  this._player1 = {
    health: 100
  };

  this._player2 = {
    health: 100
  };

  this._attacks = [{
    text: 'punch 5 - 10',
    min: 5,
    max: 10
  }, {
    text: 'kick 1 - 20',
    min: 1,
    max: 20
  }];

  this._log = {};
  this._turn = {};
  this._combatContainer = {};

  //do this last
  this.setup();
};

PixiGame.CombatScene.constructor = PixiGame.GameScene;
PixiGame.CombatScene.prototype = Object.create(PIXI.Graphics.prototype);

PixiGame.CombatScene.prototype.setup = function() {
  this.setupTurn();
  this.setupCombat();
  this.setupHealth();
  this.setupLog();
};

PixiGame.CombatScene.prototype.setupTurn = function(){

    //player goes first
    this._playerTurn = true;

    var displayText = 'Turn: ';
    var turnText;
    this._turn.draw = function() {
      turnText = new PIXI.Text(displayText + 'Player', {
        font: '24px Arial',
        fill: 'red',
        align: 'center'
      });
      turnText.x = PixiGame.width * 2 / 3;
      turnText.y = PixiGame.height - 50;
      this.addChild(turnText);
    }.bind(this);

    this._turn.draw();

    this._turn.update = function(isPlayerTurn) {
      if(isPlayerTurn){
        turnText.text = 'Player';
        this._combatContainer.active(true);
      } else {
        turnText.text = 'Enemy';
        this._combatContainer.active(false);
      }
    }.bind(this);
};

PixiGame.CombatScene.prototype.setupLog = function() {
  var logText;
  // var  = 'Log: ';
  this._log.draw = function() {
    logText = new PIXI.Text('Log: ', {
      font: '24px Arial',
      fill: 'red',
      align: 'center'
    });
    logText.x = 100;
    logText.y = PixiGame.height - 50;
    this.addChild(logText);
  }.bind(this);

  this._log.draw();

  this._log.update = function(logItem) {
    logText.text = logItem;
  }.bind(this);
};

PixiGame.CombatScene.prototype.setupHealth = function() {
  var player1HealthText;
  var displayText = 'Player 1 Health: ';
  this._player1.healthDraw = function() {
    player1HealthText = new PIXI.Text(displayText + this._player1.health, {
      font: '24px Arial',
      fill: 'red',
      align: 'center'
    });
    player1HealthText.x = 25;
    player1HealthText.y = 25;
    this.addChild(player1HealthText);
  }.bind(this);
  //
  this._player1.healthDraw();

  this._player1.updateHealth = function(damage) {

    //damage
    this._player1.health -= damage;
    player1HealthText.text = displayText + (this._player1.health);
    this._log.update('player damaged for ' + damage + '!!');
  }.bind(this);
};

PixiGame.CombatScene.prototype.setupCombat = function() {

  var combatX = PixiGame.width * 2 / 3;
  var combatContainer = new PIXI.Container();

  // var event = new CustomEvent('build', { 'playerTurn': elem.dataset.time });

  // console.log('this._attacks.length;: ' + this._attacks.length);
  for (var ci = 0; ci < this._attacks.length; ci++) {
    // console.log('convo[i]: ' + convo[ci]);
    var combatOption = this.createCombatOption(this._attacks[ci], ci);
    combatContainer.addChildAt(combatOption, ci);
  }
  combatContainer.x = combatX;
  this.addChild(combatContainer);

  combatContainer.turnActive = this._playerTurn;

  combatContainer.active = function(active) {
    var children = combatContainer.children;
    if (active) {
      combatContainer.interactive = true;
      combatContainer.alpha = 1;
      for (var cj = 0; cj < children.length; cj++) {
        children[cj].interactive = true;
      }
    } else {
      combatContainer.interactive = false;
      combatContainer.alpha = 0.5;
      for (var ck = 0; ck < children.length; ck++) {
        children[ck].interactive = false;
      }
    }
  };
  this._combatContainer = combatContainer;
};

PixiGame.CombatScene.prototype.createCombatOption = function(option, index) {

  console.log('combat option: ' + option.text);
  var optionSizeY = 60;
  var optionSizeX = PixiGame.width / 3;
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

  // console.log('this._playerTurn: ' + this._playerTurn);
  console.log('combatoption.this: ' + this);
  optionContainer.interactive = this._playerTurn;
  optionContainer.touchstart = optionContainer.mousedown = this.handleCombatOptionTouch.bind(this);

  // extend option pixi container
  // optionContainer.oid = index;
  optionContainer.meta = option;

  return optionContainer;
};

//handleCombatOptionTouch
PixiGame.CombatScene.prototype.handleCombatOptionTouch = function(e) {
  var min = e.target.meta.min;
  var max = e.target.meta.max;
  var damage = Math.floor(Math.random() * (max - min + 1)) + min;
  this._player1.updateHealth(damage);
  // this._playerTurn = false;
  this._turn.update(false);
  // e.target.parent.interactive = false;
};

PixiGame.CombatScene.prototype.update = function() {
  //tick
  //move stuff
  //handle collisions

  // do enemy turn

};

PixiGame.CombatScene.prototype.gameEnd = function(event) {
  PixiGame.sceneController.requestSceneChange(PixiGame.MainMenuScene);
};

PixiGame.CombatScene.prototype.destroy = function() {
  this.removeChildren();
};
