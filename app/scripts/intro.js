/*jshint -W079*/

'use strict';

// Create a global reference to the game so we can reference it.
var PixiGame = PixiGame || {};

var Utils = Utils || {};

Utils.optionFactory = null;

// Used by pixi
PixiGame.stage = null;
PixiGame.renderer = null;

// Game Loop Controller
PixiGame.gameLoopController = null;

// Create a reference to the scene controller
PixiGame.sceneController = null;

// Physics
PixiGame.world = null;

// Controls
PixiGame.controls = null;
