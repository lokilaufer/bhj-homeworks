// Функция для проверки видимости элемента
function isElementVisible(element) {
    const rect = element.getBoundingClientRect();

    // Элемент считается видимым, если он находится в пределах окна просмотра
    // с небольшим запасом (например, 100px до появления)
    return (
        rect.top <= (window.innerHeight - 100) &&
        rect.bottom >= 0
    );
}

// Функция для обработки появления элементов
function handleReveal() {
    const revealElements = document.querySelectorAll('.reveal');

    revealElements.forEach(element => {
        if (isElementVisible(element) && !element.classList.contains('reveal_active')) {
            element.classList.add('reveal_active');
        }
    });
}

// Обработчик события прокрутки
window.addEventListener('scroll', handleReveal);

// Также проверяем элементы при загрузке страницы
document.addEventListener('DOMContentLoaded', handleReveal);