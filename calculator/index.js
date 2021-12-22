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
		if (button.className === 'num-btn') {
			displayContent(button.textContent)
			if (firstNum !== null) {
				if (secondNum === null) {
					secondNum = display.textContent
					return
				}
				secondNum = secondNum + display.textContent
				displayContent(secondNum)
			}
		}
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
	const content = display.textContent
	equation = type
	displayContent(sign)
	firstNum = Number(content)
	calculate()
	secondNum = null
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

function calculate() {
	let score = null
	if (secondNum !== null) secondNum = Number(secondNum)
	switch (equation) {
		case 'add':
			score = firstNum + secondNum
			break
		case 'substract':
			score = firstNum - secondNum
			break
		case 'multiply':
			score = firstNum * secondNum
			break
		case 'devide':
			score = firstNum / secondNum
			break
		default:
			alert('Not sure what you clicked O.o')
	}
	displayContent(score)
	firstNum = score
	secondNum = null
	console.log(score)
}
