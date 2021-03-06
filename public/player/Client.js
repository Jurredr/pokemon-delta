import io from 'socket.io-client'
import onPlayerDespawn from '../listeners/PlayerDespawnListener'
import onPlayerMove from '../listeners/PlayerMoveListener'
import onPlayerSpawn from '../listeners/PlayerSpawnListener'
import PlayerData from './PlayerData'

const Client = {
    socket: null,
    playerData: null,

    init(username, callback) {
        this.socket = io()
        this.socket.on('connect', () => {
            callback()
        })
        this.playerData = new PlayerData(username)
        this.registerListeners()
    },

    emit(key, data) {
        this.socket.emit(key, data)
    },

    registerListeners() {
        onPlayerSpawn(this.socket)
        onPlayerDespawn(this.socket)
        onPlayerMove(this.socket)
    },
}

export default Client
