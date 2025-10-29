document.addEventListener('DOMContentLoaded', function() {
    // Элемент книги
    const book = document.getElementById('book');

    // Управление размером шрифта
    const fontSizeControl = document.querySelector('.book__control_font-size');
    if (fontSizeControl) {
        fontSizeControl.addEventListener('click', function(event) {
            event.preventDefault();
            const target = event.target;
            if (!target.classList.contains('font-size')) return;

            // Убираем активный класс со всех кнопок размера
            this.querySelectorAll('.font-size_active').forEach(btn => {
                btn.classList.remove('font-size_active');
            });

            // Добавляем активный класс на clicked элемент
            target.classList.add('font-size_active');

            // Убираем все классы размера
            book.classList.remove('book_fs-small', 'book_fs-big');

            // Добавляем нужный класс в зависимости от data-size
            const size = target.dataset.size;
            if (size) {
                book.classList.add(`book_fs-${size}`);
            }
        });
    }

    // Управление цветом текста
    const textColorControl = document.querySelector('.book__control_color');
    if (textColorControl) {
        textColorControl.addEventListener('click', function(event) {
            event.preventDefault();
            const target = event.target;
            if (!target.classList.contains('color')) return;

            // Убираем активный класс со всех кнопок цвета текста
            this.querySelectorAll('.color_active').forEach(btn => {
                btn.classList.remove('color_active');
            });

            // Добавляем активный класс на clicked элемент
            target.classList.add('color_active');

            // Убираем все классы цвета текста
            book.classList.remove('book_color-gray', 'book_color-whitesmoke', 'book_color-black');

            // Добавляем нужный класс цвета текста
            const textColor = target.dataset.textColor;
            if (textColor) {
                book.classList.add(`book_color-${textColor}`);
            }
        });
    }

    // Управление цветом фона
    const bgColorControl = document.querySelector('.book__control_background');
    if (bgColorControl) {
        bgColorControl.addEventListener('click', function(event) {
            event.preventDefault();
            const target = event.target;
            if (!target.classList.contains('color')) return;

            // Убираем активный класс со всех кнопок цвета фона
            this.querySelectorAll('.color_active').forEach(btn => {
                btn.classList.remove('color_active');
            });

            // Добавляем активный класс на clicked элемент
            target.classList.add('color_active');

            // Убираем все классы цвета фона
            book.classList.remove('book_bg-gray', 'book_bg-black', 'book_bg-white');

            // Добавляем нужный класс цвета фона
            const bgColor = target.dataset.bgColor;
            if (bgColor) {
                book.classList.add(`book_bg-${bgColor}`);
            }
        });
    }
});