const Thing = require('../abstract/thing')

const TYPE_SWITCH = 'SWITCH'

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