class Game {
  constructor(container) {
    this.container = container;
    this.wordElement = container.querySelector('.word');
    this.winsElement = container.querySelector('.status__wins');
    this.lossElement = container.querySelector('.status__loss');
    this.timerElement = container.querySelector('.status__timer');

    this.reset();
    this.registerEvents();
  }

  reset() {
    this.setNewWord();
    this.winsElement.textContent = 0;
    this.lossElement.textContent = 0;
    this.clearTimer();
  }

  registerEvents() {
    // Обработчик нажатия клавиш
    document.addEventListener('keyup', (event) => {
      // Получаем введенный символ и приводим к нижнему регистру
      const pressedKey = event.key.toLowerCase();

      // Получаем текущий символ, который нужно ввести
      const currentChar = this.currentSymbol.textContent.toLowerCase();

      // Сравниваем символы (регистр не важен)
      if (pressedKey === currentChar) {
        this.success();
      } else {
        this.fail();
      }
    });
  }

  startTimer(wordLength) {
    this.clearTimer();
    this.timeLeft = wordLength;
    this.updateTimerDisplay();

    this.timerId = setInterval(() => {
      this.timeLeft--;
      this.updateTimerDisplay();

      if (this.timeLeft <= 0) {
        this.fail(); // Время вышло - поражение
      }
    }, 1000);
  }

  updateTimerDisplay() {
    if (this.timerElement) {
      this.timerElement.textContent = this.timeLeft;
    }
  }

  clearTimer() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    if (this.timerElement) {
      this.timerElement.textContent = '';
    }
  }

  success() {
    this.currentSymbol.classList.remove("symbol_current");
    this.currentSymbol.classList.add('symbol_correct');
    this.currentSymbol = this.currentSymbol.nextElementSibling;

    if (this.currentSymbol !== null) {
      this.currentSymbol.classList.add('symbol_current');
      return;
    }

    if (++this.winsElement.textContent === 10) {
      alert('Победа!');
      this.reset();
    } else {
      this.setNewWord();
    }
  }

  fail() {
    this.clearTimer();
    if (++this.lossElement.textContent === 3) {
      alert('Вы проиграли!');
      this.reset();
    } else {
      this.setNewWord();
    }
  }

  setNewWord() {
    const word = this.getWord();
    this.renderWord(word);
    this.startTimer(word.length);
  }

  getWord() {
    const words = [
        'bob',
        'awesome',
        'netology',
        'hello',
        'kitty',
        'rock',
        'youtube',
        'popcorn',
        'cinema',
        'love',
        'javascript'
      ],
      index = Math.floor(Math.random() * words.length);

    return words[index];
  }

  renderWord(word) {
    const html = [...word]
      .map(
        (s, i) =>
          `<span class="symbol ${i === 0 ? 'symbol_current': ''}">${s}</span>`
      )
      .join('');
    this.wordElement.innerHTML = html;

    this.currentSymbol = this.wordElement.querySelector('.symbol_current');
  }
}

new Game(document.getElementById('game'));