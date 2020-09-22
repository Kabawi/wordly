// import { getWordData } from './../dataRetrieval.js';

//Bubble Specs
let size = {width: 170, height: 75}
let focusBubbleIdle = "#E7BB29";
let bubbleIdleColour = "white";
let bubbleHoverColour = "grey"

let firstRadiusCount = 6;
let firstRadiusDegrees = 360 / firstRadiusCount;

let secondRadiusCount = 8;
let secondRadiusDegrees = 360 / secondRadiusCount;


// let draw = 
// let bubbleObj

function getDraw() {

    // draw = document.getElementById('navigator');
    // let bubbleObj = SVG(navigator);
}

export function createFocusBubble(draw, value, pos) {
    return createBubble(draw, value, pos, true);
}

export function createBubble(draw, value, pos, focusing) {
    //Draw Bubble
    let bubbleEllipse = draw.ellipse(size.width, size.height)
    .move(pos.x - size.width / 2, draw.height() - pos.y - size.height / 2)
    .stroke({width: 2, color: "black"})
    

    //Draw Label & Text
    let bubbleLabel;
    if(focusing) {
        bubbleLabel = drawLabel(draw, value.word, bubbleEllipse);
        bubbleEllipse.fill(focusBubbleIdle);
    } else {
        bubbleLabel = drawLabel(draw, value, bubbleEllipse);
        bubbleEllipse.fill(bubbleIdleColour)
    }

    //Create Bubble Object
    let bubbleObj = {wordObj: value, ellipse: bubbleEllipse, label: bubbleLabel};
    return bubbleObj;
}

function ignoreLabelPointer() {
    // draw.setAttribute("display", "block")
    // let text = document.querySelector('text')
    // text.setAttribute("pointer-events", "none");//.attr("pointer-events: none")

    // bubbleLabel.off('mouseover','mouseleave')
}

function drawLabel(draw, value, ellipse) {
    let label = draw.text(value)
    .font({'size':'22px','anchor':'middle'})
    .move(ellipse.width() / 2 + ellipse.x(), ellipse.height() / 3 + ellipse.y());

    return label;
}

export function createAssociateBubbles(draw, focusBubble, associations) {
    let associateBubbles = []

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
                    position = findPositionAroundFocus(150, focusBubble, radiusDegrees, i, 1.5, 0, 90);
                } else {
                    position = findPositionAroundFocus(150, focusBubble, firstRadiusDegrees, i, 1.5, 0, 90);
                }

                let associateBubble = createBubble(draw, association, position, false);
                associateBubbles.push(associateBubble);
            }

            // Second Radius
            else if (i < (firstRadiusCount + secondRadiusCount)) {
                if (associations.length < firstRadiusCount + secondRadiusCount) {
                    position = findPositionAroundFocus(280, focusBubble, radiusDegrees, i, 1.4, 0, 90);
                } else {
                    position = findPositionAroundFocus(280, focusBubble, secondRadiusDegrees, i, 0, 0, 90);
                }   

                let associateBubble = createBubble(draw, association, position, false);
                associateBubbles.push(associateBubble);
            }
        })

        return associateBubbles;
    }
}

export function findPositionAroundFocus(radius, focusBubble, degrees, index, xOffset = 0, yOffset = 0, angleOffset = 0) {
    let x = 0;
    let y = 0;
    let i = index + 1;

    let xRadius = radius;
    let yRadius = radius

    if(xOffset != 0) {
        xRadius *= xOffset;
    }

    if(yOffset != 0) {
        yRadius *= yOffset;
    }

    x = xRadius * Math.cos(getRadians(angleOffset + degrees * i)) + (focusBubble.ellipse.x() + focusBubble.ellipse.width() / 2);
    y = yRadius * Math.sin(getRadians(angleOffset + degrees * i)) + (focusBubble.ellipse.y() + focusBubble.ellipse.height() / 2);

    return {x: x, y: y};
}


function getRadians(degrees) {
    let radians = degrees * Math.PI;
    radians = radians / 180;
    return radians;
}

export { bubbleIdleColour, bubbleHoverColour }