# 对象

## 1. 合并多个对象
* 功能: 合并多个对象, 返回一个合并后对象(不改变原对象)

```js
function mergeObject (...objs) {
  const result = {}
  objs.forEach(obj => {
    Object.keys(obj).forEach(key => {
      // 如果result还没有key值属性
      if (!result.hasOwnProperty(key)) {
        result[key] = obj[key]
      } else { // 否则 合并属性
        result[key] = [].concat(result[key], obj[key])
      }
    })
  })
  return result
}

const obj1 = { a: [{ x: 2 }, { y: 4 }], b: 1 }
const obj2 = { a: { z: 3 }, b: [2, 3], c: 'foo' }

mergeObject(obj1, obj2) // { a: [ { x: 2 }, { y: 4 }, { z: 3 } ], b: [ 1, 2, 3 ], c: 'foo' }

```

## 2. 对象深拷贝
* 功能：复制一个对象
> **不支持Map、Set、RegExp类型的数据**  
```js
function deepClone (target, map=new WeakMap()) {
  if (target !== null && typeof target === 'object' ) {
    let cloneTarget = map.get(target)
    if (cloneTarget) {
      return cloneTarget
    }
    cloneTarget = target instanceof Array ? [] : {}
    map.set(target, cloneTarget)
    for (const key in target) {
      if (target.hasOwnProperty(key)) {
        cloneTarget[key] = deepClone3(target[key], map)
      }
    }
    return cloneTarget
  }
  return target
}

// 示例：
const obj1 = {
  a: 1,
  b: ['e', 'f', 'g'],
  c: { h: 666 },
  d: function () { }
}

const obj2 = deepClone(obj1) // { a: 1, b: ['e', 'f', 'g'], c: { h: 666 }, d: function () {} }
console.log(obj2.c === obj1.c) // false
```


## 3. 对象命名转换

### 3.1 转驼峰形式
* 功能：把对象key转小驼峰形式命名

```js
function camelizeKey (key, separators = ['-', '_']) {
  const out = []
  let i = 0
  const separatorsSet = new Set(separators)
  while (i < key.length) {
    if (separatorsSet.has(key[i])) {
      out.push(key[i + 1].toUpperCase())
      i++
    } else {
      out.push(key[i])
    }
    i++
  }
  return out.join('')
}

// 默认转小驼峰形式
function camelize(obj, big = false) {
    if (obj === null || obj === undefined) {
        return null
    }
    const fn = (str) => str = big ?
        str[0].toUpperCase() + str.slice(1) : str
    if (Array.isArray(obj)) {
        return obj.map(item => camelize(item, big))
    }
    if (typeof obj === 'object') {
        const out = {};
        for (const key in obj) {
            const v = obj[key]
            out[camelizeKey(fn(key))] = camelize(v, big)
        }
        return out
    }
    return obj
}

// 示例 
const obj = {
  user_name: '张三',
  pass_word: '123456'
}
// 转小驼峰
camelize(obj) 
//   ↓↓↓
// {
//   userName: '张三',
//   passWord: '123456'
// }
// 转大驼峰
camelize(obj, true)
//   ↓↓↓
// {
//   UserName: '张三',
//   PassWord: '123456'
// }
```

### 3.2 转换成下划线命名

```js
/**
 * @param key 对象字符串
 * @param ignoreFirst 是否忽略第一个大写字母，如果忽略，会将其当成小写字母处理
 */
function underlizeKey(key, ignoreFirst = false) {
    const out = []
    let i = 0;
    const lowerCasedStr = key.toString().toLowerCase()
    while (i < key.length) {
        if (key[i] !== lowerCasedStr[i]) {
            if (!ignoreFirst || i !== 0) {
                out.push('_')
                out.push(lowerCasedStr[i])
                i++
                continue
            }
        }
        out.push(key[i].toLocaleLowerCase())
        i++
    }
    return out.join('')
}

// 示例
underlizeKey('userName') // user_name
underlizeKey('userName',true) // user_name
underlizeKey('UserName',true) // user_name
underlizeKey('UserName') // _user_name
```

