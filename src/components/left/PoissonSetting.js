import React, { Component } from 'react'
import { connect } from "react-redux";
import { setSetting } from "@/store/actions";
import { getSetting } from "@/store/selectors";
import { Slider, Switch } from 'antd';
import UploadImage from "@/components/left/UploadImage"

class PoissonSetting extends Component {
    // constructor(props) {
    //     super(props)
    // }

    handleChange = (type, value) => {
        this.props.setSetting({ type, value })
    }

    render() {
        //console.log(this.props.setSetting)
        return (
            <div>
                <UploadImage></UploadImage>
                <div className="setting-item">
                    <h4>Dot Space</h4>
                    <Slider defaultValue={this.props.setting.space} min={0} max={20} onChange={this.handleChange.bind(this, "space")} onAfterChange={this.handleChange.bind(this, "space")} />
                </div>
                <div className="setting-item">
                    <h4>Dot Size</h4>
                    <Slider defaultValue={this.props.setting.size} min={1} max={20} onChange={this.handleChange.bind(this, "size")} onAfterChange={this.handleChange.bind(this, "size")} />
                </div>
                <div className="setting-item">
                    <h4>Fill Dots</h4>
                    <Switch defaultChecked={this.props.setting.filled} onChange={this.handleChange.bind(this, "filled")} />
                </div>
                <div className="setting-item">
                    <h4>Stroke</h4>
                    <Switch defaultChecked={this.props.setting.stroke} onChange={this.handleChange.bind(this, "stroke")} />
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
    { setSetting }
)(PoissonSetting);