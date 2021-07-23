import React from "react"
import styled from "styled-components"
import { Layout } from "antd"
import Top from "./top"
import Left from "./left"
import Main from "./main"

const { Header, Sider } = Layout;

const Home = () => (
  <FullpageBox>
    <Layout>
      <Header className="app-header">
        <Top />
      </Header>
      <Layout>
        <Sider className="app-sider" width="300" style={{
          background: "#fff"
        }}>
          <Left />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Main />
        </Layout>
      </Layout>
    </Layout >
  </FullpageBox>)

export default Home

const FullpageBox = styled.div`
height: 100vh;
display: flex;
flex-direction: column;

.app-header {
    background: linear-gradient(270deg, #d53e4f, #fc8d59, #fee08b, #e6f598, #99d594, #3288bd) 0 100% repeat-x;
    background-size: 100% 1px;
    background-color: #fff;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, .05);
    z-index: 99;
}

.app-sider {
  width: 18.75rem;
  background: #fff;
}
`;