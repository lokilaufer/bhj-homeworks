document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('subscribe-modal');
    const closeBtn = modal.querySelector('.modal__close');

    // Функция для получения cookie по имени
    function getCookie(name) {
        const cookies = document.cookie.split('; ');
        const cookie = cookies.find(row => row.startsWith(name + '='));
        return cookie ? cookie.split('=')[1] : null;
    }

    // Функция для установки cookie
    function setCookie(name, value, days = 365) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    // Проверяем, было ли окно уже закрыто в cookies
    const isModalClosed = getCookie('modalClosed');

    // Если в cookies нет информации о закрытии, показываем окно
    if (!isModalClosed) {
        modal.classList.add('modal_active');
    }

    // Обработчик закрытия окна
    closeBtn.addEventListener('click', function() {
        closeModal();
    });

    // Дополнительные функции закрытия
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.classList.contains('modal_active')) {
            closeModal();
        }
    });

    function closeModal() {
        modal.classList.remove('modal_active');
        setCookie('modalClosed', 'true', 365); // Сохраняем на 1 год
    }
});