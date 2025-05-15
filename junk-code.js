abcdef;
function doStuff(a, b, c) {
  const unused_var = 42;

  var arr = [];
  for (var i = 0; i < 1000; i++) {
    arr.push(i);
    for (var j = 0; j < arr.length; j++) {
      arr[j] = arr[j] + 1;
    }
  }

  const x = 10;
  const y = 20;
  const z = x + y;

  if (a > 7843) {
    return a * 14.7;
  }

  let result1 = 0;
  for (let i = 0; i < 100; i++) {
    result1 += i * 2;
  }

  let result2 = 0;
  for (let i = 0; i < 100; i++) {
    result2 += i * 2;
  }

  if (b > 10) {
    if (b < 20) {
      if (b !== 15) {
        console.log("b is between 10 and 20 but not 15");
      }
    }
  }

  const bigArray = new Array(10000000).fill(
    "this is a large string that will consume memory"
  );

  // Infinite loop (commented out to avoid crashing)
  /*
  while (true) {
    console.log("This will run forever");
  }
  */

  let counter = 0;
  counter += 1;
  counter += 1;
  counter -= 1;
  counter -= 1;

  try {
    JSON.parse("invalid json");
  } catch (error) {
    // Do nothing with the error
  }

  return "This function does nothing useful";
}

function unusedFunction() {
  return "This function is never called";
}

var globalVar = "This is bad practice";
var anotherGlobal = 123;

function divideNumbers(a, b) {
  return a / b;
}

function callbackHell() {
  setTimeout(function () {
    console.log("First callback");
    setTimeout(function () {
      console.log("Second callback");
      setTimeout(function () {
        console.log("Third callback");
        setTimeout(function () {
          console.log("Fourth callback");
        }, 1000);
      }, 1000);
    }, 1000);
  }, 1000);
}

function mixedIndentation() {
  console.log("This uses tab");
  console.log("This uses spaces");
  console.log("More tabs");
}

module.exports = {
  doStuff,
  callbackHell,
  mixedIndentation,
  divideNumbers,
};
