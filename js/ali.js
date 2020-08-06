/**
 * this 的指向  node环境和浏览器环境是不一样的
 * arguments
 */
var length = 100;

function f1() {
  // console.log(this);
  console.log(this.length)
}

var obj = {
  length: 10,
  f2: function (f1) {
    f1();
    // console.log(arguments)
    arguments[0]();
  }
}
obj.f2(f1, 1);
// f1()