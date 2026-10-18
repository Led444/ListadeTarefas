let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const input = document.getElementById('input');
const taskForm = document.getElementById('taskForm');
const todoList = document.querySelector('#todoList');
const emptyMessage = document.getElementById('emptyMessage');

taskForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const task = input.value.trim();

    if (!task) {
        return;
    }

    tasks.push({
        text: task,
        completed: false
    });
    saveTasks();
    renderTask();

    input.value = '';
    input.focus();
});

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTask() {
    todoList.innerHTML = '';
    emptyMessage.style.display = tasks.length === 0 ? 'block' : 'none';

    tasks.forEach(function(task, index) {

        const li = document.createElement('li');
        const taskText = document.createElement('span');
        taskText.textContent = task.text;

        if (task.completed) {
            taskText.style.textDecoration = 'line-through';
        }

        const completeButton = document.createElement('button');
        completeButton.type = 'button';
        completeButton.className = 'completeButton';
        completeButton.textContent = task.completed ? 'Desfazer' : 'Feito';

        completeButton.addEventListener('click', function() {
            task.completed = !task.completed;
            saveTasks();
            renderTask();
        });


        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.className = 'deleteButton';
        deleteButton.textContent = 'Delete';

        deleteButton.addEventListener('click', function() {
            tasks.splice(index, 1);
            saveTasks();
            renderTask();
        });

        li.appendChild(completeButton);
        li.appendChild(taskText);
        li.appendChild(deleteButton);
        todoList.appendChild(li);
    });
}

renderTask();

