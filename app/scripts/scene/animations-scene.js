PixiGame.AnimationsScene = function() {
    PIXI.Graphics.call(this);

    this._menu = PixiGame.BaseScene.menu(this);

    this._box = {};
    this._laser = {};
    this._man = {};

    //do this last
    this.setup();
};

PixiGame.AnimationsScene.constructor = PixiGame.AnimationsScene;
PixiGame.AnimationsScene.prototype = Object.create(PIXI.Graphics.prototype);

PixiGame.AnimationsScene.prototype.setup = function() {
    this._man = this.man();
    this.controls();
};

PixiGame.AnimationsScene.prototype.controls = function() {

    var menuWidth = PixiGame.width / 5;
    var optionSizeY = 40;
    var options = [{
        text: 'Play Song',
        action: PixiGame.Synth.playSong
    }, {
        text: 'Man Dance',
        action: this._man.dance
    }, {
        text: 'Man Walk',
        action: this._man.walk
    }, {
        text: 'Man Laser Eyes',
        action: this._man.shootLaserEyes
    }];

    var optionsContainer = new PIXI.Container();
    for (var oi = 0; oi < options.length; oi++) {
        var option = Utils.OptionFactory.createOption(options[oi], oi, optionSizeY, menuWidth, 'menu');
        optionsContainer.addChild(option);
    }

    // position menu
    optionsContainer.x = 0;
    optionsContainer.y = 0;
    this.addChild(optionsContainer);
};

PixiGame.AnimationsScene.prototype.man = function() {
    var man = new PIXI.Container();
    // this._box = box;

    var manHead = new PIXI.Graphics();
    manHead.beginFill(0x3C8025);
    // manHead.lineStyle(1, 0x3C8025);
    manHead.drawRect(0, 0, 50, 50);
    manHead.endFill();
    manHead.x = 0;
    manHead.y = 0;
    man.addChild(manHead);

    var manBody = new PIXI.Graphics();
    manBody.beginFill(0x3C8025);
    manBody.drawRect(-10, 60, 70, 70);
    manBody.endFill();
    man.addChild(manBody);

    var leftHand = new PIXI.Graphics();
    leftHand.beginFill(0x3C8025);
    leftHand.drawRect(-40, 120, 20, 20);
    leftHand.endFill();
    man.addChild(leftHand);

    var rightHand = new PIXI.Graphics();
    rightHand.beginFill(0x3C8025);
    rightHand.drawRect(70, 120, 20, 20);
    rightHand.endFill();
    man.addChild(rightHand);

    var leftLeg = new PIXI.Graphics();
    leftLeg.beginFill(0x3C8025);
    leftLeg.drawRect(0, 120, 20, 80);
    leftLeg.endFill();
    // leftLeg.pivot.x = 0;
    // leftLeg.pivot.y = 140;
    man.addChild(leftLeg);

    var rightLeg = new PIXI.Graphics();
    rightLeg.beginFill(0x3C8025);
    rightLeg.drawRect(30, 120, 20, 80);
    rightLeg.endFill();
    // rightLeg.pivot.x = 30;
    // rightLeg.pivot.y = 140;
    man.addChild(rightLeg);

    var laserEyes = new PIXI.Container();
    var laserEyeLeft = new PIXI.Graphics();
    laserEyeLeft.beginFill(0xE34242);
    laserEyeLeft.drawRect(25, 20, 50, 2);
    laserEyeLeft.endFill();
    laserEyes.addChild(laserEyeLeft);

    var laserEyeRight = new PIXI.Graphics();
    laserEyeRight.beginFill(0xE34242);
    laserEyeRight.drawRect(40, 10, 50, 2);
    laserEyeRight.endFill();
    laserEyes.addChild(laserEyeRight);

    laserEyes.alpha = 0;
    man.addChild(laserEyes);

    man.x = PixiGame.width / 3;
    man.y = PixiGame.height / 3;

    this.addChild(man);
    // this._box = box;

    man.shootLaserEyes = function() {
        var rate = 800;

        var laserCoords = {
            x: laserEyes.x,
            y: laserEyes.y
        };

        var laserTarget = [200, 50];
        var angle = Math.atan(laserTarget[1] / laserTarget[0]);
        laserEyes.rotation = angle;

        var laserRight = new TWEEN.Tween(laserCoords)
            .to({
                x: laserCoords.x + laserTarget[0],
                y: laserCoords.y + laserTarget[1]
            }, rate)
            .onStart(function() {
                laserEyes.alpha = 1;
                PixiGame.Synth.playLaser();
            })
            .onComplete(function() {
                laserEyes.alpha = 0;
                laserEyes.x = 0;
                laserEyes.y = 0;
            })
            .onUpdate(function() {
                laserEyes.x = this.x;
                laserEyes.y = this.y;
            });

        // manRight.chain(manLeft);
        // manLeft.chain(manRight);
        laserRight.start();

    };

    man.dance = function() {
        var danceRate = 400;

        var manCoords = {
            x: man.x,
            y: man.y
        };
        var headCoords = {
            x: manHead.x,
            y: manHead.y
        };
        var bodyCoords = {
            x: manBody.x,
            y: manBody.y
        };

        var leftHandCoords = {
            x: leftHand.x,
            y: leftHand.y
        };

        var rightHandCoords = {
            x: rightHand.x,
            y: rightHand.y
        };

        //man
        var manRight = new TWEEN.Tween(manCoords)
            .to({
                x: manCoords.x + 3,
                y: manCoords.y + 2
            }, danceRate)
            .onUpdate(function() {
                man.x = this.x;
                man.y = this.y;
            });

        var manLeft = new TWEEN.Tween(manCoords)
            .to({
                x: manCoords.x - 3,
                y: manCoords.y
            }, danceRate)
            .onUpdate(function() {
                man.x = this.x;
                man.y = this.y;
            });

        //head
        var headUp = new TWEEN.Tween(headCoords)
            .to({
                x: headCoords.x,
                y: headCoords.y + 5
            }, danceRate)
            .onUpdate(function() {
                manHead.x = this.x;
                manHead.y = this.y;
            });
        var headDown = new TWEEN.Tween(headCoords)
            .to({
                x: headCoords.x,
                y: headCoords.y - 5
            }, danceRate)
            .onUpdate(function() {
                manHead.x = this.x;
                manHead.y = this.y;
            });

        //body
        var bodyUp = new TWEEN.Tween(bodyCoords)
            .to({
                x: bodyCoords.x,
                y: bodyCoords.y + 3
            }, danceRate)
            .onUpdate(function() {
                manBody.x = this.x;
                manBody.y = this.y;
            });
        var bodyDown = new TWEEN.Tween(bodyCoords)
            .to({
                x: bodyCoords.x,
                y: bodyCoords.y - 3
            }, danceRate)
            .onUpdate(function() {
                manBody.x = this.x;
                manBody.y = this.y;
            });

        //left hand
        var leftHandUp = new TWEEN.Tween(leftHandCoords)
            .to({
                x: leftHandCoords.x - 2,
                y: leftHandCoords.y + 3
            }, danceRate)
            .onUpdate(function() {
                leftHand.x = this.x;
                leftHand.y = this.y;
            });
        var leftHandDown = new TWEEN.Tween(leftHandCoords)
            .to({
                x: leftHandCoords.x + 2,
                y: leftHandCoords.y - 3
            }, danceRate)
            .onUpdate(function() {
                leftHand.x = this.x;
                leftHand.y = this.y;
            });

        //right hand
        var rightHandUp = new TWEEN.Tween(rightHandCoords)
            .to({
                x: rightHandCoords.x + 2,
                y: rightHandCoords.y + 3
            }, danceRate)
            .onUpdate(function() {
                rightHand.x = this.x;
                rightHand.y = this.y;
            });
        var rightHandDown = new TWEEN.Tween(rightHandCoords)
            .to({
                x: rightHandCoords.x - 2,
                y: rightHandCoords.y - 3
            }, danceRate)
            .onUpdate(function() {
                rightHand.x = this.x;
                rightHand.y = this.y;
            });

        manRight.chain(manLeft);
        manLeft.chain(manRight);
        // manRight.start();

        headUp.chain(headDown);
        headDown.chain(headUp);
        headUp.start();

        bodyUp.chain(bodyDown);
        bodyDown.chain(bodyUp);
        bodyUp.start();

        leftHandUp.chain(leftHandDown);
        leftHandDown.chain(leftHandUp);
        leftHandUp.start();

        rightHandUp.chain(rightHandDown);
        rightHandDown.chain(rightHandUp);
        rightHandUp.start();
    };

    man.walk = function() {

        var rate = 800,
            walkStride = 10;
        var leftLegCoords = {
            x: leftLeg.x,
            y: leftLeg.y
        };

        var rightLegCoords = {
            x: rightLeg.x,
            y: rightLeg.y
        };
        //left leg
        var leftLegRight = new TWEEN.Tween(leftLegCoords)
            .to({
                x: leftLegCoords.x + walkStride,
                y: leftLegCoords.y
            }, rate)
            .onUpdate(function() {
                leftLeg.x = this.x;
                leftLeg.y = this.y;
                leftLeg.rotation -= Math.atan(2 / 3) * (2 / rate);
            });
        var leftLegLeft = new TWEEN.Tween(leftLegCoords)
            .to({
                x: leftLegCoords.x - walkStride / 2,
                y: leftLegCoords.y
            }, rate)
            .onUpdate(function() {
                leftLeg.x = this.x;
                leftLeg.y = this.y;
                leftLeg.rotation += Math.atan(2 / 3) * (2 / rate);
            });

        //right leg
        var rightLegRight = new TWEEN.Tween(rightLegCoords)
            .to({
                x: rightLegCoords.x - walkStride,
                y: rightLegCoords.y
            }, rate)
            .onUpdate(function() {
                rightLeg.x = this.x;
                rightLeg.y = this.y;
                rightLeg.rotation += Math.atan(3 / 2) * (2 / rate);
            });
        var rightLegLeft = new TWEEN.Tween(rightLegCoords)
            .to({
                x: rightLegCoords.x + walkStride / 2,
                y: rightLegCoords.y
            }, rate)
            .onUpdate(function() {
                rightLeg.x = this.x;
                rightLeg.y = this.y;
                rightLeg.rotation -= Math.atan(3 / 2) * (2 / rate);
            });

        leftLegRight.chain(leftLegLeft);
        leftLegLeft.chain(leftLegRight);
        leftLegRight.start();

        rightLegRight.chain(rightLegLeft);
        rightLegLeft.chain(rightLegRight);
        rightLegRight.start();
    };

    return man;
};

PixiGame.AnimationsScene.prototype.update = function() {
    // this._box.moveRight();
};

PixiGame.AnimationsScene.prototype.gameEnd = function(event) {
    PixiGame.sceneController.requestSceneChange(PixiGame.MainMenuScene);
};

PixiGame.AnimationsScene.prototype.destroy = function() {
    this.removeChildren();
};
