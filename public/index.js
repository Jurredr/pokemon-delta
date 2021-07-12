import p5 from 'p5'
import blockResizing from './util/resize-blocker'
import blockIE from './util/ie-blocker'
import DeltaScreen from './graphics/DeltaScreen'

// Block internet explorer
blockIE()

// Initialize P5
const p5Instance = new p5((p5Sketch) => {
    p5Sketch.setup = () => {
        p5Sketch.frameRate(60)

        // Set up the screen
        DeltaScreen.init(p5Sketch)
        DeltaScreen.zoom *= window.devicePixelRatio

        const tileProvider = new TempTileProvider(
            new Tileset(res.img.outside.png, 32, 32)
        )
    }

    p5Sketch.draw = () => {
        const delta = p5Sketch.deltaTime
        world.update(delta)

        p5Sketch.scale(Screen.zoom)

        Screen.draw()
        world.draw()
    }
})

// Block resizing
blockResizing(p5Instance)
