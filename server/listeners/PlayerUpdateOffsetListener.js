import getPlayerFromProperty from "../util/player-from-property-util"

export default function onPlayerUpdateOffset(socket, players) {
    socket.on('player:update-offset', (playerUpdateOffsetPacket) => {
        const player = getPlayerFromProperty('socket', socket, players)
        if (!player) return

        player.position.imgOffsetX = playerUpdateOffsetPacket.imgOffsetX
        player.position.imgOffsetY = playerUpdateOffsetPacket.imgOffsetY
    })
}