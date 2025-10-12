// Функция для получения лунки по индексу
function getHole(index) {
    return document.getElementById(`hole${index}`);
}

// Получаем элементы счетчиков
const deadCounter = document.getElementById('dead');
const lostCounter = document.getElementById('lost');

// Функция для сброса игры
function resetGame() {
    deadCounter.textContent = '0';
    lostCounter.textContent = '0';
}

// Регистрируем обработчики событий для всех лунок
for (let i = 1; i <= 9; i++) {
    const hole = getHole(i);
    hole.onclick = function() {
        // Проверяем, есть ли в лунке крот
        if (this.classList.contains('hole_has-mole')) {
            // Увеличиваем счетчик убитых кротов
            let dead = parseInt(deadCounter.textContent) + 1;
            deadCounter.textContent = dead;

            // Проверяем условие победы (10 кротов)
            if (dead >= 10) {
                alert('Поздравляем! Вы выиграли!');
                resetGame();
            }
        } else {
            // Увеличиваем счетчик промахов
            let lost = parseInt(lostCounter.textContent) + 1;
            lostCounter.textContent = lost;

            // Проверяем условие проигрыша (5 промахов)
            if (lost >= 5) {
                alert('К сожалению, вы проиграли!');
                resetGame();
            }
        }
    };
}