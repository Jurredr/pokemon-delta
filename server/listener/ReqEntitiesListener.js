import PlayerSpawnPacket from '../../common/packet/PlayerSpawnPacket'
import getPlayerFromProperty from '../util/player-from-property-util'

export default function onReqEntities(socket, players) {
    socket.on('player:req-entities', (reqEntitiesPacket) => {
        const player = getPlayerFromProperty('socket', socket, players)
        if (!player) return

        players.forEach((loopedPlayer) => {
            if (
                loopedPlayer.currentMap === reqEntitiesPacket.mapName &&
                loopedPlayer.id !== player.id
            ) {
                loopedPlayer.socket.broadcast.emit(
                    'player:spawn',
                    new PlayerSpawnPacket(
                        loopedPlayer.id,
                        reqEntitiesPacket.mapName,
                        loopedPlayer.position,
                        loopedPlayer.animatorY
                    )
                )
            }
        })
    })
}
