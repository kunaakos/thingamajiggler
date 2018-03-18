const { send } = require('micro')
const thingManager = require('#things/manager.js')
const { switchResponseData } = require('#things/utils.js')

const {
    UID,
    CONTROLLER
} = require('#libs/constants')

module.exports.GET = function(req, res) {
    const switchData = thingManager
        .getSwitches()
        .map((switchEntry) => {
            return {
                uid: switchEntry[UID],
                ...switchResponseData(switchEntry[CONTROLLER])
            }
        })
    send(res, 200, { switches: switchData })
}