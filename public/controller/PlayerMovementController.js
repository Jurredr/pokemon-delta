import DeltaScreen from '../graphics/DeltaScreen'
import EntityMovement from '../world/entity/components/EntityMovement'
import KeyBinds from './KeyBinds'

export default class PlayerMovementController {
    constructor(movement) {
        /** @type {EntityMovement} */
        this.movement = movement

        // keys down ordered by how long they have been down for the current press
        this.keysDown = []

        // the key used for input for the current movement
        // defined by the value of lastKey (at the start of/ when no) movement
        this.currentKey

        // the key used for input after the current movement
        // defined as the last value lastKey was assigned during the movement
        // this value will be undefined if it would be the same as the currentKey
        // to prevent double inputs
        this.nextKey
    }

    update() {
        if (this.movement.frozen) return

        // the key that has been held for the shortest amount of time
        // from the press, up till and including now
        let lastKey

        for (const key of [
            KeyBinds.WALK_FORWARD,
            KeyBinds.WALK_BACKWARD,
            KeyBinds.WALK_LEFT,
            KeyBinds.WALK_RIGHT,
        ]) {
            const i = this.keysDown.indexOf(key)
            const inArray = i > -1

            if (DeltaScreen.p5Sketch.keyIsDown(key.charCodeAt(0))) {
                if (!inArray) {
                    this.keysDown.push(key)
                }
            } else if (inArray) {
                this.keysDown.splice(i)
            }
        }

        if (this.keysDown.length > 0) {
            lastKey = this.keysDown[this.keysDown.length - 1]
        }

        if (this.movement.moving) {
            if (lastKey && lastKey !== this.currentKey) {
                this.nextKey = lastKey
            }
        } else {
            this.currentKey = undefined
            if (this.nextKey) {
                this.currentKey = this.nextKey
                this.nextKey = undefined
            } else {
                this.currentKey = lastKey
            }
        }

        switch (this.currentKey) {
            case KeyBinds.WALK_FORWARD:
                this.movement.move(0, -1, true)
                break
            case KeyBinds.WALK_BACKWARD:
                this.movement.move(0, 1, true)
                break
            case KeyBinds.WALK_LEFT:
                this.movement.move(-1, 0, true)
                break
            case KeyBinds.WALK_RIGHT:
                this.movement.move(1, 0, true)
                break
        }
    }
}
