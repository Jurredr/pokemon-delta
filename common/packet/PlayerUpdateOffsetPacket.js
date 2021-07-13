export default class PlayerUpdateOffsetPacket {
    /**
     *
     * @param {String} imgOffsetX
     * @param {String} imgOffsetY
     */
    constructor(imgOffsetX, imgOffsetY) {
        this.imgOffsetX = imgOffsetX
        this.imgOffsetY = imgOffsetY
    }
}
