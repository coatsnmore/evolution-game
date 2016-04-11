PixiGame.Controller = function(Scene) {

  this._state = {
    left: false,
    right: false,
    up: false,
    fire: false,
    strafeLeft: false,
    strafeRight: false
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

    // Keyboard
    case 87: //W
      this._state.up = state;
      break;
    case 65: //A
      this._state.left = state;
      break;
    case 68: //D
      this._state.right = state;
      break;
    case 81: //Q
      this._state.strafeLeft = state;
      break;
    case 69: //E
      this._state.strafeRight = state;
      break;

      // D - PAD
    case 37: //left
      this._state.left = state;
      break;
    case 39: //right
      this._state.right = state;
      break;
    case 38: //87
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
