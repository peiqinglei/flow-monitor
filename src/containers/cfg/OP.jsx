import { connect } from 'react-redux'
import OP from '../../components/cfg/OP'
import { setOP, updateOP, restart, changePass } from '../../reducer/cfg'

const mapStateToProps = (state) => {
    return state.getIn(['cfg.op']) || {}
}
const mapDispatchToProps = (dispatch) => {
    return {
        init: () => dispatch(setOP()),
        updateAddress: (v) => dispatch(updateOP('address', v)),
        updateNetmask: (v) => dispatch(updateOP('netmask', v)),
        updateGateway: (v) => dispatch(updateOP('gateway', v)),
        updateDNS: (v) => dispatch(updateOP('nds', v)),
        restart: () => dispatch(restart()),
        changePass
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OP)
