document.addEventListener('DOMContentLoaded', function() {

    const tasksContainer = document.getElementById('tasks__list');
    const taskInput = document.getElementById('task__input');
    const addButton = document.getElementById('tasks__add');
    const form = document.getElementById('tasks__form');

    // Загружаем задачи из localStorage
    loadTasks();

    // Обработчик клика по кнопке "Добавить"
    addButton.addEventListener('click', function(event) {
        event.preventDefault();
        addTaskIfValid();
    });

    // Обработчик сабмита формы
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        addTaskIfValid();
    });

    // Один обработчик для всех кнопок удаления
    tasksContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('task__remove')) {
            event.preventDefault();
            removeTask(event.target.closest('.task'));
        }
    });

    // Функция проверки и добавления задачи
    function addTaskIfValid() {
        if (taskInput.value.trim() !== '') {
            addTask(taskInput.value.trim());
            taskInput.value = '';
            taskInput.focus(); // Возвращаем фокус на поле ввода
        }
    }

    // Функция добавления задачи
    function addTask(taskText) {
        const taskId = Date.now();
        const taskElement = createTaskElement(taskId, taskText);
        tasksContainer.appendChild(taskElement);

        // Сохраняем в localStorage
        saveTask(taskId, taskText);
    }

    // Функция создания элемента задачи
    function createTaskElement(id, text) {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task';
        taskDiv.setAttribute('data-id', id);

        taskDiv.innerHTML = `
            <div class="task__title">${escapeHtml(text)}</div>
            <a href="#" class="task__remove">&times;</a>
        `;

        return taskDiv;
    }

    // Функция удаления задачи
    function removeTask(taskElement) {
        const taskId = taskElement.getAttribute('data-id');
        taskElement.remove();

        // Удаляем из localStorage
        removeTaskFromStorage(taskId);
    }

    // Функция сохранения задачи в localStorage
    function saveTask(id, text) {
        const tasks = getTasksFromStorage();
        tasks.push({ id, text });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Функция загрузки задач из localStorage
    function loadTasks() {
        const tasks = getTasksFromStorage();
        tasks.forEach(task => {
            const taskElement = createTaskElement(task.id, task.text);
            tasksContainer.appendChild(taskElement);
        });
    }

    // Функция получения задач из localStorage
    function getTasksFromStorage() {
        const tasksJSON = localStorage.getItem('tasks');
        return tasksJSON ? JSON.parse(tasksJSON) : [];
    }

    // Функция удаления задачи из localStorage
    function removeTaskFromStorage(id) {
        const tasks = getTasksFromStorage();
        const filteredTasks = tasks.filter(task => task.id != id);
        localStorage.setItem('tasks', JSON.stringify(filteredTasks));
    }

    // Функция экранирования HTML
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
});