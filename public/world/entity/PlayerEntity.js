import Entity from './Entity'

export default class PlayerEntity extends Entity {
    // id
    // map

    constructor(id, map) {
        super(id)

        this.map = map
    }
}
