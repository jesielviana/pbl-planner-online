/* eslint-disable no-param-reassign */
import Vue from 'vue'
import moment from 'moment'

moment.locale('pt-br')

Vue.filter('formatDate', (value) => {
  if (value) {
    return moment(value).format('DD/MM/YYYY')
  }
  return null
})

Vue.filter('formatDateHour', (value) => {
  if (value) {
    return moment(value).format('DD/MM/YYYY [às] HH:mm:ss')
  }
  return null
})

Vue.filter('formatNumber', (value, decimals) => {
  if (value) {
    value = parseFloat(value)
    const decimalsPlaces = decimals || 2
    const formated = value.toFixed(decimalsPlaces).replace('.', ',')
    return formated
  }
  return null
})
