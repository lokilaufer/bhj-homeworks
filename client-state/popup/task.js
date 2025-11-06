document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('subscribe-modal');
    const closeBtn = modal.querySelector('.modal__close');

    // Проверяем, было ли окно уже закрыто в localStorage
    const isModalClosed = localStorage.getItem('modalClosed');

    // Если в localStorage нет информации о закрытии, показываем окно
    if (!isModalClosed) {
        modal.classList.add('modal_active');
    }

    // Обработчик закрытия окна
    closeBtn.addEventListener('click', function() {
        // Скрываем окно
        modal.classList.remove('modal_active');

        // Сохраняем в localStorage, что окно было закрыто
        localStorage.setItem('modalClosed', 'true');
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
        localStorage.setItem('modalClosed', 'true');
    }
});