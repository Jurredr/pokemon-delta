import Position from '../../public/world/components/Position'

// Sent by a client everytime a player moves.
// This is then forwarded to all the players in the same map.
export default class PlayerMovementPacket {
    /**
     *
     * @param {string} uuid
     * @param {number} time
     * @param {number} speed
     * @param {Position} from
     * @param {Position} to
     */
    constructor(uuid, time, speed, from, to) {
        this.uuid = uuid
        this.time = time
        this.speed = speed
        this.from = from
        this.to = to
    }
}
