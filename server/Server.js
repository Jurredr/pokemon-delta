import express from 'express'
import io from 'socket.io'
import onDisconnect from './listeners/DisconnectListener'
import onPlayerLogin from './listeners/PlayerLoginListener'
import onPlayerMove from './listeners/PlayerMoveListener'
import onPlayerSpawn from './listeners/PlayerSpawnListener'
import onPlayerUpdateOffset from './listeners/PlayerUpdateOffsetListener'
import onReqEntities from './listeners/ReqEntitiesListener'

export default class Server {
    // server
    // io
    // players

    constructor(port) {
        // Create express instance
        const app = express()

        // Parse application/x-www-form-urlencoded and application/json
        app.use(express.urlencoded({ extended: true }))
        app.use(express.json())

        // Start the server
        app.use(express.static('dist/public'))
        this.server = app.listen(port, () => {
            console.log(`Delta server listening on port ${port}`)
        })

        // Initialize socket.io
        this.io = io(this.server)

        // Setup io listeners
        this.players = []
        this.io.on('connection', (socket) => {
            this.callListeners(socket)
        })
    }

    // Call all event listeners
    callListeners(socket) {
        onPlayerLogin(socket, this.players)
        onPlayerSpawn(socket, this.players)
        onPlayerUpdateOffset(socket, this.players)
        onPlayerMove(socket, this.players)
        onReqEntities(socket, this.players)
        onDisconnect(socket, this.players)
    }
}
