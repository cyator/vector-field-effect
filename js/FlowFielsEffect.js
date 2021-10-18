export default class FlowFieldEffect {
	#ctx;
	#width;
	#height;
	constructor(ctx, width, height, mouse) {
		this.#ctx = ctx;
		this.#ctx.strokeStyle = 'white';
		this.#ctx.lineWidth = 5;
		this.#width = width;
		this.#height = height;
		this.mouse = mouse;
		this.lastTime = 0;
		this.interval = 1000 / 60; //60fps
		this.timer = 0;
		this.cellSize = 50;
	}
	#drawLine(x, y) {
		this.#ctx.beginPath();
		this.#ctx.moveTo(x, y);
		this.#ctx.lineTo(x + 25, y + 10);
		this.#ctx.stroke();
	}
	animate = (timeStamp) => {
		const deltaTime = timeStamp - this.lastTime;
		this.lastTime = timeStamp;
		if (this.timer > this.interval) {
			this.#ctx.clearRect(0, 0, this.#width, this.#height);
			for (let y = 0; y < this.#height; y += this.cellSize) {
				for (let x = 0; x < this.#width; x += this.cellSize) {
					this.#drawLine(x, y);
				}
			}
			this.timer = 0;
		} else {
			this.timer += deltaTime;
		}
		let flowFieldAnimation = requestAnimationFrame(this.animate);
		return flowFieldAnimation;
	};
}
