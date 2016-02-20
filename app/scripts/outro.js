document.addEventListener('DOMContentLoaded', function() {

	// is there a better way to find w/h? does this work on mobile?
	PixiGame.width = document.documentElement.clientWidth;
	PixiGame.height = document.documentElement.clientHeight;
	// console.log('width: ' + width);
	// console.log('height: ' + height);
	
	//
	PixiGame.renderer = new PIXI.autoDetectRenderer(PixiGame.width, PixiGame.height);
	PixiGame.renderer.view.setAttribute('class', 'renderer');
	document.body.appendChild(PixiGame.renderer.view);

	//
	PixiGame.stage = new PIXI.Container();

	//
	PixiGame.sceneController = new PixiGame.SceneController(PixiGame.MainMenuScene);

	//
	PixiGame.gameLoopController = new PixiGame.GameLoopController();
	PixiGame.gameLoopController.start();
});
