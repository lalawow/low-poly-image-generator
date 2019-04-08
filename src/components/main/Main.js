import React, { Component } from 'react'
import { connect } from "react-redux";
import { getSetting, getImage, getImageVersion } from "@/store/selectors";
import { Button } from "antd"
import Delaunator from 'delaunator';
import Sobel from 'sobel'

const getRandomPoints = (amount, accuracy, sobelPoints, width, height) => {
    let res = []
    const sobelRandomAmount = parseInt(amount * accuracy / 100)
    const commonRandomAmount = amount - sobelRandomAmount
    const sobelAmount = sobelPoints.length
    for (let i = 0; i < sobelRandomAmount; i++) {
        res.push(sobelPoints[parseInt(Math.random() * sobelAmount)])
    }
    for (let i = 0; i < commonRandomAmount; i++) res.push(cordinator([Math.random() * 1.2 - 0.1, Math.random() * 1.2 - 0.1], width, height))
    return res
}

const cordinator = (point, width, height) => {
    return [point[0] * width, point[1] * height]
}

const getColor = (ctx, triangle) => {
    const point = {
        x: (triangle[0][0] + triangle[1][0] + triangle[2][0]) / 3,
        y: (triangle[0][1] + triangle[1][1] + triangle[2][1]) / 3
    }
    const color = ctx.getImageData(parseInt(point.x), parseInt(point.y), 1, 1).data;
    return color
}

const getGrayscale = (color) => {
    //console.log(color)
    let newColor = parseInt((color[0] * 299 + color[1] * 587 + color[2] * 114 + 500) / 1000)
    return [newColor, newColor, newColor, color[3]]
}
const drawTriangles = (ctx, triangles, points, width, height, grayscale) => {
    const n = triangles.length / 3
    for (let i = 0; i < n; i++) {
        const triangle = [points[triangles[i * 3]], points[triangles[i * 3 + 1]], points[triangles[i * 3 + 2]]]
        ctx.beginPath();
        ctx.moveTo(...triangle[0]);
        ctx.lineTo(...triangle[1]);
        ctx.lineTo(...triangle[2]);
        ctx.lineTo(...triangle[0]);
        let color = getColor(ctx, triangle)
        ctx.fillStyle = 'rgb(' + (grayscale ? getGrayscale(color) : color) + ')';
        ctx.fill()
    }
    if (grayscale) {
        fillGrayscale(ctx, width, height)
    }
}

const fillGrayscale = (ctx, width, height) => {
    const imageData = ctx.getImageData(0, 0, width, height).data
    console.log(imageData.length)
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            const pointIndex = (i * width + j) * 4
            if (imageData[pointIndex] === imageData[pointIndex + 1] && imageData[pointIndex + 2] !== imageData[pointIndex + 1]) {

            } else {
                let newColor = getGrayscale(imageData.slice(pointIndex, pointIndex + 4))
                ctx.fillStyle = 'rgb(' + newColor + ')';
                ctx.fillRect(j, i, 1, 1)

            }
        }
    }
}

const getSobelPoints = (imageData) => {
    let res = []
    const { data, width } = imageData
    const threshhold = 100
    for (let i = 0; i < data.length; i = i + 4) {
        if (data[i] > threshhold) {
            const n = i / 4
            res.push([n % width, parseInt(n / width)])
        }
    }
    return res
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
        console.log("image load")
        let canvas = document.getElementById('image-canvas')
        let ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const maxWidth = 800, maxHeight = 600
        if (maxWidth / img.width * img.height > maxHeight) {
            canvas.width = maxHeight / img.height * img.width
            canvas.height = maxHeight
        } else {
            canvas.height = maxWidth / img.width * img.height
            canvas.width = maxWidth
        }
        console.log(canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const sobelImageData = Sobel(ctx.getImageData(0, 0, canvas.width, canvas.height)).toImageData();
        const sobelPoints = getSobelPoints(sobelImageData)
        let points = getRandomPoints(this.props.setting.points, this.props.setting.accuracy, sobelPoints, canvas.width, canvas.height)
        const delaunay = Delaunator.from(points);
        drawTriangles(ctx, delaunay.triangles, points, canvas.width, canvas.height, this.props.setting.grayscale)
        setTimeout(this.download(), 500)
    }

    componentDidMount() {
        let img = new Image();   // Create new img element
        img.addEventListener('load', () => { this.drawCanvas(img) }, false);
        //img.onload(this.drawCanvas(img))
        img.src = this.props.imageInfo; // Set source path
    }

    componentDidUpdate() {
        let img = new Image();   // Create new img element
        img.addEventListener('load', () => { this.drawCanvas(img) }, false);
        //img.onload(this.drawCanvas(img))
        img.src = this.props.imageInfo; // Set source path
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.setting !== nextProps.setting) return true
        if (this.props.imageVersion !== nextProps.imageVersion) return true
        if (this.state !== nextState) return true
        return false
    }

    download = () => {
        const downloadEl = document.getElementById("download");
        const imageURL = document.getElementById("image-canvas").toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        downloadEl.setAttribute("href", imageURL);
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
        setting: getSetting(state),
        imageInfo: getImage(state),
        imageVersion: getImageVersion(state)
    }
}

export default connect(
    mapStateToProps,
    {}
)(Main);