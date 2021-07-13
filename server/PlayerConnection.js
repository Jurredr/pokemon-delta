export default class PlayerConnection {
    // socket
    // id
    // username
    // currentMap (name)
    // position
    // animatorY

    constructor(socket, id, username, currentMap, position, animatorY) {
        this.socket = socket
        this.id = id
        this.username = username
        this.currentMap = currentMap
        this.position = position
        this.animatorY = animatorY
    }
}
