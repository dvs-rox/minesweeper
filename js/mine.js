'use strict'


function addMine(i, j) {//sets cell property isMine to true, does not render cell
    //update model
    gBoard[i][j].isMine = true
}
function plantRandomMines(board){
    gLevel.MINES = 0
    var odds = gLevel.MINEPERCENTAGE/100 //odds a mine will be placed
    for(var i = 0; i<board.length; i++){
        for(var j = 0; j<board.length;j++){
            if(Math.random()<=odds && !board[i][j].isShown){
                // debugger
                board[i][j].isMine = true
                gLevel.MINES++
            }
        }
    }

    console.table(board)
}
function minesNegsCount(row, col) {
    var count = 0
    //neighbor loop that counts neighbors who have isBomb === true
    for (var i = row - 1; i <= row + 1; i++) {
        if (i < 0 || i > gBoard.length - 1) continue
        for (var j = col - 1; j <= col + 1; j++) {
            // debugger
            if (j < 0 || j > gBoard[0].length-1) continue
            if (i === row && j === col) continue
            if (gBoard[i][j].isMine) {
                count++
            }
        }
    }
    // debugger
    if(count>0){
        gBoard[row][col].minesAroundCount = count
        renderCell(row,col)
    }
    return count
}