import DeltaScreen from '../../graphics/DeltaScreen'
import Tileset from '../../graphics/Tileset'
import Position from '../components/Position'
import Entity from '../entity/Entity'

import assets from '../../assets/**/*.*'
import { Howl, Howler } from 'howler'

export default class Map {
    // name
    // tileset
    // layout
    // width
    // heigth
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
        this.width = this.layout[0][0].length
        this.height = this.layout[0].length

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
        var sound = new Howl({
            src: [assets.sound.bgm.route_201_day.mp3],
            autoplay: true,
            loop: true,
            volume: 1.0,
            onend: function () {
                console.log('BGM finished a cycle!')
            },
        })
        sound.play()
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
        if (this.getTile(x, y, 1) !== 0) {
            return true
        }
        // for (let layer = 0; layer < this.layout.length; layer++) {
        //     if (this.getTile(x, y, layer) === 948) {
        //         return true
        //     }
        // }

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
                    if (tile === 0) continue

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
