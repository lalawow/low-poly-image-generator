import React, { Component } from 'react'
import { Icon } from 'antd'

class Top extends Component {
  render() {
    return (
      <div className="app-top">
        <div className="app-title">Low-Poly Image Generator</div>
        <div className="app-top-menu"><a href="https://github.com/lalawow/low-poly-image-generator" target="_blank" rel="noopener noreferrer" >About&nbsp; &nbsp; <Icon type="github" /></a></div>
      </div>
    );
  }
}

export default Top