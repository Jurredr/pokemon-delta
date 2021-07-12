const testmap = {
    name: 'test',
    tilesets: [assets.img.tilesets.outside.png],
    layout: [
        [
            [1, 1, 1, 1, 1],
            [1, 6, 6, 6, 1],
            [1, 6, 6, 6, 1],
            [1, 6, 6, 6, 1],
            [1, 1, 1, 1, 1],
        ],
        [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 948, 0],
        ],
    ],
    entities: [],
    music: {
        file: null,
        volume: 1,
        pitch: 1,
        fade: 1,
    },
}

export default testmap
