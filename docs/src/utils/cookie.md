# Cookie
```js
// 获取全部 cookie，以对象形式返回。
function getCookies(){
    const entries = document.cookie.split(';')
        .map(item => item.trim().split('='))
    return Object.fromEntries(entries)
}

// 通过键名获取cookie值
const getCookie = (key) => getCookies()[key];

// 设置cookie
/**
 * @param seconds 毫秒单位，最低设置
*/
function setCookie(key, value, seconds = 0) {
    let expires = "";
    if (seconds !== 0) {      //设置cookie生存时间     
        seconds = seconds > 1000 ? seconds : 1000
        const date = new Date();
        date.setTime(`${date.getTime() + seconds * 60}`);
        expires = `; expires=${date.toGMTString()}`;
    }
    document.cookie = `${key}=${encodeURIComponent(value)}${expires}`;
} 
    
```