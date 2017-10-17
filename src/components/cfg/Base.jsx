import React from 'react'
import moment from '../../moment'
import {
    Row, Col, Form,
    Panel, Button, FormGroup,
    ControlLabel, FormControl,
    Checkbox, Popover, OverlayTrigger
} from 'react-bootstrap'
import DatePicker from '../widget/DatePicker'

const FMT = 'yy-MM-dd HH:mm'
export default class extends React.Component {
    constructor (props) {
        super(props)
        this.state = {}
    }
    changeTime = (value) => {
        const {
            updateTime
        } = this.props
        const t = moment().parse(value, 'yy-MM-dd hh:mm')
        updateTime(t.getTime())
    }
    changeZone = (e) => {
        const {
            updateZone
        } = this.props
        updateZone && updateZone(e.target.value)
    }
    toggleNTP = (e) => {
        const {
            updateNTP
        } = this.props
        updateNTP(e.target.checked)
    }
    componentDidMount () {
        const { init } = this.props
        init && init()
    }
    render () {
        const { time, zoneTree = [], zone, ntp } = this.props
        const datetime = time ? moment(time).format(FMT) : ''

        return <Panel>
            <Col lg={7} lgOffset={2}>
                <Form horizontal onSubmit={e => e.preventDefault()}>
                    <FormGroup controlId="ntp">
                        <Col componentClass={ControlLabel} sm={2}>NTP同步</Col>
                        <Col sm={10}><Checkbox defaultChecked={ntp} className="switcher" onClick={this.toggleNTP}/></Col>
                    </FormGroup>
                    <FormGroup controlId="zone">
                        <Col componentClass={ControlLabel} sm={2}>服务器时区</Col>
                        <Col sm={10} style={{width: 'auto'}} >
                            <FormControl list="zone-list" className="form-control" placeholder={zone} onBlur={this.changeZone}/>
                            <datalist id="zone-list">
                                {zoneTree.map(({name}, i) => <option value={name} key={name}>{name.toLowerCase()}</option>)}
                            </datalist>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="time">
                        <Col componentClass={ControlLabel} sm={2}>服务器时间</Col>
                        <Col sm={10} style={{width: 'auto'}} >
                            {ntp ?
                                <input className="form-control" value={datetime} readOnly/> :
                                <DatePicker className="form-control" value={datetime} onChange={this.changeTime}/>
                            }</Col>
                    </FormGroup>
                </Form>
            </Col>
        </Panel>
    }
}