import { createAction } from '../redux-actions'
import { cfg } from './api'

const SET_TIMEZONE_INFO = 'SET_TIMEZONE_INFO'

export default (state, action) => {
    const {
        payload, type
    } = action
    switch (type) {
    case SET_TIMEZONE_INFO:
        return state.setIn(['cfg.timeZone'], payload)
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
