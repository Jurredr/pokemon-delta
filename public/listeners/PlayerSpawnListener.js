import Tileset from '../graphics/Tileset'
import PlayerEntity from '../world/entity/PlayerEntity'
import assets from '../assets/**/*.*'
import World from '../world/World'

export default function onPlayerSpawn(socket) {
    socket.on('player:spawn', (playerSpawnPacket) => {
        console.log(
            'spawned: ' +
                playerSpawnPacket.playerId +
                ' | ' +
                playerSpawnPacket.mapName
        )

        const playerTileset = new Tileset(
            assets.img.entities.boy_run.png,
            32,
            48
        )
        const player = new PlayerEntity(
            playerSpawnPacket.playerId,
            playerSpawnPacket.username,
            playerTileset,
            playerSpawnPacket.position
        )
        player.animator.y = playerSpawnPacket.animatorY

        World.entities.push(player)
    })
}
