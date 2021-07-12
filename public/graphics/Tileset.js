import DeltaScreen from './DeltaScreen'

export default class Tileset {
    // image
    // totalWidth
    // totalHeight

    // Initialize the Tileset
    constructor(file, totalWidth, totalHeight) {
        this.image = DeltaScreen.p5Sketch.loadImage(file, () => {
            this.width = this.image.width / totalWidth
            this.height = this.image.height / totalHeight
        })
        this.totalWidth = totalWidth
        this.totalHeight = totalHeight
    }

    // Draw a tile of the Tileset onto the screen
    drawTile(x, y, tx, ty) {
        DeltaScreen.drawImage(
            this.image,
            x,
            y,
            this.totalWidth,
            this.totalHeight,
            tx * this.totalWidth,
            ty * this.totalHeight,
            this.totalWidth,
            this.totalHeight
        )
    }
}
