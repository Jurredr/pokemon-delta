import PlayerConnection from '../PlayerConnection'

export default function onPlayerLogin(socket, players) {
    socket.on('player:login', (playerLoginPacket) => {
        let playerConnection = new PlayerConnection(
            socket,
            playerLoginPacket.id,
            playerLoginPacket.username,
            playerLoginPacket.currentMap,
            playerLoginPacket.position,
            0
        )
        players.push(playerConnection)

        console.log('\n-- players --')
        players.forEach((player) => {
            console.log(player.username + ' | ' + player.id)
        })
    })
}
