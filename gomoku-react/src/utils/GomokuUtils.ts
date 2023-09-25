
/**
 * Functions to help with game logic for the Gomoku game.
 * Assumes that the grid is a square and that the grid is stored as a 1D array.
 */

type validDirs = 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW'

/**
 * Returns the index of the cell in the given direction, or null if the cell is on the edge of the grid.
 * @param dir - The direction to search in. Must be one of 'N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'.
 * @param cellIndex - The index of the current cell.
 * @param gridSize - The size of the grid.
 * @returns The index of the cell in the given direction, or null if the cell in that direction is on the edge of the grid.
 */
function getCellIndexInDir(dir: validDirs, cellIndex: number, gridSize: number): number | null {
  switch (dir) {
    case 'N':
        // If the cell is on the top edge of the grid, return null
        if (cellIndex < gridSize) {
            return null
        }
      return cellIndex - gridSize;
    case 'S':
        // If the cell is on the bottom edge of the grid, return null
        if (cellIndex >= gridSize * (gridSize - 1)) {
            return null
        }
      return cellIndex + gridSize;
    case 'E':
        // If the cell is on the right edge of the grid, return null
        if (cellIndex % gridSize === gridSize - 1) {
            return null
        }
        return cellIndex + 1;
    case 'W':
        // If the cell is on the left edge of the grid, return null
        if (cellIndex % gridSize === 0) {
            return null
        }
      return cellIndex - 1;
    case 'NE':
        // If the cell is on the top or right edge of the grid, return null
        if (cellIndex < gridSize || cellIndex % gridSize === gridSize - 1) {
            return null
        }
        return cellIndex - gridSize + 1;
    case 'NW':
        // If the cell is on the top or left edge of the grid, return null
        if (cellIndex < gridSize || cellIndex % gridSize === 0) {
            return null
        }
        return cellIndex - gridSize - 1;
    case 'SE':
        // If the cell is on the bottom or right edge of the grid, return null
        if (cellIndex >= gridSize * (gridSize - 1) || cellIndex % gridSize === gridSize - 1) {
            return null
        }
        return cellIndex + gridSize + 1;
    case 'SW':
        // If the cell is on the bottom or left edge of the grid, return null
        if (cellIndex >= gridSize * (gridSize - 1) || cellIndex % gridSize === 0) {
            return null
        }
        return cellIndex + gridSize - 1;
    default:
        throw new Error('Invalid direction');
  }
}


/**
 * Checks for a win in the given direction.
 * @param {string[]} grid - The grid to check for a win.
 * @param {number} gridSize - The size of the grid.
 * @param {number} cellIndex - The index of the cell to start checking from.
 * @param {string} valueToCheck - The value to check for a win.
 * @param {validDirs} dir - The direction to check for a win.
 * @returns {Array<number> | null} - An array of the indices of the cells that make up the win, or null if there is no win.
 */
function checkGomokuWinInDir(grid: string[], gridSize: number, cellIndex: number, valueToCheck: string, dir: validDirs): Array<number> | null {
    // Check for a win in the given direction
    // Does this by checking if valueToCheck is repeated 5 times in a row in the given direction
    // Returns an array of the indices of the cells that make up the win, or null if there is no win
    const winsRequired = 5;
    const winIndices = [cellIndex];
    let nextIndex = getCellIndexInDir(dir, cellIndex, gridSize);
    for (let i = 1; i < winsRequired; i++) {
        if (nextIndex === null || grid[nextIndex] !== valueToCheck) {
            return null;
        }
        winIndices.push(nextIndex);
        nextIndex = getCellIndexInDir(dir, nextIndex, gridSize);
    }
    return winIndices;
}


export function checkGomokuWin(grid: string[], gridSize: number, cellIndex: number, valueToCheck: string): Array<number> | null {
    // Check for a win in any direction
    // Returns an array of the indices of the cells that make up the win, or null if there is no win
    const winDirs: validDirs[] = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    for (const dir of winDirs) {
        const winIndices = checkGomokuWinInDir(grid, gridSize, cellIndex, valueToCheck, dir);
        if (winIndices !== null) {
            return winIndices;
        }
    }
    return null;
}


/**
 * Checks if the Gomoku game has ended in a draw.
 * @param {string[]} grid - The current state of the Gomoku game board.
 * @param {string} emptySymbol - The symbol used to represent an empty cell on the game board.
 * @returns {boolean} - True if the game is a draw, false otherwise.
 */
export function checkGomokuDraw(grid: string[], emptySymbol: string): boolean {
    // Game is a draw if there are no empty cells left
    return !grid.includes(emptySymbol);
}