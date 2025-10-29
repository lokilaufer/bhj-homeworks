document.addEventListener('DOMContentLoaded', function() {
    // Находим все контейнеры с вкладками на странице
    const tabContainers = document.querySelectorAll('.tab__navigation');

    tabContainers.forEach(container => {
        // Находим все вкладки и содержимое внутри текущего контейнера
        const tabs = container.querySelectorAll('.tab');
        const tabContents = container.closest('.container')?.querySelectorAll('.tab__content') ||
                           container.parentElement.querySelectorAll('.tab__content');

        // Добавляем обработчики для каждой вкладки
        tabs.forEach((tab, index) => {
            tab.addEventListener('click', function() {
                // Удаляем активные классы у всех вкладок и содержимого
                tabs.forEach(t => t.classList.remove('tab_active'));
                tabContents.forEach(content => content.classList.remove('tab__content_active'));

                // Добавляем активные классы текущей вкладке и соответствующему содержимому
                this.classList.add('tab_active');
                if (tabContents[index]) {
                    tabContents[index].classList.add('tab__content_active');
                }
            });
        });
    });
});