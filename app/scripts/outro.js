document.addEventListener('DOMContentLoaded', function() {

    // Utilities first
    // Utils.optionFactory = new Utils.OptionFactory();

    // is there a better way to find w/h? does this work on mobile?
    PixiGame.width = document.documentElement.clientWidth;
    PixiGame.height = document.documentElement.clientHeight;

    // always auto detect
    PixiGame.renderer = new PIXI.autoDetectRenderer(PixiGame.width, PixiGame.height);
    PixiGame.renderer.view.setAttribute('class', 'renderer');
    document.body.appendChild(PixiGame.renderer.view);

    // create stage
    PixiGame.stage = new PIXI.Container();

    // startup Physics
    PixiGame.world = new p2.World({
        gravity: [0, 0]
    });

    // startup Controls
    PixiGame.controls = new PixiGame.Controller();

    // load initial scene
    PixiGame.sceneController = new PixiGame.SceneController(PixiGame.MainMenuScene);

    // Game state
    PixiGame.score = 0;
    PixiGame.highScore = 0;

    // Sounds
    PixiGame.Synth.init();

    // start game
    PixiGame.gameLoopController = new PixiGame.GameLoopController();
    PixiGame.gameLoopController.start();
});
