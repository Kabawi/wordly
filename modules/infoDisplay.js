
export function displayWordInfo(data) {
    //define and clear definitions list for each new word
    let definitionsList = document.getElementById('definitionsList')
    definitionsList.innerHTML = ""
    //set word title 
    document.getElementById("title").textContent = data.word
    document.getElementById("pronunce").textContent = data.pronunciation.all
    console.log(data)

    // display definition and partOfSpeech, adding each to an li element 
    data.results.forEach((result) => {
        // console.log(result.definition);
        // console.log(result.partOfSpeech);

        //create individual li element
        let listItem = document.createElement("li")
        //create word type heading
        let wordTypeDef = document.createElement("h6")
        //create definition paragraph
        let def = document.createElement("p")

        // listItem.appendChild(document.createTextNode(`${result.partOfSpeech}: ${result.definition}`))
        wordTypeDef.textContent = result.partOfSpeech
        def.textContent = result.definition
        //append each element to its parent
        listItem.appendChild(wordTypeDef)
        listItem.appendChild(def)
        definitionsList.appendChild(listItem)

    })
    
}