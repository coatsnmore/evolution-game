PixiGame.GameLoopController = function() {
    this._isGameActive = false;
    this._fps = 60;
    this._updateInterval = null;
};

PixiGame.GameLoopController.constructor = PixiGame.GameLoopController;

PixiGame.GameLoopController.prototype.tick = function() {
    if (!this._isGameActive) {
        return;
    }

    requestAnimationFrame(this.tick.bind(this));

    // update physics
    PixiGame.sceneController.update();
    PixiGame.world.step(1 / this._fps);

    // render
    PixiGame.renderer.render(PixiGame.stage);
};

PixiGame.GameLoopController.prototype.start = function() {
    if (this._isGameActive) {
        return;
    }

    this._isGameActive = true;

    // Create the game loop
    // this._updateInterval = setInterval(function() {
    this.tick();
    // }.bind(this), 1000 / this._fps);

};

PixiGame.GameLoopController.prototype.pause = function() {
    if (!this._isGameActive) {
        return;
    }

    clearInterval(this._updateInterval);
    this._isGameActive = false;
};

Object.defineProperty(PixiGame.GameLoopController.prototype, 'isPaused', {
    get: function() {
        return !this._isGameActive;
    },
});
