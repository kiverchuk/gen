// ==UserScript==
// ==RusoScript==
// @name         Editor
// @namespace    http://tampermonkey.net/
// @version      2024-02-19
// @description  try to take over the world!
// @author       You
// @match        https://randstuff.ru/number/g/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=randstuff.ru
// @grant        none
// ==/UserScript==
 var textarea = document.createElement('textarea');
    textarea.id = 'multiInput';
    textarea.placeholder = 'Введите данные с новой строки';
    textarea.style.width = '300px';
    textarea.style.height = '500px';
    textarea.style.display = 'block';

var numberRecordElement = document.getElementById('number-record');
numberRecordElement.insertAdjacentElement('afterend', textarea)

let data = getArrayFromCookie();
var numbersString = data.join('\n');
textarea.value = numbersString;
textarea.addEventListener('input', handleChange);

function handleChange() {
    saveArrayToCookie(textarea.value.split('\n').filter( key => !!key))
}


function saveArrayToCookie(arr) {
    document.cookie = "numbers=" + JSON.stringify(arr) + "; expires=Thu, 18 Dec 2025 12:00:00 UTC; path=/";
}
function getArrayFromCookie() {
    let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)numbers\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    if (cookieValue) {
        return JSON.parse(cookieValue);
    } else {
        return [];
    }
}
