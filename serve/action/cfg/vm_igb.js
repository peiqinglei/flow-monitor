const fs = require('fs')
const path = require('path')
const ini = require('ini')
const _ = require('lodash')
const fileName = path.join(__dirname, './vm_igb.ini')

const execute = (req, resp) => {
    const fileStr = fs.readFileSync(fileName).toString()
    let iniJSON = ini.parse(fileStr)
    switch (req.method.toUpperCase()) {
    case 'POST':
        const data = JSON.parse(req.body)
        fs.writeFileSync(fileName, ini.stringify(_.merge(iniJSON, data)))
    default:
    }
    return iniJSON
}
module.exports = execute