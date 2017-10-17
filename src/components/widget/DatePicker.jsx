import $ from 'jquery'
import 'bootstrap-datetimepicker'
import React from 'react'

export default class extends React.Component {
    constructor (props) {
        super(props)
        this.state = {}
    }
    didInput = (inp) => {
        const { onChange } = this.props
        $(inp).datetimepicker({
            format: 'yyyy-mm-dd hh:ii'
        }).on('changeDate', function (ev) {
            onChange && onChange(inp.value)
        })
    }
    render () {
        const {
            onChange,
            ...props
        } = this.props
        return <input {...props} ref={this.didInput} data-date-format="yyyy-mm-dd hh:ii"/>
    }
}