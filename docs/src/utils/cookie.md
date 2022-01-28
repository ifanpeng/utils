# Cookie
* **getCookies**
* **getCookie**
* **setCookie**
* **setCookies**
* **delCookies**
* **delCookie**
```js
// 获取全部 cookie，以对象形式返回。
function getCookies(){
    const entries = document.cookie.split(';')
        .map(item => item.trim().split('='))
    return Object.fromEntries(entries)
}
// 示例
getCookies() // { key: value}


// 通过键名获取cookie值
const getCookie = (key) => getCookies()[key]
// 示例
getCookie('对象键名') // value


//设置单个cookie，timestamp（cookie过期时间--毫秒） 可以不传，如果要传，必须为正确的时间戳
function setCookie (key, val, timestamp = 0) {
    let expires = ""; // 过期时间
    const isObject = Object.prototype.toString.call(val) === '[object Object]'
    if(isObject){
        timestamp = val.expires ? val.expires : timestamp
        val = val.value ?? ''
    }
    if (timestamp !== 0) {      
        const date = new Date()
        date.setTime(timestamp)
        expires = `; expires=${date.toGMTString()}`
    }
    document.cookie = `${key}=${encodeURIComponent(val)}${expires}`;
} 
// 示例1
setCookie('a', '66666')
// 示例2
setCookie('b', '66666', 5000)
    

// 设置多个cookie
const setCookies = (cookies) => Object.entries(cookies)
    .forEach(([key, value]) => setCookie(key, value))
// 示例
const cookies = {
    cookie1: {
        value: 123,
        // expires（cookie过期时间--毫秒） 可以不传，如果要传，必须为正确的时间戳
        expires: 1643344305000
    }, 
    cookie2: {
        value: 456
    }
}
setCookies(cookies) 



// 删除多个cookie
const delCookies = (keys) => setCookies(Object.fromEntries(keys
        .map(key => [key, { expires: new Date().getTime() - 1 }])))
// 示例
delCookies(['a','b','c'])



// 删除单个cookie
const delCookie = (key) => delCookies([key]);
// 示例
delCookie('a')
```