let todoId
let todos = JSON.parse(localStorage.getItem('todos'))
const input = document.querySelector('input')
const addBtn = document.querySelector('#add-btn')
const todosList = document.querySelector('.todos-list')

function getTodosFromStorage() {
	todos = JSON.parse(localStorage.getItem('todos'))
	if (todos === null) return []
	return todos
}

function saveTodos(todos) {
	todos = JSON.stringify(todos)
	localStorage.setItem('todos', todos)
}

// add todo on enter key press
input.addEventListener('keyup', (e) => {
	if (e.key !== 13) return
	addBtn.click()
})

addBtn.addEventListener('click', (e) => addTodo(e))

function addTodo(e) {
	todos = getTodosFromStorage()
	e.preventDefault()
	if (input.value === null || input.value === '') return
	todoId = todos.length

	// add todo to the start of the array
	todos.unshift({ title: input.value, state: 'ongoing', id: todoId++ })

	renderTodoList()
	saveTodos(todos)
	input.value = ''
}

function renderTodoList() {
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

function completeTodo(elemId) {
	const LETTERS = 13
	const chosenTodoId = elemId.slice(LETTERS)
	todos = getTodosFromStorage()

	const todoDone = todos.filter((todo) => todo.id == chosenTodoId)[0]
	todoDone.state = 'completed'

	// once set completed move item under ongoing todos
	todos = todos.filter((todo) => todo !== todoDone)
	todos.push(todoDone)

	saveTodos(todos)
	renderTodoList()
}

function deleteTodo(elemId) {
	const LETTERS = 11
	const chosenTodoId = elemId.slice(LETTERS)
	const chosenTodo = document.getElementById(chosenTodoId)
	const chosenTodoTitle = chosenTodo.querySelector('.todo-title')
	todos = getTodosFromStorage()

	todos = todos.filter((todo) => todo.title !== chosenTodoTitle.textContent)

	renderTodoList()
	saveTodos(todos)
}
