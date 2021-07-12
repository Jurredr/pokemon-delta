export default {
    NORTH: 'NORTH',
    EAST: 'EAST',
    SOUTH: 'SOUTH',
    WEST: 'WEST',

    fromAnimatorY(y) {
        switch (y) {
            case 0:
                return this.SOUTH
            case 1:
                return this.WEST
            case 2:
                return this.EAST
            case 3:
                return this.NORTH
        }
    },
}
