import React from 'react'
import styled from "styled-components"
import { Tabs } from 'antd';
import TriangleSetting from "./TriangleSetting"
import PoissonSetting from "./PoissonSetting"
import { useDispatch } from "react-redux";
import { setMode, renderControl} from "../../store/actions";
import {imageModes} from "../../lib/constants"

const TabPane = Tabs.TabPane;
const Left = ()=>{
  const dispatch = useDispatch()

  const handleChange= (key)=>{
    dispatch(setMode({ mode: key }))
    dispatch(renderControl(true));
  }
  return (<AppLeft>
    <Tabs defaultActiveKey={imageModes.Triangles} onChange={handleChange}>
      <TabPane tab="Triangles" key={imageModes.Triangles}>
        <TabContent>
          <TriangleSetting />
        </TabContent>
      </TabPane>
      <TabPane tab="Poisson Dots" key={imageModes.Poissons}>
        <TabContent>
          <PoissonSetting />
        </TabContent>
      </TabPane>
    </Tabs>
  </AppLeft>)
}
export default Left

const AppLeft = styled.div`

`;

const TabContent = styled.div`
padding: 10px 20px;
`;
