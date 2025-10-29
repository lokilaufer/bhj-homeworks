document.addEventListener('DOMContentLoaded', function() {
    const rotators = document.querySelectorAll('.rotator');

    rotators.forEach(rotator => {
        const cases = Array.from(rotator.querySelectorAll('.rotator__case'));
        let currentIndex = 0;

        function rotate() {
            // Скрываем текущий
            cases[currentIndex].classList.remove('rotator__case_active');

            // Следующий индекс (цикл)
            currentIndex = (currentIndex + 1) % cases.length;

            // Показываем следующий
            const nextCase = cases[currentIndex];
            nextCase.classList.add('rotator__case_active');

            // Применяем цвет из data-атрибута
            if (nextCase.dataset.color) {
                nextCase.style.color = nextCase.dataset.color;
            }

            // Следующая смена с указанной скоростью
            const speed = nextCase.dataset.speed || 1000;
            setTimeout(rotate, speed);
        }

        // Запускаем
        setTimeout(rotate, 1000);
    });
});