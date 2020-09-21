import { API_KEY } from './keys.js';

export function getWordData(word) {

    const results = {

        url: `https://wordsapiv1.p.rapidapi.com/words/${word}`,
        method: 'GET',
        headers: {
        'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com',
        'x-rapidapi-key': `${API_KEY}`
        }
    }

    axios(results) 
    .then(response => {
        const data = response.data
        console.log(data)
        console.log(data.word)
    
        //identify title of word
        let wordTitle = document.getElementById("wordTitle")
        //display title on page
        wordTitle.textContent = data.word
        
        //identify wordDef element
        let wordDef = document.getElementById("wordDef")
        //display data if available
        if (data.results) {
            console.log(data.results[0].definition)
            wordDef.textContent = `Definition: ${data.results[0].definition}`
        } else {
            wordDef.textContent = ''
        }
        //identify wordSyllable element
        let wordSyllables = document.getElementById("wordSyllables")
        //display data if available
        if (data.syllables) {
            console.log(data.syllables.count)
            wordSyllables.textContent = `number of syllables: ${data.syllables.count}`
            } else {
            wordSyllables.textContent = ''
            }
        //display frequency element
        let wordFreq = document.getElementById('wordFreq')
        //display data if available
        if (data.frequency) {
            wordFreq = textContent = `Frequency: ${data.frequency}`
        } else {
            wordFreq = ''
        }
    })  
}