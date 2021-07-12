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
        this.entities = []

        // Create the render of the world
        this.worldRender = DeltaScreen.p5Sketch.createGraphics(
            currentMap.width * 32,
            currentMap.height * 32
        )

        this.fullyDrawn = false
    },

    // Change the current map
    changeMap(map) {
        this.currentMap = map
        this.worldRender = DeltaScreen.p5Sketch.createGraphics(
            map.width * 32,
            map.height * 32
        )
    },

    // Update the world
    update(deltaTime) {
        // Update the camera
        if (Camera.follow) {
            const follow = Camera.follow
            Camera.x =
                follow.position.x * this.currentMap.width +
                follow.position.imgOffsetX -
                DeltaScreen.scaledWidth() / 2 +
                16
            Camera.y =
                follow.position.y * this.currentMap.heigth +
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
            this.worldRender.background(0)
            this.currentMap.draw()
            this.fullyDrawn = true
        }

        DeltaScreen.drawImage(this.worldRender, -Camera.x, -Camera.y)

        this.entities.forEach((entity) => {
            entity.draw()
        })
    },
}

export default World
