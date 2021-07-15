import DeltaOverlay from "./DeltaOverlay"
import createElementWithClasses from '../../util/create-element-with-classes'

export default class ChatUI {
    constructor() {
        const chat = createElementWithClasses('div', ['chat'])
        const chatInput = document.createElement('input')
        chat.appendChild(chatInput)
        DeltaOverlay.overlay.appendChild(chat)
    }
}