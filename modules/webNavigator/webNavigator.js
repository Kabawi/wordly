//Navigator Specs
import { createBubble, createAssociateBubbles, onHover } from './bubble.js';

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
    // console.log(`Category Change Hit: ${category}`);
    associationCategory = category;
    drawToScreen(focusBubble.wordObj);
}

function drawToScreen(wordObj) {
    // console.log("Drawing to Screen");
    draw.clear();
    border = draw.polyline(`0,0 0,${navigatorSize.height}, ${navigatorSize.width},${navigatorSize.height}, ${navigatorSize.width},0 0,0`).fill(backgroundColour).stroke({width: 4, color: "black"});
    focusBubble = createBubble(draw, wordObj, focusPosition, true);
    setAssociations(focusBubble);
    // onHover();
}

function setAssociations(focusBubble) {
    associations = getAssociations(focusBubble.wordObj, associationCategory);
    if(associations != null) {
        associateBubbles = createAssociateBubbles(draw, focusBubble, associations);
    }
}

function getAssociations(word, category) {
    console.log(category)
    let newAssociations = []
    // console.log(`Word: ${word.results}`);
    if(word.results.length > 0) {
        word.results.forEach((result) => {
            // console.log(result);
            // console.log(result[category]);
            if(result[category] != null && result[category].length > 0) {
                result[category].forEach((element) => {
                    newAssociations.push(element);
                })
            }
        })
        // console.log(`Associations to ${newAssociations}`)
        newAssociations = [...new Set(newAssociations)]
        // console.log(newAssociations);
        return newAssociations;
    }

    
}
