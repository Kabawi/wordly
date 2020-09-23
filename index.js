import { getWordData } from './modules/dataRetrieval.js';
import { setCategory } from './modules/webNavigator/webNavigator.js';


function getValueThenData(event) {
    event.preventDefault()
    const searchInput = document.getElementById("searchInput").value;
    console.log(`Input Recieved: ${searchInput}`);
    getWordData(searchInput);
}

window.onload = () => {
    document.querySelector("#categories").addEventListener("change", categoryDropdown);
    // document.querySelector("#categoryRadio").addEventListener("click", categoryDropdown);
    // document.getElementById("#chooseSynonyms").addEventListener("click", categoryDropdown);
    // document.getElementById("#chooseSimilarWords").addEventListener("click", categoryDropdown);
    // addCategoryRadio()
    document.getElementById("searchForm").onsubmit = getValueThenData;
    getWordData('word');
}

function categoryDropdown(event) {
    setCategory(event.target.value);
}

// function addCategoryRadio() {
//     let categoryRadioButtons = document.getElementById("categoryRadio").getElementsByName("options");
//     categoryRadioButtons.forEach(element => {
//         element.addEventListener("click", categoryDropdown);
//     });
// }