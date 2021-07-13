import getPlayerFromProperty from "../util/player-from-property-util"

export default function onDisconnect(socket, players) {
    socket.on('disconnect', () => {
        const player = getPlayerFromProperty('socket', socket, players)

        if (!player) return
        players.splice(players.indexOf(player))

        console.log('\n-- players --')
        players.forEach((player) => {
            console.log(player.name)
        })
    })
}
