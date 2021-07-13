export default function onPlayerSpawn(socket) {
    socket.on('player:spawn', (playerSpawnPacket) => {
        console.log('\nspawned: ' + playerSpawnPacket.playerId + ' | ' + playerSpawnPacket.mapName)
        socket.broadcast.emit('player:spawn', playerSpawnPacket)
    })
}