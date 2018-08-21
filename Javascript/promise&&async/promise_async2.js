/**
 * promise了解：
 * 1. 我们在使用异步的时候，希望有一个承诺的角色，他可以在工作中，解决成功，解决失败三个状态；并且需要带着结果返回回来；
 * 2. then 支持链式调用：then的返回值不是一个promise对象，就会被包装成一个对象；
 * 3. catch 能用于在then函数中使用throw的时候，在catch中获取throw里面的信息；并且能够获取到前面promise解决失败的状态；
 * 4. 除了基础模式，还添加了其他三种不同的场景：串行，并行，竞速模式；
 * 
 */

var { asyncFunc } = require('./common');

// 一. “基础模型”下创建一个承诺的例子，并且理解一下then方法返回值

// let promise = new Promise((resolve, reject) =>{
//     setTimeout(()=>{
//         let num = parseInt(Math.random() * 100);
//         if(num > 20){
//             resolve(num)
//         }else{  
//             reject(num)
//         }
//     }, 1000)
// })

// // 承诺的结果
// promise.then((res)=>{
//     console.log('resolve',res);
//     return new Promise((res, rej) =>{
//         res(35)
//     });
// }).catch((err)=>{
//     console.log('what catch means ？', err);
// }).then((res)=>{
//     console.log('hahhaha', res);
// })

// 二. “串行应用场景”下的处理方案

// let promise = new Promise((res, rej)=>{
//     asyncFunc('promise', 1000, res, rej)
// }) 

// promise.then(res=>{
//     console.log(res);
//     return new Promise((res, rej)=>{
//         asyncFunc('second', 2000, res, rej)
//     })
// }).then(res=>{
//     console.log(res);
//     return new Promise((res, rej)=>{
//         asyncFunc('third', 1000, res, rej)
//     })
//     // throw 'oh, no!';
// }).then(res=>{
//     console.log(res);
//     console.log('endinggggggg')
// }).catch(err=>{
//     console.log('catch', err)
// })

// 三. “并行应用场景”的处理方案(即在所有的异步操作完成之后执行)
// let promise1 = new Promise((res, rej)=>{
//     asyncFunc('promise1', 1000, res, rej)
// })

// let promise2 = new Promise((res, rej)=>{
//     asyncFunc('promise2', 2000, res, rej)
// })

// let promise3 = new Promise((res, rej)=>{
//     asyncFunc('promise3', 1000, res, rej)
// })

// var promiseAll = Promise.all([promise1, promise2, promise3])
// promiseAll.then(res =>{
//     console.log('最终的结果', res)
// }).catch(err =>{
//     console.log('catch', err);
// })

// 四. “竞速模式下”，如字面意思，只要是哪一个提前完成了。就表示整个状态处理完成状态；这个场景可以发散成如果是超过了3s我就不去做这件事情了
let promise1 = new Promise((res, rej)=>{
    asyncFunc('promise1', 1000, res, rej, true)
})

let promise2 = new Promise((res, rej)=>{
    asyncFunc('promise2', 2000, res, rej, true)
})

let promise3 = new Promise((res, rej)=>{
    asyncFunc('promise3', 1000, res, rej)
})

var promiseRace = Promise.race([promise1, promise2, promise3])
promiseRace.then(res =>{
    console.log('最终的结果', res)
}).catch(err =>{
    console.log('catch', err);
})

