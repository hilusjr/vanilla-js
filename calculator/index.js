let pointUsed = false
let equation = ''
let firstNum = null
let secondNum = null
const display = document.querySelector('.display')
const buttons = document.querySelectorAll('button')

buttons.forEach(button => {
	button.addEventListener('keyup', e => {
		if (e.key !== 13) return
		button.click()
	})
})

buttons.forEach(button => {
	button.addEventListener('click', () => {
		if (button.className === 'num-btn') displayContent(button.textContent)
	})
})

function displayContent(content) {
	if (display.textContent === '0' || firstNum !== null) display.textContent = ''
	if (content === '.') {
		if (pointUsed) return
		pointUsed = true
	}
	display.textContent += content
}

function setEquation(type, sign) {
	equation = type
	displayContent(sign)
	firstNum = Number(display.textContent)
	console.log(firstNum)
}

function clearDisplay() {
	display.textContent = '0'
	firstNum = null
}

function deleteLast() {
	const content = display.textContent
	if (display.textContent === '0') return
	if (content.length === 1) {
		clearDisplay()
		return
	}
	display.textContent = display.textContent.slice(0, -1)
}
