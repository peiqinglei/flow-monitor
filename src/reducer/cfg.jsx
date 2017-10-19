import { createAction } from '../redux-actions'
import { cfg } from './api'

const SET_TIMEZONE_INFO = 'SET_TIMEZONE_INFO'
const SET_IGB_INFO = 'SET_IGB_INFO'

export default (state, action) => {
    const {
        payload, type
    } = action
    switch (type) {
    case SET_TIMEZONE_INFO:
        return state.setIn(['cfg.timeZone'], payload)
    case SET_IGB_INFO:
        return state.setIn(['cfg.igb'], payload)
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