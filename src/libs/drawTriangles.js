import Delaunator from 'delaunator';
import Sobel from 'sobel'
import {rgbaToHex} from './index'

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
    return rgbaToHex(color)
}

const getGrayscale = (color) => {
    let newColor = parseInt((color[0] * 299 + color[1] * 587 + color[2] * 114 + 500) / 1000)
    return [newColor, newColor, newColor, color[3]]
}

const drawTriangles = ({g,img,imgSetting,canvasSetting}) => {
    const {points:amount,accuracy,grayscale}=imgSetting
    const {width,height}=canvasSetting
    const canvas = document.createElement("canvas");
    canvas.width=width
    canvas.height=height
    const ctx = canvas.getContext('2d')
    console.log(typeof(img))
    ctx.drawImage(img, 0, 0, width, height);
    const sobelImageData = Sobel(ctx.getImageData(0, 0, width, height)).toImageData();
    const sobelPoints = getSobelPoints(sobelImageData)
    let points = getRandomPoints(amount, accuracy, sobelPoints, width, height)
    const delaunay = Delaunator.from(points);
    const triangles = delaunay.triangles
    const n = triangles.length / 3
    g.clear()
    for (let i = 0; i < n; i++) {
        const triangle = [points[triangles[i * 3]], points[triangles[i * 3 + 1]], points[triangles[i * 3 + 2]]]
        const color = getColor(ctx, triangle)
        // let colorStyle = grayscale ? getGrayscale(color) : color
        drawOneTriangle(g, triangle, color)
    }
    // if (grayscale) {
    //     fillGrayscale(ctx, width, height)
    // }
}

const drawOneTriangle = (g, triangle, color) => {
    g.beginFill(color)
    g.lineStyle(0)
    g.moveTo(...triangle[0])
    g.lineTo(...triangle[1])
    g.lineTo(...triangle[2])
    g.lineTo(...triangle[0])
    g.endFill()
}

const fillGrayscale = (ctx, width, height) => {
    const imageData = ctx.getImageData(0, 0, width, height).data
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            const pointIndex = (i * width + j) * 4
            if (imageData[pointIndex] === imageData[pointIndex + 1] && imageData[pointIndex + 2] === imageData[pointIndex + 1]) {

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

export default drawTriangles;