import World from '../../World'
import Direction from '../../components/Direction'
import PlayerMovementPacket from '../../../../common/packet/PlayerMovementPacket'

import Position from '../../components/Position'
import Client from '../../../Client'

export default class EntityMovement {
    // entity
    // animator
    // position
    // speed
    // initialImgOffsetX
    // initialImgOffsetY
    // moving
    // frozen
    // facing
    // socket

    constructor(entity) {
        this.entity = entity
        this.entity.animator.playing = false
        this.position = entity.position
        this.speed = 128
        this.initialImgOffsetX = this.position.imgOffsetX
        this.initialImgOffsetY = this.position.imgOffsetY
        this.moving = false
        this.frozen = false
        this.facing = Direction.fromAnimatorY(this.entity.animator.y)
    }

    move(x, y, emit) {
        if (this.moving || this.frozen) return

        if (y > 0) this.entity.animator.y = 0
        if (x < 0) this.entity.animator.y = 1
        if (x > 0) this.entity.animator.y = 2
        if (y < 0) this.entity.animator.y = 3
        this.facing = Direction.fromAnimatorY(this.entity.animator.y)

        const newX = this.position.x + x
        const newY = this.position.y + y

        const currentMap = World.currentMap
        if (
            currentMap.isSolid(newX, newY) ||
            newX < 0 ||
            newX >= currentMap.width ||
            newY < 0 ||
            newY >= currentMap.height
        ) {
            return
        }

        this.position.x += x
        this.position.y += y

        this.position.imgOffsetX -= x * 32
        this.position.imgOffsetY -= y * 32

        this.moving = true
        this.entity.animator.playing = true

        if (emit) {
            // Emit the event
            Client.emit(
                'player:move',
                new PlayerMovementPacket(this.entity.id, x, y)
            )
        }
    }

    update(deltaTime) {
        if (!this.moving) {
            this.entity.animator.playing = false
            this.entity.animator.x = 0
        }

        const speed = (this.speed / 1000) * deltaTime

        const distX = this.initialImgOffsetX - this.position.imgOffsetX
        const distY = this.initialImgOffsetY - this.position.imgOffsetY

        const dx = Math.min(Math.abs(distX), speed) * Math.sign(distX)
        const dy = Math.min(Math.abs(distY), speed) * Math.sign(distY)

        this.position.imgOffsetX += dx
        this.position.imgOffsetY += dy

        if (
            Math.abs(this.initialImgOffsetX - this.position.imgOffsetX) <
                0.01 &&
            Math.abs(this.initialImgOffsetY - this.position.imgOffsetY) < 0.01
        ) {
            this.position.imgOffsetX = this.initialImgOffsetX
            this.position.imgOffsetY = this.initialImgOffsetY
            this.moving = false
        }
    }
}
