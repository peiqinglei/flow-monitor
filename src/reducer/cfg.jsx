import { createAction } from '../redux-actions'
import { cfg, misc } from './api'
import { alert, confirm } from '../util/Dialog'
import React from 'react'

const SET_TIMEZONE_INFO = 'SET_TIMEZONE_INFO'
const SET_IGB_INFO = 'SET_IGB_INFO'
const SET_OP_INFO = 'SET_OP_INFO'

export default (state, action) => {
    const {
        payload, type
    } = action
    switch (type) {
    case SET_TIMEZONE_INFO:
        return state.setIn(['cfg.timeZone'], payload)
    case SET_IGB_INFO:
        return state.setIn(['cfg.igb'], payload)
    case SET_OP_INFO:
        return state.setIn(['cfg.op'], payload)
    }
}

const setTimeZoneAction = createAction(SET_TIMEZONE_INFO)
export const setTimeZone = () => dispatch => {
    cfg.base().then(info => dispatch(setTimeZoneAction(info)))
}
export const updateTimeZone = (name, value) => (dispatch, getState) => {
    const {
        time, zone, ntp
    } = getState().getIn('cfg.timeZone') || {}
    switch (name) {
    case 'time':
        if (time !== value) {
            cfg.updateTime(value).then(res => {
                dispatch(setTimeZone())
            })
        }
        break
    case 'zone':
        if (zone !== value) {
            cfg.updateZone(value).then(res => {
                dispatch(setTimeZone())
            })
        }
        break
    case 'ntp':
        if (ntp !== value) {
            cfg.updateNTP(value).then(res => {
                dispatch(setTimeZone())
            })
        }
        break
    }
}

const setIGBAction = createAction(SET_IGB_INFO)
export const setIGB = () => dispatch => {
    cfg.igb().then(info => dispatch(setIGBAction(info)))
}
export const updateIGB = (name, value) => (dispatch) => {
    switch (name) {
    case 'inline_mode':
        return cfg.updateWorkerMod(value).then(res => dispatch(setIGBAction(res)))
    case 'worker_num':
        return cfg.updateWorkerNum(value).then(res => dispatch(setIGBAction(res)))
    case 'session_num':
        return cfg.updateSessionNum(value).then(res => dispatch(setIGBAction(res)))
    case 'collector_address':
        return cfg.updateLoggerAddr(value).then(res => dispatch(setIGBAction(res)))
    case 'collector_port':
        return cfg.updateLoggerPort(value).then(res => dispatch(setIGBAction(res)))
    }
}

const setOPAction = createAction(SET_OP_INFO)
export const setOP = () => dispatch => {
    cfg.op().then(info => dispatch(setOPAction(info)))
}
export const updateOP = (name, value = '') => (dispatch) => {
    switch (name) {
    case 'address':
        return value && cfg.updateAddress(value).then(res => dispatch(setOPAction(res)))
    case 'netmask':
        return value && cfg.updateNetmask(value).then(res => dispatch(setOPAction(res)))
    case 'gateway':
        return value && cfg.updateGateway(value).then(res => dispatch(setOPAction(res)))
    case 'dns':
        return cfg.updateDNS(value).then(res => dispatch(setOPAction(res)))
    }
}
const location = window.location
export const changePass = password => {
    if (!password) {
        alert('修改密码不能为空！')
        return
    }
    if (password.length < 6) {
        alert('修改密码长度不小于6！')
        return
    }
    cfg.changePass(password).then(res => {
        alert('修改成功！').always(() => location.reload())
    })
}
const waitingForRestart = (address) => {
    const heartbreaksUrl = location.href.replace(/^(https?:\/\/)[^\\\/:]+(:\d+)?(.*?)$/, `$1${address}$2/heartbreaks`)
    const href = location.href.replace(/^(https?:\/\/)[^\\\/:]+/, `$1${address}`)
    const loop = function loop () {
        misc.heartbreaks(heartbreaksUrl, () => {
            location.href = href
        }, () => {
            setTimeout(loop, 3000)
        })
    }
    return loop
}
export const restart = () => (dispatch, getState) => {
    const op = getState().getIn(['cfg.op'])
    if (!op || !op.address) {
        alert('IP 地址错误！')
        return
    }
    confirm(<div><h2>确定重启服务？ </h2><i>重启过程中不要刷新页面，以便系统自动检测重启状态...</i></div>)
        .yes(() => {
            cfg.restart()
            setTimeout(function () {
                alert(<h2><i className="fa fa-spinner fa-spin fa-3x fa-fw"></i><span>重启中</span></h2>, {
                    buttons: []
                })
                waitingForRestart(op.address)()
            }, 3000)
        })
}
