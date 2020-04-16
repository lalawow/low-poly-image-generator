import React, { Component } from 'react'
import styled from "styled-components"
import { Icon } from 'antd'

class Top extends Component {
  render() {
    return (
      <Topbox>
        <div className="app-title">Low-Poly Image Generator</div>
        <div className="app-top-menu"><a href="https://github.com/lalawow/low-poly-image-generator" target="_blank" rel="noopener noreferrer" >About&nbsp; &nbsp; <Icon type="github" /></a></div>
      </Topbox>
    );
  }
}

export default Top

const Topbox = styled.div`
  display:flex;
  justify-content: space-between;
  font-size: 1.5rem;
  font-family: proxima-soft, Proxima Nova, Open Sans, Gill Sans MT, Gill Sans, Corbel, Arial, sans-serif;
  color: #333;

  .app-top-menu {
    font-size: 1.2rem;
}

  .app-top-menu a {
      color: #333;
  }
`;