import p5 from 'p5'
import blockResizing from './util/resize-blocker'
import blockIE from './util/ie-blocker'
import DeltaScreen from './graphics/DeltaScreen'
import testmap from './world/map/maps/testmap'
import World from './world/World'
import PlayerEntity from './world/entity/PlayerEntity'
import Camera from './graphics/Camera'

// Block internet explorer
blockIE()

// Initialize P5
const p5Instance = new p5((p5Sketch) => {
    let world

    p5Sketch.setup = () => {
        p5Sketch.frameRate(60)

        // Set up the screen
        DeltaScreen.init(p5Sketch)
        DeltaScreen.zoom *= window.devicePixelRatio

        // Initialize player & their world
        World.map = new Map(testmap)
        const player = new PlayerEntity(
            'testID',
            new Tileset(assets.img.entities.boy_run.png, 32, 48)
        )
        World.entities.push(player)

        // Initialize camera
        Camera.init(10, 0, player)
    }

    p5Sketch.draw = () => {
        const delta = p5Sketch.deltaTime

        world.update(delta)
        p5Sketch.scale(Screen.zoom)

        DeltaScreen.draw()
        world.draw()
    }
})

// Block resizing
blockResizing(p5Instance)
