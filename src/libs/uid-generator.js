function* uidGenerator(id) {
    let index = 0
    while (true) {
        yield `${id}${String(index++).padStart(5, '0')}`
    }
}

module.exports = uidGenerator