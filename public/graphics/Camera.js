const Camera = {
    follow: null,
    x: 0,
    y: 0,

    init(x, y, follow) {
        Camera.x = x
        Camera.y = y
        Camera.x = follow
    }
}

export default Camera
