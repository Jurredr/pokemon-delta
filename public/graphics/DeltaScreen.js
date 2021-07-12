const DeltaScreen = {
    // The P5 sketch
    p5Sketch: undefined,

    // The zoom factor
    zoom: 1.5,

    // Initialize the screen
    init(p5Sketch) {
        // Create canvas
        DeltaScreen.p5Sketch = p5Sketch
        const canvas = p5Sketch.createCanvas(200, 200).elt

        // Sketch configuration
        p5Sketch.pixelDensity(1)
        const context = canvas.getContext('2d')
        context.mozImageSmoothingEnabled = false
        context.webkitImageSmoothingEnabled = false
        context.msImageSmoothingEnabled = false
        context.imageSmoothingEnabled = false
    },

    // Draw the screen background
    drawBackground(color) {
        DeltaScreen.p5Sketch.background(color)
    },

    // Draw an image
    drawImage(img, x, y, width = img.width, height = img.height) {
        this.p5Sketch.image(img, Math.floor(x), Math.floor(y), width, height)
    },

    // Draw an image
    drawImage(
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
        this.sketch.image(
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

    // Get the screen width with zoom factor
    getScaledWidth() {
        return DeltaScreen.p5Sketch.width / DeltaScreen.zoom
    },

    // Get the screen width with zoom factor
    getScaledHeight() {
        return DeltaScreen.p5Sketch.height / DeltaScreen.zoom
    },
}

export default DeltaScreen
