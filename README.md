# Low-Poly Image Generator

This project will help you generate a low-poly triangulated image from any source image. This project can also help you get some other artistic effect like poisson discs.

Project [website](http://low-poly.coolvr.tech)

![](http://low-poly.coolvr.tech/images/demo.png)
([Original Photo](https://unsplash.com/photos/ayrGaxXWQmg) by [Landovan](https://unsplash.com/@landovan) on Unsplash)

![](http://low-poly.coolvr.tech/images/demo2.png)

## Thanks to the next guys

### This project is inspired by:
* Web page design: [Trianglify.io](https://trianglify.io)
* image triangulation setting: [snorpey's image triangulation demo](https://snorpey.github.io/triangulation/)
* image triangluation work-flow: [a zhihu answer about low-poly image generation](https://www.zhihu.com/question/29856775/answer/57668656) by [Ovilia@Github](https://github.com/Ovilia)
* Poisson discs generation algorithm: [Mike Bostock’s Block: Poisson-Disc](https://bl.ocks.org/mbostock/19168c663618b7f07158)

### Some packages are used: 
* [delaunator](https://github.com/mapbox/delaunator) for delaunay triangulation of points
* [sobel](https://github.com/miguelmota/sobel) for image edge detectation
