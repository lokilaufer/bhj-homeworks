document.addEventListener('DOMContentLoaded', function() {
    // Создаем элемент подсказки
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    document.body.appendChild(tooltip);

    // Обработчик клика на элементы с подсказкой
    document.addEventListener('click', function(event) {
        const target = event.target;

        // Проверяем, кликнули ли на элемент с подсказкой
        if (target.classList.contains('has-tooltip')) {
            event.preventDefault();

            // Скрываем предыдущую подсказку
            const activeTooltip = document.querySelector('.tooltip_active');
            if (activeTooltip) {
                activeTooltip.classList.remove('tooltip_active');
            }

            // Если кликнули на ту же подсказку - просто скрываем
            if (target === currentTooltipTarget) {
                currentTooltipTarget = null;
                return;
            }

            // Устанавливаем текст подсказки
            tooltip.textContent = target.getAttribute('title');

            // Позиционируем подсказку
            positionTooltip(tooltip, target);

            // Показываем подсказку
            tooltip.classList.add('tooltip_active');
            currentTooltipTarget = target;
        } else {
            // Скрываем подсказку при клике вне элемента
            const activeTooltip = document.querySelector('.tooltip_active');
            if (activeTooltip) {
                activeTooltip.classList.remove('tooltip_active');
                currentTooltipTarget = null;
            }
        }
    });

    let currentTooltipTarget = null;

    // Функция позиционирования подсказки
    function positionTooltip(tooltip, target) {
        const targetRect = target.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        const position = target.getAttribute('data-position') || 'top';

        let top, left;

        switch (position) {
            case 'top':
                top = targetRect.top - tooltipRect.height - 5;
                left = targetRect.left + (targetRect.width - tooltipRect.width) / 2;
                break;
            case 'bottom':
                top = targetRect.bottom + 5;
                left = targetRect.left + (targetRect.width - tooltipRect.width) / 2;
                break;
            case 'left':
                top = targetRect.top + (targetRect.height - tooltipRect.height) / 2;
                left = targetRect.left - tooltipRect.width - 5;
                break;
            case 'right':
                top = targetRect.top + (targetRect.height - tooltipRect.height) / 2;
                left = targetRect.right + 5;
                break;
        }

        // Корректируем позицию, чтобы подсказка не выходила за границы окна
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        if (left < 5) left = 5;
        if (left + tooltipRect.width > viewportWidth - 5) {
            left = viewportWidth - tooltipRect.width - 5;
        }
        if (top < 5) top = 5;
        if (top + tooltipRect.height > viewportHeight - 5) {
            top = viewportHeight - tooltipRect.height - 5;
        }

        tooltip.style.top = top + window.scrollY + 'px';
        tooltip.style.left = left + window.scrollX + 'px';
    }

    // Обработчик изменения размера окна
    window.addEventListener('resize', function() {
        if (currentTooltipTarget) {
            const activeTooltip = document.querySelector('.tooltip_active');
            if (activeTooltip) {
                positionTooltip(activeTooltip, currentTooltipTarget);
            }
        }
    });
});