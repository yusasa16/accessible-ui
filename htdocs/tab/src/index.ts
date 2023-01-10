import 'bulma'
import './style.scss'
import { TabParts } from './modules/TabParts';

const tabAppEl01 = document.querySelector<HTMLElement>('#tabApp01');
if(tabAppEl01) {
	new TabParts(tabAppEl01);
}
