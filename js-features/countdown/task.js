// Получаем элемент таймера
const timerElement = document.getElementById('timer');

// Получаем начальное значение таймера и преобразуем в число
let timeLeft = parseInt(timerElement.textContent);

// Функция для обновления таймера
function updateTimer() {
    // Уменьшаем время на 1 секунду
    timeLeft--;

    // Обновляем отображение таймера
    timerElement.textContent = timeLeft;

    // Проверяем, не истекло ли время
    if (timeLeft <= 0) {
        // Останавливаем таймер
        clearInterval(timerInterval);
        // Показываем сообщение о победе
        alert('Вы победили в конкурсе!');
    }
}

// Запускаем таймер с интервалом 1 секунда (1000 миллисекунд)
const timerInterval = setInterval(updateTimer, 1000);