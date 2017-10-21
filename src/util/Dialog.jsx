import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { Modal, Button } from 'react-bootstrap'
import Promise from '../util/Promise'
class Dialog extends Component {
    constructor (props) {
        super(props)
        this.state = {
            visible: true
        }
    }
    componentWillReceiveProps (nextProps, prevProps) {
        this.setState({
            visible: nextProps.visible
        })
    }
    close = (ensure, index) => {
        const t = this
        const {
            resolve,
            reject
        } = t.props
        const result = ensure === true ? resolve(index) : reject(index)
        if (result === false) {
            return
        }

        setTimeout(function () {
            t.setState({
                visible: false
            })
        }, 100)
    };
    render () {
        const {visible} = this.state
        const {
            info,
            title,
            buttons = ['确定']
        } = this.props

        return <Modal show={visible} onHide={this.close} backdrop="static">
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {info}
            </Modal.Body>
            <Modal.Footer>
                {buttons.map((bt, i) => <Button key={`${i}`} onClick={() => this.close(!i, i)}>{bt}</Button>)}
            </Modal.Footer>
        </Modal>
    }
}

const holder = document.createElement('div')
document.body.appendChild(holder)

const dialog = (info, options) => new Promise((resolve, reject = () => {}) => {
    const {
        title = '提示'
    } = options || {}
    console.log(resolve, reject)
    ReactDOM.render(<Dialog title={title} info={info} visible resolve={resolve} reject={reject} {...options}/>, holder)
})
export const alert = dialog
export const confirm = (info, options) => dialog(info, Object.assign({
    title: '警告',
    buttons: ['确定', '取消']
}, options))
