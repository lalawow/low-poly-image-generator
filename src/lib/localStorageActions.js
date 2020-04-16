// let LS

// export function setLS(obj) {
//   LS = obj
// }

export function saveItem(key, data) {
  localStorage.setItem(key, JSON.stringify({ data }))
}

export function saveItems(data) {
  Object.keys(data).forEach(key => {
    saveItem(key, data[key])
  })
}

export function getItem(key) {
  return (JSON.parse(localStorage.getItem(key)) || {}).data
}