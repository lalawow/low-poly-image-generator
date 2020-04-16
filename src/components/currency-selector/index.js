import React from "react"
import styled from "styled-components"
import { Select } from "antd"
import { connect } from "react-redux"
import { getSelectableList } from "../../store/selectors"
const { Option } = Select

@connect(state => {
  return {
    list: getSelectableList(state) || []
  }
})
export default class extends React.PureComponent {
  state = {
    value: this.props.defaultValue
  }

  handleChange = value => {
    this.setState({ value })
    this.props.onChange(value)
  }

  render() {
    const { list, defaultValue } = this.props
    return (
      <SelectBox defaultValue={defaultValue} onChange={this.handleChange}>
        {list.map(c => (<Option key={c} value={c}>{c}</Option>))}
      </SelectBox>
    )

  }
}

const SelectBox = styled(Select)`
.ant-select-selection {
  border:0;
  border-radius:0;
  border-bottom: 1px solid #eee;
  background:none;
    color: white;
}

.ant-select-arrow {
    color: white;
  }
`;