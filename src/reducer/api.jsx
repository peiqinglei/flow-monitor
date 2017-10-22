import $ from 'jquery'

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
    }).then(res => res.json()),

    op: () => fetch('/cfg.op').then(res => res.json()),
    changePass: (password) => fetch('/cfg.changePass', {method: 'POST', body: password}).then(res => res.json()),
    restart: () => fetch('/cfg.op', {method: 'HEAD'}),
    updateAddress: address => fetch('/cfg.op', {
        method: 'POST',
        body: JSON.stringify({address})
    }).then(res => res.json()),
    updateNetmask: netmask => fetch('/cfg.op', {
        method: 'POST',
        body: JSON.stringify({netmask})
    }).then(res => res.json()),
    updateGateway: gateway => fetch('/cfg.op', {
        method: 'POST',
        body: JSON.stringify({gateway})
    }).then(res => res.json()),
    updateDNS: dns => fetch('/cfg.op', {
        method: 'POST',
        body: JSON.stringify({dns})
    }).then(res => res.json())
}

exports.misc = {
    heartbreaks: (url, success, error) => {
        $.ajax({
            timeout: 5000,
            url,
            dataType: 'jsonp',
            success,
            error
        })
    }
}
