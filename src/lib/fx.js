export const fx = ({ amount, from, to, rates }) => {
  const fromRates = rates.rates[from]
  const toRates = rates.rates[to]
  return (amount / fromRates * toRates).toFixed(4)
}