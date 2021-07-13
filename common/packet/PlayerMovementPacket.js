// Sent by a client everytime a player moves.
// This is then forwarded to all the players in the same map.
export default class PlayerMovementPacket {
    /**
     *
     * @param {String} playerId
     * @param {number} x
     * @param {number} y
     */
    constructor(playerId, x, y) {
        this.playerId = playerId
        this.x = x
        this.y = y
    }
}
