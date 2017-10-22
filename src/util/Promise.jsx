const emptyFunction = () => {}

module.exports = class {
    constructor (fn) {
        let resolveList = []
        let rejectList = []

        setTimeout(function () {
            fn(res => {
                resolveList.map(resolve => {
                    res = resolve(res)
                })
            }, err => {
                rejectList.map(reject => {
                    err = reject(err) || err
                })
            })
        }, 0)

        this.yes = (fn1, fn2) => {
            resolveList.push(fn1)
            fn2 && rejectList.push(fn2)
            return this
        }
        this.no = fn => {
            rejectList.push(fn)
            return this
        }
        this.always = fn => {
            resolveList.push(fn)
            rejectList.push(fn)
            return this
        }
    }
}
