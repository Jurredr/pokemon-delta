import DeltaScreen from '../graphics/DeltaScreen'
import World from '../world/World'
import KeyBinds from './KeyBinds'

export default class PlayerInteractController {
    // movement

    constructor(movement) {
        this.movement = movement
    }

    update() {
        if (DeltaScreen.p5Sketch.keyIsDown(KeyBinds.INTERACT.charCodeAt(0))) {
            const facingTile = this.movement.position.facingTile(this.movement.facing)
            const entity = World.currentMap.isEntity(facingTile.x, facingTile.y)

            if (entity) {
                // this.movement.frozen = true
                entity.onInteract()
            }
        } 
    }
}
