import { CurrencyList } from '@/util/CurrencyList'

export const getCurrenciesOptions = store => CurrencyList.filter(currency => store.currencies.indexOf(currency.id) === -1)

export const getCurrencyLabel = store => store.currencyLabel