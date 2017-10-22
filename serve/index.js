const JsonOut = require('./misc/JsonOut.js')
const JsonpOut = require('./misc/JsonpOut.js')
const ServerSent = require('./misc/ServerSent.js')
const { authorize, changePass } = require('./misc/Authorization.js')
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
route.on('cfg.op', JsonOut(require('./action/cfg/op')))
route.on('cfg.changePass', JsonOut(changePass))
route.on('heartbreaks', JsonpOut(() => ({success: true})))

// BrowserRouter
route.on(/^[\w\/]*$/, (req, resp) => {
    if (authorize(req, resp)) {
        return 'index.html'
    } else {
        return false
    }
})

exports.onRoute = (pathname, req, resp, memory) => {
    try {
        return route.execute(pathname, req, resp, memory)
    } catch (error) {
        JsonOut(() => ({error: error.toString()}))(req, resp)
        return false
    }
}

// if need update
const beforeRoute = new Route()
const { updateFlowpp, updateProps, updateWeb } = require('./action/cfg/update.js')
beforeRoute.on('update.flowpp', JsonOut(updateFlowpp))
beforeRoute.on('update.props', JsonOut(updateProps))
beforeRoute.on('update.web', JsonOut(updateWeb))
exports.beforeRoute = (pathname, req, resp, memory) => {
    if (!/^update\./.test(pathname)) {
        return
    }
    try {
        if (authorize(req, resp)) {
            return beforeRoute.execute(pathname, req, resp, memory)
        } else {
            return false
        }
    } catch (error) {
        JsonOut(() => ({error: error.toString()}))(req, resp)
        return false
    }
}
