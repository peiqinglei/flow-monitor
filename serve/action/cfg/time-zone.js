const {
    timeZone: {
        time,
        zone,
        ntp
    }
} = require('oscfg')
let disks = []

const getCfg = () => {
    return {
        time: time.getTime(),
        zoneTree: zone.tree(),
        zone: zone.getZone(),
        ntp: ntp.getEnabled()
    }
}
const setCfg = (req, resp) => {
    const data = req.data

    if (data.time) {
        time.setTime(Number(data.time))
    } else if (data.zone) {
        zone.setZone(data.zone)
    } else if (data.ntp) {
        ntp.setEnabled(data.ntp === 'true')
    }
    return {
        success: true
    }
}

module.exports = (req, resp) => {
    switch (req.method.toUpperCase()) {
    case 'POST': return setCfg(req, resp)
    default: return getCfg()
    }
}
