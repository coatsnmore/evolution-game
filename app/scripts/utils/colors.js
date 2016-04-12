Utils.Colors = (function() {
    var options = function(type) {
        var color = {};
        color.background = 0xD4CCBC;

        switch (type) {
            case 'attack':
                color.font = 0xE34242;
                color.box = 0xE34242;
                break;
            case 'conversation':
                color.font = 0x4267E3;
                color.box = 0x4267E3;
                break;
            case 'menu':
                color.font = 0x000000;
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

    var hud = function(type) {
        var color = {
            background: 0xD4CCBC
        };
        return color;
    };

    var log = function(type) {
        var color = {
            background: 0xD4CCBC,
            font: 0x000000
        };
        return color;
    };

    var space = function() {
        var color = {
            stars: 0xE6EBED,
            planets: 0x48CBF7,
            player: {
              hull: 0xBAC6D6,
              outline: 0x0B3542,
              mainEngine: 0xF7ED60,
              shield: 0xF7ED60,
              cockpit: 0xBAA97B,
              indicator: 0xFF673D
            }
        };
        return color;
    };

    var turn = function(type) {
        var color = {
            background: 0xD4CCBC,
            font: 0x000000
        };
        return color;
    };

    return {
        options: options,
        health: health,
        hud: hud,
        log: log,
        turn: turn,
        space: space
    };
})();
