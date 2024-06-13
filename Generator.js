// ==UserScript==
// ==RusoScript==
// @name         Generator
// @namespace    http://tampermonkey.net/
// @version      2024-02-19
// @description  try to take over the world!
// @author       You
// @match        https://randstuff.ru/number/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=randstuff.ru
// @grant        none
// ==/UserScript==
let firstBtn = document.querySelector('#button')
let cloneBtn = null
let container = document.querySelector('#number')
let input_start = document.querySelector('#number-start')
let input_end = document.querySelector('#number-end')
let numbers = getArrayFromCookie();
duplicateButton()
setActiveOrigBtn(true)
document.querySelector('.support a').href = '/number/g'

cloneBtn.onclick = function(e){
    if(numbers.length <= 0){
        setActiveOrigBtn(true)
        firstBtn.click()
        return
    }
    let val = numbers.shift()
    work(val)
    if(numbers.length <= 0)
        setActiveOrigBtn(true)
}



function work(number){
    console.log('work')
    number = number.toString().split('');
    var html = '<span class="new">';
    let i = null;
    for (i = 0;  i < number.length; i ++) {
        html += '<span>' + number[i] + '</span>';
    }
    html += '</span>';
console.log(container)
    container.querySelectorAll('.new').forEach(function(element) {
        element.classList.remove('new');
        element.classList.add('cur');
    })
    //container.find('.cur').remove();
    container.querySelectorAll('.cur').forEach(function(element) {
        element.parentNode.removeChild(element);
    })
    //container.append(html);
    container.innerHTML += html;
    i = 1;
console.log("container.querySelectorAll('.new span')", container.querySelectorAll('.new span'))
    container.querySelectorAll('.new span').forEach(function(e) {
        console.log('e',e)
                            animateElement(e, parseInt(200/number.length)*(i ++), 200, 0, 250);
                                //.delay(parseInt(200/number.length)*(i ++))
                                //.animate({'bottom': 0}, 200, 'easeOutQuint');
                        })
        /*$(el)
            .delay(parseInt(200/number.length)*(i ++))
            .animate({'bottom': 0}, 200, 'easeOutQuint');*/
        //span.style.transitionDelay = parseInt(200 / newSpans.length * index) + 'ms';
        // Устанавливаем конечное положение для анимации
        //span.classList.add('animated-span');
    //});

    //save.html('<span>' + save.data('txt') + '</span>');
    //$('#pay-dialog').find('.save-link')
        //.attr('href', 'https://randstuff.ru/number/' + data.save + '/')
        //.text('https://randstuff.ru/number/' + data.save + '/');
    //$('#pay-dialog').find('form').attr('action', '/number/' + data.save + '/');
}


function animateElement(element, delay, fromValue, toValue, speed) {
    var startTime = Date.now() + delay;
    var duration = speed;

    // Функция сглаживания easeOutQuint
    function easeOutQuint(t) {
        return 1 + (--t) * t * t * t * t;
    }

    // Функция для анимации
    function animate() {
        var currentTime = Date.now();
        var elapsedTime = currentTime - startTime;

        if (elapsedTime < duration) {
            // Вычисляем прогресс анимации (от 0 до 1) с помощью easeOutQuint
            var progress = easeOutQuint(elapsedTime / duration);

            // Интерполируем значение bottom
            var currentValue = fromValue + (toValue - fromValue) * progress;

            // Устанавливаем значение bottom элемента
            element.style.bottom = currentValue + 'px';

            // Продолжаем анимацию
            requestAnimationFrame(animate);
        } else {
            // Если анимация завершена, устанавливаем окончательное значение
            element.style.bottom = toValue + 'px';
        }
    }

    // Запускаем анимацию с задержкой
    setTimeout(animate, delay);
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
function onRangeChenge(){
    let custom = parseInt(input_start.value) > 0 && parseInt(input_end.value) > 0
    console.log('custom', custom)
    setActiveOrigBtn(!custom)
}
input_start.addEventListener('input', onRangeChenge);
input_end.addEventListener('input', onRangeChenge);
function duplicateButton() {
    cloneBtn = firstBtn.cloneNode(true);
    firstBtn.parentNode.insertBefore(cloneBtn, firstBtn.nextSibling);
}
function setActiveOrigBtn(orig){
    firstBtn.style.display = orig ? 'block' : 'none';
    cloneBtn.style.display = !orig ? 'block' : 'none';
}
