import getPlayerFromProperty from '../util/player-from-property-util'
import PlayerDespawnPacket from '../../common/packet/PlayerDespawnPacket'

export default function onDisconnect(socket, players) {
    socket.on('disconnect', () => {
        const player = getPlayerFromProperty('socket', socket, players)
        if (!player) return
        
        // Remove from array
        players.splice(players.indexOf(player), 1)

        // Despawn the player
        socket.broadcast.emit('player:despawn', new PlayerDespawnPacket(player.id))

        console.log('\n-- players --')
        players.forEach((player) => {
            console.log(player.username + ' | ' + player.id)
        })
    })
}
