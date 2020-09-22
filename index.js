import { getWordData } from './modules/dataRetrieval.js';
import { setCategory } from './modules/webNavigator/webNavigator.js';


function getValueThenData(event) {
    event.preventDefault()
    const searchInput = document.getElementById("searchInput").value;
    console.log(searchInput);
    getWordData(searchInput);
}

window.onload = () => {
    document.querySelector("#categories").addEventListener("change", categoryDropdown);
    document.getElementById("searchForm").onsubmit = getValueThenData;
}

function categoryDropdown(event) {
    setCategory(event.target.value);
}
