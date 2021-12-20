let todoId = 0
let todos = []
const input = document.querySelector('input')
const addBtn = document.querySelector('#add-btn')
const todosList = document.querySelector('.todos-list')

class Todo {
	constructor(title, id) {
		this.title = title
		this.id = id
	}
	complete() {
		this.state = 'completed'
	}
}

input.addEventListener('keyup', (e) => {
	if (e.key !== 13) return
	addBtn.click()
})

addBtn.addEventListener('click', (e) => {
	addTodo(e)
	renderList()
})

function addTodo(e) {
	const title = input.value
	e.preventDefault()

	const todo = new Todo(title, todoId)
	todos.unshift(todo)
}

function renderList() {
	if (todos === null) todos = []
	todosList.innerHTML = todos
		.map(
			(todo) =>
				`<div id='${todo.id}' class='todo' data-state='${todo.state}'>
                    <div class='todo-title'>${todo.title}</div>
                    <button id='todo-complete${todo.id}' class='complete-btn todo-btn' onclick='completeTodo(this.id)'>
						<i class="fa-solid fa-check"></i>
					</button>
                    <button id='todo-delete${todo.id}' class='delete-btn todo-btn' onclick='deleteTodo(this.id)'>
						<i class="fa-solid fa-trash-can"></i>
					</button>
                </div>`
		)
		.join('')
}
