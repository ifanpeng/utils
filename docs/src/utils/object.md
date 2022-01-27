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
> 不支持Map、Set、RegExp类型的数据

```js
function deepClone (target, map=new Map()) {
  if (target!==null && typeof target==='object') {
    let cloneTarget = map.get(target)
    if (cloneTarget) {
      return cloneTarget
    }
    if (target instanceof Array) {
      cloneTarget = []
      map.set(target, cloneTarget)
      target.forEach((item, index) => {
        cloneTarget[index] = deepClone(item, map)
      })
    } else {
      cloneTarget = {}
      map.set(target, cloneTarget)
      Object.keys(target).forEach(key => {
        cloneTarget[key] = deepClone(target[key], map)
      })
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


## 3. 对象命名转换(小驼峰)
* 功能：把对象key转小驼峰形式命名

```js
function camelizeKey (key, separators = ['-', '_']) {
  const out = [];
  let i = 0;
  const separatorsSet = new Set(separators);
  while (i < key.length) {
    if (separatorsSet.has(key[i])) {
      out.push(key[i + 1].toUpperCase());
      i++;
    } else {
      out.push(key[i]);
    }
    i++;
  }
  return out.join('');
}

function camelize (obj) {
  if (obj === null || obj === undefined) {
    return null;
  }
  if (Array.isArray(obj)) {
    return obj.map(item => camelize(item));
  }
  if (typeof obj === 'object') {
    const out = {};
    for (const key in obj) {
      const v = obj[key];
      out[camelizeKey(key)] = camelize(v);
    }
    return out;
  }
  return obj;
}

// 示例 
const obj = {
  id: 1,
  intro_title: '介绍标题1',
  intro_detail: '详细介绍1',
  other: [
    {
      intro_title: '介绍标题2',
      intro_detail: '详细介绍2',
    }
  ]
}

camelize(obj) 
//   ↓↓↓
// {
//   id: 1,
//   introDetail: "详细介绍1",
//   introTitle: "介绍标题1",
//   other: [
//     { introTitle: "介绍标题2", introDetail: "详细介绍2" }
//   ]
// }
```

