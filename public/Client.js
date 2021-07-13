import io from 'socket.io-client'
import Tileset from './graphics/Tileset'
import PlayerEntity from './world/entity/PlayerEntity'
import World from './world/World'

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
            World.entities.push(
                new PlayerEntity(
                    playerSpawnPacket.playerId,
                    'username',
                    playerTileset
                )
            )
        })

        this.socket.on('player:despawn', (playerDespawnPacket) => {
            console.log('despawned: ' + playerDespawnPacket.playerId)
            if (World.hasEntity(playerDespawnPacket.playerId)) {
                const toRemove = World.entities.filter(
                    (entity) => entity.id === playerDespawnPacket.playerId
                )
                const index = World.entities.indexOf(toRemove[0])
                index > -1 ? World.entities.splice(index, 1) : ''
            }
        })
    },
}

export default Client
