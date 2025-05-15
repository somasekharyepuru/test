// JavaScript program to generate a spiral pattern

/**
 * Function to generate a spiral pattern of numbers
 * @param {number} n - Size of the spiral (n x n)
 */
function generateSpiral(n) {
  // Create a 2D array filled with zeros
  const spiral = Array(n)
    .fill()
    .map(() => Array(n).fill(0));

  let num = 1; // Starting number
  let rowStart = 0; // Starting row index
  let rowEnd = n - 1; // Ending row index
  let colStart = 0; // Starting column index
  let colEnd = n - 1; // Ending column index

  // Helper functions to fill each direction
  const fillTopRow = () => {
    for (let i = colStart; i <= colEnd; i++) {
      spiral[rowStart][i] = num++;
    }
    rowStart++;
  };

  const fillRightCol = () => {
    for (let i = rowStart; i <= rowEnd; i++) {
      spiral[i][colEnd] = num++;
    }
    colEnd--;
  };

  const fillBottomRow = () => {
    for (let i = colEnd; i >= colStart; i--) {
      spiral[rowEnd][i] = num++;
    }
    rowEnd--;
  };

  const fillLeftCol = () => {
    for (let i = rowEnd; i >= rowStart; i--) {
      spiral[i][colStart] = num++;
    }
    colStart++;
  };

  // Fill the spiral
  while (rowStart <= rowEnd && colStart <= colEnd) {
    fillTopRow();
    if (rowStart <= rowEnd) fillRightCol();
    if (rowStart <= rowEnd && colStart <= colEnd) fillBottomRow();
    if (colStart <= colEnd) fillLeftCol();
  }

  return spiral;
}

/**
 * Prints the spiral pattern in a formatted way
 * @param {Array<Array<number>>} spiral - The 2D array containing the spiral
 */
function printSpiral(spiral) {
  const n = spiral.length;

  // Find the maximum number to determine padding
  const maxNum = n * n;
  const padding = maxNum.toString().length;

  // Print the spiral
  for (let i = 0; i < n; i++) {
    let row = "";
    for (let j = 0; j < n; j++) {
      // Add padding to align numbers
      row += spiral[i][j].toString().padStart(padding, " ") + " ";
    }
    console.log(row);
  }
}

// Example: Generate a 5x5 spiral pattern
const size = 5;
console.log(`Generating a ${size}x${size} spiral pattern:`);
const spiralPattern = generateSpiral(size);
printSpiral(spiralPattern);

// Uncomment to try different sizes
// const size2 = 7;
// console.log(`\nGenerating a ${size2}x${size2} spiral pattern:`);
// printSpiral(generateSpiral(size2));
