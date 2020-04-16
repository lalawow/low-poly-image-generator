import React, { Component } from 'react'
import styled from "styled-components"
import { Row, Col, Icon } from 'antd';
// import CurrencySelector from '../currency-selector'
import InputAmount from '../input-amount'
import Selector from "../currency-selector"


const OneCurrencyBox = styled.div`
  display: flex;
  justify-content:center;
  align-items:center;

  .ant-select-selection {
    width: 70px;
  }



.currency-btn {
  margin-left: 12px;
  font-size: 12px;
  margin-top: 12px;
  background-color: #eee;
  color: #999;
  border-radius: 3px;

  &:hover {
    background-color:white;
  }
}

.ant-input-number {
    background-color: #ffffff88;
  }
`;

export default class OneCurrency extends Component {
  handleChange = (e) => {
    this.props.onChange({ ...e, currency: this.props.currency })
  }
  removeCurrency = () => {
    this.handleChange({ type: "remove" })
  }

  handleCurrencyChange = value => {
    this.handleChange({ type: "changeCurrency", currency: this.props.currency, value })
  }
  render() {
    const { currency, amount, form } = this.props
    return (
      <OneCurrencyBox>
        <InputAmount type="newAmount" amount={this.props.amount} onChange={this.handleChange} currency={this.props.currency} form={form} />
        <Selector className="one-curr-selector" defaultValue={currency} list={[]} key={currency} onChange={this.handleCurrencyChange} />
        <Icon type="close" className="currency-btn" onClick={this.removeCurrency} />
        <Icon type="drag" className="currency-btn" />
      </OneCurrencyBox>
    )
  }
}

