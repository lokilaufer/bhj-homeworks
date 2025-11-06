document.addEventListener('DOMContentLoaded', function() {
    const signinForm = document.getElementById('signin__form');
    const signinBlock = document.getElementById('signin');
    const welcomeBlock = document.getElementById('welcome');
    const userIdSpan = document.getElementById('user_id');
    const signinBtn = document.getElementById('signin__btn');

    // Проверяем, есть ли сохраненный пользователь
    const savedUserId = localStorage.getItem('user_id');
    if (savedUserId) {
        showWelcomeScreen(savedUserId);
    }

    // Обработчик отправки формы
    signinForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(this);
        const login = formData.get('login');
        const password = formData.get('password');

        // Базовая валидация
        if (!login || !password) {
            alert('Пожалуйста, заполните все поля');
            return;
        }

        // Блокируем кнопку во время запроса
        signinBtn.disabled = true;
        signinBtn.textContent = 'Вход...';

        // Отправляем запрос на сервер
        fetch('https://students.netoservices.ru/nestjs-backend/auth', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка сети');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                // Сохраняем ID пользователя
                localStorage.setItem('user_id', data.user_id);
                showWelcomeScreen(data.user_id);
            } else {
                alert('Неверный логин/пароль');
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
            alert('Произошла ошибка при авторизации');
        })
        .finally(() => {
            // Разблокируем кнопку
            signinBtn.disabled = false;
            signinBtn.textContent = 'Войти';
        });
    });

    function showWelcomeScreen(userId) {
        // Устанавливаем ID пользователя
        userIdSpan.textContent = userId;

        // Показываем блок приветствия, скрываем форму
        welcomeBlock.classList.add('welcome_active');
        signinBlock.classList.remove('signin_active');

        // Очищаем форму
        signinForm.reset();
    }

    // Дополнительно: функция выхода (опционально)
    function logout() {
        localStorage.removeItem('user_id');
        welcomeBlock.classList.remove('welcome_active');
        signinBlock.classList.add('signin_active');
    }

    // Можно добавить кнопку выхода в welcome блок
    addLogoutButton();
});

// Функция для добавления кнопки выхода (опционально)
function addLogoutButton() {
    const welcomeBlock = document.getElementById('welcome');
    if (welcomeBlock && !welcomeBlock.querySelector('.logout-btn')) {
        const logoutBtn = document.createElement('button');
        logoutBtn.textContent = 'Выйти';
        logoutBtn.className = 'logout-btn';
        logoutBtn.style.marginLeft = '10px';
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('user_id');
            document.getElementById('welcome').classList.remove('welcome_active');
            document.getElementById('signin').classList.add('signin_active');
        });
        welcomeBlock.appendChild(logoutBtn);
    }
}