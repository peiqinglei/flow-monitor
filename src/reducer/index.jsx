import { fromJS } from '../immutable'
import DashboardReducer from './dashboard'
import ConfigReducer from './cfg'

let initState = fromJS({
})
export default (state = initState, action) => (
    DashboardReducer(state, action) ||
    ConfigReducer(state, action) ||
    state
)
