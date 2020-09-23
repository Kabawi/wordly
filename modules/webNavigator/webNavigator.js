//Navigator Specs
import { getWordData } from './../dataRetrieval.js';
import { createFocusBubble, createAssociateBubbles, focusBubbleIdleColour, bubbleIdleColour, bubbleHoverColour, bubbleStrokeColour } from './bubble.js';

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
    // .stroke({width: 4, color: svgBorderColour}); // Border
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

function getBubbleEllipseCSSID(bubbleObj) {

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

    let timeOut = 500;

    // FadeInNewBackground(timeOut);
    FadeAllBubblesOutExcept(bubbleObj, timeOut);
    moveBubbleToCentre(bubbleObj, timeOut);
    fadeBubbleInToFocus(bubbleObj, timeOut);

    let wordString = bubbleObj.wordObj;
    console.log('New word: ' + bubbleObj.wordObj)
    setTimeout(() => { getWordData(wordString) }, timeOut);
}

function FadeAllBubblesOutExcept(bubbleObj, timeOut) {
    fadeBubbleOut(focusBubble, timeOut);
    associateBubbles.forEach((aBubbleObj) => {
        if(aBubbleObj != bubbleObj) {
            // addCSSIDToBubble(bubbleObj);
            fadeBubbleOut(aBubbleObj, timeOut);
        }
    })
}

function hoverOver() {
    this.fill(bubbleHoverColour);
}

function hoverOff() {
    this.fill(bubbleIdleColour);
}

// #endregion

//#region Animate Bubbles

function FadeInNewBackground(timeOut){
    let fadeInWhiteBox = draw.size(draw.width(), draw.height());

    fadeInWhiteBox.animate(timeOut)
    .fill("white");
}


function fadeBubbleOut(bubbleObj, timeOut) {

    // //JQUERY ATTEMPT
    bubbleObj.ellipse.id = 'bubble-fade-out'
    console.log(bubbleObj.ellipse)
    // $(`#bubble-fade-out`).fadeOut(timeOut);

    // bubbleObj.ellipse.attr({"bubble-fade-out"})

    // let cssID = document.getElementById(bubbleObj.ellipse.node.id)

    // console.log(`#${bubbleObj.ellipse.node.id}`)

    

    // SHRINKING
    bubbleObj.ellipse.animate(timeOut / 2)
    // .fill("white")
    .size(0, 0)
    .stroke({width: 0})

    console.log(bubbleObj.label)
    bubbleObj.label.animate(timeOut / 2)
    .size(0, 0)
}

function fadeBubbleInToFocus(bubbleObj, timeOut) {
    bubbleObj.ellipse.animate(timeOut)
    .fill(focusBubbleIdleColour)
}

function fadeBubbleIn(bubbleObj, timeOut) {

    let timeOutSeg = timeOut / 4
    // let opacity = 1

    for(let i = 1; i < 4; i++) {

        bubbleObj.ellipse.animate(timeOutSeg * (i+1))
        .fill(bubbleIdleColour)
        .stroke({width: 2})        

        bubbleObj.label.animate(timeOutSeg * (i+1))
        .font({'size':'0px'})
    }
}

// function addCSSIDToBubble(bubbleObj) {
//     bubbleObj.ellipse.node.classList.add('bubble-fade-out');
//     // bubbleObj.ellipse.node.setAttribute("bubble-fade-out", "class");
//     console.log(bubbleObj.ellipse)
// }


function moveBubbleToCentre(bubbleObj, timeOut) {

    let newEllipsePos= {
        x: svgCentre.x - bubbleObj.ellipse.width() / 2,
        y: draw.height() - svgCentre.y - bubbleObj.ellipse.height() / 2
    }

    bubbleObj.ellipse.animate(timeOut)
    .move(newEllipsePos.x, newEllipsePos.y)
    .fill("white")
    

    bubbleObj.label.animate(timeOut)
    .move(bubbleObj.ellipse.width() / 2 + newEllipsePos.x,
        bubbleObj.ellipse.height() / 3 + newEllipsePos.y);
}

//#endregion