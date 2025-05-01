import './index.css';

document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    if (app) {
        app.innerHTML = '<h1>Hello Webpack!</h1>';
    }
});