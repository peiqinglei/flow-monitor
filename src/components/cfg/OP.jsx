import React from 'react'
import {
    Row, Col, Form,
    Panel, Button, FormGroup,
    ControlLabel, FormControl, Checkbox
} from 'react-bootstrap'
import Uploader from '../widget/Uploader'

const FORM_STYLE = {maxWidth: 200, float: 'left'}
export default class extends React.Component {
    constructor (props) {
        super(props)
        this.state = {}
    }
    componentDidMount () {
        const { init } = this.props
        init && init()
    }
    changePassword = () => {
        const {
            changePass = () => {}
        } = this.props
        const pass = this.refs.authorization.value
        changePass(pass)
    }
    render () {
        const {
            address,
            netmask,
            gateway,
            dns = [],
            updateAddress = (v) => {},
            updateNetmask = (v) => {},
            updateGateway = (v) => {},
            updateDNS = (v) => {},
            restart = () => {}
        } = this.props

        return <Panel header="维护配置">
            <Col lg={7} lgOffset={2}>
                <Form horizontal onSubmit={e => e.preventDefault()}>
                    <FormGroup controlId="address">
                        <Col componentClass={ControlLabel} sm={2}>IP地址</Col>
                        <Col sm={10} style={FORM_STYLE}>
                            <input className="form-control" placeholder={address} onBlur={e => updateAddress(e.target.value)}/>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="netmask">
                        <Col componentClass={ControlLabel} sm={2}>子网掩码</Col>
                        <Col sm={10} style={FORM_STYLE}>
                            <input className="form-control" placeholder={netmask} onBlur={e => updateNetmask(e.target.value)}/>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="gateway">
                        <Col componentClass={ControlLabel} sm={2}>默认网关</Col>
                        <Col sm={10} style={FORM_STYLE}>
                            <input className="form-control" placeholder={gateway} onBlur={e => updateGateway(e.target.value)}/>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="dns">
                        <Col componentClass={ControlLabel} sm={2}>DNS服务器</Col>
                        <Col sm={6}>
                            <input className="form-control" placeholder={dns.join(',')} onBlur={e => updateDNS(e.target.value)}/>
                        </Col>
                        <Col componentClass={ControlLabel} sm={4} style={{textAlign: 'left', color: '#999'}}>使用 “,” 分割多组DNS</Col>
                    </FormGroup>
                    <FormGroup controlId="password">
                        <Col componentClass={ControlLabel} sm={2}>修改密码</Col>
                        <Col sm={10}>
                            <input className="form-control" style={FORM_STYLE} type="password" ref="authorization"/>
                            <Button bsStyle="primary" style={{marginLeft: 15}} onClick={() => this.changePassword()}>修改</Button>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="updateFlowpp">
                        <Col componentClass={ControlLabel} sm={2}>更新Flowpp</Col>
                        <Col sm={10}>
                            <Uploader url="/update.flowpp"/>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="updateProp">
                        <Col componentClass={ControlLabel} sm={2}>更新规则</Col>
                        <Col sm={10}>
                            <Uploader url="/update.props"/>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="updateWeb">
                        <Col componentClass={ControlLabel} sm={2}>更新WEB</Col>
                        <Col sm={10}>
                            <Uploader url="/update.web"/>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="shutdown">
                        <Col componentClass={ControlLabel} sm={2}>重启服务</Col>
                        <Col sm={10} >
                            <Button bsStyle="danger" onClick={() => restart()}>重启</Button>
                            <i style={{color: '#999', padding: '0 1em'}}>当前配置修改成功需要重启服务生效</i>
                        </Col>
                    </FormGroup>
                </Form>
            </Col>
        </Panel>
    }
}
