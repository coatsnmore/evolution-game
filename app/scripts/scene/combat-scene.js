PixiGame.CombatScene = function() {
  PIXI.Graphics.call(this);

  this._hud = PixiGame.BaseScene.hud(this);
  this._menu = PixiGame.BaseScene.menu(this);
  this._log = PixiGame.BaseScene.log(this);
  this._turn = PixiGame.BaseScene.turn(this);

  this._player = {
    name: 'Player',
    health: 100,
    maxHealth: 100,
  };

  this._enemy = {
    name: 'Enemy',
    health: 100,
    maxHealth: 100
  };

  this._attacks = [{
    text: 'laser 5 - 10',
    min: 5,
    max: 10,
    action: this.handleCombatOptionTouch.bind(this)
  }, {
    text: 'missile 1 - 20',
    min: 1,
    max: 20,
    action: this.handleCombatOptionTouch.bind(this)
  }, {
    text: 'sabotage 7',
    min: 7,
    max: 7,
    action: this.handleCombatOptionTouch.bind(this)
  }];

  this._combatContainer = {};

  //do this last
  this.setup();
};

PixiGame.CombatScene.constructor = PixiGame.CombatScene;
PixiGame.CombatScene.prototype = Object.create(PIXI.Graphics.prototype);

PixiGame.CombatScene.prototype.setup = function() {
  // this.setupTurn();
  this.setupCombat();
  this.setupAllHealth();
  // this.setupLog();
};

PixiGame.CombatScene.prototype.setupAllHealth = function(){
  // var playerHealthX = this._menu.sizeX;
  this.setupHealth(this._player, this._menu.sizeX, PixiGame.height - 50);
  this.setupHealth(this._enemy, (PixiGame.width * 2 / 3), 0);
};

PixiGame.CombatScene.prototype.setupHealth = function(agent, healthX, healthY) {
  var healthMargin = 5;
  var healthWidth = (PixiGame.width / 3);
  var healthHeight = 50;
  var healthText;
  var healthContainer = new PIXI.Container();
  var maxHealthBox = new PIXI.Graphics();
  var healthBox = new PIXI.Graphics();
  agent.healthDraw = function() {
    var colors = Utils.Colors.health();

    // draw health bucket
    maxHealthBox.beginFill(colors.max);
    maxHealthBox.lineStyle(healthMargin, colors.border);
    maxHealthBox.drawRect(0, 0, healthWidth, healthHeight);
    maxHealthBox.endFill();
    healthContainer.addChildAt(maxHealthBox, 0);

    // actual health
    healthBox.beginFill(colors.actual);
    healthBox.lineStyle(healthMargin, colors.border);
    healthBox.drawRect(0, 0, healthWidth, healthHeight);
    healthBox.endFill();
    healthContainer.addChildAt(healthBox, 1);

    healthText = new PIXI.Text('' + agent.name, {
      font: '24px Arial',
      fill: colors.font,
      align: 'center',
      wordWrap: true,
      wordWrapWidth: healthWidth
    });

    healthText.x = 5;
    healthText.y = healthHeight / 3;
    // healthText.y = 0;

    healthContainer.addChildAt(healthText, 2);
    healthContainer.x = healthX;
    healthContainer.y = healthY;
    this.addChild(healthContainer);
  }.bind(this);

  // console.log('agent: ' + agent);
  agent.healthDraw();

  agent.updateHealth = function(damage) {

    //damage
    agent.health -= damage;
    // console.log(agent.name + ' health: ' + agent.health);

    //update display
    if(agent.health >= 0){
      healthBox.width = agent.health / agent.maxHealth * healthWidth;
    } else {
      healthBox.width = 0;
    }
    this._log.updateDamage(agent.name + ' damaged for ' + damage + '!!');

  }.bind(this);
};

PixiGame.CombatScene.prototype.setupCombat = function() {

  var combatX = PixiGame.width * 2 / 3;
  var combatContainer = new PIXI.Container();
  var optionSizeY = 60;
  var optionSizeX = PixiGame.width / 3;

  for (var ci = 0; ci < this._attacks.length; ci++) {
    // var combatOption = this.createCombatOption(this._attacks[ci], ci);
    var combatOption = Utils.OptionFactory.createOption(this._attacks[ci], ci, optionSizeY, optionSizeX, 'attack');
    combatContainer.addChildAt(combatOption, ci);
  }
  combatContainer.x = PixiGame.width * 2 / 3;
  combatContainer.y = PixiGame.height * 2 / 3;
  // combatContainer.y = 50;
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

PixiGame.CombatScene.prototype.handleCombatOptionTouch = function(e) {
  var min = e.target.meta.min;
  var max = e.target.meta.max;
  var damage = Math.floor(Math.random() * (max - min + 1)) + min;
  this._log.updateAction('player performs ' + e.target.meta.text);
  this._enemy.updateHealth(damage);
  this._turn.update(false);
  this.enemyTurn();
};

PixiGame.CombatScene.prototype.enemyTurn = function(e) {
  var enemyTurnTime = 500;

  var attackMin = 1,
    attackMax = this._attacks.length;
  var attackIndex = Math.floor(Math.random() * (attackMax - attackMin + 1)) + attackMin;
  var attack = this._attacks[attackIndex - 1];
  var min = attack.min,
    max = attack.max;
  var damage = Math.floor(Math.random() * (max - min + 1)) + min;

  window.setTimeout(function() {
    this._player.updateHealth(damage);
    this._log.updateAction('enemy performs ' + attack.text);
    this._turn.update(true);
    // console.log('enemy turn over');
  }.bind(this), enemyTurnTime);
};

PixiGame.CombatScene.prototype.update = function() {

  // lose conditions
  if (this._player.health <= 0) {
    // console.log('ya lose brah');
  }
};

PixiGame.CombatScene.prototype.gameEnd = function(event) {
  PixiGame.sceneController.requestSceneChange(PixiGame.MainMenuScene);
};

PixiGame.CombatScene.prototype.destroy = function() {
  this.removeChildren();
};
