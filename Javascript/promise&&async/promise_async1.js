/**
 * 主要思路如下：
 * 1. 浏览器除了js引擎这个主流程，还有其他的进程；但是js确实是单线程的；
 * 2. 在主线程的任务被执行完成之后，微任务（比如promise）进程会先执行，然后再执行宏任务（比如setTimeout）；如果是有嵌套，也是这个优先级；
 * 3. 宏任务和微任务这些名称含义等我了解chromous之后再确定，现在先这样确定者；
 */ 


// setTimeout 1
setTimeout(()=>{
    console.log('111')
}, 0)

let promise1 = new Promise((resolve, reject)=>{
    console.log(222);
    resolve(333);
})

let promise2 = new Promise((resolve, reject)=>{
    console.log(444);
    resolve(555);
})

setTimeout(()=>{
    console.log(666)
}, 0)

promise1.then(res => {
    console.log(res)
})

promise2.then(res => {
    console.log(res)
})

console.log('call stack')