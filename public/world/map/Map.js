import DeltaScreen from '../../graphics/DeltaScreen'
import Tileset from '../../graphics/Tileset'

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

        // Array of tilesets to use
        this.tileset = new Tileset(mapData.tileset.src, mapData.tileset.totalWidth, mapData.tileset.totalHeight)

        // Layout of the tiles
        this.layout = mapData.layout
        this.width = this.layout[0][0].length
        this.height = this.layout[0].length

        // Array of static entities
        this.entities = mapData.entities

        // BGM
        this.music = mapData.music
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

    isSolid(x, y) {
        for (let layer = 0; layer < this.layout.length; layer++) {
            if (this.getTile(layer, x, y) === 948) {
                return true
            }
        }

        return false
    }

    draw() {
        const screen = DeltaScreen

        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                const tx = x * this.tileset.totalWidth
                const ty = y * this.tileset.totalHeight

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
                        this.tileset.totalWidth,
                        this.tileset.totalHeight
                    )
                }
            }
        }
    }
}
