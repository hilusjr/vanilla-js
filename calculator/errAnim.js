const equalsButton = document.querySelector('#equals')

function error() {
	equalsButton.style.background = '#000'
	buttons.forEach(button => {
		button.style.border = '5px solid rgb(255, 0, 0)'
	})
	equalsButton.style.animation = 'error 3s ease-in-out'
	document.body.style.background =
		'linear-gradient(160deg, rgba(255, 0, 0, 1) 0%, rgb(0, 0, 0) 100%'
	reset()
	setTimeout(() => {
		buttons.forEach(button => {
			button.style.border = '5px solid rgb(160, 136, 0)'
		})
		equalsButton.style.animation = 'none'
		document.body.style.background =
			'linear-gradient(160deg,rgba(255, 222, 0, 1) 0%,rgb(0, 0, 0) 100%'
	}, 3000)
}
