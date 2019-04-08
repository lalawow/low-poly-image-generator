import React, { Component } from 'react'
import { connect } from "react-redux";
import { setSetting, uploadImage } from "@/store/actions";
import { Slider, Upload, Icon, message, Switch } from 'antd';

const Dragger = Upload.Dragger;





class Left extends Component {
  constructor(props) {
    super(props)
    this.data = { accuracy: 75, points: 2000, grayscale: false }
  }
  handleChange = (type, value) => {

    //console.log(type, value)
    this.data[type] = value
    //console.log(this.data)
    this.props.setSetting(Object.assign({}, this.data))


  }
  render() {
    const props = {
      name: 'file',
      multiple: false,
      action: '',
      beforeUpload: (file) => {
        console.log("get file", file)
        this.props.uploadImage(URL.createObjectURL(file))
        return false
      },
      onChange(info) {
        const status = info.file.status;
        if (status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (status === 'done') {
          message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };

    return (
      <div className="app-left">
        <div className="setting-item">
          <h4>Upload Your Image File</h4>
          <Dragger {...props} accept="image/*">
            <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>

          </Dragger>
        </div>
        <div className="setting-item">
          <h4>Accuracy</h4>
          <Slider defaultValue={this.data.accuracy} min={0} max={100} onChange={this.handleChange.bind(this, "accuracy")} onAfterChange={this.handleChange.bind(this, "accuracy")} />
        </div>
        <div className="setting-item">
          <h4>Points</h4>
          <Slider defaultValue={this.data.points} min={100} max={9000} onChange={this.handleChange.bind(this, "points")} onAfterChange={this.handleChange.bind(this, "points")} />
        </div>
        <div className="setting-item">
          <h4>Grayscale Style</h4>
          <Switch onChange={this.handleChange.bind(this, "grayscale")} />
        </div>
      </div>
    );
  }
}



export default connect(
  null,
  { setSetting, uploadImage }
)(Left);