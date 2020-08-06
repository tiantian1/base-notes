/**
 * 2020/7/28
 * 场景 
 * 有a、b、c三个异步任务，要求必须先执行a，再执行b，最后执行c
 * 且下一次任务必须要拿到上一次任务执行的结果，才能做操作
 */

/**
 * 异步函数队列实现同步执行的方式汇总
 */

function a() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let num = 1;
      resolve(num)
    }, 1000)
  })
}

function b(num) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(num + 1)
    }, 1500)
  })
}

function c(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data + 1)
    }, 500)
  })
}

//方案一，使用then链式调用
// a().then((res) => {
//   console.log(res)
//   return b(res)
// }).then((res) => {
//   console.log(res)
//   return c(res)
// }).then((res) => {
//   console.log(res);
// })

//方案三1  async await 
async function queues() {
  let res1 = await a();
  let res2 = await b(res1);
  let res3 = await c(res2);
  console.info(res1, res2, res3)
}
// queues()
//方案三2
async function queue(arr) {
  let res = null
  for (let promise of arr) {
    res = await promise(res)
  }
  return await res
}

queue([a, b, c]).then(res => {
  console.log(res)
})