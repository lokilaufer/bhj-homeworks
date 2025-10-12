// Получаем элементы
const clickCounter = document.getElementById('clicker__counter');
const cookie = document.getElementById('cookie');

// Переменная для отслеживания текущего размера печеньки
let isCookieBig = false;

// Обработчик клика по печеньке
cookie.addEventListener('click', function() {
    // Увеличиваем счетчик кликов
    let clicks = parseInt(clickCounter.textContent);
    clicks++;
    clickCounter.textContent = clicks;

    // Чередуем размер печеньки
    if (isCookieBig) {
        // Уменьшаем печеньку
        cookie.style.width = '200px';
    } else {
        // Увеличиваем печеньку
        cookie.style.width = '220px';
    }

    // Меняем состояние размера
    isCookieBig = !isCookieBig;
});