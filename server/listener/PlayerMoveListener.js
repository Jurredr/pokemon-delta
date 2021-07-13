export default function onPlayerMove(socket) {
    socket.on('player:move', (playerMovementPacket) => {
        socket.broadcast.emit('player:move', playerMovementPacket)
    })
}
