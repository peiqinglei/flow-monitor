const path = require('path')
module.exports = {
    paths: {
        vm_igb: path.join(__dirname, './serve/action/cfg/vm_igb.ini'),
        sys_runtime: path.join(__dirname, './serve/action/sys/runtime.log'),
        flowpp: path.join(__dirname, './dist/'),
        properties: path.join(__dirname, './dist/'),
        web: path.join(__dirname, '../')
    }
}
