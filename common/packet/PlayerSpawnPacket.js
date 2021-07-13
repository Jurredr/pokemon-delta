export default class PlayerSpawnPacket {
    /**
     *
     * @param {String} playerId
     * @param {String} mapName
     */
    constructor(playerId, mapName) {
        this.playerId = playerId
        this.mapName = mapName
    }
}
