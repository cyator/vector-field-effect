export default class FlowFieldEffect {
	#ctx;
	#width;
	#height;
	constructor(ctx, width, height) {
		this.#ctx = ctx;
		this.#ctx.strokeStyle = 'white';
		this.#width = width;
		this.#height = height;
		this.#draw(10, 10);
	}
	#draw(x, y) {
		const length = 200;
		this.#ctx.beginPath();
		this.#ctx.moveTo(x, y);
		this.#ctx.lineTo(x + length, y + length);
		this.#ctx.stroke();
	}
}
