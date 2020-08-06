new Promise((resolve, reject) => {
  console.log("1")
  resolve()
}).then(() => {
  console.log("2")
  new Promise((resolve, reject) => {
    console.log("3")
    resolve()
  }).then(() => {
    console.log("4")
  }).then(() => {
    console.log("5")
  }).then(() => {
    console.log("6")
  }).then(() => {
    console.log("7")
  })
}).then(() => {
  console.log("8")
  Promise.resolve().then(() => {
    console.log(9)
  }).then(() => {
    console.log(10)
  })
}).then(() => {
  console.log("11")
}).then(() => {
  console.log("12")
})


// 第二行Promise被创建后自动运行，打印 "1" ，后续执行resolve进入第五行箭头函数
// 第六行打印 "2" ，后续创建新Promise对象
// 第七行Promise被创建后立即执行，代码进入第八行，打印 "3" ，后续执行resovle进入第十一行箭头函数
// 第十二行打印 "4" 完成，没有resolve强制执行下个任务进入同步任务队列，回过头来执行第一个Promise的then函数
// 第二十五行箭头函数执行，打印 "8" ,继而执行Promise.resolve，强行插队回到第二个Promise的第二个then十三行中（第一个then被强制resolve）
// 第十四行箭头函数执行，打印 "5" ，回到原始队列，继续执行第一个Promise，代码进入二十八行
// 第二十九行箭头函数执行，打印 "9",第二十四行到三十四行内为第一个Promise的一个then行为，没有resolve，下个任务继而计入同步队列，执行三十五行的下一个then
// 第三十六行箭头函数执行，打印 "11" ，进行下一个异步前需要清空同步队列，现在在同步队列中的任务有第十六行和第二十四行
// 根据同步队列顺序，第十六行then方法先执行，执行十七行箭头函数，打印 "6" ，然后没有resolve强制执行下个任务进入同步队列
// 继续根据同步队列顺序第二十四行then继续执行，前部分已完成，直接进入第三十一行，第三十二行执行箭头函数，打印 "10" ,该同步队列清空，继续下一个异步
// 第三十九行箭头函数执行，打印 "12"，进行下一个异步前摇清空同步队列，同步队列中还剩十九行
// 根据同步队列顺序，第二十行箭头函数执行，打印 "7"，同步队列完成清空
// 进入下一个异步，Promise闭合，异步队列完成清空，函数执行完毕
// 故函数打印顺序为 1->2->3->4->8->5->9->11->6->10->12->7