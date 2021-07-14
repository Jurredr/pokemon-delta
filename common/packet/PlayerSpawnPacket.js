export default class PlayerSpawnPacket {
    /**
     *
     * @param {String} playerId
     * @param {String} username
     * @param {String} mapName
     * @param {Position} position
     * @param {number} animatorY
     */
    constructor(playerId, username, mapName, position, animatorY) {
        this.playerId = playerId
        this.username = username
        this.mapName = mapName
        this.position = position
        this.animatorY = animatorY
    }
}
