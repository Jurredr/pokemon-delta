import PlayerConnection from '../PlayerConnection'

export default function onPlayerLogin(socket, players) {
    socket.on('player:login', (playerLoginPacket) => {
        let playerConnection = new PlayerConnection(
            socket,
            playerLoginPacket.uuid,
            playerLoginPacket.name
        )

        players.push(playerConnection)

        console.log('\n-- players --')
        players.forEach((player) => {
            console.log(player.name)
        })
    })
}
