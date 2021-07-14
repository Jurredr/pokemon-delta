const DeltaScreen = {
    // The P5 sketch
    p5Sketch: undefined,

    // Initialize the screen
    init(p5Sketch) {
        // Create canvas
        this.p5Sketch = p5Sketch
        const canvas = p5Sketch.createCanvas(200, 200).elt

        // Sketch configuration
        const context = canvas.getContext('2d')
        context.mozImageSmoothingEnabled = false
        context.webkitImageSmoothingEnabled = false
        context.msImageSmoothingEnabled = false
        context.imageSmoothingEnabled = false
        p5Sketch.pixelDensity(1)
    },

    // Draw the screen background
    draw() {
        this.p5Sketch.background(0)
    },

    // Draw an image
    image(img, x, y, width = img.width, height = img.height) {
        this.p5Sketch.image(img, Math.floor(x), Math.floor(y), width, height)
    },

    // Draw an image
    image(
        img,
        dx,
        dy,
        dWidth,
        dHeight,
        sx,
        sy,
        sWidth = dWidth,
        sHeight = dHeight
    ) {
        this.p5Sketch.image(
            img,
            dx,
            dy,
            dWidth,
            dHeight,
            sx,
            sy,
            sWidth,
            sHeight
        )
    },

    // Draw text
    text(text, x, y) {
        this.p5Sketch.text(text, x, y)
    },

    // Get the screen width with zoom factor
    scaledWidth() {
        return this.p5Sketch.width / this.zoom
    },

    // Get the screen width with zoom factor
    scaledHeight() {
        return this.p5Sketch.height / this.zoom
    },

    // The zoom factor
    zoom: 1.5,
}

export default DeltaScreen
