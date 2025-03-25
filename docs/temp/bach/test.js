//returns index with the maximum value
function maxIndex (array) {
    var largestValueSoFar = -99999999.0;
    var largestIndexSoFar = -1;

    for (var i = 0; i < array.length; ++i) {
        if (array[i] > largestValueSoFar) {
            largestValueSoFar = array[i];
            largestIndexSoFar = i;
        }
    }

    return largestIndexSoFar;
}

function loadBinary(path, callback) {
    var request = new XMLHttpRequest();
    request.open("GET", "data.bin", true);
    request.responseType = "arraybuffer";

    request.onload = function (oEvent) {
        var arrayBuffer = request.response; // Note: not oReq.responseText
        if (arrayBuffer) {
            callback(arrayBuffer);
        }
    };

    request.send(null);
}

//given "(MIDI_NOTE,Tie)", returns [MIDI_NOTE, Tie]
function deserializeNoteToken(token) {
    var midiNote = parseInt(token.split(',')[0].substring(1), 10);
    var tie = token.split(',')[1].slice(0, -1) === 'True';

    return [midiNote, tie];
}

Module.onRuntimeInitialized = function () {
    loadBinary('data.bin', function (parameters) {
        parameters = new Float32Array(parameters);

        Module.ccall('initialize', null, [], []);

        var getUploadPointer = Module.cwrap('getUploadPointer', 'number', []);
        var useUploadedData = Module.cwrap('useUploadedData', null, []);
        var getOutputPointer = Module.cwrap('getOutputPointer', 'number', [])

        var currentPrediction = new Float32Array(107);

        var step = function (input) {
            Module.ccall('step', null, ['number'], [input])
            currentPrediction = Module.HEAPF32.subarray(getOutputPointer() >> 2, (getOutputPointer() >> 2) + 107);
        }


        var parametersBuffer = Module.HEAPF32.subarray(getUploadPointer() >> 2, (getUploadPointer() >> 2) + parameters.length);
        for (var i = 0; i < parameters.length; ++i) {
            parametersBuffer[i] = parameters[i];
        }

        useUploadedData();


        var start = new Date().getTime();


        lastIndex = TOKEN_TO_INDEX['START'];
        step(lastIndex);

        /*
        for (var i = 0; i < 500; ++i) {
        }

        var end = new Date().getTime();
        var time = end - start;
        console.log('Execution time: ' + (time / 500));
        */

        var synth = new Tone.PolySynth(124, Tone.Synth).toMaster();

        var scale = [67, 69, 71, 72, 74, 76, 77, 79, 81, 83, 84];
        //var scale = [72, 74, 76, 77, 79, 81, 83, 84];
        var indexInScale = 0;

        function playMostLikely3ThenBoundary(offset) {
            var done = false;

            for (var i = 0; i < 3; ++i) {

                var maskedPrediction = new Float32Array(currentPrediction);

                maskedPrediction[0] = -999999.0;
                maskedPrediction[TOKEN_TO_INDEX['START']] = -99999999.0
                maskedPrediction[TOKEN_TO_INDEX['END']] = -99999999.0

                token = deserializeNoteToken(INDEX_TO_TOKEN[maxIndex(maskedPrediction)])

                if (!token[1]) {
                    console.log(token[0]);

                    var delay = '+' + (offset * 0.2).toString();
                    console.log(delay);

                    synth.triggerAttackRelease(Tone.Frequency(token[0], 'midi'), "4n", delay);
                }

                step(maxIndex(maskedPrediction));
            }

            step(0)

        }

        document.addEventListener('keydown', function (event) {

            if (event.keyCode >= 49 && event.keyCode <= 57) {
                var midiNote = scale[event.keyCode - 49];

                synth.triggerAttackRelease(Tone.Frequency(midiNote, 'midi'), "4n");

                userIndex = TOKEN_TO_INDEX['(' + midiNote + ',False)']

                console.log(currentPrediction[userIndex])

                step(userIndex)
                playMostLikely3ThenBoundary(0);
                step(TOKEN_TO_INDEX['(' + midiNote + ',True)'])
                playMostLikely3ThenBoundary(1);
                step(TOKEN_TO_INDEX['(' + midiNote + ',True)'])
                playMostLikely3ThenBoundary(2);
                step(TOKEN_TO_INDEX['(' + midiNote + ',True)'])
                playMostLikely3ThenBoundary(3);
            }



            doneForThisStep = false;

/*
            while (!doneForThisStep) {
                token = step() 


                var outputBuffer = Module.HEAPF32.subarray(getOutputPointer() >> 2, (getOutputPointer() >> 2) + 107);
                console.log(i + ": " + maxIndex(outputBuffer));
                lastIndex = maxIndex(outputBuffer);
            }
*/


            var keyCode = event.keyCode;

        });


    });
}