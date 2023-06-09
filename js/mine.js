'use strict'


function addMine(i, j) {//sets cell property isMine to true, does not render cell
    //update model
    gBoard[i][j].isMine = true
}
function plantRandomMines(board) {
    var arr = []
    var mines = gLevel.MINES
    console.log('mines :', mines)
    for (var i = 0; i < Math.pow(gLevel.SIZE, 2)-1; i++) { //-1: when filling the board, the array is popped effectively once less than boardsize because of shown cell being ignored
        if (mines !== 0) {

            arr.push({
                minesAroundCount: 0,
                isShown: false,
                isMine: true,
                isMarked: false,
                isHinted: false
            })
            mines--
            continue
        }
        arr.push({
            minesAroundCount: 0,
            isShown: false,
            isMine: false,
            isMarked: false,
            isHinted: false
        })
    }
    for (var i = 0; i < 20; i++) {//mix it up real good
        shuffle(arr)
    }
    console.log('arr :', arr)
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            if (board[i][j].isShown) continue
            var cell = arr.pop()
            debugger
            if (cell.isMine === true) {
                board[i][j].isMine = true
            }
        }
    }
    countAllMinesPerCell()
}

function minesNegsCount(row, col) {
    var count = 0
    //neighbor loop that counts neighbors who have isBomb === true
    for (var i = row - 1; i <= row + 1; i++) {
        if (i < 0 || i > gBoard.length - 1) continue
        for (var j = col - 1; j <= col + 1; j++) {
            // debugger
            if (j < 0 || j > gBoard[0].length - 1) continue
            if (i === row && j === col) continue
            if (gBoard[i][j].isMine) {
                count++
            }
        }
    }
    // debugger
    if (count > 0) {
        gBoard[row][col].minesAroundCount = count
        renderCell(row, col)
    }
    return count
}
function countAllMinesPerCell() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            if (gBoard[i][j].isMine) continue
            minesNegsCount(i, j)
        }
    }
}