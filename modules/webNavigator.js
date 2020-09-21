// const blue = 1
// const red = 2
// export function navigator() {
//     console.log("Navigator Working!")
// }
// export { blue, red }


//Navigator Specs
let navigatorSize = {width: 1200, height: 800};
let draw = SVG('navigator').size(navigatorSize.width, navigatorSize.height);


//Bubble Specs
let bubbleSize = {width: 170, height: 75}
let bubbleColor = "grey";

export function drawNavigator() {
    let border = draw.polyline('0,0 0,800, 1200,800, 1200,0 0,0').fill("white").stroke({width: 4, color: "black"});
    let focusBubble = createFocusBubble("word");
}

function createFocusBubble(focusWord) {
    let focusPos = {x: navigatorSize.width / 2, y: navigatorSize.height / 2};
    let focusBubble = drawBubble(focusWord, focusPos);
}

function drawBubble(word, pos) {
    let bubble = draw.ellipse(bubbleSize.width, bubbleSize.height)
    .move(pos.x - bubbleSize.width / 2, navigatorSize.height - pos.y - bubbleSize.height / 2)
    .fill(bubbleColor)

    return bubble;
}