// Sent by a client after logging in
export default class PlayerLoginPacket {
    /**
     * 
     * @param {String} uuid 
     * @param {String} name 
     */
    constructor(uuid, name) {
        this.uuid = uuid
        this.name = name
    }
}
