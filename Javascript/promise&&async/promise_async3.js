/**
 * 1. promise的源码可以了解下；但是其最主要的三个方法：then, reject, resolve, 下面就不对这一块进行详细的介绍
 * 2. async/await 可以是Generator和promise结合实现的；
 * 3. await 用于处理Promise对象，如果不是Promise对象，也会被封装成Promise；
 * 4. asnyc函数总是返回一个Promise对象，不论函数是否return Promise；
 * 5. async/await 和Promise对象在本质上是一样的
 */ 
var { asyncFunc, timeoutFunc } = require('./common');
const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));

// promise
// function a(){
//     return new Promise((res, rej)=>{
//         asyncFunc('111', 1000, res, rej)
//     })
// }
// a().then(res=>{
//     console.log(res);
// })

// Generator 方法
// function* fetchUserByGenerator() {
//     const user = yield timeoutFunc('hahhaha', 1000);
//     return user;
// }

// const g = fetchUserByGenerator();
// const result = g.next().value;
// result.then((v) => {
//     console.log(v);
// }, (error) => {
//     console.log(error);
// })

// 场景：只有一个await并且 resolve
const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));
async function f(){
    await delay(1000);
    await delay(2000);
    await delay(3000);
    return 'done'
}
f().then(v=> console.log(v));

// 场景：只有一个await并且 reject
// let a;
// async function g(){
//     await Promise.reject('error');
//     a = await 1;
// }
// g().then(v=>console.log(v)).catch(err=>console.log(err));

// 场景：有多个await， 可以用try/catch
// let a ;
// async function g(){
//     try{
//         await Promise.reject('error')
//     }catch(err){    
//         console.log(err)
//     }
//     a= await 1;
//     return a;
// }

// g().then(v=>console.log(v)).catch(err=>console.log(err));

// 等待平行任务
// async function series(){
//     const await1 = delay(1000);
//     const await2 = delay(1000);
//     await await1;
//     await await2;
//     return 'done'
// }
// series();

// 一种通过array.map 返回Promsie函数的数组
// const mapReturnFunciton = [1000,2000,3000].map( async num =>{
//     const response = await delay(num);
//     return response;
// })

// mapReturnFunciton.forEach((fn, index) =>{
//     fn.then(res=>{
//         console.log(index)
//     })
// })