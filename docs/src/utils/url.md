# URL

## 获取url参数
```js

// 从url中获取全部参数，返回一个对象数据, @param{url} 不指定默认为当前页面 url
const getUrlParams = (url = location.search) => {
    const arr1 = url.split('?')
    const arr = arr1.length > 1 ? arr1[1].split('&') : []
    const obj = {}
    for (const i of arr) {
      obj[i.split('=')[0]] = i.split('=')[1] 
    }
    return obj
  }
  // url：http://localhost:5500/index.html?a=1&b=2&c=3
  getUrlParams() // {a: "1", b: "2", c: "3"}

// 通过参数名从url中获取参数值
const getUrlParam = (key, url) => getUrlParams(url)[key]

getUrlParam('a') // 1
```