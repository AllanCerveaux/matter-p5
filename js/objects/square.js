class Square {
	constructor(x, y) {
		const {w, h, ...squareParams} = window.params.square
		this.x = x,
		this.y = y,
		this.w = w
		this.h = h
		this.body = Bodies.rectangle(this.x, this.y, this.w, this.h, squareParams)
		World.add(world, this.body)
	}

	draw() {
		let pos = this.body.position;
		let angle = this.body.angle;
		push()
		translate(pos.x, pos.y)
		rectMode(CENTER)
		stroke("black")
		fill("white")
		this.selected === true ? strokeWeight(3) : strokeWeight(1)
		this.selected === true ? stroke("red") : stroke("black")
		rotate(angle)
		rect(0, 0, this.w, this.h)
		pop()
	}
}