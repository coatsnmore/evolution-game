PixiGame.HexScene = function() {
  PIXI.Graphics.call(this);
  this._menu = PixiGame.BaseScene.menu(this);
  var tilesX = 14,
    tilesY = 8;

  //init tilemap
  // var tilesArray = {};


  this._map = {
    container: new PIXI.Container(),
    tiles: {},
    tilesX: tilesX,
    tilesY: tilesY
  };

  //do this last
  this.setup();
};

PixiGame.HexScene.constructor = PixiGame.HexScene;
PixiGame.HexScene.prototype = Object.create(PIXI.Graphics.prototype);

PixiGame.HexScene.prototype.setup = function() {
  this.setupHexMap();
};

PixiGame.HexScene.prototype.setupHexMap = function() {

  // var tilesX = 8;
  // var tilesY = 12;
  var map = this._map;
  // var tiles = map.tiles();

  // hexagon
  var numberOfSides = 6,
    size = 40,
    Xcenter = size,
    Ycenter = size;

  map.selectHex = function(hex) {
    console.log('coords:  ' + hex.coords);
    hex.selected.alpha = 0.5;
    //unselect others
    for (var x = 1; x <= map.tilesX; x++) {
      for (var y = 1; y <= map.tilesY; y++) {
        var aHex = map.tiles['' + x + y];
        if (aHex !== hex) {
          aHex.selected.alpha = 0;
          aHex.option.alpha = 0;
        }

        // if ((Math.abs(x - hex.coords[0]) === 0) && (Math.abs(y - hex.coords[1]) === 1) ||
        //   (Math.abs(x - hex.coords[0]) === 1) && (Math.abs(y - hex.coords[1]) === 0)) {
        if (((hex.coords[0] % 2 === 0) &&
          ((x - hex.coords[0] === 0) && (y - hex.coords[1] === -1) )||
            ((x - hex.coords[0] === -1) && (y - hex.coords[1] === 0)) ||
            ((x - hex.coords[0] === 1) && (y - hex.coords[1] === 0)) ||
            ((x - hex.coords[0] === -1) && (y - hex.coords[1] === 1)) ||
            ((x - hex.coords[0] === 1) && (y - hex.coords[1] === 1)) ||
            ((x - hex.coords[0] === 0) && (y - hex.coords[1] === 1)
          )) || ((hex.coords[0] % 2 === 1) &&
            ((x - hex.coords[0] === 0) && (y - hex.coords[1] === -1)) ||
            ((x - hex.coords[0] === 1) && (y - hex.coords[1] === -1)) ||
          ((x - hex.coords[0] === 1) && (y - hex.coords[1] === 0)) ||
          ((x - hex.coords[0] === 0) && (y - hex.coords[1] === 1)) ||
          ((x - hex.coords[0] === -1) && (y - hex.coords[1] === 0)) ||
          ((x - hex.coords[0] === -1) && (y - hex.coords[1] === -1)))) {
          aHex.option.alpha = 0.25;
        }
      }
    }

  };

  for (var tx = 1; tx <= map.tilesX; tx++) {

    for (var ty = 1; ty <= map.tilesY; ty++) {
      var hex = new PIXI.Container();
      var hexShape = new PIXI.Graphics();
      var hexSelected = new PIXI.Graphics();
      var hexOption = new PIXI.Graphics();

      hexShape.moveTo(Xcenter + size, Ycenter);
      hexShape.lineStyle(2, 0x3C8025);

      for (var i = 1; i <= numberOfSides; i += 1) {
        hexShape.lineTo(Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides), Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides));
      }

      hex.addChild(hexShape);

      // selected overlay
      hexSelected.moveTo(Xcenter + size, Ycenter);
      hexSelected.lineStyle(2, 0x3C8025);
      hexSelected.beginFill(0x3C8025);

      for (var j = 1; j <= numberOfSides; j += 1) {
        hexSelected.lineTo(Xcenter + size * Math.cos(j * 2 * Math.PI / numberOfSides), Ycenter + size * Math.sin(j * 2 * Math.PI / numberOfSides));
      }
      // hexSelected = hexShape.clone();
      hexSelected.alpha = 0.0;
      hex.selected = hexSelected;
      hex.addChild(hexSelected);

      // option overlay
      hexOption.moveTo(Xcenter + size, Ycenter);
      hexOption.lineStyle(2, 0x4267E3);
      hexOption.beginFill(0x4267E3);

      for (var k = 1; k <= numberOfSides; k += 1) {
        hexOption.lineTo(Xcenter + size * Math.cos(k * 2 * Math.PI / numberOfSides), Ycenter + size * Math.sin(k * 2 * Math.PI / numberOfSides));
      }
      hexOption.alpha = 0.0;
      hex.option = hexOption;
      hex.addChild(hexOption);

      // text
      var hexText = new PIXI.Text(tx + ',' + ty, {
        font: 'bold 20px Arial',
        fill: 0x3C8025,
        align: 'center'
      });

      hexText.x = Xcenter;
      hexText.y = Ycenter;
      hexText.anchor.x = 0.5;
      hexText.anchor.y = 0.5;
      hexText.wordWrap = true;
      hexText.wordWrapWidth = 40;

      hex.addChild(hexText);

      hex.pivot.x = Xcenter;
      hex.pivot.y = Ycenter;

      hex.y = ty * size * Math.sqrt(3);
      hex.x = tx * (size * 3 / 2);
      // even column
      if ((tx % 2) === 0) {
        hex.y += size * Math.sqrt(3) / 2;
      }

      hex.coords = [tx, ty];
      hex.interactive = true;
      hex.shape = hexShape;
      hex.touchstart = hex.mousedown = map.selectHex.bind(this, hex);

      map.container.addChild(hex);
      map.tiles['' + tx + ty] = hex;


      // hex.y = ty * size * Math.sqrt(3) / 2;
      // hex.x = tx * size * 3;
    }

  }
  map.y = 100;

  this.addChild(map.container);
};

PixiGame.HexScene.prototype.update = function() {

};

PixiGame.HexScene.prototype.gameEnd = function(event) {
  PixiGame.sceneController.requestSceneChange(PixiGame.MainMenuScene);
};

PixiGame.HexScene.prototype.destroy = function() {
  this.removeChildren();
};
