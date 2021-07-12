export default function blockIE() {
    const ua = window.navigator.userAgent
    if (ua.indexOf('MSIE ') > 0 || ua.indexOf('Trident/') > 0) {
        document.body.innerHTML =
            '<p class="ie-error">Internet Explorer is not supported by Pokémon Delta. Please use Firefox, Chrome, Safari or another alternative browser.</p>'
    }
}
