import World from '../world/World'

export default function onPlayerMove(socket) {
    socket.on('player:move', (playerMovementPacket) => {
        const playerId = playerMovementPacket.playerId
        const x = playerMovementPacket.x
        const y = playerMovementPacket.y

        if (World.hasEntity(playerId)) {
            const target = World.entities.filter(
                (entity) => entity.id === playerId
            )
            if (target.length > 0) {
                target[0].position.x += x
                target[0].position.y += y

                target[0].position.imgOffsetX -= x * 32
                target[0].position.imgOffsetY -= y * 32

                if (y > 0) target[0].animator.y = 0
                if (x < 0) target[0].animator.y = 1
                if (x > 0) target[0].animator.y = 2
                if (y < 0) target[0].animator.y = 3

                target[0].movement.moving = true
                target[0].animator.playing = true
            }
        }
    })
}
