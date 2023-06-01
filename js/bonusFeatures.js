'use strict'

function initHint() {
    gGame.isHint = true
}
function activateHint(board, row, col) { //neighbor loop to show all neighbors for 1 sec
    if (gGame.isFirstClick) return
    if (gGame.hintCount === 0) return
    for (var i = row - 1; i <= row + 1; i++) {
        if (i < 0 || i > board.length - 1) continue
        for (var j = col - 1; j <= col + 1; j++) {
            if (j < 0 || j > board[0].length - 1) continue
            if (board[i][j].isShown) continue
            board[i][j].isShown = true
            board[i][j].isHinted = true
            // minesNegsCount(i,j)
            renderCell(i, j)
        }
    }
    gGame.hintCount--
    updateHintCount()
    setTimeout(reverseHint, 1000, gBoard, row, col);
}
function reverseHint(board, row, col) {
    for (var i = row - 1; i <= row + 1; i++) {
        if (i < 0 || i > board.length - 1) continue
        for (var j = col - 1; j <= col + 1; j++) {
            if (j < 0 || j > board[0].length - 1) continue
            if (board[i][j].isHinted) {
                board[i][j].isShown = false
                var elCell = document.querySelector(`.cell-${i}-${j}`)
                board[i][j].isHinted = false
                elCell.classList.add('hidden')
            }
        }
    }
}
function updateHintCount() {
    var elSpan = document.querySelector('.hints span')
    elSpan.innerText =''
    for (var i = 0; i < gGame.hintCount; i++) {
        elSpan.innerText += '💡'
    }
}
function highScoreUpdate(){ //Yet to be fully implemented due to time constraints
    // debugger
    switch (gLevel.SIZE) {
        case 4:
            if(!window.localStorage.highScoreEasy || +window.localStorage.highScoreEasy<gGame.lives){
                window.localStorage.highScoreEasy = gGame.lives
            }
            break;
        case 8:
            
            break;
        case 12:
            
            break;
    
        default:
            break;
    }
    
    var scoreSpan = document.querySelector('.highScore span')
    scoreSpan.innerText = window.localStorage.highScoreEasy
}