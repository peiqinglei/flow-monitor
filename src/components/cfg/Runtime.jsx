import React from 'react'
import {
    Row, Col, Form,
    Panel, Button, FormGroup,
    ControlLabel, FormControl, Checkbox
} from 'react-bootstrap'

const FORM_STYLE = {maxWidth: 200}
const WORKER_MOD = ['总线模式', '其他模式']
export default class extends React.Component {
    constructor (props) {
        super(props)
        this.state = {}
    }
    componentDidMount () {
        const { init } = this.props
        init && init()
    }
    render () {
        const {
            worker = {},
            logger = {},
            updateWorkerMod = (v) => {},
            updateWorkerNum = (v) => {},
            updateSessionNum = (v) => {},
            updateLoggerAddr = (v) => {},
            updateLoggerPort = (v) => {}
        } = this.props

        return <Panel header="运行配置">
            <Col lg={7} lgOffset={2}>
                <Form horizontal onSubmit={e => e.preventDefault()}>
                    <FormGroup controlId="inline_mode">
                        <Col componentClass={ControlLabel} sm={2}>模式</Col>
                        <Col sm={10} style={FORM_STYLE}>
                            <select className="form-control" value={worker.inline_mode} onChange={e => updateWorkerMod(e.target.value)}>
                                {WORKER_MOD.map((mod, index) => <option key={`${index}`} value={`${index}`}>{mod}</option>)}
                            </select>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="worker_num">
                        <Col componentClass={ControlLabel} sm={2}>线程数量</Col>
                        <Col sm={10} style={FORM_STYLE}>
                            <input className="form-control" type="number" placeholder={worker.num} onBlur={e => updateWorkerNum(e.target.value)}/>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="session_num">
                        <Col componentClass={ControlLabel} sm={2}>会话数量</Col>
                        <Col sm={10} style={FORM_STYLE}>
                            <input className="form-control" type="number" placeholder={worker.session_num} onBlur={e => updateSessionNum(e.target.value)}/>
                        </Col>
                    </FormGroup>
                    <Row>&nbsp;</Row>
                    <FormGroup controlId="collector_address">
                        <Col componentClass={ControlLabel} sm={2}>收集地址</Col>
                        <Col sm={10} style={FORM_STYLE}>
                            <input className="form-control" type="number" placeholder={logger.collector_address} onBlur={e => updateLoggerAddr(e.target.value)}/>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="collector_port">
                        <Col componentClass={ControlLabel} sm={2}>收集端口</Col>
                        <Col sm={10} style={FORM_STYLE}>
                            <input className="form-control" type="number" placeholder={logger.collector_port} onBlur={e => updateLoggerPort(e.target.value)}/>
                        </Col>
                    </FormGroup>
                </Form>
            </Col>
        </Panel>
    }
}
