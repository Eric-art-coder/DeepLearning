// common func

function asyncFunc(msg, time, resolve, reject, isReject){
    if(!msg) {
        reject('msg 不存在')
    }
    setTimeout(()=>{
        if(!isReject){
            resolve(msg);
        }else{
            reject(msg);
        }
    }, time)
}

function timeoutFunc(msg, time){
    setTimeout(()=>{
        console.log(msg)
        return msg
    }, time)
}

const commonFuncs = {
    asyncFunc: asyncFunc,
    timeoutFunc: timeoutFunc
} 

module.exports = commonFuncs;