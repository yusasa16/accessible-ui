import 'bulma'
import './style.scss'
import { TabParts } from './modules/TabParts';

const tabAppEl01 = document.querySelector('#tabApp01');
if(tabAppEl01) {
	new TabParts(tabAppEl01);
}
