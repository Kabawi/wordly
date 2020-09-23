
export function displayWordInfo(data) {
    
    const definitionsList = document.getElementById('definitionsList')
    definitionsList.innerHTML = ""
    document.getElementById("title").textContent = `${data.word}`
    console.log(data)

    // display definition and partOfSpeech, adding each to an li element 
    data.results.forEach((result) => {
        console.log(result.definition);
        console.log(result.partOfSpeech);
        let li = document.createElement("li")

        li.appendChild(document.createTextNode(`${result.partOfSpeech}: ${result.definition}`))
        definitionsList.appendChild(li)
        

    })
    
}