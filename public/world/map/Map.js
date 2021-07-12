import DeltaScreen from '../../graphics/DeltaScreen'

export default class Map {
    // name
    // tilesets
    // layout
    // width
    // heigth
    // entities
    // music

    constructor(mapData) {
        // The name of the map
        this.name = mapData.name

        // Array of tilesets to use
        this.tilesets = mapData.tilesets

        // Layout of the tiles
        this.layout = mapData.layout
        this.width = layout[0][0].length
        this.height = layout[0].length

        // Array of static entities
        this.entities = mapData.entities

        // BGM
        this.music = mapData.music
    }

    getTile(x, y, layer) {
        if (layer < 0 || layer >= this.map.length) {
            return 0
        }

        if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
            return this.layout[layer][y][x]
        }

        return 0
    }

    isSolid(x, y) {
        for (var layer = 0; layer < this.map.length; layer++) {
            if (this.getTile(layer, x, y) === 948) {
                return true
            }
        }

        return false
    }

    draw() {
        const screen = DeltaScreen

        for (var layer = 0; layer < this.layout.length; layer++) {
            const tile = this.getTile(tx, ty, layer)

            // Don't draw empty tiles
            if (tile === 0) continue

            const tileX = tile % this.tileset.width
            const tileY = Math.floor(tile / this.tileset.width)

            this.tileset.drawTile(x, y, tileX, tileY, screen)
        }

        // Temporary indicator for solid tiles
        if (this.isSolid(tx, ty)) {
            screen.noFill()
            screen.stroke(255, 0, 0)
            screen.rect(x, y, this.tileset.tileWidth, this.tileset.tileHeight)
        }
    }
}
