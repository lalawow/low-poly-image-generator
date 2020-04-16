import React, { Component } from 'react'
import { connect } from "react-redux";
import { uploadImage, renderControl } from "../../store/actions";
import { Upload, Icon, message } from 'antd';

const Dragger = Upload.Dragger;

@connect()
export default class UploadImage extends Component {
    render() {
        const props = {
            name: 'file',
            multiple: false,
            action: '',
            beforeUpload: (file) => {
                console.log("get file", file)
                this.props.dispatch(uploadImage(URL.createObjectURL(file)))
                this.props.dispatch(renderControl(true))
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
            <div className="setting-item">
                <h4>Upload Your Image File</h4>
                <Dragger {...props} accept="image/*">
                    <p className="ant-upload-drag-icon">
                        <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                </Dragger>
            </div>
        )
    }

}
