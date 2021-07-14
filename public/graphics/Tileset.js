import DeltaScreen from './DeltaScreen'

export default class Tileset {
    // image
    // tileWidth
    // tileHeight

    // Initialize the Tileset
    constructor(file, tileWidth, tileHeight) {
        this.image = DeltaScreen.p5Sketch.loadImage(file, () => {
            this.width = this.image.width / tileWidth
            this.height = this.image.height / tileHeight
        })
        this.tileWidth = tileWidth
        this.tileHeight = tileHeight
    }

    // Draw a tile of the Tileset onto the screen
    drawTile(x, y, tx, ty, screen = DeltaScreen) {
        screen.image(
            this.image,
            x,
            y,
            this.tileWidth,
            this.tileHeight,
            tx * this.tileWidth,
            ty * this.tileHeight,
            this.tileWidth,
            this.tileHeight
        )
    }
}
