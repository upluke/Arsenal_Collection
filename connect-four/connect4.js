/** Connect Four
 * http://curric.rithmschool.com/springboard/exercises/connect-four/#step-three-makeboard
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

 const WIDTH = 7;
 const HEIGHT = 6;
 
 let currPlayer = 1; // active player: 1 or 2
 let board = []; // array of rows, each row is array of cells  (board[y][x])
 
 let boardCols= [HEIGHT,HEIGHT,HEIGHT,HEIGHT,HEIGHT,HEIGHT, HEIGHT]
  
 /** makeBoard: create in-JS board structure:
  *    board = array of rows, each row is array of cells  (board[y][x])
  */
 
 function makeBoard() {
   // TODO: set "board" to empty HEIGHT x WIDTH matrix array
    
   for(let j=0;j<HEIGHT;j++){
     const temp=[]
     for(let i=0;i<WIDTH;i++){
       temp.push(null)
     }
     board.push(temp)
   }
   
 
   // board=Array(HEIGHT)
   // for(let i=0; i<HEIGHT; i++){
   //   board[i]=Array(WIDTH)
   // }
   
  }
 /** makeHtmlBoard: make HTML table and row of column tops. */
  
 function makeHtmlBoard() {
   // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
   const htmlBoard=document.getElementById('board')
 
   // create an top dashed line clickable area, headCell, 
   const top = document.createElement("tr");
   top.setAttribute("id", "column-top");
   top.addEventListener("click", handleClick);
 
   for (let x = 0; x < WIDTH; x++) {
     const headCell = document.createElement("td");
     headCell.setAttribute("id", x); // give each top cell an default id
     top.append(headCell);
   }
   htmlBoard.append(top);
 
   // create gaming board by adding tds to each tr
   for (let y = 0; y < HEIGHT; y++) {
     const row = document.createElement("tr");
     for (let x = 0; x < WIDTH; x++) {
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
   if (boardCols[x]>0){
     boardCols[x]-=1
     return boardCols[x] 
   }else{
     return null
   }
  
   // return boardCols[x]!=='undefined'? boardCols[x]:null;
 }
 
 /** placeInTable: update DOM to place piece into HTML table of board */
  
 function placeInTable(y, x) {
 
   // TODO: make a div and insert into correct table cell
   const pieceDiv=document.createElement('div');
   // set piece class and a class for whether the current player is 1 or 2, like p1 or p2
   pieceDiv.setAttribute('class', `piece drop p${currPlayer}`);
   const targetTd=document.getElementById(`${y}-${x}`)
   targetTd.appendChild(pieceDiv)
  
 }
 
 /** endGame: announce game end */
 
 function endGame(msg) {
   // TODO: pop up alert message
   alert(msg)
 
   // reinitial values
   board=[]
   currPlayer=1
   boardCols= [HEIGHT,HEIGHT,HEIGHT,HEIGHT,HEIGHT,HEIGHT, HEIGHT]
   const htmlBoard=document.getElementById('board')
   while (htmlBoard.firstChild) {
     htmlBoard.removeChild(htmlBoard.firstChild);
   }
   makeBoard();
   makeHtmlBoard();
   
 }
 
 /** handleClick: handle click of column top to play piece */
 
 function handleClick(evt) {
   console.log("board: ", board)
   // get x from ID of clicked cell
   const x = +evt.target.id;
   // get next spot in column (if none, ignore click)
    
   const y = findSpotForCol(x); 
 
  
 
   if (y === null) {
     return;
   }
 
   // place piece in board and add to HTML table
   // TODO: add line to update in-memory board
  
   board[y][x]= currPlayer
   placeInTable(y, x);
 
   
 
   // check for win
   if (checkForWin()) {
     return endGame(`Player ${currPlayer} won! Play again?`);
   }
 
   // check for tie
   // TODO: check if all cells in board are filled; if so call, call endGame
   if (board.every(b=>!b.includes(null))){
     endGame('There is a tie! Play again?')
   }
 
   // switch players
   // TODO: switch currPlayer 1 <-> 2
   currPlayer===1? currPlayer=2:currPlayer=1
   
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
 
   for (let y = 0; y < HEIGHT; y++) {
     for (let x = 0; x < WIDTH; x++) {
       const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
       const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
       const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
       const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
 
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
 