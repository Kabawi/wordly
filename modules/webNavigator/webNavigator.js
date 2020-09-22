//Navigator Specs
import { createBubble, createAssociateBubbles } from './bubble.js';

let navigatorSize = {width: 1200, height: 800};

let draw = SVG(`navigator`);
draw.size(navigatorSize.width, navigatorSize.height)

let backgroundColour = "white"
let border;

let focusBubble = {};
let focusPosition = {x: navigatorSize.width / 2, y: navigatorSize.height / 2};

let associationCategory = 'synonyms';
let associations = []
let associateBubbles = []

export function setWord(wordObj) {
    drawToScreen(wordObj)
}

export function setCategory(category) {
    associationCategory = category;
    drawToScreen(focusBubble.wordObj);
}

function drawToScreen(wordObj) {
    draw.clear();
    border = draw.polyline(`0,0 0,${navigatorSize.height}, ${navigatorSize.width},${navigatorSize.height}, ${navigatorSize.width},0 0,0`).fill(backgroundColour).stroke({width: 4, color: "black"});
    focusBubble = createBubble(draw, wordObj, focusPosition, true);
    setAssociations(focusBubble);
}

function setAssociations(focusBubble) {
    associations = getAssociations(focusBubble.wordObj, associationCategory);
    if(associations != null) {
        associateBubbles = createAssociateBubbles(draw, focusBubble, associations);
    }
}

function getAssociations(word, category) {
    let newAssociations = []
    if(word.results.length > 0) {
        word.results.forEach((result) => {
            if(result[category] != null && result[category].length > 0) {
                result[category].forEach((element) => {
                    newAssociations.push(element);
                })
            }
        })

        newAssociations = [...new Set(newAssociations)]
        // console.log(newAssociations);
        return newAssociations;
    }
}
