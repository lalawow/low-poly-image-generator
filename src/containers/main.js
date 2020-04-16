import React, { Component } from 'react'
import { connect } from "react-redux";
import styled from "styled-components"
import { renderControl } from "../store/actions";
import { getSetting, getImage, getImageVersion, getMode, getRenderSignal } from "../store/selectors";
import { Button, Spin } from "antd"

import drawTriangles from "../lib/drawTriangles"
import drawPoissonDisc from "../lib/drawPoissonDisc"

const download = () => {
  const downloadEl = document.getElementById("download");
  const imageURL = document.getElementById("image-canvas").toDataURL("image/png")
    .replace("image/png", "image/octet-stream");
  downloadEl.setAttribute("href", imageURL);
}

const canvasSetting = {
  width: 800,
  height: 600
}


@connect(state => {
  return {
    setting: getSetting(state) || {},
    mode: getMode(state) || "",
    renderSignal: getRenderSignal(state),
    imageInfo: getImage(state),
    imageVersion: getImageVersion(state)
  }
})
export default class Main extends Component {

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
    this.props.dispatch(renderControl(false))
  }

  componentDidMount() {
    this.canvas = document.getElementById('image-canvas')
    this.prepareImg()

  }

  componentDidUpdate() {

  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("render", nextProps.renderSignal)
    if (nextProps.renderSignal) {
      const _this = this
      setTimeout(function () { _this.prepareImg() }, 250)
    }
    return true
  }

  prepareImg = (code) => {
    console.log("start draw")
    if (this.props.imageInfo !== this.currentImageInfo) {
      this.img = new Image();   // Create new img element
      this.img.addEventListener('load', () => {
        const _this = this
        setTimeout(function () { _this.drawCanvas(_this.img) }, 250)
      }, false);
      this.img.src = this.props.imageInfo; // Set source path
      this.currentImageInfo = this.props.imageInfo
    } else {
      const _this = this
      setTimeout(function () { _this.drawCanvas(_this.img) }, 250)
    }
  }
  render() {
    const { renderSignal } = this.props
    return (
      <MainBox>
        {renderSignal && <Spin />}
        <canvas id="image-canvas" width={canvasSetting.width} height={canvasSetting.height} className={renderSignal ? "hide-canvas" : ""}></canvas>
        <div className="export-btn"><a id="download" download="triangle.png" href="..">
          <Button type="primary" ghost shape="round" icon="download">EXPORT</Button>
        </a></div>
      </MainBox >
    );
  }
}

const MainBox = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;

    #image-canvas {
    flex-grow: 0;
    align-self: center;
    box-shadow: 5px 5px 5px 5px rgba(0, 0, 0, .15);
    z-index: 90;


}
.hide-canvas {
      display:none;
    }
.export-btn {
    align-self: center;
    margin: 2rem;
}
`;
