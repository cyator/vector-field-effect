import FlowFielsEffect from './FlowFielsEffect.js';
window.onload = () => {
	const canvas = document.getElementById('my-canvas');
	const ctx = canvas.getContext('2d');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	const flowField = new FlowFielsEffect(ctx, canvas.width, canvas.height);
};
