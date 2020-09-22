
export function displayWordInfo(data) {
    
    const definitionsList = document.getElementById('definitionsList')
    definitionsList.innerHTML = ""

    // display definition adding each to an li element 
    data.results.forEach((result) => {
        // console.log(result.definition);
        let li = document.createElement("li")
        li.appendChild(document.createTextNode(result.definition))
        definitionsList.appendChild(li)
    })
    
}