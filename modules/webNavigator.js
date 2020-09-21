// const blue = 1
// const red = 2
// export function navigator() {
//     console.log("Navigator Working!")
// }
// export { blue, red }

export function drawNavigator() {
    let navigatorSize = {width: 1200, height: 800}

    let draw = SVG('navigator').size(navigatorSize.width, navigatorSize.height);
    let backgroundColour = draw.rect(navigatorSize.width, navigatorSize.height).fill("black");
    
    console.log(backgroundColour.height())
}


