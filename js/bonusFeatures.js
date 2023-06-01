'use strict'

function initHint(){
    gGame.isHint = true
}
function activateHint(board, row, col) { //neighbor loop to show all neighbors for 1 sec
    if(gGame.isFirstClick)return
    if(gGame.hintCount===0)return
    for (var i = row - 1; i <= row + 1; i++) {
        if (i < 0 || i > board.length - 1) continue
        for (var j = col - 1; j <= col + 1; j++) {
            if (j < 0 || j > board[0].length - 1) continue
            if(board[i][j].isShown)continue
            board[i][j].isShown = true
            board[i][j].isHinted = true
            // minesNegsCount(i,j)
            renderCell(i, j)
        }
    }
    gGame.hintCount--
    setTimeout(reverseHint, 1000, gBoard, row, col);
}
function reverseHint(board, row, col) {
    for (var i = row - 1; i <= row + 1; i++) {
        if (i < 0 || i > board.length - 1) continue
        for (var j = col - 1; j <= col + 1; j++) {
            if (j < 0 || j > board[0].length - 1) continue
            if(board[i][j].isHinted){
                board[i][j].isShown = false
                var elCell = document.querySelector(`.cell-${i}-${j}`)
                board[i][j].isHinted = false
                elCell.classList.add('hidden')
            }
        }
    }
}