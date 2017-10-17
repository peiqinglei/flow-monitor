import { connect } from 'react-redux'
import Base from '../../components/cfg/Base'
import { setTimeZone, updateTimeZone } from '../../reducer/cfg'

const mapStateToProps = (state) => {
    return state.getIn(['cfg.timeZone']) || {}
}
const mapDispatchToProps = (dispatch) => {
    return {
        init: () => dispatch(setTimeZone()),
        updateTime: (time) => dispatch(updateTimeZone('time', time)),
        updateZone: (zone) => dispatch(updateTimeZone('zone', zone)),
        updateNTP: (ntp) => dispatch(updateTimeZone('ntp', ntp))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Base)
