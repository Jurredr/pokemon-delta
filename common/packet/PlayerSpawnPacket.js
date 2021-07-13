import Position from '../../public/world/components/Position'

export default class PlayerSpawnPacket {
    /**
     *
     * @param {String} playerId
     * @param {String} mapName
     * @param {Position} position
     * @param {number} animatorY
     */
    constructor(playerId, mapName, position, animatorY) {
        this.playerId = playerId
        this.mapName = mapName
        this.position = position
        this.animatorY = animatorY
    }
}
