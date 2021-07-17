import DeltaScreen from '../graphics/DeltaScreen'
import Tileset from '../graphics/Tileset'
import Position from './components/Position'
import Entity from './entity/Entity'

import { Howl } from 'howler'

export default class Map {
    // name
    // tileset
    // layout
    // solid
    // overlay
    // width
    // heigth
    // spawn
    // entities
    // music

    constructor(mapData) {
        // The name of the map
        this.name = mapData.name

        // Tileset to use
        this.tileset = new Tileset(
            mapData.tileset.src,
            mapData.tileset.tileWidth,
            mapData.tileset.tileHeight
        )

        // Layout of the tiles
        this.layout = mapData.layout
        this.solid = mapData.solid
        this.overlay = mapData.overlay
        this.width = this.layout[0][0].length
        this.height = this.layout[0].length
        this.spawn = mapData.spawn

        // Array of static entities
        this.entities = []
        mapData.entities.forEach((entity) => {
            const entityObject = new Entity(
                'entityID',
                entity.type,
                entity.solid,
                new Position(entity.x, entity.y)
            )
            this.entities.push(entityObject)
        })

        // BGM
        this.music = mapData.music
        this.startMusicLoop()
    }

    startMusicLoop() {
        new Howl({
            src: this.music.src,
            autoplay: true,
            loop: true,
            volume: this.music.volume,
            onend: function () {
                console.log('BGM finished a cycle!')
            },
        }).play()
    }

    getTile(x, y, layer) {
        if (layer < 0 || layer >= this.layout.length) {
            return 0
        }

        if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
            return this.layout[layer][y][x]
        }

        return 0
    }

    isEntity(x, y) {
        for (let entity of this.entities) {
            if (entity.position.x === x && entity.position.y === y)
                return entity
        }
        return null
    }

    isSolid(x, y) {
        for (let solidLayer = 0; solidLayer < this.solid.length; solidLayer++) {
            if (this.getTile(x, y, this.solid[solidLayer]) !== -1) {
                return true
            }
        }
        return false
    }

    draw(screen = DeltaScreen) {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                const tx = x * this.tileset.tileWidth
                const ty = y * this.tileset.tileHeight

                for (let layer = 0; layer < this.layout.length; layer++) {
                    const tile = this.getTile(x, y, layer)

                    // Don't draw empty tiles
                    if (tile === -1) continue

                    const tileX = tile % this.tileset.width
                    const tileY = Math.floor(tile / this.tileset.width)

                    this.tileset.drawTile(tx, ty, tileX, tileY, screen)
                }

                // Temporary indicator for solid tiles
                if (this.isSolid(x, y)) {
                    screen.noFill()
                    screen.stroke(255, 0, 0)
                    screen.rect(
                        tx,
                        ty,
                        this.tileset.tileWidth,
                        this.tileset.tileHeight
                    )
                }
            }
        }
    }
}
