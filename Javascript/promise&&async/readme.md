### Promise && async/await的理解和用法

#### 为什么需要promise（承诺）这个东西
> 在之前我们处理异步函数都是用回调这个方法，回调嵌套的时候会发现 阅读性 和 调试 的难度会增加很多；


#### 怎么理解promise

想象一下，你把一个任务交给一个不错的小伙子，他叫承诺；不用担心你交给他的任务会丢失，他总会返回的，做成功了resolve，失败了reject； 

```js
var promise = new Promise((resolve, reject) =>{
    //交给给“承诺”同学一个异步任务
    setTimeout(()=>{
        if(true){
            // 成功了，返回params
            resolve('params')
        }else{
            // 失败了，返回error
            reject('error')
        }
    }, 1000) 
})

// 上面是给承诺一个任务，下面是"承诺"同学的返回
promise.then((res)=>{
    console.log(res)
}).catch((rej)=>{   
    console.log(res)
})
```

#### 怎么使用promise
实际情况中，异步的场景没有那么简单，你可以会遇到下面这些场景

1. “串行应用场景”下的处理方案

```js
let promise = new Promise((res, rej)=>{
    asyncFunc('promise', 1000, res, rej)
}) 

promise.then(res=>{
    console.log(res);
    return new Promise((res, rej)=>{
        asyncFunc('second', 2000, res, rej)
    })
}).then(res=>{
    console.log(res);
    return new Promise((res, rej)=>{
        asyncFunc('third', 1000, res, rej)
    })
    // throw 'oh, no!';
}).then(res=>{
    console.log(res);
    console.log('endinggggggg')
}).catch(err=>{
    console.log('catch', err)
})
```

2.  “并行应用场景”的处理方案(即在所有的异步操作完成之后执行)

```js
let promise1 = new Promise((res, rej)=>{
    asyncFunc('promise1', 1000, res, rej)
})

let promise2 = new Promise((res, rej)=>{
    asyncFunc('promise2', 2000, res, rej)
})

let promise3 = new Promise((res, rej)=>{
    asyncFunc('promise3', 1000, res, rej)
})

var promiseAll = Promise.all([promise1, promise2, promise3])
promiseAll.then(res =>{
    console.log('最终的结果', res)
}).catch(err =>{
    console.log('catch', err);
})
```

3. “竞速模式下”，如字面意思，只要是哪一个提前完成了。就表示整个状态处理完成状态；这个场景可以发散成如果是超过了3s我就不去做这件事情了

```js
let promise1 = new Promise((res, rej)=>{
    asyncFunc('promise1', 1000, res, rej, true)
})

let promise2 = new Promise((res, rej)=>{
    asyncFunc('promise2', 2000, res, rej, true)
})

let promise3 = new Promise((res, rej)=>{
    asyncFunc('promise3', 1000, res, rej)
})

// 1000s的任务完成了，就直接返回promise1了
var promiseRace = Promise.race([promise1, promise2, promise3])
promiseRace.then(res =>{
    console.log('最终的结果', res)
}).catch(err =>{
    console.log('catch', err);
})
```

#### js是单线程，promise，setTimeout的执行优先级
> 讲这一块的东西就得讲讲nodejs的事件处理机制；   
> 事件队列应该是一个数据结构，所有的事情都被事件循环排队和处理，直到队列为空。但是Node中的这种情况与抽象反应器模式如何描述完全不同。   
> 下面讲的东西只适合V8；

NodeJS中有许多队列，其中不同类型的事件在自己的队列中排队。

在处理一个阶段之后并且在移到下一个队列之前，事件循环将处理两个中间队列，直到中间队列中没有剩余的项目。

##### 定义：

有四种主要类型，由libuv事件循环处理；  
- 过期的定时器和间隔队列 - （比如使用setTimeout,setInterval）;
- IO事件队列 - 已完成的IO事件
- Immediates队列 - 使用setImmediate功能添加回调
- 关闭处理程序队列 - 任何close事件处理程序

还有2个中间队列，不属于libuv本身的一部分，但是是nodejs的一部分；
- Next Ticks Queue - 使用process.nextTick 函数添加回调；（优先级更高）
- 其他微型任务队列 - 包括其他微型任务，例如已经解决的承诺回调；

##### 如何工作的：

![image](https://user-images.githubusercontent.com/22538641/44381027-1050fb00-a541-11e8-8e11-81e6c030492a.png)

上图是node中libuv模块在处理异步I/O操作的流程图；  

Node通过定时器检查队列中的任何过期定时器来启动事件循环，并在每一个步骤中遍历每一个队列。如果没有任务则循环退出，每一次队列处理都被视为事件循环的一个阶段。特别有意思的是中间红色的队列，每次阶段都会优先去处理中间队列的任务。然后再去处理其他的队列。

#### 什么是async/await
> async/await 可以是Generator和promise结合实现的；

#### 注意核心点：
- asnyc 函数总是返回一个Promise对象，不论函数是否return Promise；
- await 后面跟着Promise对象，如果不是Promise对象，也会被封装成Promise；
- async/await 和Promise对象在本质上是一样的

###### 其他note点
1. await的任何内容都通过Promise.resolve()传递，这样就可以安全的await非原生Promise；
2. 构造函数以及getter/settings方法不能是异步的；
3. 尽管编写的是同步的代码，但是也不要错失并行执行的机会，不然你需要消耗等待的性能丧失；
4. Babel REPL 说起来很有趣。试试就知道。 


#### 怎么用async/await
> 实际情况中，异步的场景没有那么简单，你可以会遇到下面这些场景

1. 场景：只有一个await并且 resolve
```js
const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));
async function f(){
    await delay(1000);
    await delay(2000);
    await delay(3000);
    return 'done'
}
f().then(v=> console.log(v));
```

2. 场景：只有一个await并且 reject
```js
let a;
async function g(){
    await Promise.reject('error');
    a = await 1;
}
g().then(v=>console.log(v)).catch(err=>console.log(err));
```

3. 场景：有多个await， 可以用try/catch
```js
let a ;
async function g(){
    try{
        await Promise.reject('error')
    }catch(err){    
        console.log(err)
    }
    a= await 1;
    return a;
}

g().then(v=>console.log(v)).catch(err=>console.log(err));

```

4. 场景：等待平行任务
```js
async function series(){
    const await1 = delay(1000);
    const await2 = delay(1000);
    await await1;
    await await2;
    return 'done'
}
series();

```

### 欢迎提意见
[github](https://github.com/guimeisang/DeepLearning/tree/master/Javascript/promise%26%26async)

### 参考文档
1. 这一系列的文档讲的很不错
https://juejin.im/post/5b777f1c6fb9a019be2799e5

2. 讲promise，setTimeout优先级的；nodejs中事件循环中的任务优先级
https://jsblog.insiderattack.net/event-loop-and-the-big-picture-nodejs-event-loop-part-1-1cb67a182810

3. developers.google.com域名下面的文档还是很有质量的，其中会比较全面的介绍怎么去用promise和async/await
https://developers.google.com/web/fundamentals/primers/promises#_3