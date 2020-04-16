import React, { Component } from 'react'
import styled from "styled-components"
import { Tabs } from 'antd';
import TriangleSetting from "./TriangleSetting"
import PoissonSetting from "./PoissonSetting"
import { connect } from "react-redux";
import { setMode } from "../../store/actions";

const TabPane = Tabs.TabPane;

@connect()
export default class Left extends Component {
  handleChange = (key) => {
    this.props.dispatch(setMode({ mode: key }))
  }

  render() {
    return (
      <AppLeft>
        <Tabs defaultActiveKey="triangles" onChange={this.handleChange}>
          <TabPane tab="Triangles" key="triangles">
            <TabContent>
              <TriangleSetting />
            </TabContent>
          </TabPane>
          <TabPane tab="Poisson Dots" key="poissons">
            <TabContent>
              <PoissonSetting />
            </TabContent>
          </TabPane>
        </Tabs>
      </AppLeft>
    );
  }
}

const AppLeft = styled.div`

`;

const TabContent = styled.div`
padding: 10px 20px;
`;
