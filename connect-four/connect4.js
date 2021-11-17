/** Connect Four
 * http://curric.rithmschool.com/springboard/exercises/connect-four/#step-three-makeboard
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

var WIDTH = 7;
var HEIGHT = 6;

var currPlayer = 1; // active player: 1 or 2
var board = []; // array of rows, each row is array of cells  (board[y][x])

const boardCols= [-1,-1,-1,-1,-1,-1]
console.log(boardCols)
/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
   
  // for(let j=0;j<HEIGHT;j++){
  //   const temp=[]
  //   for(let i=0;i<WIDTH;i++){
  //     temp.push(null)
  //   }
  //   board.push(temp)
  // }
  

  board=Array(HEIGHT)
  for(let i=0; i<HEIGHT; i++){
    board[i]=Array(WIDTH)
  }
  
 }
/** makeHtmlBoard: make HTML table and row of column tops. */
 
function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard=document.getElementById('board')

  // create an top dashed line clickable area, headCell, 
  var top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (var x = 0; x < WIDTH; x++) {
    var headCell = document.createElement("td");
    headCell.setAttribute("id", x); // give each top cell an default id
    top.append(headCell);
  }
  htmlBoard.append(top);

  // create gaming board by adding tds to each tr
  for (var y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (var x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  if (boardCols[x]<=5){
    boardCols[x]+=1
  }
  console.log(board,boardCols)
  return boardCols[x];
}

/** placeInTable: update DOM to place piece into HTML table of board */
 
function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const pieceDiv=document.createElement('div');
  // set piece class and a class for whether the current player is 1 or 2, like p1 or p2
  pieceDiv.setAttribute('class', `piece p${currPlayer}`);
  const targetTd=document.getElementById(`${y}-${x}`)
  targetTd.appendChild(pieceDiv)
  currPlayer===1? currPlayer=2:currPlayer=1
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  var x = +evt.target.id;
 
  console.log(x, "****")
  // get next spot in column (if none, ignore click)
  var y = findSpotForCol(x); //*****working  */

  console.log("x: ", x, "y: ",y)

  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame

  // switch players
  // TODO: switch currPlayer 1 <-> 2
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // check four directions, horizontal, vertical, diagnoal Right, diaganal Left

  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}
  // table reference:
  //  <table>
  //     <tr> <td>[y+1, x-1]</td>   <td>[y+1, x]</td>   <td>[y+1, x+1]</td> </tr>
  //     <tr> <td>[y, x-1]  </td>   <td>[y, x]  </td>   <td> [y, x+1] </td> </tr>
  //     <tr> <td>[y-1, x-1]</td>   <td>[y-1, x]</td>   <td>[y-1, x+1]</td> </tr>
  //  </table>

makeBoard();
makeHtmlBoard();
