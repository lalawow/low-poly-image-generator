import React, { Component } from 'react'
import { connect } from "react-redux";
import { setSetting, renderControl } from "../../store/actions";
import { getSetting } from "../../store/selectors";
import { Slider, Switch } from 'antd';
import UploadImage from "../../components/upload-image"

@connect(state => {
    return {
        setting: getSetting(state) || {}
    }
})
export default class TriangleSetting extends Component {
    handleChange = (type, value) => {
        this.props.dispatch(setSetting({ type, value }))
    }

    componentDidUpdate() {
        this.props.dispatch(renderControl(true))
    }
    render() {
        const { accuracy, points, grayscale } = this.props.setting
        return (
            <div>
                <UploadImage />
                <div className="setting-item">
                    <h4>Accuracy</h4>
                    <Slider defaultValue={accuracy} min={0} max={100} onChange={this.handleChange.bind(this, "accuracy")} onAfterChange={this.handleChange.bind(this, "accuracy")} />
                </div>
                <div className="setting-item">
                    <h4>Points</h4>
                    <Slider defaultValue={points} min={100} max={9000} onChange={this.handleChange.bind(this, "points")} onAfterChange={this.handleChange.bind(this, "points")} />
                </div>
                <div className="setting-item">
                    <h4>Grayscale Style</h4>
                    <Switch defaultValue={grayscale} onChange={this.handleChange.bind(this, "grayscale")} />
                </div>
            </div>
        )
    }
}

