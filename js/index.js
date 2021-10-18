import FlowFielsEffect from './FlowFielsEffect.js';

let canvas;
let ctx;
let flowField;
let flowFieldAnimation;
const mouse = {
	x: 0,
	y: 0,
};

window.onload = () => {
	canvas = document.getElementById('my-canvas');
	ctx = canvas.getContext('2d');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	flowField = new FlowFielsEffect(ctx, canvas.width, canvas.height, mouse);
	flowFieldAnimation = flowField.animate(0);
};

window.addEventListener('resize', () => {
	cancelAnimationFrame(flowFieldAnimation);
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	flowField = new FlowFielsEffect(ctx, canvas.width, canvas.height);
	flowField.animate(0);
});

window.addEventListener('mousemove', (e) => {
	mouse.x = e.x;
	mouse.y = e.y;
});
