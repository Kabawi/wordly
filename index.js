import { blue, red, navigator } from './modules/webNavigator.js';
import { getWordData } from './modules/dataRetrieval.js';

getWordData('manifest');
navigator();

console.log(`${blue} ${red}`)

console.log("Index JS - Working.");
