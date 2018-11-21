let filePath = './openthesaurus.txt';
const inputParams = process.argv;
const synonyms = [];


if (inputParams.length > 2) {
    if (inputParams[2] === '-i') {
        console.log('Interactive mode not available');
    } else {
        getWords();
        getSynonyms();
        //    printSynonyms();
    }
} else {
    console.log('Please specify words');
}

function getWords() {
    for (let i = 2; i < inputParams.length; i++) {
        synonyms.push({ word: inputParams[i], synonyms: {} });
    }
}

function printSynonyms() {
    for (let syn of synonyms) {
        console.log(syn.word);
        for (let curSynonym of syn.synonyms) {
            console.log('  ' + curSynonym);
        }
    }
}

// I tried to push all synonyms into synonyms.synonyms and then print them on screen, but I had some problems

function getSynonyms() {
    let lineReader = require('readline').createInterface({
        input: require('fs').createReadStream(filePath)
    });
    lineReader.on('line', function (line) {
        for (let i = 0; i < synonyms.length; i++) {
            const syn = synonyms[i];
            if (line.includes(syn.word)) {
                const split = line.split(';');
                console.log(syn.word);
                for (let curSynonym of split) {
                    if (!curSynonym.includes(syn.word)) {
                        synonyms[i].synonyms = [];
                        synonyms[i].synonyms.push(curSynonym);
                        console.log('  ' + curSynonym);
                    }
                }
            }
        }
    });
}
