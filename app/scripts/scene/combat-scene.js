PixiGame.CombatScene = function() {
    PIXI.Graphics.call(this);

    this._player = {
        health: 100
    };

    this._enemy = {
        health: 100
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
    this.setupPlayerHealth();
    this.setupEnemyHealth();
    this.setupLog();
};

PixiGame.CombatScene.prototype.setupTurn = function() {

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
        if (isPlayerTurn) {
            turnText.text = displayText + 'Player';
            this._combatContainer.active(true);
        } else {
            turnText.text = displayText + 'Enemy';
            this._combatContainer.active(false);
        }
    }.bind(this);
};

PixiGame.CombatScene.prototype.setupLog = function() {
    var logDamageText;
    var logActionText;
    // var  = 'Log: ';
    this._log.drawDamage = function() {
        logDamageText = new PIXI.Text('', {
            font: '24px Arial',
            fill: 'red',
            align: 'center'
        });
        logDamageText.x = 100;
        logDamageText.y = PixiGame.height - 50;
        this.addChild(logDamageText);
    }.bind(this);

    this._log.drawDamage();

    this._log.updateDamage = function(logItem) {
        logDamageText.text = logItem;
    }.bind(this);

    this._log.drawAction = function() {
        logActionText = new PIXI.Text('', {
            font: '24px Arial',
            fill: 'red',
            align: 'center'
        });
        logActionText.x = 100;
        logActionText.y = PixiGame.height - 100;
        this.addChild(logActionText);
    }.bind(this);

    this._log.drawAction();

    this._log.updateAction = function(logItem) {
        logActionText.text = logItem;
    }.bind(this);
};

PixiGame.CombatScene.prototype.setupPlayerHealth = function() {
    var playerHealthText;
    var displayText = 'Player 1 Health: ';
    this._player.healthDraw = function() {
        playerHealthText = new PIXI.Text(displayText + this._player.health, {
            font: '24px Arial',
            fill: 'red',
            align: 'center'
        });
        playerHealthText.x = 25;
        playerHealthText.y = 25;
        this.addChild(playerHealthText);
    }.bind(this);
    //
    this._player.healthDraw();

    this._player.updateHealth = function(damage) {

        //damage
        this._player.health -= damage;
        playerHealthText.text = displayText + (this._player.health);
        this._log.updateDamage('player damaged for ' + damage + '!!');
    }.bind(this);
};

PixiGame.CombatScene.prototype.setupEnemyHealth = function() {
    var enemyHealthText;
    var displayText = 'Enemy Health: ';
    this._enemy.healthDraw = function() {
        enemyHealthText = new PIXI.Text(displayText + this._enemy.health, {
            font: '24px Arial',
            fill: 'red',
            align: 'center'
        });
        enemyHealthText.x = 25;
        enemyHealthText.y = 75;
        this.addChild(enemyHealthText);
    }.bind(this);
    //
    this._enemy.healthDraw();

    this._enemy.updateHealth = function(damage) {

        //damage
        this._enemy.health -= damage;
        enemyHealthText.text = displayText + (this._enemy.health);
        this._log.updateDamage('enemy damaged for ' + damage + '!!');
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
    }.bind(this), 1000);
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
