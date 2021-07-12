export default class Entity {
    // id
    // type
    // solid
    // position

    constructor(id, type, solid, position) {
        this.id = id
        this.type = type
        this.solid = solid
        this.position = position
    }

    update(deltaTime) {}

    draw() {}

    onInteract() {
        console.log('Interacted with entity: ' + this.id)
    }
}
