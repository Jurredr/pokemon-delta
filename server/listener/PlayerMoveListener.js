export default function onPlayerMove(socket) {
    socket.on('player:move', (playerMovementPacket) => {
        console.log('moved')
    })
}
