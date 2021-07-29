import Sobel from 'sobel'

const drawPoissonDisc = (ctx, img, space, size, width, height, filled, stroke) => {
    ctx.fillStyle = '#eee'
    ctx.fillRect(0, 0, width, height)
    //ctx.drawImage(img, 0, 0, width, height)
    const textureCanvas = document.createElement('canvas')
    textureCanvas.width = width
    textureCanvas.height = height
    const textureCtx = textureCanvas.getContext('2d')
    textureCtx.drawImage(img, 0, 0, width, height);

    const getSample = poissonDiscSampler(width, height, space)
    let sample = getSample()
    let dots = []
    while (sample) {
        dots.push(sample)
        sample = getSample()
    }
    const brush = new drawDots(ctx, img, width, height, size, filled)
    dots.forEach((dot) => brush.draw(dot, filled))
    if (stroke) {
        const sobelImageData = Sobel(textureCtx.getImageData(0, 0, width, height)).toImageData();
        const sobelPoints = getSobelPoints(sobelImageData)
        const sobelBrush = new drawDots(ctx, img, width, height, 1, filled)
        sobelPoints.forEach((dot) => sobelBrush.draw(dot, filled))
    }
}

class drawDots {
    constructor(ctx, img, width, height, size, filled) {
        this.ctx = ctx
        const textureCanvas = document.createElement('canvas')
        textureCanvas.width = width
        textureCanvas.height = height
        this.textureCtx = textureCanvas.getContext('2d')
        this.textureCtx.drawImage(img, 0, 0, width, height);
        this.size = size
        this.filled = filled
    }

    draw(dot) {
        const color = this.textureCtx.getImageData(parseInt(dot[0]), parseInt(dot[1]), 1, 1).data
        const ctx = this.ctx
        const size = this.size
        ctx.beginPath();
        ctx.arc(...dot, size, 0, 2 * Math.PI);
        if (this.filled) {
            ctx.fillStyle = 'rgb(' + color + ')'
            ctx.fill();
        } else {
            ctx.strokeStyle = 'rgb(' + color + ')'
            ctx.stroke();
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

// this poisson disc algorithm is written by Mike Bostock
// https://bl.ocks.org/mbostock/19168c663618b7f07158

function poissonDiscSampler(width, height, radius) {
    var k = 30, // maximum number of samples before rejection
        radius2 = radius * radius,
        R = 3 * radius2,
        cellSize = radius * Math.SQRT1_2,
        gridWidth = Math.ceil(width / cellSize),
        gridHeight = Math.ceil(height / cellSize),
        grid = new Array(gridWidth * gridHeight),
        queue = [],
        queueSize = 0,
        sampleSize = 0;

    return function () {
        if (!sampleSize) return sample(Math.random() * width, Math.random() * height);

        // Pick a random existing sample and remove it from the queue.
        while (queueSize) {
            var i = Math.random() * queueSize | 0,
                s = queue[i];

            // Make a new candidate between [radius, 2 * radius] from the existing sample.
            for (var j = 0; j < k; ++j) {
                var a = 2 * Math.PI * Math.random(),
                    r = Math.sqrt(Math.random() * R + radius2),
                    x = s[0] + r * Math.cos(a),
                    y = s[1] + r * Math.sin(a);

                // Reject candidates that are outside the allowed extent,
                // or closer than 2 * radius to any existing sample.
                if (0 <= x && x < width && 0 <= y && y < height && far(x, y)) return sample(x, y);
            }

            queue[i] = queue[--queueSize];
            queue.length = queueSize;
        }
    };

    function far(x, y) {
        var m = x / cellSize | 0,
            n = y / cellSize | 0,
            i0 = Math.max(m - 2, 0),
            j0 = Math.max(n - 2, 0),
            i1 = Math.min(m + 3, gridWidth),
            j1 = Math.min(n + 3, gridHeight);

        for (let j = j0; j < j1; ++j) {
            var o = j * gridWidth;
            for (let i = i0; i < i1; ++i) {
                if (grid[o + i]) {
                    var s = grid[o + i],
                        dx = s[0] - x,
                        dy = s[1] - y;
                    if (dx * dx + dy * dy < radius2) return false;
                }
            }
        }

        return true;
    }

    function sample(x, y) {
        var s = [x, y];
        queue.push(s);
        grid[gridWidth * (y / cellSize | 0) + (x / cellSize | 0)] = s;
        ++sampleSize;
        ++queueSize;
        return s;
    }
}

export default drawPoissonDisc;