import Position from '../../public/world/components/Position'
import Map from '../../public/world/map/Map'

// Sent by a client after logging in
export default class PlayerLoginPacket {
    /**
     *
     * @param {String} id
     * @param {String} username
     * @param {Map} currentMap
     * @param {Position} position
     */
    constructor(id, username, currentMap, position) {
        this.id = id
        this.username = username
        this.currentMap = currentMap
        this.position = position
    }
}
