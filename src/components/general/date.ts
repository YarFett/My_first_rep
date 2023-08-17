export default function DateConvert(date: string, year: boolean) {
  var monthList = ['янв', 'февр', 'марта', 'апр', 'мая', 'июня', 'июля', 'сент', 'окт', 'нояб', 'дек']
  var monthDict = {
    '01': 'янв',
    '02': 'февр',
    '03': 'марта',
    '04': 'апр',
    '05': 'мая',
    '06': 'июня',
    '07': 'июля',
    '08': 'авг',
    '09': 'сент',
    '10': 'окт',
    '11': 'нояб',
    '12': 'дек',
  }
  var newDate: string[] = date.split('T')[0].split('-')
  // console.log(newDate)
  // console.log(monthList[Number(newDate[1]) - 1])
  // console.log(monthDict[newDate[1]])
  var month: string = monthList[Number(newDate[1]) - 1]
  if (year) {
    return newDate[2] + ' ' + month + ' ' + newDate[0] + ' г'
  }
  else {
    return newDate[2] + ' ' + month
  }
}