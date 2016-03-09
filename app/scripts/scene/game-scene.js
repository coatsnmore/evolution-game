PixiGame.GameScene = function() {
    PIXI.Graphics.call(this);

    this._player = {
        score: 0,
        health: 100,
        body: null,
        shape: null,
        graphics: null,
        size: 50,
        speed: 100,
        turnSpeed: 2,
        bullets: {
            collection: [],
            speed: 50,
            max: 1,
            size: 5
        }
    };

    this._enemies = {
        collection: [],
        speed: 75,
        size: 50,
        amount: 0,
        max: 10
    };

    this.setup();
};

PixiGame.GameScene.constructor = PixiGame.GameScene;
PixiGame.GameScene.prototype = Object.create(PIXI.Graphics.prototype);

PixiGame.GameScene.prototype.setup = function() {
    this.hud().setup();
    this.setupPlayer();
    this.setupEnemies();
};

PixiGame.GameScene.prototype.hud = function() {
    var scene = this;
    var hud = {
        position: [20, 20],
        setup: function() {
            var hudContainer = new PIXI.Container();
            hudContainer.x = this.position[0];
            hudContainer.y = this.position[1];
            this.score.redraw(hudContainer);
            this.health.redraw(hudContainer);
            scene.addChildAt(hudContainer, 0);
        },
        score: {
            text: 'Score: ',
            update: function(scoreAdd) {
                scene._player.score += scoreAdd;
                scene.getChildAt(0).getChildAt(0).text = this.text + scene._player.score;
            },
            redraw: function(container) {
                var scoreText = new PIXI.Text(this.text + scene._player.score, {
                    font: '24px Arial',
                    fill: 0xff1010,
                    align: 'center',
                });
                container.addChildAt(scoreText, 0);
            }
        },
        health: {
            text: 'Health: ',
            update: function(healthAdd) {
                scene._player.health += healthAdd;
                scene.getChildAt(0).getChildAt(1).text = this.text + Math.round(scene._player.health);
            },
            redraw: function(container) {
                var healthText = new PIXI.Text(this.text + scene._player.health, {
                    font: '24px Arial',
                    fill: 0xff1010,
                    align: 'center'
                });
                healthText.y = 25;
                container.addChildAt(healthText, 1);
            }
        }
    };

    return hud;
};

PixiGame.GameScene.prototype.playerFire = function() {
    var magnitude = this._player.speed * 1.5,
        angle = this._player.body.angle - Math.PI / 2;

    var bullet = {
        graphics: new PIXI.Graphics(),
        body: new p2.Body({
            mass: 0,
            damping: 0,
            angularDamping: 0
        }),
        active: false
    };

    // adjust physics
    bullet.body.velocity[0] += magnitude * Math.cos(angle) + this._player.body.velocity[0];
    bullet.body.velocity[1] += magnitude * Math.sin(angle) + this._player.body.velocity[1];
    bullet.body.position[0] = (this._player.size / 2) * Math.cos(angle) + this._player.body.position[0];
    bullet.body.position[1] = (this._player.size / 2) * Math.sin(angle) + this._player.body.position[1];

    // Create bullet shape
    var bulletShape = new p2.Circle({
        radius: this._player.bullets.size
    });
    // bulletShape.collisionGroup = BULLET;
    // bulletShape.collisionMask = ASTEROID;
    bullet.body.addShape(bulletShape);
    PixiGame.world.addBody(bullet.body);

    // Keep track of the last time we shot
    // lastShootTime = world.time;

    // Remember when we should delete this bullet
    // bulletBody.dieTime = world.time + bulletLifeTime;

    //graphics
    bullet.graphics.beginFill(0xFFFFFF);
    bullet.graphics.lineStyle(1, 0xFF0000);
    bullet.graphics.drawRect(0, 0, this._player.bullets.size, this._player.bullets.size);
    bullet.graphics.drawCircle(0, 0, this._player.bullets.size);
    bullet.graphics.endFill();
    this.addChild(bullet.graphics);

    this._player.bullets.collection.push(bullet);
};

PixiGame.GameScene.prototype.setupEnemies = function() {
    var enemies = this._enemies;

    // for (var i = 0; i < enemies.max; i++) {
    var enemyTimer = setInterval(function() {
        if (enemies.amount >= enemies.max) {
            return;
        }

        var x = Math.round(Math.random() * PixiGame.width);
        var y = Math.round(Math.random() * PixiGame.height);
        var vx = (Math.random() - 0.5) * enemies.speed;
        var vy = (Math.random() - 0.5) * enemies.speed;
        var va = (Math.random() - 0.5) * enemies.speed;

        var enemy = {
            body: new p2.Body({
                position: [x, y],
                mass: 0.1,
                damping: 0,
                angularDamping: 0,
                velocity: [vx, vy],
                angularVelocity: va
            }),
            graphics: new PIXI.Container()
        };

        var enemyShape = new p2.Circle({
            radius: enemies.size
        });
        enemy.body.addShape(enemyShape);
        PixiGame.world.addBody(enemy.body);

        var enemyGraphics = new PIXI.Graphics();
        enemyGraphics.beginFill(0x7AE68A);
        enemyGraphics.drawCircle(0, 0, enemies.size);
        enemyGraphics.endFill();
        enemy.graphics.addChild(enemyGraphics);
        this.addChild(enemy.graphics);

        enemies.collection.push(enemy);
        enemies.amount++;
    }.bind(this), 1000);
    // }
};

PixiGame.GameScene.prototype.setupPlayerBullets = function() {

    var player = this._player;
    var bullets = this._player.bullets;
    var x = 300,
        y = 300;
    // var x = this._player.body.position[0];
    // var y = this._player.body.position[1];

    // create bullets
    for (var i = 0; i < bullets.max; i++) {

        //bodies
        bullets.bodies[i] = new p2.Body({
            mass: 1,
            angularVelocity: 0,
            damping: 0,
            angularDamping: 0,
            position: [x, y]
        });

        //shapes
        bullets.shapes[i] = new p2.Box({
            width: bullets.size,
            height: bullets.size
        });
        bullets.bodies[i].addShape(bullets.shapes[i]);
        PixiGame.world.addBody(bullets.bodies[i]);

        //graphics
        bullets.graphics[i] = new PIXI.Graphics();
        bullets.graphics[i].beginFill(0xFFFFFF);
        bullets.graphics[i].lineStyle(5, 0xFF0000);
        bullets.graphics[i].drawRect(x, y, bullets.size, bullets.size);
        bullets.graphics[i].endFill();

        this.addChild(bullets.graphics[i]);
    }
};

PixiGame.GameScene.prototype.setupPlayer = function() {

    var player = this._player;

    // create player body
    player.body = new p2.Body({
        mass: 1,
        angularVelocity: 0,
        damping: 0,
        angularDamping: 0,
        position: [PixiGame.width / 2, PixiGame.height / 2]
    });

    player.shape = new p2.Box({
        width: player.size,
        height: player.size
    });
    player.body.addShape(player.shape);
    PixiGame.world.addBody(player.body);

    //draw player
    player.graphics = new PIXI.Container();

    var shipHull = new PIXI.Graphics();
    shipHull.beginFill(0xBAC6D6);
    // player.graphics.lineStyle(5, 0xFF0000);
    shipHull.moveTo(0, player.size);
    shipHull.lineTo(0, player.size * (2 / 3));
    shipHull.lineTo(player.size / 2, 0);
    shipHull.lineTo(player.size, player.size * (2 / 3));
    shipHull.lineTo(player.size, player.size);
    shipHull.lineTo(player.size * (2 / 3), player.size * (2 / 3));
    shipHull.lineTo(player.size * (1 / 3), player.size * (2 / 3));
    shipHull.endFill();

    player.graphics.addChildAt(shipHull, 0);

    var shipEngine = new PIXI.Graphics();
    shipEngine.beginFill(0xF7ED60);
    // player.graphics.lineStyle(5, 0xFF0000);
    shipEngine.moveTo(player.size * (1 / 3), player.size * (2 / 3));
    shipEngine.lineTo(player.size * (2 / 3), player.size * (2 / 3));
    shipEngine.lineTo(player.size * (1 / 2), player.size);
    shipEngine.endFill();
    shipEngine.alpha = 0;

    player.graphics.addChildAt(shipEngine, 1);

    var playerShield = new PIXI.Graphics();
    playerShield.beginFill(0xF7ED60);
    playerShield.drawCircle(player.size / 2, player.size / 2, player.size);
    playerShield.endFill();
    playerShield.alpha = 0.1;

    player.graphics.addChildAt(playerShield, 2);

    var hitShield = new PIXI.Graphics();
    hitShield.beginFill(0xCF4061);
    hitShield.drawCircle(player.size / 2, player.size / 2, player.size);
    hitShield.endFill();
    hitShield.alpha = 0.0;

    player.graphics.addChildAt(hitShield, 3);

    player.graphics.pivot.x = player.size / 2;
    player.graphics.pivot.y = player.size / 2;
    this.addChild(player.graphics);
};

PixiGame.GameScene.prototype.update = function() {

    var player = this._player;
    var enemies = this._enemies.collection;
    var controls = PixiGame.controls.state();
    var playerEngine = player.graphics.getChildAt(1);
    var bullets = player.bullets.collection;

    //player fire
    if (controls.fire) {
        //todo maintain a counter to control fire rate
        this.playerFire();
    }

    var warp = function(body, x, y) {
        if (x < 0) {
            body.position[0] = PixiGame.width;
        } else if (x > PixiGame.width) {
            body.position[0] = 0;
        }

        if (y < 0) {
            body.position[1] = PixiGame.height;
        } else if (y > PixiGame.height) {
            body.position[1] = 0;
        }
    };

    // move bullets
    for (var j = 0; j < bullets.length; j++) {
        var bullet = bullets[j];
        bullet.graphics.x = bullet.body.position[0];
        bullet.graphics.y = bullet.body.position[1];
    }

    // move enemies
    for (var i = 0; i < enemies.length; i++) {
        var enemy = enemies[i];

        // move towards player
        var dx = Math.abs(enemy.body.position[0] - player.body.position[0]);
        var dy = Math.abs(enemy.body.position[1] - player.body.position[1]);
        var playerAngle = Math.atan(dy / dx);

        var enemyAngle = playerAngle + Math.PI / 2;
        // enemy.body.force[0] = this._enemies.speed * Math.cos(enemyAngle);
        // enemy.body.force[1] = this._enemies.speed * Math.sin(enemyAngle);

        enemy.graphics.x = enemy.body.position[0];
        enemy.graphics.y = enemy.body.position[1];

        warp(enemy.body, enemy.body.position[0], enemy.body.position[1]);
    }

    // player angles
    if (controls.left) {
        player.body.angularVelocity = -1 * player.turnSpeed;
    } else if (controls.right) {
        player.body.angularVelocity = player.turnSpeed;
    } else {
        player.body.angularVelocity = 0;
    }

    // veloctiy
    if (controls.up) {
        var angle = player.body.angle + Math.PI / 2;
        // console.log('angle: ' + angle);
        player.body.force[0] -= player.speed * Math.cos(angle);
        player.body.force[1] -= player.speed * Math.sin(angle);
        playerEngine.alpha = 1;
    } else {
        playerEngine.alpha = 0;
    }

    // warp player on boundaries
    var x = player.body.position[0],
        y = player.body.position[1];
    warp(player.body, x, y);

    //update graphics
    player.graphics.x = player.body.position[0];
    player.graphics.y = player.body.position[1];
    player.graphics.rotation = player.body.angle;

    // handle collision
    PixiGame.world.on('beginContact', function(e) {

        var containsBody = function(bodyCollection, idA, idB) {
            for (var i = 0; i < bodyCollection.length; i++) {
                if (bodyCollection[i].body.id === idA || bodyCollection[i].body.id === idB) {
                    return true;
                }
            }
            return false;
        };

        // if player involved
        if (e.bodyB.id === player.body.id || e.bodyA.id === player.body.id) {
            var hitShield = player.graphics.getChildAt(3);
            hitShield.alpha = 0.25;

            // if enemy was also involved
            if (containsBody(enemies, e.bodyA.id, e.bodyB.id)) {
                this.hud().health.update(-0.1);
            }
        }

        //enemies
        for (var z = 0; z < enemies.length; z++) {
            var enemy = enemies[z];
            // if enemy was involved
            if (e.bodyB.id === enemy.body.id || e.bodyA.id === enemy.body.id) {

                //if player bullets were also involved
                if (containsBody(player.bullets.collection, e.bodyA.id, e.bodyB.id)) {
                    enemy.graphics.alpha = 0.1;
                    // this.removeChild(enemy.graphics);
                    var hitEnemy = enemies.splice(z, 1)[0];
                    this.removeChild(hitEnemy.graphics);
                    this._enemies.amount--;
                    // this.score.update(5);
                    this.hud().score.update(5);
                }
            }
        }
    }.bind(this));

    PixiGame.world.on('endContact', function(e) {

        //player
        if (e.bodyB.id === player.body.id || e.bodyA.id === player.body.id) {
            var hitShield = player.graphics.getChildAt(3);
            hitShield.alpha = 0;
        }
    }.bind(this));

    // test game conditions
    if (player.health < 0) {
        console.log('game over');
        PixiGame.score = player.score;
        this.gameEnd();
    }
};

PixiGame.GameScene.prototype.gameEnd = function(event) {
    PixiGame.sceneController.requestSceneChange(PixiGame.EndGameScene);
};

PixiGame.GameScene.prototype.destroy = function() {
    this.removeChildren();
};
