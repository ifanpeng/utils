# 函数

## 1. 函数节流

```js
/* 
  函数节流
- 语法: throttle(callback, delay)
- 功能: 创建一个节流函数，在 delay 毫秒内最多执行 `callback` 一次
- return function
*/
function throttle(callback, delay) {
  let start = 0
  return function (event) {
    const current = Date.now()
    if ( current - start > delay) {
      callback.call(this, event) 
      start = current
    }
  }
}

```

## 2. 函数防抖

```js
/* 
  函数防抖
- 语法: debounce(callback, delay)
- 功能: 创建一个防抖动函数，该函数会从上一次被调用后，延迟 `delay` 毫秒后调用 `callback`
*/
function debounce (callback, delay) {
  let timeoutId = -1 
  return function (event) {
    // 自上次点击后，函数还未执行，再次点击时候清除未执行的定时器任务
    if (timeoutId!==-1) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      callback.call(this, event)
      timeoutId = -1
    }, delay)
  }
}
```

## 3. 活动周期数据加工

```js
/**
 * 
 * @param {
 * data<Array> 数据 
 * startYear<number> 开始年份  2022
 * startMonth<number> 从几月份开始 1
 * startDay<number> 从哪天开始  29
 * startTime<string> 开始时分秒 hh:mm:ss
 * endTime<string> 结束时分秒 hh:mm:ss
 * } options 
 * @returns 数组，每个数据会在原基础上新增这些字段返回
 * result{
    beginTime: String, -- 开始时间  YYYY-MM-DD hh:mm:ss
    current: boolean, -- 当前是否处于活动时间之内
    yeat: number --YYYY
    month: number, -- MM
    day: number, -- DD
    endTime: string, -- 结束时间  YYYY-MM-DD hh:mm:ss
    expired: boolean, -- 是否过期
    unlock: boolean, -- 激活状态
  }
 */
function handleStages(options){
      let { data, startYear, startMonth, startDay, startTime, endTime } = options;
      const oDate = new Date();
      const curTime = oDate.getTime();
      const year = startYear || oDate.getFullYear();
      const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        days.splice(1, 1, 29);
      }
      const result = data.map((item) => {
        if (startDay > days[startMonth - 1]) {
          startDay = 1;
          startMonth++;
        }
        if (startMonth > 12) {
          startMonth = 1;
          startYear++;
        }
        if(startDay<10){
          startDay = `0${startDay}`
        }
        item.year = startYear;
        item.month = startMonth;
        item.day = parseInt(startDay);
        item.beginTime = `${startYear}/${startMonth}/${startDay} ${startTime}`;
        item.endTime = `${startYear}/${startMonth}/${startDay} ${endTime}`;
        const bTime = new Date(item.beginTime).getTime();
        const eTime = new Date(item.endTime).getTime();
        if (curTime < bTime) {
          item.current = false;
          item.unlock = false;
          item.expired = false;
        }
        if (curTime > bTime) {
          item.current = false;
          item.unlock = true;
        }
        if (curTime > bTime && curTime < eTime) {
          item.current = true;
          item.expired = false;
        }
        if (curTime > eTime) {
          item.expired = true;
        }
        startDay++;

        return item;
      });
      return result;
}
```

