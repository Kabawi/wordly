// const blue = 1
// const red = 2
// export function navigator() {
//     console.log("Navigator Working!")
// }
// export { blue, red }

export function drawNavigator() {
    let navigatorSize = {width: 1200, height: 800};
    let draw = SVG('navigator').size(navigatorSize.width, navigatorSize.height);
    // let corners = [];
    let border = draw.polyline('0,0 0,800, 1200,800, 1200,0 0,0').fill("white").stroke({width: 4, color: "black"});

}

function drawBubble() {
    let bubbleColour = "grey"
    // let focusBubble = draw.ellipse
}

