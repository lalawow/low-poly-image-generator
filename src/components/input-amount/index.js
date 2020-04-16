import React, { Component } from 'react'
import styled from "styled-components"
import { InputNumber, Form } from 'antd';
import { CurrencyDict } from '../../constants'



export default class InputAmount extends Component {

  handleChange = (value) => {
    if (typeof (value) === "number") this.props.onChange({ type: this.props.type, value })
  }
  render() {
    const { currency, amount, form } = this.props
    const { getFieldDecorator } = form
    const symbol = (CurrencyDict[currency] || {}).currencySymbol || " "
    return (
      <InputAmountBox>
        <span className="money-symbol">{symbol}</span>
        <Form.Item>
          {getFieldDecorator(currency, {
            initialValue: amount,
          })(< InputNumber

            parser={value => value.replace(/\$\s?|(,*)/g, '')}
            onChange={this.handleChange}
          />)}
        </Form.Item>
      </InputAmountBox >
    )
  }
}

const InputAmountBox = styled.div`
    display: flex;
    align-items:center;
    margin-right: 40px;

    .money-symbol {
      width: 30px;
    }
    .ant-form-item {
      margin-bottom:0;
    }
`;