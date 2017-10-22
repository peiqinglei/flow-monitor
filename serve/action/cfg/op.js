const {
    networkInterface
} = require('oscfg')
const plantform = require('os').platform()
const { execSync } = require('child_process')
const base = networkInterface
const shutdown = function () {
    execSync(`shutdown -r ${plantform === 'win32' ? '' : 'now'}`)
}
const getCfg = () => {
    return {
        address: base.getAddress(),
        netmask: base.getNetmask(),
        gateway: base.getGateway(),
        dns: base.getDNS()
    }
}
const setCfg = (req, resp) => {
    const {
        address,
        netmask,
        gateway,
        dns
    } = JSON.parse(req.body)

    if (address) {
        base.setAddress(address)
    } else if (netmask) {
        base.setNetmask(netmask)
    } else if (gateway) {
        base.setGateway(gateway)
    } else if (dns) {
        let dnses = dns.match(/[^,]+/g)
        dnses && base.setDNS(dnses)
    }
    return {
        success: true
    }
}

const execute = (req, resp) => {
    switch (req.method.toUpperCase()) {
    case 'HEAD':
        shutdown()
        return {
            shutdown: true
        }
    case 'POST':
        setCfg(req, resp)
        break
    default:
    }
    return getCfg()
}
module.exports = execute
