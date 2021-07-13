export default function onPlayerMove(socket, players) {
    socket.on('player:move', (playerMovementPacket) => {
        console.log('moved')
    })
}
