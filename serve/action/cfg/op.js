const {
    networkInterface
} = require('oscfg')
const base = networkInterface

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
    } else if (gateway){
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
            base.shutdown()
            return {
                shutdown: true
            }
        case 'POST':
            setCfg(req, resp)
        default:
    }
    return getCfg()
}
module.exports = execute