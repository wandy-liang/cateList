module.exports = {
  //节流
  throttle: function(fn, interval) {
    let last = 0;
    return function() {
      let now = +new Date();
      if (now - last >= interval) {
        last = now;
        fn.apply(this, arguments)
      }
    }
  }
}