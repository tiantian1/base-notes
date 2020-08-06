//2020/7/29
//for...in... 可用于循环对象，遍历的是键名
//for...of... 遍历的是数组的元素值，不支持遍历对象
let obj = {
  a: 0,
  b: 1,
  c: 3
}

for (item in obj) {
  console.log(item)
}

let arr = [1, 2, 3]
for (item of arr) {
  console.log(item)
}