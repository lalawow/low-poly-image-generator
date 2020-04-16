import React, { Component } from 'react'
import { connect } from "react-redux";
import { setSetting, renderControl } from "../../store/actions";
import { getSetting } from "../../store/selectors";
import { Slider, Switch } from 'antd';
import UploadImage from "../../components/upload-image"

@connect(state => {
    const setting = getSetting(state) || []
    return {
        setting
    }
})
export default class PoissonSetting extends Component {
    handleChange = (type, value) => {
        console.log("change", type, value)
        this.props.dispatch(setSetting({ type, value }))
        this.props.dispatch(renderControl(true))
    }

    // componentDidUpdate() {
    //     this.props.renderControl(true)
    // }

    render() {
        //console.log(this.props.setSetting)
        const { space, size, filled, stroke } = this.props.setting
        return (
            <div>
                <UploadImage />
                <div className="setting-item">
                    <h4>Dot Space</h4>
                    <Slider defaultValue={space} min={0} max={20} onAfterChange={this.handleChange.bind(this, "space")} />
                </div>
                <div className="setting-item">
                    <h4>Dot Size</h4>
                    <Slider defaultValue={size} min={1} max={20} onAfterChange={this.handleChange.bind(this, "size")} />
                </div>
                <div className="setting-item">
                    <h4>Fill Dots</h4>
                    <Switch defaultChecked={filled} onChange={this.handleChange.bind(this, "filled")} />
                </div>
                <div className="setting-item">
                    <h4>Stroke</h4>
                    <Switch defaultChecked={stroke} onChange={this.handleChange.bind(this, "stroke")} />
                </div>
            </div>
        )
    }
}
