import React, { Component } from 'react';
import './App.css';
import Top from "@/components/top/Top"
import Left from "@/components/left/Left"
import Main from "@/components/main/Main"

import {
  Layout
} from 'antd';


const { Header, Sider } = Layout;


class App extends Component {
  render() {
    return (
      <div className="fullpage">
        <Layout>
          <Header className="app-header">
            <Top />
          </Header>
          <Layout>
            <Sider width={400} style={{
              background: "#fff"
            }}>
              <Left />
            </Sider>
            <Layout style={{ padding: '0 24px 24px' }}>
              <Main />
            </Layout>
          </Layout>
        </Layout >
      </div>
    );
  }
}

export default App;
