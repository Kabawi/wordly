//Navigator Specs
import { createBubble } from './bubble.js';

let navigatorSize = {width: 1200, height: 800};
let draw = SVG('navigator').size(navigatorSize.width, navigatorSize.height);
let backgroundColour = "white"

let firstRadiusCount = 4;
let firstRadiusDegrees = 360 / firstRadiusCount;

//Temp Variables
let tempFocusWord = {
    word: "tempWord",
    results:[
    {
        definition: "i'm here temporarily!",
        partOfSpeech: "noun",
        synonyms: ['synonym1', 'synonym2', 'synonym3'],
        typeOf: ["template"]
    },
    {
        definition: "i'm also here temporarily, but differently!",
        partOfSpeech: "noun",
        synonyms: ["synonym3", "synonym4", "synonym5", "synonym6"],
        typeOf: ["template"]
    }
    ]
}

export function drawNavigator() {
    let border = draw.polyline('0,0 0,800, 1200,800, 1200,0 0,0').fill(backgroundColour).stroke({width: 4, color: "black"});

    let focusPosition = {x: navigatorSize.width / 2, y: navigatorSize.height / 2};
    let focusBubble = createBubble(draw, tempFocusWord, focusPosition, true);

    let associationCategory = "synonyms";
    let associations = getAssociations(associationCategory);

    createRelations(focusBubble, associations)
}

//////      Category Relations         //////

function createRelations(focusBubble, associations) {
    associations.forEach((association, i) => {
        let position = findPositionAroundFocus(200, focusBubble, firstRadiusDegrees, i);
        createBubble(draw, association, position, false);
    })
}

function getAssociations(category) {
    let associations = []

    if(tempFocusWord.results.length > 0) {
        tempFocusWord.results.forEach((result) => {
            if(result[category].length > 0) {
                result[category].forEach(( element) => {
                    associations.push(element);
                })
            }
        })

        associations = [...new Set(associations)]
        console.log(associations);
        return associations;
    }
}

function findPositionAroundFocus(radius, focusBubble, degrees, index) {
    let x = 0;
    let y = 0;
    let i = index + 1;

    let horizontalExtension = 1.5;

    x = (radius * horizontalExtension) *  Math.cos(getRadians(degrees * i)) + (focusBubble.ellipse.x() + focusBubble.ellipse.width() / 2);
    y = radius *  Math.sin(getRadians(degrees * i)) + (focusBubble.ellipse.y() + focusBubble.ellipse.height() / 2);

    return {x: x, y: y};
}

function getRadians(degrees) {
    let radians = degrees * Math.PI;
    radians = radians / 180;
    return radians;
}