const { send } = require('micro')
const thingManager = require('../../things/manager.js')
const { thingResponseData } = require('../../things/utils.js')

const UID = 0
const CONTROLLER = 1

module.exports.GET = function(req, res) {
    const thingData = thingManager
        .getThings()
        .map((thingEntry) => {
            return {
                uid: thingEntry[UID],
                ...thingResponseData(thingEntry[CONTROLLER])
            }
        })
    send(res, 200, { things: thingData })
}
