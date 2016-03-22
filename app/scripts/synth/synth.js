PixiGame.Synth = PixiGame.Synth || (function() {
    var notes = PixiGame.Notes.all;
    var context = {};

    var init = function() {
        createContext();
    };

    var playSong = function() {
        var duration = 0.5,
            startTime = context.currentTime,
            song = ['G3', 'A#3/Bb3', 'D#4/Eb4', 'G3', 'A#3/Bb3', 'G#3/Ab3', 'G3'],
            oscillatorType = 'sine',
            masterVolume = 0.1;

        for (var i = 0; i < song.length; i++) {
            play(song[i], startTime + duration * i, duration, oscillatorType, masterVolume);
        }
    };

    var playLaser = function() {

        var duration = 0.5,
            startTime = context.currentTime,
            song = ['A2'],
            oscillatorType = 'sawtooth',
            masterVolume = 0.1;

        for (var i = 0; i < song.length; i++) {
            play(song[i], startTime + duration * i, duration, oscillatorType, masterVolume);
        }
    };

    var createContext = function() {
        // var context = {};
        var ContextClass = (window.AudioContext ||
                window.webkitAudioContext ||
                window.mozAudioContext ||
                window.oAudioContext ||
                window.msAudioContext),
            buffer, thisSynth = this;
        if (ContextClass) {
            // Web Audio API is available.
            context = new ContextClass();
        } else {
            console.error('Browser does not support AudioContext, uh oh!');
        }

        // context;
    };

    var play = function(note, startTime, duration, type, volumeLevel) {
        var osc1 = context.createOscillator(),
            osc2 = context.createOscillator(),
            volume = context.createGain(),
            frequency = notes[note];

        volume.gain.value = volumeLevel;

        // Set oscillator wave type
        osc1.type = type;
        osc2.type = type;

        // tune
        osc1.frequency.value = frequency;
        osc2.frequency.value = frequency - 3;

        // wire em up
        osc1.connect(volume);
        osc2.connect(volume);
        volume.connect(context.destination);

        // Fade out
        volume.gain.setValueAtTime(0.1, startTime + duration - 0.25);
        volume.gain.linearRampToValueAtTime(0, startTime + duration);

        // Start oscillators
        osc1.start(startTime);
        osc2.start(startTime);

        // Stop oscillators
        osc1.stop(startTime + duration);
        osc2.stop(startTime + duration);
    };

    return {
        playSong: playSong,
        playLaser: playLaser,
        init: init
    };
})();
