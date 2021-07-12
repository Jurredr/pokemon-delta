import Direction from './Direction'

export default class Position {
    constructor(x, y) {
        this.x = x
        this.y = y

        this.imgOffsetX = 0
        this.imgOffsetY = 0
    }

    facingTile(direction) {
        let position = undefined
        switch (direction) {
            case Direction.NORTH:
                position = new Position(this.x, this.y - 1)
                break
            case Direction.EAST:
                position = new Position(this.x + 1, this.y)
                break
            case Direction.SOUTH:
                position = new Position(this.x, this.y + 1)
                break
            case Direction.WEST:
                position = new Position(this.x - 1, this.y)
                break
        }

        position.imgOffsetX = this.imgOffsetX
        position.imgOffsetY = this.imgOffsetY
        return position
    }
}
