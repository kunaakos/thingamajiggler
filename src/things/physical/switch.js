const Thing = require('#things/abstract/thing')
const gpio = require('rpi-gpio')

const {
    TYPE_SWITCH
} = require('#libs/constants')


// TODO: clean up this mess...
class Switch extends Thing {

    constructor(name, pin, initialState) {
        super(TYPE_SWITCH, name)
        this.pin = pin
        this.initialize(initialState)
    }

    async initialize(initialState) {
        this.busy = true
        try {
            this.state = await this.setupPin(initialState)
            this.initialized = true
        } catch(err) {
            this.failed = true
        }
        this.busy = false
    }

    async setupPin(initialState) {
        const mode = initialState
            ? gpio.DIR_HIGH
            : gpio.DIR_LOW
        return new Promise((resolve, reject) => {
            gpio.setup(this.pin, mode, (err) => {
                err
                    ? reject(err)
                    : resolve(initialState)
            })
        })
    }

    async writePin(newState) {
        return new Promise((resolve, reject) => {
            gpio.write(this.pin, newState, (err) => {
                err
                    ? reject(err)
                    : resolve(newState)
            })
        })
    }

    async set(newState) {
        if (this.busy) throw 'resource_busy'
        if (!this.initialized) throw 'resource_not_ready'
        this.busy = true
        this.state = await this.writePin(newState)
        this.busy = false
        return this.state
    }

}

module.exports = Switch