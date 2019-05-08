import React, { Component } from 'react'
import { connect } from "react-redux";
import { renderControl } from "@/store/actions";
import { getSetting, getImage, getImageVersion, getMode, getRenderSignal } from "@/store/selectors";
import { Button } from "antd"

import drawTriangles from "./drawTriangles"
import drawPoissonDisc from "./drawPoissonDisc"

const download = () => {
    const downloadEl = document.getElementById("download");
    const imageURL = document.getElementById("image-canvas").toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
    downloadEl.setAttribute("href", imageURL);
}

class Main extends Component {
    constructor(props) {
        super(props)
        this.canvasSetting = {
            width: 800,
            height: 600
        }
    }
    componentWillMount() {

    }

    drawCanvas = (img) => {
        const canvas = this.canvas
        const maxWidth = 800, maxHeight = 600
        if (maxWidth / img.width * img.height > maxHeight) {
            canvas.width = maxHeight / img.height * img.width
            canvas.height = maxHeight
        } else {
            canvas.height = maxWidth / img.width * img.height
            canvas.width = maxWidth
        }
        let ctx = canvas.getContext('2d')
        if (this.props.mode === "triangles") drawTriangles(ctx, img, this.props.setting.points, this.props.setting.accuracy, canvas.width, canvas.height, this.props.setting.grayscale)
        if (this.props.mode === "poissons") drawPoissonDisc(ctx, img, this.props.setting.space, this.props.setting.size, canvas.width, canvas.height, this.props.setting.filled, this.props.setting.stroke)
        setTimeout(download(), 500)
    }

    componentDidMount() {
        this.canvas = document.getElementById('image-canvas')
        //this.prepareImg()

    }

    componentDidUpdate() {

    }

    shouldComponentUpdate(nextProps, nextState) {
        // if (this.props.mode !== nextProps.mode) return true
        // else if (this.props.setting !== nextProps.setting) return true
        // if (this.props.imageVersion !== nextProps.imageVersion) return true
        // if (this.state !== nextState) return true
        console.log("render", nextProps.renderSignal)
        if (nextProps.renderSignal) {
            const _this = this
            setTimeout(function () { _this.prepareImg() }, 250)
        }
        return false
    }

    prepareImg = (code) => {
        console.log("start draw")
        if (this.props.imageInfo !== this.currentImageInfo) {
            this.img = new Image();   // Create new img element
            this.img.addEventListener('load', () => {
                this.drawCanvas(this.img)
            }, false);
            this.img.src = this.props.imageInfo; // Set source path
            this.currentImageInfo = this.props.imageInfo
        } else { this.drawCanvas(this.img) }
        this.props.renderControl(false)
    }
    render() {
        return (
            <div className="app-main">
                <canvas id="image-canvas" width={this.canvasSetting.width} height={this.canvasSetting.height}></canvas>
                <div className="export-btn"><a id="download" download="triangle.png" href="..">
                    <Button type="primary" ghost shape="round" icon="download">EXPORT</Button>
                </a></div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        mode: getMode(state),
        setting: getSetting(state),
        imageInfo: getImage(state),
        imageVersion: getImageVersion(state),
        renderSignal: getRenderSignal(state)
    }
}

export default connect(
    mapStateToProps,
    { renderControl }
)(Main);