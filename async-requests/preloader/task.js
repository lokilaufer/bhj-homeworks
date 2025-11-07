document.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('loader');
    const itemsContainer = document.getElementById('items');
    const CACHE_KEY = 'currency_cache';
    const CACHE_TIMEOUT = 5 * 60 * 1000; // 5 минут

    // Функция для загрузки курсов валют
    function loadCurrencyRates() {
        // Показываем анимацию загрузки
        loader.classList.add('loader_active');

        // Проверяем кэш
        const cachedData = getCachedData();
        if (cachedData) {
            displayCurrencyRates(cachedData);
            loader.classList.remove('loader_active');
        }

        // Загружаем свежие данные
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/slow-get-courses');
        xhr.responseType = 'json';

        xhr.onload = function() {
            if (xhr.status === 200) {
                const data = xhr.response;

                // Сохраняем в кэш
                cacheData(data);

                // Отображаем данные
                displayCurrencyRates(data);
            } else {
                console.error('Ошибка загрузки курсов валют');
                // Если есть кэшированные данные, показываем их
                if (!cachedData) {
                    itemsContainer.innerHTML = '<div class="item__error">Ошибка загрузки данных</div>';
                }
            }

            // Скрываем анимацию загрузки
            loader.classList.remove('loader_active');
        };

        xhr.onerror = function() {
            console.error('Ошибка сети');
            if (!cachedData) {
                itemsContainer.innerHTML = '<div class="item__error">Ошибка сети</div>';
            }
            loader.classList.remove('loader_active');
        };

        xhr.send();
    }

    // Функция для получения данных из кэша
    function getCachedData() {
        try {
            const cached = localStorage.getItem(CACHE_KEY);
            if (!cached) return null;

            const cache = JSON.parse(cached);
            const now = Date.now();

            // Проверяем не устарели ли данные
            if (now - cache.timestamp > CACHE_TIMEOUT) {
                localStorage.removeItem(CACHE_KEY);
                return null;
            }

            return cache.data;
        } catch (error) {
            console.error('Ошибка чтения кэша:', error);
            return null;
        }
    }

    // Функция для сохранения данных в кэш
    function cacheData(data) {
        try {
            const cache = {
                data: data,
                timestamp: Date.now()
            };
            localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
        } catch (error) {
            console.error('Ошибка сохранения в кэш:', error);
        }
    }

    // Функция для отображения курсов валют
    function displayCurrencyRates(data) {
        if (!data || !data.response || !data.response.Valute) {
            itemsContainer.innerHTML = '<div class="item__error">Нет данных о валютах</div>';
            return;
        }

        const valutes = data.response.Valute;
        itemsContainer.innerHTML = '';

        // Создаем элементы для каждой валюты
        Object.values(valutes).forEach(valute => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'item';

            itemDiv.innerHTML = `
                <div class="item__code">${escapeHtml(valute.CharCode)}</div>
                <div class="item__value">${valute.Value.toFixed(4)}</div>
                <div class="item__currency">руб.</div>
            `;

            itemsContainer.appendChild(itemDiv);
        });

        // Добавляем информацию о времени обновления
        const timestampDiv = document.createElement('div');
        timestampDiv.className = 'timestamp';
        timestampDiv.textContent = `Обновлено: ${new Date().toLocaleString()}`;
        timestampDiv.style.cssText = 'text-align: center; margin-top: 20px; color: #666; font-size: 14px;';
        itemsContainer.appendChild(timestampDiv);
    }

    // Функция для экранирования HTML
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Загружаем курсы валют при старте
    loadCurrencyRates();
});