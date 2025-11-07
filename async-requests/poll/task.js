document.addEventListener('DOMContentLoaded', function() {
    const pollTitle = document.getElementById('poll__title');
    const pollAnswers = document.getElementById('poll__answers');

    let pollId = null;
    let pollData = null;

    // Загружаем опрос
    function loadPoll() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/poll');
        xhr.responseType = 'json';

        xhr.onload = function() {
            if (xhr.status === 200) {
                const data = xhr.response;
                pollId = data.id;
                pollData = data.data;

                displayPoll(data.data);
            } else {
                console.error('Ошибка загрузки опроса');
            }
        };

        xhr.onerror = function() {
            console.error('Ошибка сети');
        };

        xhr.send();
    }

    // Отображаем опрос
    function displayPoll(data) {
        pollTitle.textContent = data.title;
        pollAnswers.innerHTML = '';

        data.answers.forEach((answer, index) => {
            const button = document.createElement('button');
            button.className = 'poll__answer';
            button.textContent = answer;

            button.addEventListener('click', function() {
                // Показываем подтверждение
                alert('Спасибо, ваш голос засчитан!');

                // Отправляем голос
                sendVote(index);
            });

            pollAnswers.appendChild(button);
        });
    }

    // Отправляем голос и получаем результаты
    function sendVote(answerIndex) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/poll');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.responseType = 'json';

        xhr.onload = function() {
            if (xhr.status === 200) {
                const results = xhr.response.stat;
                showResults(results);
            } else {
                console.error('Ошибка отправки голоса');
            }
        };

        xhr.onerror = function() {
            console.error('Ошибка сети при отправке голоса');
        };

        // Формируем данные для отправки
        const requestData = `vote=${pollId}&answer=${answerIndex}`;
        xhr.send(requestData);
    }

    // Показываем результаты голосования
    function showResults(results) {
        pollAnswers.innerHTML = '';

        results.forEach(result => {
            const resultElement = document.createElement('div');
            resultElement.className = 'poll__result';
            resultElement.innerHTML = `
                ${result.answer}: <strong>${result.votes}</strong> голосов
            `;
            pollAnswers.appendChild(resultElement);
        });
    }

    // Загружаем опрос при старте
    loadPoll();
});