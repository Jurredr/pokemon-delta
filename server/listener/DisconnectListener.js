import getPlayerFromProperty from '../util/player-from-property-util'
import PlayerDespawnPacket from '../../common/packet/PlayerDespawnPacket'

export default function onDisconnect(socket, players) {
    socket.on('disconnect', () => {
        const player = getPlayerFromProperty('socket', socket, players)

        // Remove from array
        if (!player) return
        players.splice(players.indexOf(player))

        // Despawn the player
        socket.broadcast.emit('player:despawn', new PlayerDespawnPacket(player.id))

        console.log('\n-- players --')
        players.forEach((player) => {
            console.log(player.name)
        })
    })
}
