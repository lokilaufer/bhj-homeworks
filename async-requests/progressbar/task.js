document.addEventListener('DOMContentLoaded', function() {
    const progress = document.getElementById('progress');
    const form = document.getElementById('form');

    // Обработчик отправки формы
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Предотвращаем стандартную отправку формы

        // Получаем файл из формы
        const fileInput = document.querySelector('input[type="file"]');
        const file = fileInput.files[0];

        if (!file) {
            alert('Пожалуйста, выберите файл для загрузки');
            return;
        }

        // Создаем FormData для отправки файла
        const formData = new FormData();
        formData.append('file', file);

        // Создаем XMLHttpRequest для отслеживания прогресса
        const xhr = new XMLHttpRequest();

        // Обработчик прогресса загрузки
        xhr.upload.addEventListener('progress', function(event) {
            if (event.lengthComputable) {
                const percentComplete = event.loaded / event.total;
                progress.value = percentComplete;
                console.log(`Прогресс загрузки: ${(percentComplete * 100).toFixed(2)}%`);
            }
        });

        // Обработчик завершения загрузки
        xhr.addEventListener('load', function() {
            if (xhr.status === 201) {
                alert('Файл успешно загружен!');
                progress.value = 0; // Сбрасываем прогресс
            } else {
                alert('Ошибка при загрузке файла: ' + xhr.statusText);
                progress.value = 0;
            }
        });

        // Обработчик ошибки
        xhr.addEventListener('error', function() {
            alert('Произошла ошибка сети');
            progress.value = 0;
        });

        // Обработчик отмены загрузки
        xhr.addEventListener('abort', function() {
            alert('Загрузка отменена');
            progress.value = 0;
        });

        // Настраиваем и отправляем запрос
        xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/upload');
        xhr.send(formData);
    });
});