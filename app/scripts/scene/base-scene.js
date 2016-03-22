PixiGame.BaseScene = (function() {
    var base = this;
    var hudX = 0,
        hudY = 0,
        hudSizeX = 0,
        hudSizeY = 0;
    var margin = 0;

    var hud = function(self) {
        hudY = PixiGame.height * (2 / 3);
        this.margin = margin = 5;
        // var optionsContainer = new PIXI.Container();
        // var optionLineSize = 5;
        hudSizeX = this.sizeX = PixiGame.width;
        hudSizeY = this.sizeY = PixiGame.height / 3;
        var hudContainer = new PIXI.Container();
        var colors = Utils.Colors.hud();

        // box
        var hudBackground = new PIXI.Graphics();
        hudBackground.beginFill(colors.background);
        hudBackground.lineStyle(1, colors.background);
        hudBackground.drawRect(0, 0, this.sizeX, this.sizeY);
        hudBackground.endFill();
        hudContainer.addChildAt(hudBackground, 0);

        // this.position = [];
        // console.log(hudX);
        // console.log(hudY);
        hudContainer.x = hudX;
        hudContainer.y = hudY;
        hudContainer.alpha = 0.5;

        self.addChild(hudContainer);

        return this;
    };

    //horizontal
    var menu = function(self) {
        this.sizeX = 100;
        this.sizeY = 50;
        var options = [{
            text: 'Menu',
            action: mainMenu
        }];
        var optionSizeX = this.sizeX / options.length;


        var optionsContainer = new PIXI.Container();
        for (var oi = 0; oi < options.length; oi++) {
            var option = Utils.OptionFactory.createOption(options[oi], oi, this.sizeY, this.sizeX, 'menu');
            optionsContainer.addChild(option);
        }

        // position menu
        optionsContainer.x = hudX + margin;
        optionsContainer.y = PixiGame.height - this.sizeY - margin;
        self.addChild(optionsContainer);
        return this;
    };

    var mainMenu = function(event) {
        PixiGame.sceneController.requestSceneChange(PixiGame.MainMenuScene);
    };

    var log = function(self) {
        var colors = Utils.Colors.log();
        var logDamageText;
        var logActionText;
        var logContainer = new PIXI.Container();

        // box
        var logBox = new PIXI.Graphics();
        logBox.beginFill(colors.background);
        logBox.lineStyle(1, colors.background);
        logBox.drawRect(0, 0, PixiGame.width / 3, hudSizeY / 2);
        logBox.endFill();
        logBox.y = 0;
        logContainer.addChildAt(logBox, 0);

        this.drawDamage = function() {
            logDamageText = new PIXI.Text('', {
                font: '24px Arial',
                fill: colors.font,
                align: 'center'
            });
            logDamageText.x = 0;
            logDamageText.y = 0;
            logContainer.addChildAt(logDamageText, 1);
        }.bind(self);

        this.drawDamage();

        this.updateDamage = function(logItem) {
            logDamageText.text = logItem;
        }.bind(self);

        this.drawAction = function() {
            logActionText = new PIXI.Text('', {
                font: '24px Arial',
                fill: colors.font,
                align: 'center'
            });
            logActionText.x = 0;
            logActionText.y = 50;
            logContainer.addChild(logActionText);
        }.bind(self);

        this.drawAction();

        this.updateAction = function(logItem) {
            logActionText.text = logItem;
        }.bind(self);

        logContainer.x = hudX + 5;
        logContainer.y = hudY + 5;

        self.addChild(logContainer);

        return this;
    };

    var turn = function(self) {
        var colors = Utils.Colors.turn();

        //player goes first
        self._playerTurn = true;

        var displayText = 'Turn: ';
        var turnText;
        this.draw = function() {
            turnText = new PIXI.Text(displayText + 'Player', {
                font: '24px Arial',
                fill: colors.font,
                align: 'center'
            });
            turnText.x = PixiGame.width * 2 / 3;
            turnText.y = PixiGame.height - 45;
            self.addChild(turnText);
        }.bind(self);

        this.draw();

        this.update = function(isPlayerTurn) {
            if (isPlayerTurn) {
                turnText.text = displayText + 'Player';
                self._combatContainer.active(true);
            } else {
                turnText.text = displayText + 'Enemy';
                self._combatContainer.active(false);
            }
        }.bind(self);

        return this;
    };

    return {
        menu: menu,
        log: log,
        hud: hud,
        turn: turn
    };
})();
