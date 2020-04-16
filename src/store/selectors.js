import { pull } from "lodash"
import { AllCurrencyNames } from "../constants"

export const getCurrencyList = store => store.currencyList

export const getSelectableList = store => [...pull(AllCurrencyNames, store.currencyList)]