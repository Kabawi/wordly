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


//Temp Variables
let tempFocusWord = {
    word: "tempWord",
    results:[
    {
        definition: "i'm here temporarily!",
        partOfSpeech: "noun",
        synonyms: ["synonym1, synonym2, synonym3"],
        typeOf: ["template"]
    },
    {
        definition: "i'm also here temporarily, but differently!",
        partOfSpeech: "noun",
        synonyms: ["synonym4, synonym5, synonym6"],
        typeOf: ["template"]
    }
    ]
}


export function drawNavigator() {
    let border = draw.polyline('0,0 0,800, 1200,800, 1200,0 0,0').fill(backgroundColour).stroke({width: 4, color: "black"});

    let focusPos = {x: navigatorSize.width / 2, y: navigatorSize.height / 2};
    let focusBubble = createBubble(tempFocusWord, focusPos);

    if(tempFocusWord.results.length > 0) {
        console.log("Not empty.")
    }
}

function createBubble(value, pos) {
    //Draw Bubble
    let bubble = draw.ellipse(bubbleSize.width, bubbleSize.height)
    .move(pos.x - bubbleSize.width / 2, navigatorSize.height - pos.y - bubbleSize.height / 2)
    .stroke({width: 2, color: "black"})
    .fill(bubbleColour);

    //Draw Label & Text
    let label = drawLabel(value, bubble);

    let bubbleObject = {bubble: bubble, label: label};
    return bubbleObject;
}

function drawLabel(value, bubble) {
    let label = draw.text(value.word)
    .font({'size':'22px','anchor':'middle'})
    .move(bubble.width() / 2 + bubble.x(), bubble.height() / 3 + bubble.y());
}