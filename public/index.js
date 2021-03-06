import p5 from 'p5'
import PlayerLoginPacket from '../common/packet/PlayerLoginPacket'

import blockResizing from './util/resize-blocker'
import blockIE from './util/ie-blocker'
import DeltaScreen from './graphics/DeltaScreen'
import map_pallet_town from './assets/data/maps/map_pallet_town'
import World from './world/World'
import PlayerEntity from './world/entity/PlayerEntity'
import Camera from './graphics/Camera'
import Map from './world/Map'
import Tileset from './graphics/Tileset'

import assets from './assets/**/*.*'
import Client from './player/Client'
import Position from './world/components/Position'
import DeltaOverlay from './graphics/ui/DeltaOverlay'

// Block internet explorer
blockIE()

// Init the client
const username = prompt('Username:')
Client.init(username, setup)

function setup() {
    // Initialize P5
    const p5Instance = new p5((p5Sketch) => {
        p5Sketch.setup = () => {
            p5Sketch.frameRate(60)

            // Set up the screen
            DeltaScreen.init(p5Sketch)
            DeltaScreen.zoom *= window.devicePixelRatio

            const map = new Map(map_pallet_town)
            const position = new Position(12, 5)
            position.imgOffsetX = 0
            position.imgOffsetY = -16

            Client.emit(
                'player:login',
                new PlayerLoginPacket(
                    Client.socket.id,
                    username,
                    map.name,
                    position
                )
            )

            // Initialize player & their world
            World.init(map)
            const playerTileset = new Tileset(
                assets.img.entities.boy_run.png,
                32,
                48
            )

            const player = new PlayerEntity(
                Client.socket.id,
                username,
                playerTileset,
                position
            )
            World.spawnEntity(player)

            // Initialize camera
            Camera.init(10, 0, player)

            // Generate the overlaying UI
            DeltaOverlay.init()
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

    // TODO: do this more consistently
    setTimeout(() => {
        // Call resize to correct zoom
        window.dispatchEvent(new Event('resize'))
    }, 5)
}
