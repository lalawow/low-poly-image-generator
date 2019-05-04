import React, { Component } from 'react'
import { Tabs } from 'antd';
import TriangleSetting from "@/components/left/TriangleSetting"
import PoissonSetting from "@/components/left/PoissonSetting"
import { connect } from "react-redux";
import { setMode } from "@/store/actions";

const TabPane = Tabs.TabPane;
class Left extends Component {
  // constructor(props) {
  //   super(props)
  // }
  handleChange = (key) => {
    //console.log(key)
    this.props.setMode({ mode: key })
  }
  render() {
    return (
      <div className="app-left">
        <Tabs defaultActiveKey="triangles" onChange={this.handleChange}>
          <TabPane tab="Triangles" key="triangles"><TriangleSetting></TriangleSetting></TabPane>
          <TabPane tab="Poisson Dots" key="poissons"><PoissonSetting /></TabPane>
        </Tabs>,
      </div>
    );
  }
}

export default connect(
  null, { setMode }
)(Left)