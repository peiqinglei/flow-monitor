
exports.os = {
    info: () => fetch('/os.info').then(res => res.json()),
    runtime: () => new Worker('/src/workers/os.js')
}
exports.sys = {
    runtime: () => new Worker('/src/workers/sys.js')
}
exports.cfg = {
    base: () => fetch('/cfg.base').then(res => res.json()),
    updateTime: (time) => fetch(`/cfg.base?time=${time}`, {method: 'POST'}).then(res => res.json()),
    updateZone: (zone) => fetch(`/cfg.base?zone=${zone}`, {method: 'POST'}).then(res => res.json()),
    updateNTP: (ntp) => fetch(`/cfg.base?ntp=${ntp}`, {method: 'POST'}).then(res => res.json())
}
