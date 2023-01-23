import 'bulma'
import './style.scss'

const openBtn = document.getElementById('openBtn');
const dialog = document.getElementById('dialog');
const closeBtn = document.getElementById('closeBtn');

console.log(openBtn, dialog, closeBtn);

if(openBtn && dialog && closeBtn) {
	openBtn.addEventListener('click', function() {
		dialog.show();
	});

	closeBtn.addEventListener('click', function() {
		dialog.close();
	})
}
