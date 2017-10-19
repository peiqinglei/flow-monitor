import { connect } from 'react-redux'
import Runtime from '../../components/cfg/Runtime'
import { setIGB, updateIGB } from '../../reducer/cfg'

const mapStateToProps = (state) => {
    return state.getIn(['cfg.igb']) || {}
}
const mapDispatchToProps = (dispatch) => {
    return {
        init: () => dispatch(setIGB()),
        updateWorkerMod: (v) => dispatch(updateIGB('inline_mode', v)),
        updateWorkerNum: (v) => dispatch(updateIGB('worker_num', v)),
        updateSessionNum: (v) => dispatch(updateIGB('session_num', v)),
        updateLoggerAddr: (v) => dispatch(updateIGB('collector_address', v)),
        updateLoggerPort: (v) => dispatch(updateIGB('collector_port', v)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Runtime)
