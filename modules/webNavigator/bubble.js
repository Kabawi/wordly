

//Bubble Specs
let size = {width: 170, height: 75}
let backgroundColour = "white";

export function createBubble(draw, value, pos, focusing) {
    //Draw Bubble
    let bubbleEllipse = draw.ellipse(size.width, size.height)
    .move(pos.x - size.width / 2, draw.height() - pos.y - size.height / 2)
    .stroke({width: 2, color: "black"})
    .fill(backgroundColour);

    //Draw Label & Text
    let bubbleLabel;
    if(focusing) {
        bubbleLabel = drawLabel(draw, value.word, bubbleEllipse);
    } else {
        bubbleLabel = drawLabel(draw, value, bubbleEllipse);
    }

    //Create Bubble Object
    let bubbleObj = {ellipse: bubbleEllipse, label: bubbleLabel};
    return bubbleObj;
}

function drawLabel(draw, value, ellipse) {
    let label = draw.text(value)
    .font({'size':'22px','anchor':'middle'})
    .move(ellipse.width() / 2 + ellipse.x(), ellipse.height() / 3 + ellipse.y());

    return label;
}

function setPosition(draw, bubbleObj, newPosition) {
    //find bubble in svg

    //set ellipse and label positions
}