import PlayerSpawnPacket from '../../common/packet/PlayerSpawnPacket'
import ReqEntitiesPacket from '../../common/packet/ReqEntitiesPacket'
import Client from '../Client'
import Camera from '../graphics/Camera'
import DeltaScreen from '../graphics/DeltaScreen'

const World = {
    currentMap: undefined,
    entities: [],
    worldRender: undefined,
    fullyDrawn: undefined,

    // Initialize the world
    init(currentMap) {
        this.currentMap = currentMap

        // Load all entities
        this.entities = []
        Client.emit(
            'player:req-entities',
            new ReqEntitiesPacket(Client.socket.id, this.currentMap.name)
        )

        // Create the render of the world
        this.worldRender = DeltaScreen.p5Sketch.createGraphics(
            currentMap.width * 32,
            currentMap.height * 32
        )

        this.fullyDrawn = false
    },

    spawnEntity(entity) {
        this.entities.push(entity)

        // Emit the spawn event
        Client.emit(
            'player:spawn',
            new PlayerSpawnPacket(entity.id, this.currentMap.name, entity.position, entity.animator.y)
        )
    },

    hasEntity(id) {
        return this.entities.some((entity) => entity.id === id)
    },

    // Change the current map
    changeMap(entity, newMap) {
        this.currentMap = newMap
        this.worldRender = DeltaScreen.p5Sketch.createGraphics(
            newMap.width * 32,
            newMap.height * 32
        )

        // Emit the despawn event
        Client.emit('player:despawn', new PlayerDespawnPacket(entity.id))

        // Emit the spawn event
        Client.emit(
            'player:spawn',
            new PlayerSpawnPacket(entity.id, this.currentMap.name, entity.position, entity.animator.y)
        )
    },

    // Update the world
    update(deltaTime) {
        // Update the camera
        if (Camera.follow) {
            const follow = Camera.follow
            Camera.x =
                follow.position.x * this.currentMap.tileset.totalWidth +
                follow.position.imgOffsetX -
                DeltaScreen.scaledWidth() / 2 +
                16
            Camera.y =
                follow.position.y * this.currentMap.tileset.totalHeight +
                follow.position.imgOffsetY -
                DeltaScreen.scaledHeight() / 2 +
                16
        }

        // Update all entities
        this.entities.forEach((entity) => {
            entity.update(deltaTime)
        })
    },

    draw() {
        // We really need a way to wait for the textures to be loaded
        if (!this.fullyDrawn && this.currentMap.tileset.width !== undefined) {
            this.fullyDrawn = true
            this.worldRender.background(0)
            this.currentMap.draw(this.worldRender)
        }

        DeltaScreen.image(this.worldRender, -Camera.x, -Camera.y)

        this.entities.forEach((entity) => {
            entity.draw()
        })
    },
}

export default World
