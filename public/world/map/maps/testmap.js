import assets from '../../../assets/**/*.*'
import EntityType from '../../entity/EntityType'

const testmap = {
    name: 'test',
    tileset: {
        src: assets.img.tilesets.outside.png,
        totalWidth: 32,
        totalHeight: 32,
    },
    layout: [
        [
            [1, 1, 1, 1, 1, 8, 10],
            [1, 6, 6, 6, 1, 16, 18],
            [1, 6, 6, 6, 1, 24, 26],
            [1, 6, 6, 6, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ],
        [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 948, 0, 0, 0],
        ],
    ],
    entities: [
        {
            type: EntityType.POKEBALL,
            solid: true,
            x: 3,
            y: 4,
        },
    ],
    music: {
        file: null,
        volume: 1,
        pitch: 1,
        fade: 1,
    },
}

export default testmap
