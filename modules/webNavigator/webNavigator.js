//Navigator Specs
import { createBubble, findPositionAroundFocus } from './bubble.js';

let navigatorSize = {width: 1200, height: 800};
let draw = SVG('navigator').size(navigatorSize.width, navigatorSize.height);
let backgroundColour = "white"

let firstRadiusCount = 6;
let firstRadiusDegrees = 360 / firstRadiusCount;

let secondRadiusCount = 8;
let secondRadiusDegrees = 360 / secondRadiusCount;

let focusBubble = {};
let focusPosition = {x: navigatorSize.width / 2, y: navigatorSize.height / 2};

let associationCategory = '';
let associations = []

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
    let border = draw.polyline('0,0 0,800, 1200,800, 1200,0 0,0').fill(backgroundColour).stroke({width: 4, color: "black"});

    focusBubble = createBubble(draw, tempFocusWord, focusPosition, true);

    associationCategory = "synonyms";
    associations = getAssociations(tempFocusWord, associationCategory);

    if(associations != null) {
        createRelations(focusBubble, associations)
    }
}

//////      Category Relations         //////

export function setFocus(newWord) {
    // console.log('Changed focus word to ' + newWord.word)

    // console.log(newWord)
    
    draw.clear();
    focusBubble = createBubble(draw, newWord, focusPosition, true);
    createRelations(focusBubble, getAssociations(newWord, associationCategory));
}

function getAssociations(word, category) {
    let associations = []

    if(word.results.length > 0) {
        word.results.forEach((result) => {
            if(result[category] != null && result[category].length > 0) {
                result[category].forEach((element) => {
                    associations.push(element);
                })
            }
        })

        associations = [...new Set(associations)]
        console.log(associations);
        return associations;
    }
}

function createRelations(focusBubble, associations) {
    if(associations.length > 0) {
        let radiusDegrees = firstRadiusDegrees
        
        if(associations.length < firstRadiusCount) {
            radiusDegrees = 360 / associations.length;
        } else if (associations.length < firstRadiusCount + secondRadiusCount) {
            radiusDegrees = 360 / (associations.length - firstRadiusCount);
        }

        associations.forEach((association, i) => {
            let position = {};

            //First Radius
            if(i < firstRadiusCount) {
                if(associations.length < firstRadiusCount){
                    position = findPositionAroundFocus(150, focusBubble, radiusDegrees, i, 90);
                } else {
                    position = findPositionAroundFocus(150, focusBubble, firstRadiusDegrees, i, 90);
                }
                createBubble(draw, association, position, false);
            }

            // Second Radius
            else if (i < (firstRadiusCount + secondRadiusCount)) {
                if (associations.length < firstRadiusCount + secondRadiusCount) {
                    console.log("hit")
                    position = findPositionAroundFocus(300, focusBubble, radiusDegrees, i, 90);
                } else {
                    position = findPositionAroundFocus(300, focusBubble, secondRadiusDegrees, i, 90);
                }
                createBubble(draw, association, position, false);

            } else {
                return;
            }
        })
    }
}
