document.addEventListener('DOMContentLoaded', function() {
    // Закрываем все dropdowns при клике вне их области
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.dropdown')) {
            closeAllDropdowns();
        }
    });

    // Обработчик для всех dropdown элементов
    document.addEventListener('click', function(event) {
        const dropdown = event.target.closest('.dropdown');
        if (!dropdown) return;

        const dropdownValue = dropdown.querySelector('.dropdown__value');
        const dropdownList = dropdown.querySelector('.dropdown__list');

        // Клик на кнопку
        if (event.target.classList.contains('dropdown__value')) {
            closeAllDropdowns();
            dropdownList.classList.toggle('dropdown__list_active');
        }

        // Клик на пункт меню
        if (event.target.classList.contains('dropdown__link')) {
            event.preventDefault();
            dropdownValue.textContent = event.target.textContent.trim();
            dropdownList.classList.remove('dropdown__list_active');
        }
    });

    function closeAllDropdowns() {
        document.querySelectorAll('.dropdown__list_active').forEach(list => {
            list.classList.remove('dropdown__list_active');
        });
    }
});