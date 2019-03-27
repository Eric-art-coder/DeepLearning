单例模式的定义是产生一个类的唯一实例，但js本身是一种”无类“语言。


1. 封装一个产生遮罩的函数；并且如果已经产生了，则不再重复产生；这样就是 单例模式；

```js

var createMask = function(){
    var mask;
    return function(){
        return mask || (mask = document.body.appendChild(document.createElement('div')));
    }
}
```