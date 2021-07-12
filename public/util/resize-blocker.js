export default function blockResizing(p5Instance) {
    // Disable resizing
    window.onresize = () => {
        const zoomRatio = window.devicePixelRatio
        p5Instance.resizeCanvas(
            window.innerWidth * zoomRatio,
            window.innerHeight * zoomRatio
        )
    }

    // Disable zoom using +/-
    document.addEventListener('keydown', (event) => {
        if (event.ctrlKey && (event.key === '+' || event.key === '-')) {
            event.preventDefault()
        }
    })

    // Disable zoom using scroll wheel
    window.addEventListener(
        'wheel',
        (event) => {
            if (event.ctrlKey) {
                event.preventDefault()
            }
        },
        { passive: false }
    )
}
