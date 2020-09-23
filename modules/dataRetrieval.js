import { API_KEY } from './keys.js';
import { setWord } from './webNavigator/webNavigator.js';
import { displayWordInfo } from './infoDisplay.js';

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

        //Change Navigator Focus
        setWord(data);
        displayWordInfo(data);
    })  

    .catch((error) => { 
        console.error(error) 
        window.alert("looks like that isn't a word we have on file. Please try searching a different word.")
    })
}