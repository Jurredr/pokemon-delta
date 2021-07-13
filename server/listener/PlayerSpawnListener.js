import getPlayerFromProperty from "../util/player-from-property-util"

export default function onPlayerSpawn(socket, players) {
    socket.on('player:spawn', (playerSpawnPacket) => {
        const player = getPlayerFromProperty('socket', socket, players)
        if (!player) return

        player.position = playerSpawnPacket.position
        socket.broadcast.emit('player:spawn', playerSpawnPacket)
    })
}