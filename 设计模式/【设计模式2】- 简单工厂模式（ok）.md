// 由一个方法来决定到底要创建哪个类的实例，而这些实例经常都拥有相同的接口；
// 适用场景：在所实例化的类型在编译器并不能确定，而是在执行期决定的情况。

// 例子：处理ajax异步嵌套的库；这个库提供了几种ajax请求的方法，包括xhr对象的get，post，也包括跨域用的jsonp和iframe。
// 方便使用，这几种方法都抽象到了同一个接口里面；

// https://github.com/AlloyTeam/DanceRequest

var request1 = Request('xx.xx.com/xx', 'get');
request1.start();
request1.done(fn);

var request2 = Request('xx.xx.com/xx', 'jsonp');
request1.start();
request1.done(fn);

// 上面两个可以看到区别仅仅在于第二个参数；这个就是简单工厂模式
