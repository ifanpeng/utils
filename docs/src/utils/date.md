# 时间格式化

## 1.格式化时间
```js
const formatDate = (time, fmt = 'yyyy-MM-dd HH:mm:ss') => {
    const isNumber = val => typeof val === 'number' && val === val; 
    const formatNumber = (n, l) => {
        let s = isNumber(n) ? `${n}` : '0'
        while (s.length < l) {
            s = `0${s}`
        }
        return s
    }
    const t = new Date(time)
    const yyyy = formatNumber(t.getFullYear(), 4)
    const MM = (l = 2) => formatNumber(t.getMonth() + 1, l)
    const dd = (l = 2) => formatNumber(t.getDate(), l)
    const HH = (l = 2) => formatNumber(t.getHours(), l)
    const mm = (l = 2) => formatNumber(t.getMinutes(), l)
    const ss = (l = 2) => formatNumber(t.getSeconds(), l)
    return fmt
        .replace('yyyy', yyyy)
        .replace('MM', MM())
        .replace('dd', dd())
        .replace('HH', HH())
        .replace('mm', mm())
        .replace('ss', ss())
        .replace('M', MM(1))
        .replace('d', dd(1))
        .replace('H', HH(1))
        .replace('m', mm(1))
        .replace('s', ss(1))
}

formatDate(1643367041000) // 2022-01-28 18:50:41
formatDate(1643367041000,'HH:mm:ss') // 18:50:41
```


## 2. 秒数转时分秒
```js
/**
 * @return{string} HH:mm:ss 
*/
const formatSecond = (second) => {
  let timeStr = ''
  let stringFormat = (i) => (i < 10 ? `0${i}` : `${i}`)
  let hourTime = 0
  let minuteTime = 0
  let secondTime = 0
  if (second < 60) {
    timeStr = `00:${stringFormat(second)}`
  } else if (second >= 60 && second < 3600) {
    minuteTime = parseInt(second / 60)
    secondTime = parseInt(second % 60)
    timeStr = `${stringFormat(minuteTime)}:${stringFormat(secondTime)}`
  } else if (second >= 3600) {
    let _t = parseInt(second % 3600) //0
    hourTime = parseInt(second / 3600)
    minuteTime = parseInt(_t / 60)
    secondTime = parseInt(_t % 60)
    timeStr = `${stringFormat(hourTime)}:${stringFormat(
      minuteTime
    )}:${stringFormat(secondTime)}`
  }
  return timeStr
}
// 示例

formatSecond(3600) // 01:00:00 1小时
formatSecond(86400) // 24:00:00 24小时
formatSecond(31536000) // 8760:00:00 一年8760小时


```