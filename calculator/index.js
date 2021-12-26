const KEYCODE_ENTER = 13
let isPointUsed = false
let isPreviousNumberSet = false
let previousNumber = null
let currentNumber = null
let equationSet = ''
const display = document.querySelector('.display')
const buttons = document.querySelectorAll('button')

buttons.forEach(button => {
	button.addEventListener('keyup', e => {
		if (e.key !== KEYCODE_ENTER) return
		button.click()
	})
})

buttons.forEach(button => {
	button.addEventListener('click', () => {
		if (button.className === 'num-btn') {
			displayContent(button)
		} else {
			switch (button.id) {
				case 'ac':
					clearDisplay()
					reset()
					break
				case 'delete':
					deleteLast()
					break
				case 'equals':
					calculate(equationSet)
					break
				case 'substract':
					displayContent(button)
					if (display.textContent === '-') break
				default:
					calculate(equationSet)
					calculate(button.dataset.equation)
					equationSet = button.dataset.equation
			}
		}
	})
})

function displayContent(button) {
	let buttonContent = button.innerText
	if (!buttonContent && display.textContent === '-') return
	if (display.textContent === '0' || isPreviousNumberSet) {
		if (!buttonContent) buttonContent = '-'
		if (!currentNumber) {
			display.textContent = ''
			isPointUsed = false
		}
	}
	if (buttonContent === '.') {
		if (isPointUsed) return
		isPointUsed = true
		if (display.textContent === '') display.textContent = '0'
	}
	if (equationSet === '') reset()
	display.textContent += buttonContent
	setNum()
}

function setNum() {
	if (isPreviousNumberSet) {
		currentNumber = display.textContent
		return
	}
	previousNumber = display.textContent
}

function clearDisplay() {
	display.textContent = '0'
}

function deleteLast() {
	if (display.textContent.length === 1) {
		clearDisplay()
		if (!isPreviousNumberSet) reset()
		return
	}
	display.textContent = display.textContent.slice(0, -1)
	setNum()
}

function calculate(equation) {
	let result
	isPreviousNumberSet = true
	previousNumber = Number(previousNumber)
	if (currentNumber === null) return
	currentNumber = Number(currentNumber)
	switch (equation) {
		case 'add':
			result = previousNumber + currentNumber
			break
		case 'substract':
			result = previousNumber - currentNumber
			break
		case 'multiply':
			result = previousNumber * currentNumber
			break
		case 'devide':
			if (currentNumber === 0) {
				error()
				return
			}
			result = previousNumber / currentNumber
			break
		default:
			return
	}
	if (isNaN(result)) return
	result = Math.round((result + Number.EPSILON) * 100) / 100
	display.textContent = result
	previousNumber = result
	currentNumber = null
	equationSet = ''
}

function reset() {
	isPointUsed = false
	isPreviousNumberSet = false
	previousNumber = null
	currentNumber = null
	equationSet = ''
}
