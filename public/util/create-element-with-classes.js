export default function createElementWithClasses(type, classes) {
    const element = document.createElement(type)
    classes.map(className => element.classList.add(className))
    return element
}
