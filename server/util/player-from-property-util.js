export default function getPlayerFromProperty(property, value, players) {
    const candidates = players.filter(
        (player) => player[property] === value
    )

    return candidates.length > 0 ? candidates[0] : undefined
}
