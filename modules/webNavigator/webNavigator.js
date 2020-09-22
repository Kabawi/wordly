//Navigator Specs
import { getWordData } from './../dataRetrieval.js';
import { createFocusBubble, createAssociateBubbles, bubbleIdleColour, bubbleHoverColour } from './bubble.js';

// SVG Canvas
let svgSize = {width: 1100, height: 800};
let svgCentre = {x: svgSize.width / 2, y: svgSize.height / 2};

let svgBackground;
let svgBackgroundColour = "white"
let svgBorderColour = "black"
let draw = SVG(`navigator`).size(svgSize.width, svgSize.height)

// Bubbles
let focusBubble = {};
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

//#region Drawing

function drawToScreen(wordObj) {
    draw.clear();

    drawBackgroundAndBorder();
    
    drawFocusBubble(wordObj);
    drawAssociateBubbles();

    bubbleInteractLoop();
}

function drawBackgroundAndBorder() {
    svgBackground = draw.polyline(`0,0 0,${svgSize.height}, ${svgSize.width},${svgSize.height}, ${svgSize.width},0 0,0`)
    .fill(svgBackgroundColour) // Background
    .stroke({width: 4, color: svgBorderColour}); // Border
}

function drawFocusBubble(wordObj) {
    focusBubble = createFocusBubble(draw, wordObj, svgCentre);
}

function drawAssociateBubbles() {    
    retrieveAssociationData(focusBubble.wordObj, associationCategory);
    if(associations && associations.length > 0) {
        associateBubbles = createAssociateBubbles(draw, focusBubble, associations);
    }
    else {
        throw "No Associations Found."
    }
}

//#endregion

// #region Data Retrieval

function retrieveAssociationData(wordObj, category) {
    associations = []
    if(wordObj.results.length > 0) {
        // console.log(wordObj.results)
        wordObj.results.forEach((result) => {
            // console.log(result[category])
            if(result[category] && result[category].length > 0) {
                result[category].forEach((element) => {
                    console.log(`- ${category}: ${element}`)
                    associations.push(element);
                })
            }
        })

        associations = [...new Set(associations)]
    }
}

// #endregion

//#region Search Functions

function findBubbleFromEllipse(ellipseID) {
    for(let bubble of associateBubbles) {
        if(bubble.ellipse.node.id === ellipseID) {
            return bubble;
        }
    }

    console.log('EllipseID: ' + ellipseID + ' not found')
}

function findBubbleFromText(textID) {
    for(let bubble of associateBubbles) {
        if(bubble.label.node.id === textID) {
            return bubble;
        }
    }
    console.log('TextID: ' + textID + ' not found')
}

// #endregion

// #region Mouse Interaction

function bubbleInteractLoop() {
    associateBubbles.forEach((bubble, i) => {
        bubbleInteract(bubble);
    })
}

function bubbleInteract(bubble) {        
    bubble.ellipse.on('click', clickOn);    
    bubble.ellipse.on('mouseover', hoverOver);
    bubble.ellipse.on('mouseleave', hoverOff);
}
    
function clickOn() {
    console.log('Clicked On: ' + this.node.id);

    let bubbleObj = findBubbleFromEllipse(this.node.id);

    let timeOut = 1200;

    moveBubbleToCentre(bubbleObj, timeOut);

    let wordString = bubbleObj.wordObj;
    console.log('New word: ' + bubbleObj.wordObj)
    setTimeout(() => { getWordData(wordString) }, timeOut);
}

function hoverOver() {
    this.fill(bubbleHoverColour);
}

function hoverOff() {
    this.fill(bubbleIdleColour);
}

// #endregion

//#region Animate Bubbles

function fadeBubbleOut(bubbleObj, timeOut) {

}

function fadeBubbleIn(bubbleObj, timeOut) {

}

function moveBubbleToCentre(bubbleObj, timeOut) {

    let newEllipsePos= {
        x: svgCentre.x - bubbleObj.ellipse.width() / 2,
        y: draw.height() - svgCentre.y - bubbleObj.ellipse.height() / 2
    }

    bubbleObj.ellipse.animate(timeOut)
    .move(newEllipsePos.x, newEllipsePos.y)

    bubbleObj.label.animate(timeOut)
    .move(bubbleObj.ellipse.width() / 2 + newEllipsePos.x,
        bubbleObj.ellipse.height() / 3 + newEllipsePos.y);
}

//#endregion