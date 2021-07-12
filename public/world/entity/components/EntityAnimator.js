import Camera from '../../../graphics/Camera'
import DeltaScreen from '../../../graphics/DeltaScreen'

export default class EntityAnimator {
    // running
    // position
    // x
    // y
    // tileset
    // frameCount
    // fps

    constructor(position, tileset, y, fps = 1) {
        this.running = true
        this.position = position
        this.x = 0
        this.y = y
        this.tileset = tileset
        this.frameCount = 0
        this.fps = fps
    }

    draw() {
        if (this.running) {
            this.frameCount += DeltaScreen.p5Sketch.deltaTime
            if (this.frameCount >= 1000 / this.fps) {
                this.frameCount -= 1000 / this.fps

                this.x += 1
                if (this.x >= this.tileset.width) this.x = 0
            }
        }

        this.tileset.drawTile(
            this.position.x * 32 + this.position.imgOffsetX - Camera.x,
            this.position.y * 32 + this.position.imgOffsetY - Camera.y,
            this.x,
            this.y
        )
    }
}
