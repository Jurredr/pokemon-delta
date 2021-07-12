import Entity from './Entity'
import Position from '../components/Position'
import EntityAnimator from './components/EntityAnimator'
import EntityMovement from './components/EntityMovement'
import UserMovementController from '../../controller/UserMovementController'

export default class PlayerEntity extends Entity {
    // position
    // animator
    // movement
    // movementController

    constructor(id, tileset) {
        super(id, true)

        this.position = new Position(4, 2)
        this.position.imgOffsetY = -16

        this.animator = new EntityAnimator(this.position, tileset, 0, 8)

        this.movement = new EntityMovement(this.animator, this.position)
        this.movementController = new UserMovementController(this.movement)
    }

    update(deltaTime) {
        this.movement.update(deltaTime)
        this.movementController.update()
    }

    draw() {
        this.animator.draw()
    }
}
