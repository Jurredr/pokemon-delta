import outside from '../../img/tilesets/outside.png'
import route_201_day from '../../sound/bgm/route_201_day.mp3'
import EntityType from '../../../world/entity/EntityType'

const map_test = {
    name: 'test',
    tileset: {
        src: outside,
        tileWidth: 32,
        tileHeight: 32,
    },
    layout: [
        [
            [1, 1, 1, 1, 1, 8, 10, 1, 1, 1],
            [1, 6, 6, 6, 1, 16, 18, 1, 1, 1],
            [1, 6, 6, 6, 1, 24, 26, 1, 1, 1],
            [1, 6, 6, 6, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ],
        [
            [0, 0, 0, 0, 0, 0, 0, 0, 420, 421],
            [0, 0, 0, 0, 0, 0, 0, 0, 428, 429],
            [0, 0, 0, 0, 0, 0, 0, 0, 436, 437],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 948, 0, 0, 0, 0, 0, 0],
        ],
    ],
    solid: [1],
    overlay: [1],
    entities: [
        {
            type: EntityType.POKEBALL,
            solid: true,
            x: 3,
            y: 4,
        },
    ],
    music: {
        src: [route_201_day],
        volume: 1.0,
        fade: 1.0,
    },
}

export default map_test
