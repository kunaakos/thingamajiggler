const _ = require('lodash')

const ERR__UNSUPPORTED_THING_TYPE = 'unsupported_thing_type'

const TYPE_SWITCH = 'SWITCH'

function switchResponseData(switchController) {
    let data = _.pick(switchController, [
        'type',
        'name',
        'state'
    ])
    return data
}

function thingResponseData(thingController) {
    switch (thingController.type) {
        case TYPE_SWITCH:
            return switchResponseData(thingController)
        default:
            throw ERR__UNSUPPORTED_THING_TYPE
    }
    return data
}

module.exports = {
    switchResponseData,
    thingResponseData
}