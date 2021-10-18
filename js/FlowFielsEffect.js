export default class FlowFieldEffect {
	#ctx;
	#width;
	#height;
	constructor(ctx, width, height, mouse) {
		this.#ctx = ctx;
		this.#ctx.lineWidth = 1;
		this.#width = width;
		this.#height = height;
		this.mouse = mouse;
		this.lastTime = 0;
		this.interval = 1000 / 60; //60fps
		this.timer = 0;
		this.cellSize = 12;
		this.gradient;
		this.#createGradient();
		this.#ctx.strokeStyle = this.gradient;
		this.radius = 0;
		this.vr = 0.03; //velocity of radius
	}
	#createGradient() {
		this.gradient = this.#ctx.createLinearGradient(
			0,
			0,
			this.#width,
			this.#height
		);
		this.gradient.addColorStop('0.1', '#ff5c33');
		this.gradient.addColorStop('0.2', '#ff66b3');
		this.gradient.addColorStop('0.4', '#ccccff');
		this.gradient.addColorStop('0.6', '#b3ffff');
		this.gradient.addColorStop('0.8', '#80ff80');
		this.gradient.addColorStop('0.9', '#ffff33');
	}
	#drawLine(angle, x, y) {
		const dx = this.mouse.x - x;
		const dy = this.mouse.y - y;
		let distance = dx * dx + dy * dy; //using pythagoras theorem and skipping sqrt for performance
		if (distance > 600000) distance = 600000;
		else if (distance < 50000) distance = 50000;
		const length = distance / 10000;
		this.#ctx.beginPath();
		this.#ctx.moveTo(x, y);
		this.#ctx.lineTo(
			x + Math.cos(angle) * length,
			y + Math.sin(angle) * length
		);
		this.#ctx.stroke();
	}
	animate = (timeStamp) => {
		const deltaTime = timeStamp - this.lastTime;
		this.lastTime = timeStamp;
		if (this.timer > this.interval) {
			this.#ctx.clearRect(0, 0, this.#width, this.#height);
			this.radius += this.vr;
			if (this.radius > 5 || this.radius < -5) this.vr *= -1;
			for (let y = 0; y < this.#height; y += this.cellSize) {
				for (let x = 0; x < this.#width; x += this.cellSize) {
					const angle = (Math.cos(x * 0.02) + Math.sin(y * 0.02)) * this.radius;
					this.#drawLine(angle, x, y);
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
