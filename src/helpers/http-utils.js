/**
 *
 * @param {*} providedFilters
 *! Must be an objet. Note that all empty value will be removed from the object 
 * @returns an object of type
 * * {
 * *  type: [],
 * *  text: [],
 * * }
 */
const buildFiltersForRequest = providedFilters => {
  const isEmpty = val => !val || val === ''

  const removeEmptyFieldsFromObject = obj => {
    const tempObj = { ...obj }
    Object.keys(obj).forEach(key => {
      if (isEmpty(tempObj[key])) delete tempObj[key]
    })
    return tempObj
  }
  // eslint-disable-next-line no-param-reassign
  providedFilters = removeEmptyFieldsFromObject({ ...(providedFilters || {}) })

  const result = {
    type: [],
    text: [],
  }
  Object.keys(providedFilters).forEach(key => {
    const value = providedFilters[key]
    result.type.push(key)
    result.text.push(value)
  })

  return result
}

export { buildFiltersForRequest }
