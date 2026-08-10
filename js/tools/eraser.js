class EraserTool extends Tool {
    constructor() {
        super()

        this.name = "eraser"
        this.icon = "assets/eraser.png"
        this.description = "Eraser tool with stroke, color, and brush erase modes"

        this.sliderValue = 1
        this.eraseStrokeKeyDetection = 0
        this.eraseColorKeyDetection = 0

        this.initialize()
    }

    initialize() {
        // No extra setup needed
    }

    draw() {
        if (!mouseIsPressed || !mouseInBounds()) return

        if (this.eraseStrokeKeyDetection == 0 && this.eraseColorKeyDetection == 0) {
            strokeWeight(this.sliderValue)
            stroke(255)
            line(pmouseX, pmouseY, mouseX, mouseY)
        } else if (this.eraseStrokeKeyDetection == 1) {
            this.eraseStroke(mouseX, mouseY)
        } else if (this.eraseColorKeyDetection == 1) {
            this.eraseColor(mouseX, mouseY)
        }
    }

    unselectTool() {
        select("#footer").html("")
        this.eraseStrokeKeyDetection = 0
        this.eraseColorKeyDetection = 0
    }

    populateOptions() {
        select("#footer").html("")

        let sliderLabel = createDiv("Brush Size:")
        sliderLabel.class("toolOptionsText")

        let slider = createSlider(1, 20, this.sliderValue)
        slider.class("toolOptionsSlider")
        slider.input(() => {
            this.sliderValue = slider.value()
            this.eraseStrokeKeyDetection = 0
            this.eraseColorKeyDetection = 0
        })

        let strokeBtn = createButton("Erase Stroke")
        strokeBtn.class("toolOptionsButton")
        strokeBtn.mousePressed(() => {
            this.eraseStrokeKeyDetection = 1
            this.eraseColorKeyDetection = 0
        })

        let colorBtn = createButton("Erase Color")
        colorBtn.class("toolOptionsButton")
        colorBtn.mousePressed(() => {
            this.eraseColorKeyDetection = 1
            this.eraseStrokeKeyDetection = 0
        })

        let footer = select("#footer").elt
        footer.appendChild(sliderLabel.elt)
        footer.appendChild(slider.elt)
        footer.appendChild(strokeBtn.elt)
        footer.appendChild(colorBtn.elt)
    }

    eraseStroke(x, y) {
        loadPixels()
        const sp = this.getPixelAddress(x, y)
        const startColor = this.getColor(sp)
        const toFill = [sp]
        const white = color(255, 255, 255)

        while (toFill.length) {
            const p = toFill.pop()
            const pColor = this.getColor(p)

            if (
                red(pColor) >= red(startColor) - 250 && red(pColor) <= red(startColor) + 250 &&
                green(pColor) >= green(startColor) - 250 && green(pColor) <= green(startColor) + 250 &&
                blue(pColor) >= blue(startColor) - 250 && blue(pColor) <= blue(startColor) + 250
            ) {
                if (!(red(pColor) === red(white) && green(pColor) === green(white) && blue(pColor) === blue(white))) {
                    this.setColor(p, 255, 255, 255)
                    this.getNeighbors(p).forEach(n => {
                        if (n >= 0 && n < pixels.length) toFill.push(n)
                    })
                }
            }
        }

        updatePixels()
    }

    eraseColor(x, y) {
        loadPixels()
        const sp = this.getPixelAddress(x, y)
        const targetColor = this.getColor(sp)

        for (let i = 0; i < pixels.length; i += 4) {
            const pixelColor = color(pixels[i], pixels[i + 1], pixels[i + 2])
            if (
                red(pixelColor) === red(targetColor) &&
                green(pixelColor) === green(targetColor) &&
                blue(pixelColor) === blue(targetColor)
            ) {
                this.setColor(i, 255, 255, 255)
            }
        }

        updatePixels()
    }

    getPixelAddress(x, y) {
        return (floor(y) * width + floor(x)) * 4
    }

    getColor(p) {
        return color(pixels[p], pixels[p + 1], pixels[p + 2])
    }

    setColor(p, r, g, b) {
        pixels[p] = r
        pixels[p + 1] = g
        pixels[p + 2] = b
    }

    getNeighbors(p) {
        const ns = []
        const rowSize = width * 4

        ns.push(p - 4, p + 4)                 // west, east
        ns.push(p - rowSize, p + rowSize)     // north, south
        ns.push(p - rowSize - 4, p - rowSize + 4) // northwest, northeast
        ns.push(p + rowSize - 4, p + rowSize + 4) // southwest, southeast

        return ns
    }
}
