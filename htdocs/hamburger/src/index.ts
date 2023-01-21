import 'bulma'
import './style.scss'

const hBtn = document.querySelector<HTMLElement>('#hBtn');
if(hBtn) {
	hBtn.addEventListener('click', function() {
		const pressed = this.ariaPressed;

		if(pressed === 'true') {
			this.ariaPressed = 'false';
		} else {
			this.ariaPressed = 'true';
		}
	});
}
