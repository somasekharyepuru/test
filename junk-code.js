// Junk code file to test review bot functionality

/**
 * This function does some nonsensical operations with poor naming
 * and inefficient algorithms
 */
function doStuff(a, b, c) {
  // Unused variable
  const unused_var = 42;

  // Inefficient loop
  var arr = [];
  for (var i = 0; i < 1000; i++) {
    arr.push(i);
    // This will be recalculated in each iteration
    for (var j = 0; j < arr.length; j++) {
      arr[j] = arr[j] + 1;
    }
  }

  // Poor variable naming
  const x = 10;
  const y = 20;
  const z = x + y;

  // Magic numbers
  if (a > 7843) {
    return a * 14.7;
  }

  // Duplicate code
  let result1 = 0;
  for (let i = 0; i < 100; i++) {
    result1 += i * 2;
  }

  let result2 = 0;
  for (let i = 0; i < 100; i++) {
    result2 += i * 2;
  }

  // Unnecessary nesting
  if (b > 10) {
    if (b < 20) {
      if (b !== 15) {
        console.log("b is between 10 and 20 but not 15");
      }
    }
  }

  // Memory leak potential
  const bigArray = new Array(10000000).fill(
    "this is a large string that will consume memory"
  );

  // Infinite loop (commented out to avoid crashing)
  /*
  while (true) {
    console.log("This will run forever");
  }
  */

  // Useless code
  let counter = 0;
  counter += 1;
  counter += 1;
  counter -= 1;
  counter -= 1;

  // Empty catch block
  try {
    JSON.parse("invalid json");
  } catch (error) {
    // Do nothing with the error
  }

  return "This function does nothing useful";
}

// Dead code that is never called
function unusedFunction() {
  return "This function is never called";
}

// Global variables
var globalVar = "This is bad practice";
var anotherGlobal = 123;

// Poor error handling
function divideNumbers(a, b) {
  // No check for division by zero
  return a / b;
}

// Callback hell example
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

// Mixed tabs and spaces
function mixedIndentation() {
  console.log("This uses tab");
  console.log("This uses spaces");
  console.log("More tabs");
}

// Export the functions so the linter doesn't complain about unused functions
module.exports = {
  doStuff,
  callbackHell,
  mixedIndentation,
  divideNumbers,
};
