import DeltaScreen from '../graphics/DeltaScreen'

const World = {
    map,
    entities: [],
    worldRender,
    fullyDrawn,

    init(map) {
        World.map = map
        entities = []

        worldRender = DeltaScreen.sketch.createGraphics(
            map.width * 32,
            map.height * 32
        )

        fullyDrawn = false
    },

    update(delta) {
        if (this.camera.follow) {
            const follow = this.camera.follow
            this.camera.x =
                follow.position.x * this.tileProvider.tileWidth +
                follow.position.imgOffsetX -
                DeltaScreen.scaledWidth() / 2 +
                16
            this.camera.y =
                follow.position.y * this.tileProvider.tileHeight +
                follow.position.imgOffsetY -
                DeltaScreen.scaledHeight() / 2 +
                16
        }

        this.entities.forEach((entity) => {
            entity.update(delta)
        })
    },

    draw() {
        // We really need a way to wait for the textures to be loaded
        if (!this.drawn && this.tileProvider.tileset.width !== undefined) {
            this.drawn = true
            this.redraw()
        }

        DeltaScreen.graphics.image(
            this.worldRender,
            -this.camera.x,
            -this.camera.y
        )

        this.entities.forEach((entity) => {
            entity.draw()
        })
    },

    redraw() {
        this.worldRender.background(0)

        for (let x = 0; x < this.tileProvider.width; x++) {
            for (let y = 0; y < this.tileProvider.height; y++) {
                this.tileProvider.drawTile(
                    x * this.tileProvider.tileWidth,
                    y * this.tileProvider.tileHeight,
                    x,
                    y,
                    this.worldRender
                )
            }
        }
    },
}

export default World
