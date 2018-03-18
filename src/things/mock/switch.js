const Thing = require('#things/abstract/thing')

const {
    TYPE_SWITCH
} = require('#libs/constants')

class Switch extends Thing {
    constructor(name, pin, state) {
        super(TYPE_SWITCH, name)
        this.pin = pin
        this.state = state
    }

    async set(state) {
        this.state = Boolean(state)
        return this
    }

}

module.exports = Switch