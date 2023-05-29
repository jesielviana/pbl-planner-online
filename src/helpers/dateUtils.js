/* eslint-disable class-methods-use-this */
import moment from 'moment'

function addZero (i) {
  if (i < 10) {
    i = `0${i}`
  }
  return i
}

class DateUtils {
  getCurrentDate () {
    const date = new Date()
    const dia = date.getDate().toString().padStart(2, '0')
    const mes = (date.getMonth() + 1).toString().padStart(2, '0')
    const ano = date.getFullYear()

    const h = addZero(date.getHours())
    const m = addZero(date.getMinutes())
    const s = addZero(date.getSeconds())
    const time = `${h}:${m}:${s}`

    return `${dia}/${mes}/${ano} às ${time}`
  }

  getDateFormatedFrom (dateValue) {
    const dateFormated = moment(dateValue).format('DD/MM/YYYY [às] HH:mm:ss')
    return dateFormated
  }
}

export default new DateUtils()
