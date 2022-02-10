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
> TODO：只支持手动传入时间，后续可能支持自动识别时间调整阶段
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
      let { startYear, startMonth, startDay, startTime, endTime } = options;
      // 深克隆一层，避免改变原数据， wran: 使用此方法，默认对JSON方法克隆有所了解。
      const data = JSON.parse(JSON.stringify(options.data))
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







## 4. 加减乘除

```js

/**
 * 加法运算
 * @param {Number} a
 * @param {Number} b
 * @example addNum(0.3 , 0.6) // => 0.9
 */
function addNum(a, b) {
  let c; let d; let e;
  try {
    c = a.toString().split('.')[1].length;
  } catch (f) {
    c = 0;
  }
  try {
    d = b.toString().split('.')[1].length;
  } catch (f) {
    d = 0;
  }
  return (e = Math.pow(10, Math.max(c, d))), (mulNum(a, e) + mulNum(b, e)) / e;
};

/**
 * 减法运算
 * @param {Number} a
 * @param {Number} b
 * @example subNum(0.3 , 0.2) // => 0.1
 */
function subNum(a, b){
  let c; let d; let e;
  try {
    c = a.toString().split('.')[1].length;
  } catch (f) {
    c = 0;
  }
  try {
    d = b.toString().split('.')[1].length;
  } catch (f) {
    d = 0;
  }
  return (e = Math.pow(10, Math.max(c, d))), (mulNum(a, e) - mulNum(b, e)) / e;
};

/**
 * 乘法运算
 * @param {Number} a
 * @param {Number} b
 * @example mulNum(0.3 , 1.5) // => 0.45
 */
function mulNum (a, b) {
  let c = 0;
  const d = a.toString();
  const e = b.toString();
  try {
    c += d.split('.')[1].length;
  } catch (f) {}
  try {
    c += e.split('.')[1].length;
  } catch (f) {}
  return (Number(d.replace('.', '')) * Number(e.replace('.', ''))) / Math.pow(10, c);
};

/**
 * 除法运算
 * @param {Number} a
 * @param {Number} b
 * @example divNum(0.3 , 0.1) // => 3
 */
function divNum(a, b){
  let c;
  let d;
  let e = 0;
  let f = 0;
  try {
    e = a.toString().split('.')[1].length;
  } catch (g) {}
  try {
    f = b.toString().split('.')[1].length;
  } catch (g) {}
  return (
    (c = Number(a.toString().replace('.', ''))),
    (d = Number(b.toString().replace('.', ''))),
    mulNum(c / d, Math.pow(10, f - e))
  );
}


```

## 5. 类型判断
```js
/**
 * 判断传入数据是否为 null
 * @param value
 * @returns {boolean}
 */
 const isNull = value => Object.prototype.toString.call(value) === '[object Null]';

/**
 * 判断传入数据是否为 undefined
 * @param value
 * @returns {boolean}
 */
 const isUndefined = value => Object.prototype.toString.call(value) === '[object Undefined]';

/**
 * 判断传入数据是否为 Number
 * @param value
 * @returns {boolean}
 */
 const isNumber = value => Object.prototype.toString.call(value) === '[object Number]';

/**
 * 判断传入数据是否为 Boolean
 * @param value
 * @returns {boolean}
 */
 const isBoolean = value => Object.prototype.toString.call(value) === '[object Boolean]';

/**
 * 判断传入数据是否为 String
 * @param value
 * @returns {boolean}
 */
 const isString = value => Object.prototype.toString.call(value) === '[object String]';

/**
 * 判断传入数据是否为 Object
 * @param value
 * @returns {boolean}
 */
 const isObject = value => Object.prototype.toString.call(value) === '[object Object]';

/**
 * 判断传入数据是否为 Symbol
 * @param value
 * @returns {boolean}
 */
 const isSymbol = value => Object.prototype.toString.call(value) === '[object Symbol]';

/**
 * 判断传入数据是否为 Array
 * @param value
 * @returns {boolean}
 */
 const isArray = value => Object.prototype.toString.call(value) === '[object Array]';

/**
 * 判断传入数据是否为 Function
 * @param value
 * @returns {boolean}
 */
 const isFunction = value => Object.prototype.toString.call(value) === '[object Function]';

/**
 * 判断传入数据是否为 Date
 * @param value
 * @returns {boolean}
 */
 const isDate = value => Object.prototype.toString.call(value) === '[object Date]';

/**
 * 判断传入数据是否为 Math
 * @param value
 * @returns {boolean}
 */
 const isMath = value => Object.prototype.toString.call(value) === '[object Math]';

/**
 * 判断传入数据是否为 Set
 * @param value
 * @returns {boolean}
 */
 const isSet = value => Object.prototype.toString.call(value) === '[object Set]';

/**
 * 判断传入数据是否为 WeakSet
 * @param value
 * @returns {boolean}
 */
 const isWeakSet = value => Object.prototype.toString.call(value) === '[object WeakSet]';
/**
 * 判断传入数据是否为 Map
 * @param value
 * @returns {boolean}
 */
 const isMap = value => Object.prototype.toString.call(value) === '[object Map]';

/**
 * 判断传入数据是否为 WeakMap
 * @param value
 * @returns {boolean}
 */
 const isWeakMap = value => Object.prototype.toString.call(value) === '[object WeakMap]';


/**
 * 获取传入数据的类型
 * @example getType(1) // => "number"
 * @param {any} value
 * @returns {String} 返回传入数据所属类型的小写
 */
const getType = value => Object.prototype.toString.call(value)
  .match(/\s([a-z]+)/i)[1]
  .toLocaleLowerCase();

```

## 6. 设备环境判断
```js
const u = navigator.userAgent;

const isIOS = !!u.match(/\(i[^]+( U)? CPU.+Mac OS X/);

const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;

const isQQ = / QQ/i.test(u);

const isWechat = /MicroMessenger/i.test(u);

const isChrome = u.indexOf('Chrome') > -1;
```