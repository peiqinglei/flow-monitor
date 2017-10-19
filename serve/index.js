const JsonOut = require('./misc/JsonOut.js')
const ServerSent = require('./misc/ServerSent.js')
const Route = require('./Route')
const route = new Route()

route.on('os.info', JsonOut(require('./action/os/lshw.js')))
route.on('os.runtime', ServerSent({
    cpu: require('./action/os/cpu.js'),
    mem: require('./action/os/mem.js'),
    disk: require('./action/os/disk/runtime.js'),
    net: require('./action/os/net.js')
}))
route.on('sys.runtime', ServerSent(require('./action/sys/runtime.js')))

route.on('cfg.base', JsonOut(require('./action/cfg/time-zone')))
route.on('cfg.igb', JsonOut(require('./action/cfg/vm_igb')))

// BrowserRouter
route.on(/^[\w\/]*$/, () => 'index.html')

module.exports = (pathname, req, resp, memory) => {
    try {
        return route.execute(pathname, req, resp, memory)
    } catch (error) {
        console.trace(error)
        JsonOut(() => ({error: error.toString()}))(req, resp)
        return false
    }
}
