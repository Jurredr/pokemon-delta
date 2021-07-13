export default class PlayerConnection {
    constructor(socket, id, name) {
        this.socket = socket
        this.id = id
        this.name = name
    }
}
