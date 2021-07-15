import World from '../world/World'

export default function onPlayerDespawn(socket) {
    socket.on('player:despawn', (playerDespawnPacket) => {
        const playerId = playerDespawnPacket.playerId

        console.log('despawned: ' + playerId)
        if (World.hasEntity(playerId)) {
            const target = World.entities.filter(
                (entity) => entity.id === playerId
            )
            const index = World.entities.indexOf(target[0])
            if (index > -1) World.entities.splice(index, 1)
        }
    })
}
