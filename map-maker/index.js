let canvas

let imports = [
    null,
    null,
    `import EntityType from '../../../world/entity/EntityType'`,
]
let mapObject = {
    name: 'new_map',
    tileset: {
        src: null,
        tileWidth: 32,
        tileHeight: 32,
    },
    layout: [],
    solid: [],
    overlay: [],
    spawn: {
        x: 0,
        y: 0,
    },
    entities: [],
    music: {
        src: [],
        volume: 1.0,
        fade: 1.0,
    },
}

let mapWidth = 25
let mapHeight = 20

let currentLayer = 0
let currentTile = {
    x: 0,
    y: 0,
    index: 0,
}

let tilesetImg
let tilesetOffset = 0

// User interaction
let tilesetCanvas

let widthInput
let heightInput
let applyButton

let nameInput
let spawnXInput
let spawnYInput

let musicNameInput
let volumeInput
let fadeInput

let saveButton

// Show reload warning
window.onbeforeunload = function () {
    return 'Map data might be lost if you refresh, are you sure?'
}

// Setup
function setup() {
    pixelDensity(1)

    // Inputs & Buttons
    widthInput = createInput('25', 'number')
    heightInput = createInput('20', 'number')
    applyButton = createButton('Apply')

    nameInput = createInput('Name')
    spawnXInput = createInput('0', 'number')
    spawnYInput = createInput('0', 'number')

    musicNameInput = createInput('Music file name')
    volumeInput = createInput('1.0', 'number')
    fadeInput = createInput('1.0', 'number')

    saveButton = createButton('Save')

    // Styling
    widthInput.parent('size')
    heightInput.parent('size')
    applyButton.parent('size')
    nameInput.parent('meta-main')
    spawnXInput.parent('meta-main')
    spawnYInput.parent('meta-main')
    musicNameInput.parent('meta-music')
    volumeInput.parent('meta-music')
    fadeInput.parent('meta-music')
    saveButton.parent('meta')

    // Width and height
    widthInput.input(() => {
        mapWidth = widthInput.value()
    })

    heightInput.input(() => {
        mapHeight = heightInput.value()
    })

    // Apply width and height
    applyButton.mouseReleased(function () {
        if (mapHeight > 0 && mapWidth > 0) {
            makeCanvas(mapWidth, mapHeight)
            let widthToSet = '100%'
            if (mapWidth >= 35) {
                widthToSet = ((mapWidth / 35) * 100).toString().concat('%')
            }
            document.body.style.width = widthToSet
        }
    })

    // Meta main
    nameInput.input(() => {
        mapObject.name = nameInput.value()
    })

    spawnXInput.input(() => {
        mapObject.spawn.x = spawnXInput.value()
    })

    spawnYInput.input(() => {
        mapObject.spawn.y = spawnYInput.value()
    })

    // Meta music
    musicNameInput.input(() => {
        mapObject.music.src = musicNameInput.value()
        imports[1] = `import ${mapObject.music.src} from '../../sound/bgm/${mapObject.music.src}.mp3'`
    })

    volumeInput.input(() => {
        mapObject.music.volume = volumeInput.value()
    })

    fadeInput.input(() => {
        mapObject.music.fade = fadeInput.value()
    })

    // Save
    saveButton.mouseReleased(function () {
        console.log(mapObject, imports)

        saveAs(
            new Blob(
                [
                    imports[0] ? imports[0] + '\n' : '',
                    imports[1] ? imports[1] + '\n' : '',
                    imports[2] + '\n\n',
                    `const map_${mapObject.name} = ` +
                        JSON.stringify(mapObject)
                            .replace(
                                `"${mapObject.tileset.src}"`,
                                `${mapObject.tileset.src}`
                            )
                            .replace(
                                `"${mapObject.music.src}"`,
                                `${mapObject.music.src}`
                            ),
                    `\n\nexport default map_${mapObject.name}`,
                ],
                {
                    type: 'application/javascript;charset=utf-8',
                }
            ),
            `map_${mapObject.name}.js`
        )
    })

    // Make main Canvas
    makeCanvas(mapWidth, mapHeight)
}

function draw() {
    background(0)

    // Drawn tiles
    if (mapObject.layout.length > 0 && tilesetImg) {
        for (let layer = 0; layer < mapObject.layout.length; layer++) {
            for (let y = 0; y < mapObject.layout[layer].length; y++) {
                for (let x = 0; x < mapObject.layout[layer][y].length; x++) {
                    const tileIndex = mapObject.layout[layer][y][x]
                    image(
                        tilesetImg,
                        x * 32,
                        y * 32,
                        32,
                        32,
                        (tileIndex - Math.floor(tileIndex / 8) * 8) * 32,
                        Math.floor(tileIndex / 8) * 32,
                        32,
                        32
                    )
                }
            }
        }
    }

    // Hover box indicator
    const x = mouseX - (mouseX % 32)
    const y = mouseY - (mouseY % 32)
    if (mouseOnCanvas(x, y, mouseX, mouseY, canvas.width, canvas.height)) {
        noFill()
        stroke(255)
        strokeWeight(3)
        rect(x, y, 32, 32)
    }
}

function mousePressed() {
    var x = mouseX - (mouseX % 32)
    var y = mouseY - (mouseY % 32)

    if (mouseOnCanvas(x, y, mouseX, mouseY, canvas.width, canvas.height)) {
        if (tilesetImg) {
            mapObject.layout[currentLayer][y / 32][x / 32] = currentTile.index
        }
    }
}

function makeCanvas(width, height) {
    // Initialize array
    if (mapObject.layout.length === 0) {
        const layer0 = []
        const mapRow = []
        for (let x = 0; x < width; x++) {
            mapRow.push(0)
        }
        for (let y = 0; y < height; y++) {
            layer0.push([...mapRow])
        }
        mapObject.layout = [layer0]
        console.log(mapObject.layout)
    }

    // Regenerate array
    else {
        const widthSmaller = width < mapObject.layout[0][0].length
        const heightSmaller = height < mapObject.layout[0].length

        // New array is smaller
        for (let layer = 0; layer < mapObject.layout.length; layer++) {
            if (widthSmaller) {
                for (let y = 0; y < mapObject.layout[layer].length; y++) {
                    mapObject.layout[layer][y] = mapObject.layout[layer][
                        y
                    ].slice(0, width)
                }
            }
            if (heightSmaller) {
                mapObject.layout[layer] = mapObject.layout[layer].slice(
                    0,
                    height
                )
            }
        }

        // New array is larger
        const fillerArray = []
        for (let i = 0; i < width; i++) {
            fillerArray.push(0)
        }
        for (let layer = 0; layer < mapObject.layout.length; layer++) {
            // Resize the width
            if (!widthSmaller) {
                for (let y = 0; y < mapObject.layout[layer].length; y++) {
                    mapObject.layout[layer][y] = resizeArray(
                        mapObject.layout[layer][y],
                        width,
                        0
                    )
                }
            }
            // Resize the height
            if (!heightSmaller) {
                mapObject.layout[layer] = resizeArray(
                    mapObject.layout[layer],
                    height,
                    [...fillerArray]
                )
            }
        }
        console.log(mapObject.layout)
    }

    mapWidth = width
    mapHeight = height
    canvas = createCanvas(width * 32, height * 32)
    background(0)

    // Styling
    canvas.parent('main-canvas')
}

// Tileset Canvas
let tilesetSketch = function (sketch) {
    sketch.setup = function () {
        let tilesetDiv = document.getElementById('tileset-content')
        const divWidth = tilesetDiv.offsetWidth
        const divHeight = tilesetDiv.offsetHeight

        let canvas = sketch.createCanvas(divWidth, divHeight)
        sketch.background(39, 58, 93)
        sketch.pixelDensity(1)

        // Image dropping
        canvas.drop((file) => {
            if (file.type === 'image') {
                tilesetImg = sketch.createImg(file.data)
                tilesetImg.hide()

                // Update src
                mapObject.tileset.src = file.name
                    .replace('.png', '')
                    .replace('.jpg', '')
                    .replace('.jpeg', '')
                imports[0] = `import ${mapObject.tileset.src} from '../../img/tilesets/${file.name}'`
            }
        })
    }

    sketch.draw = function () {
        sketch.background(39, 58, 93)
        if (tilesetImg)
            sketch.image(
                tilesetImg,
                0,
                tilesetOffset,
                tilesetImg.width,
                tilesetImg.height
            )

        const x = sketch.mouseX - (sketch.mouseX % 32)
        const y = sketch.mouseY - (sketch.mouseY % 32)

        // Selected box indicator
        sketch.noFill()
        sketch.stroke('red')
        sketch.strokeWeight(2)
        sketch.rect(
            currentTile.x * 32,
            currentTile.y * 32 + tilesetOffset,
            32,
            32
        )

        sketch.stroke('yellow')
        sketch.strokeWeight(2)
        sketch.rect(
            (currentTile.x + 0.1) * 32,
            (currentTile.y + 0.1) * 32 + tilesetOffset,
            26,
            26
        )

        // Hover box indicator
        if (
            mouseOnCanvas(
                x,
                y,
                sketch.mouseX,
                sketch.mouseY,
                sketch.width,
                sketch.height
            )
        ) {
            sketch.stroke(0)
            sketch.strokeWeight(2)
            sketch.rect(x, y, 32, 32)
        }
    }

    sketch.mousePressed = function () {
        const x = sketch.mouseX - (sketch.mouseX % 32)
        const y =
            sketch.mouseY -
            tilesetOffset -
            ((sketch.mouseY - tilesetOffset) % 32)

        if (
            mouseOnCanvas(
                x,
                y,
                sketch.mouseX,
                sketch.mouseY,
                sketch.width,
                sketch.height
            )
        ) {
            currentTile.x = x / 32
            currentTile.y = y / 32
            currentTile.index = currentTile.x + currentTile.y * 8
            console.log(currentTile)
        }
    }

    sketch.mouseWheel = function (event) {
        const x = sketch.mouseX - (sketch.mouseX % 32)
        const y = sketch.mouseY - (sketch.mouseY % 32)

        if (
            mouseOnCanvas(
                x,
                y,
                sketch.mouseX,
                sketch.mouseY,
                sketch.width,
                sketch.height
            )
        ) {
            tilesetOffset += Math.sign(-event.deltaY) * 64
        }
    }
}
tilesetCanvas = new p5(tilesetSketch, 'tileset-content')

// Util functions

function mouseOnCanvas(x, y, mouseX, mouseY, width, height) {
    return x > -1 && y > -1 && mouseX <= width && mouseY <= height
}

function resizeArray(arr, newSize, defaultValue) {
    return [
        ...arr,
        ...Array(Math.max(newSize - arr.length, 0)).fill(defaultValue),
    ]
}