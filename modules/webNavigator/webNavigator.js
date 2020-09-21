//Navigator Specs
import { createBubble, createAssociateBubbles } from './bubble.js';


const navigator = document.querySelector('#navigator');
const navigatorStyle = getComputedStyle(navigator)

console.log(`${navigatorStyle.width}, ${navigatorStyle.height}`);

let navigatorSize = {width: 1200, height: 800};

// let navigatorSize = {width: navigatorStyle.width, height: navigatorStyle.height};

let draw = SVG('navigator').size(navigatorSize.width, navigatorSize.height);

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
    border = draw.polyline('0,0 0,800, 1200,800, 1200,0 0,0').fill(backgroundColour).stroke({width: 4, color: "black"});
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
