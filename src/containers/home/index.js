import React from "react"
import styled from "styled-components"
import moment from "moment";
import { connect } from "react-redux"
import { pull, isEqual } from "lodash"
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { DefaultShowCurrency, DefaultCurrencyRates, CurrencyDict, AllCurrencyNames } from "../../constants"
import { getItem, saveItems } from "../../lib/localStorageActions"
import OneCurrency from "../../components/one-currency"
import AddCurrency from "./add-currency"
import { getCurrencyList } from "../../store/selectors"
import { setCurrencyList } from "../../store/actions"
import { reorder } from "../../lib"
import { fx } from "../../lib/fx"
import { CORE_BASE } from "../../config"
import bgImg from "../../static/images/background-coins.jpg"


@connect(state => {
  return {
    currencyList: getCurrencyList(state) || [],
  }
})
class Home extends React.PureComponent {

  currencyRate = getItem("currencyRate") || DefaultCurrencyRates
  activeBase = getItem("activeBase") || "USD"
  activeAmount = getItem("activeAmount") || 1

  componentDidMount() {
    //this.resetValues()
    this.handleFetch()
  }

  handleFetch() {
    fetch(CORE_BASE).then(res => res.json()).then(res => {
      this.currencyRate = res
      saveItems({ currencyRate: res })
      this.resetValues()
    });
  }
  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.currencyList, this.props.currencyList)) this.resetValues()

  }

  handleChange = e => {
    const { type, value, currency } = e
    let currencyList = []
    console.log(e)
    switch (type) {
      case "remove":
        currencyList = [...pull(this.props.currencyList, currency)]
        this.props.dispatch(setCurrencyList(currencyList))
        saveItems({ currencyList })
        if (currency === this.activeBase) {
          if (currencyList.length > 0) {
            this.activeAmount = fx({ amount: this.activeAmount, from: currency, to: currencyList[0], rates: this.currencyRate })
            this.activeBase = currencyList[0]
            this.resetValues()
          }
        }
        break;
      case "newAmount":
        this.setState({ activeAmount: value, activeBase: currency })
        this.activeBase = currency
        this.activeAmount = value
        saveItems({ activeAmount: value, activeBase: currency })
        this.resetValues()
        break;
      case "changeCurrency":
        currencyList = [...this.props.currencyList]
        currencyList[currencyList.indexOf(currency)] = value
        this.props.dispatch(setCurrencyList(currencyList))
        saveItems({ currencyList })
        if (currency === this.activeBase) this.activeBase = value
        this.resetValues()
        break;
      default:
        break;
    }
  }

  resetValues = () => {
    const { activeAmount, activeBase, currencyRate } = this
    const values = {}
    this.props.currencyList.forEach(c => { values[c] = fx({ amount: activeAmount, from: activeBase, to: c, rates: currencyRate }) })
    console.log("values", values)
    this.props.form.setFieldsValue(values)
  }

  handleAddCurrency = currency => {
    const currencyList = [...this.props.currencyList, currency]
    this.props.dispatch(setCurrencyList(currencyList))
    saveItems({ currencyList })
    if (currencyList.length === 1) {
      this.activeAmount = 1
      this.activeBase = currency
    }
    this.resetValues()
  }

  onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const currencyList = reorder(
      this.props.currencyList,
      result.source.index,
      result.destination.index
    );
    this.props.dispatch(setCurrencyList(currencyList))
    saveItems({ currencyList })
  }

  render() {
    const { currencyRate } = this
    const { form, currencyList } = this.props
    const { timestamp } = currencyRate
    console.log(currencyList)
    return (
      <Container>
        <div className="app-title" style={{ backgroundImage: `url(${bgImg})` }}>
          <div className="app-title-frame">
            <div className="app-title-txt">
              Currency Converter
          </div>
            <div className="data-date">
              rates updated on:  {moment.unix(timestamp).format("YYYY-MM-DD")}
            </div>
          </div>
        </div>
        <div className="currency-box">
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                // style={getListStyle(snapshot.isDraggingOver)}
                >
                  {currencyList.map((currency, index) => (
                    <Draggable key={currency} draggableId={currency} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        // style={getItemStyle(
                        //   snapshot.isDragging,
                        //   provided.draggableProps.style
                        // )}
                        >
                          <OneCurrency currency={currency} onChange={this.handleChange} form={form} key={index} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          {/* {currencyList.map((currency, index) => (
          <OneCurrency currency={currency} onChange={this.handleChange} form={form} key={index} />))} */}
          <AddCurrency add={this.handleAddCurrency} />
        </div>
      </Container>
    )
  }
}

const HomeFormWrapper = Form.create({ name: 'normal_login' })(Home);

export default HomeFormWrapper

const Container = styled.div`
.app-title, .app-title-frame {
  width: 100%;
  background: linear-gradient(90deg, rgba(5,170,176,0.7) 0%, rgba(9,121,108,0.7) 100%);
}

.app-title-txt {
font-size: 60px;
color: white;
text-align:center;
padding: 40px;
font-family: 'Lobster', cursive;
}

.data-date {
  margin: 0 auto;
  padding-bottom: 40px;
  padding-right: 20px;
  color: white;
  font-size: 30px;
  font-family: 'Cute Font', cursive;
  width: 600px;
  text-align:right;
}

.currency-box {
  padding-top: 40px;
  background: linear-gradient(155deg, rgba(255,255,255,1) 0%, rgba(135,145,144,1) 100%);
}
`;
