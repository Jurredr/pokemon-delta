import ChatUI from './ChatUI'

const DeltaOverlay = {
    overlay: undefined,
    chat: undefined,
    init() {
        // Make main canvas absolute
        document.getElementById('defaultCanvas0').style.position = 'absolute'

        // Generate the ui-overlay div
        const overlay = document.createElement('div')
        overlay.classList.add('delta-overlay')
        document.getElementsByTagName('main')[0].appendChild(overlay)
        this.overlay = overlay

        // Generate the other separate components
        this.chat = new ChatUI()
    },
}

export default DeltaOverlay
