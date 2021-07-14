import Camera from '../../../graphics/Camera'
import DeltaScreen from '../../../graphics/DeltaScreen'
import EntityAnimator from './EntityAnimator'

export default class PlayerAnimator extends EntityAnimator {
    // username

    constructor(position, tileset, y, fps = 1, username) {
        super(position, tileset, y, fps)
        this.username = username
    }

    draw() {
        super.draw()

        // Name tag
        DeltaScreen.text(
            this.username,
            this.position.x * 32 + this.position.imgOffsetX - Camera.x,
            this.position.y * 32 + this.position.imgOffsetY - Camera.y
        )
    }
}
