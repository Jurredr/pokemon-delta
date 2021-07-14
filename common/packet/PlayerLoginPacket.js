// Sent by a client after logging in
export default class PlayerLoginPacket {
    /**
     *
     * @param {String} id
     * @param {String} username
     * @param {String} currentMap
     * @param {Position} position
     */
    constructor(id, username, currentMap, position) {
        this.id = id
        this.username = username
        this.currentMap = currentMap
        this.position = position
    }
}
