import Entity from './Entity'
import EntityAnimator from './components/EntityAnimator'
import EntityMovement from './components/EntityMovement'
import PlayerMovementController from '../../controller/PlayerMovementController'
import EntityType from './EntityType'
import PlayerInteractController from '../../controller/PlayerInteractController'
import Client from '../../Client'

export default class PlayerEntity extends Entity {
    // username
    // animator
    // movement
    // movementController

    constructor(id, username, tileset, position) {
        super(id, EntityType.PLAYER, true, position)

        this.username = username

        this.animator = new EntityAnimator(this.position, tileset, 0, 8)
        this.movement = new EntityMovement(this)

        if (this.id === Client.socket.id) {
            this.movementController = new PlayerMovementController(
                this.movement
            )
            this.interactController = new PlayerInteractController(
                this.movement
            )
        }
    }

    update(deltaTime) {
        this.movement.update(deltaTime)

        if (this.id === Client.socket.id) {
            this.movementController.update()
            this.interactController.update()
        }
    }

    draw() {
        this.animator.draw()
    }
}
