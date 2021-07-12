import p5 from 'p5'
import blockResizing from './util/resize-blocker'
import blockIE from './util/ie-blocker'
import DeltaScreen from './graphics/DeltaScreen'
import testmap from './world/map/maps/testmap'
import World from './world/World'
import PlayerEntity from './world/entity/PlayerEntity'
import Camera from './graphics/Camera'
import Map from './world/map/Map'
import Tileset from './graphics/Tileset'

import assets from './assets/**/*.*'

// Block internet explorer
blockIE()

// Initialize P5
const p5Instance = new p5((p5Sketch) => {
    p5Sketch.setup = () => {
        p5Sketch.frameRate(60)

        // Set up the screen
        DeltaScreen.init(p5Sketch)
        DeltaScreen.zoom *= window.devicePixelRatio
        window.onresize()

        // Initialize player & their world
        World.init(new Map(testmap))
        const playerTileset = new Tileset(
            assets.img.entities.boy_run.png,
            32,
            48
        )
        const player = new PlayerEntity('testID', playerTileset)
        World.entities.push(player)

        // Initialize camera
        Camera.init(10, 0, player)
    }

    p5Sketch.draw = () => {
        const deltaTime = p5Sketch.deltaTime

        World.update(deltaTime)
        p5Sketch.scale(DeltaScreen.zoom)

        DeltaScreen.draw()
        World.draw()
    }
})

// Block resizing
blockResizing(p5Instance)
