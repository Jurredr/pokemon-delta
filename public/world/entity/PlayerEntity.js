import Entity from './Entity'
import Position from '../components/Position'
import EntityAnimator from './components/EntityAnimator'
import EntityMovement from './components/EntityMovement'
import PlayerMovementController from '../../controller/PlayerMovementController'
import EntityType from './EntityType'
import PlayerInteractController from '../../controller/PlayerInteractController'

export default class PlayerEntity extends Entity {
    // animator
    // movement
    // movementController

    constructor(id, tileset) {
        super(id, EntityType.PLAYER, true, new Position(4, 2))

        this.position.imgOffsetY = -16

        this.animator = new EntityAnimator(this.position, tileset, 0, 8)
        this.movement = new EntityMovement(this.animator, this.position)

        this.movementController = new PlayerMovementController(this.movement)
        this.interactController = new PlayerInteractController(this.movement)
    }

    update(deltaTime) {
        this.movement.update(deltaTime)
        this.movementController.update()
        this.interactController.update()
    }

    draw() {
        this.animator.draw()
    }
}
