好莱坞有句名言：不要给我打电话，我会给你打电话；这句话就解释了观察者模式的来龙去脉。其中”我“ 是发布者，”你“是订阅者。

这样，通讯的主动权就在我的手上了；

使用场景：模块A只需要发通知；模块B接收消息，并且执行一些行为；利于解耦A，B两个模块；

实现：面试者把简历扔到一个盒子中，然后面试者在合适的时机拿着盒子里的简历挨个打电话通知结果；

```js

Events = function() {
 
           var listen, log, obj, one, remove, trigger, __this;
           obj = {};
           __this = this;

           listen = function(key, eventfn){
               var stack, _ref;
               stack = ( _ref = obj[key] ) != null ? _ref : obj[key] = [];
               return stack.push(eventfn);
           }

           one = function(key, eventfn){
               remove(key);
               return listen(key, eventfn)
           }

           remove = function(key){
               var _ref;
               return (_ref = obj[key]) != null ? _ref.length = 0 : void 0;
           }

           trigger = function(){
               var fn, stack, _i , _len, _ref, key;
               key = Array.prototype.shift.call(arguments);
               stack = ( _ref = obj[ key ] ) != null ? _ref : obj[ key ] = [];
               for(_i = 0, _len = stack.length; _i < _len; i++){
                   fn = stack[_i];
                   if(fn.apply(__this, arguments) === false){
                       return false;
                   }
               }
           }

           return {
               listen: listen,
               one: one.
               remove: remove,
               trigger: trigger
           }

}

```

其实上面就是在写一个观察者模式的event库；Node.js 中 events 模块；就是发布、订阅模式的一种简单实现；Node中部分模块继承自；

下面我们来使用一下：

```js
var adultTV = Event();

adultTV.listen('play', function(data){
    alert(data.name)
})

adultTV.trigger('play', {'name': '...'})

```

可以看到下面那个例子是使用了上面的封装去做的；

