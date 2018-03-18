const { send } = require('micro')
const thingManager = require('#things/manager.js')
const { switchResponseData } = require('#things/utils.js')

const {
    UID,
    CONTROLLER,
    ERR__INVALID_PARAM,
    ERR__INVALID_PARAM_VALUE
} = require('#libs/constants')

module.exports.GET = async function(req, res) {
    const uid = req.params.uid
    try {
        const switchEntry = thingManager.getSwitch(uid)

        const switchData = {
            uid: switchEntry[UID],
            ...switchResponseData(switchEntry[CONTROLLER])
        }

        send(res, 200, switchData)
    } catch(err) {
        send(res, 400, { error: err })
    }
}

module.exports.POST = async function(req, res) {
    const uid = req.params.uid
    try {
        let switchEntry
        
        if (req.query.set !== undefined) {
            switch (req.query.set) {
                case 'true':
                    switchEntry = await thingManager.setSwitch(uid, true)
                    break
                case 'false':
                    switchEntry = await thingManager.setSwitch(uid, false)
                    break
                default:
                    throw ERR__INVALID_PARAM_VALUE
            } 
        } else {
            throw ERR__INVALID_PARAM
        }

        const switchData = {
            uid: switchEntry[UID],
            ...switchResponseData(switchEntry[CONTROLLER])
        }
    
        send(res, 200, switchData)
    
    } catch(err) {
        send(res, 400, { error: err })
    }
}