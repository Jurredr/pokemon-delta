import io from 'socket.io-client'
import Tileset from '../graphics/Tileset'
import PlayerEntity from '../world/entity/PlayerEntity'
import World from '../world/World'

import assets from './assets/**/*.*'

const Client = {
    socket: null,

    init(callback) {
        this.socket = io()
        this.socket.on('connect', () => {
            callback()
        })
        this.registerListeners()
    },

    emit(key, data) {
        this.socket.emit(key, data)
    },

    registerListeners() {
        this.socket.on('player:spawn', (playerSpawnPacket) => {
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

        this.socket.on('player:despawn', (playerDespawnPacket) => {
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

        this.socket.on('player:move', (playerMovementPacket) => {
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
    },
}

export default Client
