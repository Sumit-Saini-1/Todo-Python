const task = document.getElementById('task');
const duedate = document.getElementById('duedate');
const desc = document.getElementById('desc');
const addTodo = document.getElementById('addTodo');
const addTodoCotainer=document.getElementById('addTodoCotainer');
const SERVER_URL = "http://localhost:5000";

addTodo.addEventListener('click', function (ev) {
    let taskValue = task.value.trim();
    let duedateValue = duedate.value.trim();
    let descValue=desc.value.trim();
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
        body: JSON.stringify({ 'task': taskValue, 'duedate': duedateValue,'desc':descValue })
    }).then(response=>{
        if(response.status==200){
            alert('success');
            addTodoCotainer.style.display='none'
        }
        else{
            alert('something wrong');
        }
    }).catch(err=>{
        console.log(err);
    });
});

function createTodoTile(t){
    const todo = document.createElement("div")
    todo.id = t.id
    todo.setAttribute("draggable",true)
    todo.classList("draggable")
    todo.classList.add("todo")
    todo.innerHTML=`<div class="date"><span id="date_${t.id}">11 Mar 2024</span><span id="time_${t.id}">11:00 to 12:00</span></div>
                    <div class="title">
                        <h3 id="title_${t.id}">Title goes here</h3>
                    </div>
                    <div class="desc">
                        <p id="desc_${t.id}">Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati explicabo recusandae corporis maiores ut voluptatibus quaerat natus, blanditiis incidunt perspiciatis consequuntur, doloribus magnam voluptatem voluptatum amet ea, facere ipsum sequi.</p>
                    </div>
                    <div class="actions">
                        <button class="delete" onclick="deleteTodo('${t.id}')">Delete</button>
                        <button class="edit" onclick="editTodo(${t})">Edit</button>
                    </div>`
    return todo
}

async function deleteTodo(id){
    try {
        const res = await fetch("/todo",{
            method:"DELETE",
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({'id':id})
        })  
        if(res.ok){
            document.getElementById(id).remove()
        } else {
            alert("Something went wrong")
        }
    } catch (error) {
        alert("something went wrong")
    }
}

async function editTodo(t){
    const newData =  showForm(t)
    try {
        const res = await fetch("/todo",{
            method:"PATCH",
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(newData)
        })

        if(res.ok){
            document.getElementById("date_"+t.id).innerText = newData.date
            document.getElementById("time_"+t.id).innerText = newData.from_time+" TO "+newData.to_time
            document.getElementById("title_"+t.id).innerText = newData.title
            document.getElementById("desc_"+t.id).innerText = newData.description
        } else {
            alert("Something went wrong")
        }
    } catch (error) {
        alert("Something went wrong")
    }
}   

async function updateStatus(id, status){
    try {
        const res = await fetch("/todo",{
            method:"PUT",
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({id,status})
        })
        if(res.ok){
            return true
        } else {
            return false
        }
    } catch (error) {
        return false        
    }
}

window.addEventListener("DOMContentLoaded",async e=>{
    try {
        const res = await fetch("/todo")
        const todos = await res.json()
        todos.forEach(todo => {
            const todoCard = createTodoTile(t)
            if(todo.status=='N'){
                document.getElementById("todoList").appendChild(todoCard)
            }
            if(todo.status=='W'){
                document.getElementById("inProgress").appendChild(todoCard)
            }
            if(todo.status=='C'){
                document.getElementById("completed").appendChild(todoCard)
            }
        });
    } catch (error) {
        alert("Something went wrong")
    }
})