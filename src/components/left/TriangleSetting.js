import React, { Component } from 'react'
import { connect } from "react-redux";
import { setSetting, renderControl } from "@/store/actions";
import { getSetting } from "@/store/selectors";
import { Slider, Switch } from 'antd';
import UploadImage from "@/components/left/UploadImage"

class TriangleSetting extends Component {
    // constructor(props) {
    //     super(props)
    // }

    handleChange = (type, value) => {
        this.props.setSetting({ type, value })
    }

    componentDidUpdate() {
        this.props.renderControl(true)
    }
    render() {
        //console.log(this.props.setSetting)
        return (
            <div>
                <UploadImage></UploadImage>
                <div className="setting-item">
                    <h4>Accuracy</h4>
                    <Slider defaultValue={this.props.setting.accuracy} min={0} max={100} onChange={this.handleChange.bind(this, "accuracy")} onAfterChange={this.handleChange.bind(this, "accuracy")} />
                </div>
                <div className="setting-item">
                    <h4>Points</h4>
                    <Slider defaultValue={this.props.setting.points} min={100} max={9000} onChange={this.handleChange.bind(this, "points")} onAfterChange={this.handleChange.bind(this, "points")} />
                </div>
                <div className="setting-item">
                    <h4>Grayscale Style</h4>
                    <Switch defaultValue={this.props.setting.grayscale} onChange={this.handleChange.bind(this, "grayscale")} />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        setting: getSetting(state)
    }
}

export default connect(
    mapStateToProps,
    { setSetting, renderControl }
)(TriangleSetting);