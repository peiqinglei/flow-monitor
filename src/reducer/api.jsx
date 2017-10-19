
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
    updateNTP: (ntp) => fetch(`/cfg.base?ntp=${ntp}`, {method: 'POST'}).then(res => res.json()),
    igb: () => fetch('/cfg.igb').then(res => res.json()),
    updateWorkerMod: inline_mode => fetch('/cfg.igb', {
        method: 'POST',
        body: JSON.stringify({worker: {inline_mode}})
    }).then(res => res.json()),
    updateWorkerNum: num => fetch('/cfg.igb', {
        method: 'POST',
        body: JSON.stringify({worker: {num}})
    }).then(res => res.json()),
    updateSessionNum: session_num => fetch('/cfg.igb', {
        method: 'POST',
        body: JSON.stringify({worker: {session_num}})
    }).then(res => res.json()),
    updateLoggerAddr: collector_address => fetch('/cfg.igb', {
        method: 'POST',
        body: JSON.stringify({logger: {collector_address}})
    }).then(res => res.json()),
    updateLoggerPort: collector_port => fetch('/cfg.igb', {
        method: 'POST',
        body: JSON.stringify({logger: {collector_port}})
    }).then(res => res.json())
}
