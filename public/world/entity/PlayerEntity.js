import Entity from './Entity'

export default class PlayerEntity extends Entity {
    // map

    constructor(id, map) {
        super(id, true)

        this.map = map
    }
}
