import React, { useCallback,useEffect,useState } from 'react'
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import styled from "styled-components"
import { Stage, Graphics } from '@inlet/react-pixi'
import { renderControl } from "../store/actions";
import { getSetting, getImage, getImageVersion, getMode, getRenderSignal } from "../store/selectors";
import { Button, Spin } from "antd"
import { imageModes } from "../libs/constants"

import drawTriangles from "../libs/drawTriangles"
import drawPoissonDisc from "../libs/drawPoissonDisc"

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


const Main = () => {
  const setting = useSelector(getSetting, shallowEqual) || {}
  const mode = useSelector(getMode) || ''
  const renderSignal = useSelector(getRenderSignal)
  const imageInfo = useSelector(getImage)
  const imageVersion = useSelector(getImageVersion)
  const dispatch = useDispatch()
  const [img,setImg]=useState(null)

  const draw = useCallback((g) => {
    if (renderSignal) {
      if (img && mode ===imageModes.Triangles) {
        drawTriangles({g,img,imgSetting:setting,canvasSetting})
      }
      if (mode===imageModes.Poissons) {
        // drawPoissonDisc({g,img,imgSetting:setting,canvasSetting})
        const colors = [0xff0000, 0x00ff00, 0x0000ff]
        g.clear();
        g.beginFill(colors[parseInt(Math.random() * colors.length)]);
        g.drawRect(50, 100, 100, 120);
        g.endFill();
      }
      dispatch(renderControl(false))
    }
  }, [renderSignal]);

  const setCanvas = (image) => {
    const maxWidth = 800, maxHeight = 600
    if (maxWidth / image.width * image.height > maxHeight) {
      canvasSetting.width = maxHeight / image.height * image.width
      canvasSetting.height = maxHeight
    } else {
      canvasSetting.height = maxWidth / image.width * image.height
      canvasSetting.width = maxWidth
    }
    // let ctx = canvas.getContext('2d')
    // if (this.props.mode === imageModes.Triangles) drawTriangles(ctx, img, this.props.setting.points, this.props.setting.accuracy, canvas.width, canvas.height, this.props.setting.grayscale)
    // if (this.props.mode === imageModes.Poissons) drawPoissonDisc(ctx, img, this.props.setting.space, this.props.setting.size, canvas.width, canvas.height, this.props.setting.filled, this.props.setting.stroke)
    // setTimeout(download(), 500)
    // this.props.dispatch(renderControl(false))
  }
  useEffect(async () => {
    const image = new Image()

    image.addEventListener('load', async () => {
      setCanvas(image)
      await setImg(image)
      dispatch(renderControl(true))
    }, false);
    image.src = imageInfo;
  }, [imageInfo])


  return (
    <MainBox>
      <Stage width={canvasSetting.width} height={canvasSetting.height} options={{ backgroundColor: 0x111111 }}>
        <Graphics draw={draw} />
      </Stage>
      <div className="export-btn"><a id="download" download="triangle.png" href="..">
        <Button type="primary" ghost shape="round" icon="download">EXPORT</Button>
      </a></div>
    </MainBox >
  );
}

export default Main;

// export default class Main extends Component {

//   componentWillMount() {

//   }

//   drawCanvas = (img) => {
//     const canvas = this.canvas
//     const maxWidth = 800, maxHeight = 600
//     if (maxWidth / img.width * img.height > maxHeight) {
//       canvas.width = maxHeight / img.height * img.width
//       canvas.height = maxHeight
//     } else {
//       canvas.height = maxWidth / img.width * img.height
//       canvas.width = maxWidth
//     }
//     let ctx = canvas.getContext('2d')
//     if (this.props.mode === imageModes.Triangles) drawTriangles(ctx, img, this.props.setting.points, this.props.setting.accuracy, canvas.width, canvas.height, this.props.setting.grayscale)
//     if (this.props.mode === imageModes.Poissons) drawPoissonDisc(ctx, img, this.props.setting.space, this.props.setting.size, canvas.width, canvas.height, this.props.setting.filled, this.props.setting.stroke)
//     setTimeout(download(), 500)
//     this.props.dispatch(renderControl(false))
//   }

//   componentDidMount() {
//     this.canvas = document.getElementById('image-canvas')
//     this.prepareImg()
//   }

//   componentDidUpdate() {

//   }

//   shouldComponentUpdate(nextProps, nextState) {
//     if (nextProps.renderSignal) {
//       const _this = this
//       setTimeout(function () { _this.prepareImg() }, 250)
//     }
//     return true
//   }

//   prepareImg = (code) => {
//     if (this.props.imageInfo !== this.currentImageInfo) {
//       this.img = new Image();   // Create new img element
//       this.img.addEventListener('load', () => {
//         const _this = this
//         setTimeout(function () { _this.drawCanvas(_this.img) }, 250)
//       }, false);
//       this.img.src = this.props.imageInfo; // Set source path
//       this.currentImageInfo = this.props.imageInfo
//     } else {
//       const _this = this
//       setTimeout(function () { _this.drawCanvas(_this.img) }, 250)
//     }
//   }

// }

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
.export-btn {
    align-self: center;
    margin: 2rem;
}
`;
