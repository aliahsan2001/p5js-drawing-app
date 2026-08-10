class RotateTool extends Tool {
	constructor() {
		super()

		this.name = "RotateTool"
		this.icon = "assets/rotate.png"

		this.attempt = 0
		this.div = null
		this.divStatus = false
		this.x = 0
		this.y = 0
	}

	draw() {
		if (!this.divStatus) {
			this.div = createDiv("Click to rotate.")
			this.div.position(width / 2, height + 50)
			this.divStatus = true
		}

		if (mouseIsPressed && this.attempt === 0) {
			this.x = mouseX
			this.y = mouseY
			this.attempt++

			// Capture current canvas content
			let snapshot = get()

			// Rotate and draw
			push()
			translate(this.x, this.y)
			rotate(HALF_PI)
			image(snapshot, -this.x, -this.y)
			pop()
		}
		else if (mouseIsPressed && this.attempt > 0) {
			this.attempt++
		}
		else if (!mouseIsPressed && this.attempt > 10) {
			this.attempt = 0
			if (this.div) {
				this.div.remove()
				this.divStatus = false
			}
		}
	}

	populateOptions() {
		// No extra UI options for rotate tool
	}
}
