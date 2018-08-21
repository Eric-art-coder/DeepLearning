### 架构思想



### note点
1. await的任何内容都通过Promise.resolve()传递，这样就可以安全的await非原生Promise；
2. 构造函数以及getter/settings方法不能是异步的；
3. 尽管编写的是同步的代码，但是也不要错失并行执行的机会，不然你需要消耗等待的性能丧失；
4. Babel REPL 说起来很有趣。试试就知道。 



### 参考文档
1. 这一系列的文档讲的很不错
https://juejin.im/post/5b777f1c6fb9a019be2799e5

2. 讲promise，setTimeout优先级的；nodejs中事件循环中的任务优先级
https://jsblog.insiderattack.net/event-loop-and-the-big-picture-nodejs-event-loop-part-1-1cb67a182810

3. developers.google.com域名下面的文档还是很有质量的，其中会比较全面的介绍怎么去用promise和async/await
https://developers.google.com/web/fundamentals/primers/promises#_3