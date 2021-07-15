import getPlayerFromProperty from "../util/player-from-property-util"

export default function onPlayerMove(socket, players) {
    socket.on('player:move', (playerMovementPacket) => {
        const player = getPlayerFromProperty('socket', socket, players)
        if (!player) return

        const x = playerMovementPacket.x
        const y = playerMovementPacket.y

        player.position.x += x
        player.position.y += y

        player.position.imgOffsetX -= x * 32
        player.position.imgOffsetY -= y * 32

        player.animatorY = playerMovementPacket.animatorY

        socket.broadcast.emit('player:move', playerMovementPacket)
    })
}
