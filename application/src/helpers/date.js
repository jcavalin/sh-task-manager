function dateToString(date) {
    return new Date(date).toISOString().slice(0, 10)
}

export {
    dateToString
}