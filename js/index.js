
// const formatDate = (time, fmt = 'yyyy-MM-dd HH:mm:ss') => {
//     const isNumber = val => typeof val === 'number' && val === val; 
//     const formatNumber = (n, l) => {
//         let s = isNumber(n) ? `${n}` : '0'
//         while (s.length < l) {
//             s = `0${s}`
//         }
//         return s
//     }
//     const t = new Date(time)
//     const yyyy = formatNumber(t.getFullYear(), 4)
//     const MM = (l = 2) => formatNumber(t.getMonth() + 1, l)
//     const dd = (l = 2) => formatNumber(t.getDate(), l)
//     const HH = (l = 2) => formatNumber(t.getHours(), l)
//     const mm = (l = 2) => formatNumber(t.getMinutes(), l)
//     const ss = (l = 2) => formatNumber(t.getSeconds(), l)
//     return fmt
//         .replace('yyyy', yyyy)
//         .replace('MM', MM())
//         .replace('dd', dd())
//         .replace('HH', HH())
//         .replace('mm', mm())
//         .replace('ss', ss())
//         .replace('M', MM(1))
//         .replace('d', dd(1))
//         .replace('H', HH(1))
//         .replace('m', mm(1))
//         .replace('s', ss(1))
// }

// let ft = formatDate(1643367041000,'ss-yyyy-dd') // 2022-01-28 18:50:41
// console.log(ft)

const cnNumber = (n) => {
  const cnNumbers = '零一二三四五六七八九十'
  if (isNaN(n) || n < 0 || n > 99) {
    return ''
  }
  if (n <= 10) {
    return cnNumbers[n]
  }
  if (n < 20) {
    return cnNumbers[10] + cnNumbers[n % 10]
  }
  if (n % 10 === 0) {
    return cnNumbers[Math.floor(n / 10)] + cnNumbers[10]
  }
  return cnNumbers[Math.floor(n / 10)] + cnNumbers[10] + cnNumbers[n % 10]
}

console.log(cnNumber(100))