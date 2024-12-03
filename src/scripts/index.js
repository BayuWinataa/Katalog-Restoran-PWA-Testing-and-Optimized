import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import 'regenerator-runtime';
import '../styles/style.scss';
import '../styles/responsive.scss';
import '../scripts/components/index.js';
import App from './views/app';
import swRegister from './utils/sw-register.js';


const app = new App({
	button: document.querySelector('#menu'),
	drawer: document.querySelector('#drawer'),
	content: document.querySelector('#main-content'),
});

window.addEventListener('hashchange', () => {
	app.renderPage();
});

window.addEventListener('load', () => {
	app.renderPage();
	swRegister();
});
