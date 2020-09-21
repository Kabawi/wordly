import { getWordData } from './modules/dataRetrieval.js';
import { setCategory } from './modules/webNavigator/webNavigator.js';

getWordData('manifest');

window.onload = () => {
    document.querySelector("#categories").addEventListener("change", categoryDropdown);
}

function categoryDropdown(event) {
    setCategory(event.target.value);
}
