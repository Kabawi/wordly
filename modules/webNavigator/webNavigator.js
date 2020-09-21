//Navigator Specs
import { createBubble, createAssociateBubbles } from './bubble.js';

let navigatorSize = {width: 1200, height: 800};
let draw = SVG('navigator').size(navigatorSize.width, navigatorSize.height);
let backgroundColour = "white"
let border;

let focusBubble = {};
let focusPosition = {x: navigatorSize.width / 2, y: navigatorSize.height / 2};

let associationCategory = '';
let associations = []
let associateBubbles = []

//Temp Variables
let tempFocusWord = {
    word: "tempWord",
    results:[
    // {
    //     definition: "i'm here temporarily!",
    //     partOfSpeech: "noun",
    //     synonyms: ['synonym1', 'synonym2', 'synonym3'],
    //     typeOf: ["template"]
    // },
    // {
    //     definition: "i'm also here temporarily, but differently!",
    //     partOfSpeech: "noun",
    //     synonyms: ["synonym3", "synonym4", "synonym5", "synonym6"],
    //     typeOf: ["template"]
    // },
    // {
    //     definition: "i'm also here temporarily, but differently temporarily!",
    //     partOfSpeech: "noun",
    //     synonyms: ["synonym8", "synonym9", "synonym10", "synonym11", "synonym12", "synonym13", "synonym14"],
    //     typeOf: ["template"]
    // }
    ]
}

export function drawNavigator() {
    associationCategory = 'synonyms';
    setFocus(tempFocusWord);
}

export function setFocus(newWord) {
    draw.clear();
    border = draw.polyline('0,0 0,800, 1200,800, 1200,0 0,0').fill(backgroundColour).stroke({width: 4, color: "black"});
    focusBubble = createBubble(draw, newWord, focusPosition, true);

    associations = getAssociations(newWord, associationCategory);
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
        console.log(newAssociations);
        return newAssociations;
    }
}
