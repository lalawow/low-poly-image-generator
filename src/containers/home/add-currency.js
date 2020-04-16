import React, { Component } from 'react'
import styled from "styled-components"
import { Button } from "antd"
import Selector from "../../components/currency-selector"

export default class extends React.PureComponent {
  state = {
    selectorVisible: false,
    selected: ""
  }
  handleOpenSelector = () => {
    this.setState({ selectorVisible: true, selected: "" })
  }

  handleCloseSelector = () => {
    this.setState({ selectorVisible: false })
  }

  handleChange = value => {
    this.setState({ selected: value })
  }

  handleAddCurrency = () => {
    if (this.state.selected !== "") {
      this.handleCloseSelector()
      this.props.add(this.state.selected)
    }
  }
  render() {
    const { selectorVisible } = this.state
    const { list } = this.props
    return (
      <Adder>
        {!selectorVisible && <Button type="primary" icon="plus" onClick={this.handleOpenSelector}>Add a New Currency</Button>}
        {selectorVisible && (<div className="selector-frame">
          <Selector onChange={this.handleChange} className="add-selector" />
          <Button type="primary" icon="plus" onClick={this.handleAddCurrency} size="small" /><Button type="primary" icon="close" onClick={this.handleCloseSelector} size="small" /></div>)}
      </Adder>)
  }
}

const Adder = styled.div`
margin-top:40px;
padding-bottom: 40px;
display: flex;
justify-content:center;
.selector-frame{
  display:flex;
  width: 200px;

  .ant-select {
    flex-grow:1;
  }
}

.ant-btn {
  margin-left: 10px;
}

.ant-btn-primary {
  background-color: #eee;
  border-color: #eee;
  color: #999;

  &:hover {
    background-color:white;
    border-color:white;
    color: #999;
  }
}
`;
