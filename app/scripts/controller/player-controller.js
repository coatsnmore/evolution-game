PixiGame.Controller = function(Scene) {

    this._state = {
        left: false,
        right: false,
        up: false,
        fire: false
    };
    this.setupPlayerControls();
};

PixiGame.Controller.constructor = PixiGame.Controller;

PixiGame.Controller.prototype.setupPlayerControls = function() {

    // setup PC keyboard interaction
    window.addEventListener('keydown', function(e) {
        this.changeControls(e.keyCode, true);
    }.bind(this), false);

    window.addEventListener('keyup', function(e) {
        this.changeControls(e.keyCode, false);
    }.bind(this), false);
};

PixiGame.Controller.prototype.changeControls = function(code, state) {

    // console.log('key code: ' + code);
    switch (code) {
        case 37:
            this._state.left = state;
            break;
        case 39:
            this._state.right = state;
            break;
        case 38:
            this._state.up = state;
            break;
        case 32:
            this._state.fire = state;
            break;
    }
};

PixiGame.Controller.prototype.state = function() {
    return this._state;
};
