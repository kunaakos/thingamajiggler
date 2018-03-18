class Thing {
    constructor(type, name) {

        if (new.target === Thing) {
            throw new TypeError("Thing is an abstract class.");
        }

        this.type = type
        this.name = name
    }
}

module.exports = Thing