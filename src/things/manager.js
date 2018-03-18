const uidGenerator = require('#libs/uid-generator')

const {
    ERR__INVALID_SWITCH_ID,
    TYPE_SWITCH,
    UID,
    CONTROLLER
} = require('#libs/constants')

// Load mock switch module if not running on rpi hardware.
const isPi = process.env.HARDWARE === 'raspberrypi'
const Switch = isPi
    ? require('./physical/switch')
    : require('./mock/switch')

// Things are stored in this map.
const things = new Map()

// The first few characters of the things' uids show their type.
// Things don't know their uid, only the manager does.  
const switchUid = uidGenerator('SW')

// Mock some things!
const ceilingLight = new Switch('ceiling light', 7, false)
things.set(switchUid.next().value, ceilingLight)
const deskLight = new Switch('desk light', 11, false)
things.set(switchUid.next().value, deskLight)

function getThings() {
    return Array.from(things.entries())
}

function getThing(targetUid) {
    return things.get(targetUid)
}

function getSwitches() {
    return Array.from(things.entries())
        .filter((thingEntry) => {
            const thing = thingEntry[CONTROLLER]
            return thing.type === TYPE_SWITCH
        })
}

function getSwitch(targetUid) {
    const targetSwitch = getThing(targetUid)
    if (targetSwitch && targetSwitch.type === TYPE_SWITCH) {
        return [targetUid, targetSwitch]
    } else {
        throw ERR__INVALID_SWITCH_ID
    }
}

async function setSwitch(targetUid, state) {
    const targetSwitch = getThing(targetUid)
    if (targetSwitch && targetSwitch.type === TYPE_SWITCH) {
        await targetSwitch.set(state) 
        return [targetUid, targetSwitch]       
    } else {
        throw ERR__INVALID_SWITCH_ID
    }
}

module.exports = {
    getThings,
    getSwitches,    
    getSwitch,
    setSwitch
}