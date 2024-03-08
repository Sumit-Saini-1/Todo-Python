const task = document.getElementById('task');
const duedate = document.getElementById('duedate');
const addTodo = document.getElementById('addTodo');
const SERVER_URL = "http://localhost:5000";

addTodo.addEventListener('click', function (ev) {
    let taskValue = task.value.trim();
    let duedateValue = duedate.value.trim();
    if (!taskValue) {
        alert('Task is required');
        return;
    }
    if (!duedateValue) {
        alert('date required');
        return;
    }
    fetch(SERVER_URL + '/todo', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ 'task': taskValue, 'duedate': duedateValue })
    })
})