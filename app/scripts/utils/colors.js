Utils.Colors = (function(){
  var options = function(type) {
    var color = {};
    switch(type){
      case 'attack':
        color.font = 0xE34242;
        color.box = 0xE34242;
        break;
      case 'conversation':
        color.font = 0x4267E3;
        color.box = 0x4267E3;
        break;
      case 'menu':
        color.font = 0x353D57;
        color.box = 0x000000;
        break;
      case 'trade':
        color.font = 0x3C8025;
        color.box = 0x3C8025;
        break;
      default:
        color.font = 0x000000;
        color.box = 0x000000;
    }
    return color;
  };

  var health = function(type) {
    var color = {
      max: 0xD4909F,
      actual: 0xC1D490,
      font: 0x000000,
      border: 0x000000
    };
    return color;
  };

  return {options: options, health: health};
})();
