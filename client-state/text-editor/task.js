document.addEventListener('DOMContentLoaded', function() {
    const textEditor = document.getElementById('editor');

    // Загружаем сохраненный текст из localStorage
    const savedText = localStorage.getItem('textEditorContent');
    if (savedText) {
        textEditor.value = savedText;
    }

    // Сохраняем текст при каждом изменении
    textEditor.addEventListener('input', function() {
        localStorage.setItem('textEditorContent', this.value);
    });

    // Дополнительно: сохраняем при изменении фокуса
    textEditor.addEventListener('blur', function() {
        localStorage.setItem('textEditorContent', this.value);
    });

    // Дополнительно: обработка Ctrl+S для сохранения
    textEditor.addEventListener('keydown', function(event) {
        if (event.ctrlKey && event.key === 's') {
            event.preventDefault();
            localStorage.setItem('textEditorContent', this.value);
            showSaveNotification();
        }
    });

    // Функция для показа уведомления о сохранении
    function showSaveNotification() {
        const notification = document.createElement('div');
        notification.textContent = 'Текст сохранен!';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            z-index: 1000;
            transition: opacity 0.3s;
        `;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }
});