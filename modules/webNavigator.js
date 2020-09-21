// const blue = 1
// const red = 2
// export function navigator() {
//     console.log("Navigator Working!")
// }
// export { blue, red }


//Navigator Specs
let navigatorSize = {width: 1200, height: 800};
let draw = SVG('navigator').size(navigatorSize.width, navigatorSize.height);
let backgroundColour = "white"


//Bubble Specs
let bubbleSize = {width: 170, height: 75}
let bubbleColour = "white";

export function drawNavigator() {
    let border = draw.polyline('0,0 0,800, 1200,800, 1200,0 0,0').fill(backgroundColour).stroke({width: 4, color: "black"});

    let focusPos = {x: navigatorSize.width / 2, y: navigatorSize.height / 2};
    let focusBubble = createBubble("tempWord", focusPos);
}

function createBubble(word, pos) {
    
    //Draw Bubble
    let bubble = draw.ellipse(bubbleSize.width, bubbleSize.height)
    .move(pos.x - bubbleSize.width / 2, navigatorSize.height - pos.y - bubbleSize.height / 2)
    .stroke({width: 2, color: "black"})
    .fill(bubbleColour);

    //Draw Label & Text
    let label = drawLabel(word, bubble);

    let bubbleObject = {bubble: bubble, label: label};
    return bubbleObject;
}

function drawLabel(word, bubble) {
    let label = draw.text(word)
    .font({'size':'22px','anchor':'middle'})
    .move(bubble.width() / 2 + bubble.x(), bubble.height() / 3 + bubble.y());
}