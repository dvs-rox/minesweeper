'use strict'
const MINE = '🧨'
const FLAG = '🚩'
const EMPTY = ' '

var gBoard = []
var gLevel = {
    SIZE: 6,
    MINES: 1
}
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
    lives: 3,
    isFirstClick: true
}
//reference for cell object structure
// var cell ={
//     minesAroundCount: 0,
//     isShown: false,
//     isMine: false,
//     isMarked: false
// }


function onInit() {
    //build data model
    buildBoard()
    //build DOM
    renderBoard()
}
function buildBoard(size = gLevel.SIZE) {
    for (var i = 0; i < size; i++) {
        gBoard.push([])
        for (var j = 0; j < size; j++) {
            gBoard[i].push({
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            })
            // if (i % 2 === 0 && j % 2 === 0) {
            //     gBoard[i][j].isMine = true
            // }
            // if(i===0&& j===0){
            //     gBoard[i][j].isMine = true
            // }
        }

    }
    // gBoard[0][1].cell.isMine = true
    console.table(gBoard)
}
function renderBoard() {
    var strHtml = ''
    for (var i = 0; i < gBoard.length; i++) {
        strHtml += '<tr>'
        for (var j = 0; j < gBoard.length; j++) {
            strHtml += `<td class="cell cell-${i}-${j} hidden" onclick="onCellClick(this,${i},${j})"
            oncontextmenu="onMark(this)" data-i="${i}" data-j="${j}"></td>`
        }
        strHtml += '</tr>'
    }

    document.querySelector(".boardContainer").innerHTML = strHtml
}
function onCellClick(elCell, i, j) {
    //TODO: add scenarios for flagging, mines, empty spaces & counted neighbors
    
    if(gGame.isFirstClick) {
        plantRandomMines(gBoard)
        gBoard[i][j].isMine = false
        gGame.isFirstClick = false
    }
    var cell = gBoard[i][j]
    if (cell.isMine) {
        console.log('BOOM')
        elCell.classList.remove('hidden')
        if (!cell.isShown) {
            gGame.lives--
        }
        cell.isShown = true
        renderCell(i, j)
        checkGameOver()
        return
    }
    if (cell.isMarked || cell.isShown) return
    if (!cell.isShown) {
        gGame.shownCount++
        cell.isShown = true
        elCell.classList.remove('.hidden')
        expandShown(gBoard, i, j)
    }
    console.log('gGame.shownCount :', gGame.shownCount)
    minesNegsCount(i, j)
    renderCell(i, j)
    checkGameOver()
}
function renderCell(i, j) {
    var cell = gBoard[i][j]
    var elCell = document.querySelector(`.cell-${i}-${j}`)
    //update DOM
    if (cell.isMine) {
        elCell.innerText = MINE
    }
    //if cell is marked, flag will be shown instead of mine
    if (cell.isMarked) {
        elCell.innerText = FLAG
    } else if (!cell.isMarked && !cell.isMine) {//if cell is not marked and is not a mine, empty inner text
        elCell.innerText = EMPTY
    }
    if (cell.minesAroundCount > 0) {
        elCell.innerText = cell.minesAroundCount
    }
    if (cell.isShown) {
        elCell.classList.remove('hidden')
        elCell.classList.add('.shown')
    }
}
function checkGameOver() {
    //if all empty cells are revealed and all mines are marked
    if (gGame.markedCount >= gLevel.MINES && gGame.markedCount === (gLevel.SIZE ** 2 - gGame.shownCount)) {
        alert('victory!')
    }
    if (gGame.lives === 0) {
        alert('loss')
    }
}
function expandShown(board, row, col) {
    for (var i = row - 1; i <= row + 1; i++) {
        if (i < 0 || i > board.length - 1) continue
        for (var j = col - 1; j <= col + 1; j++) {
            if (j < 0 || j > board[0].length - 1) continue
            if (i === row && j === col) continue
            if (gBoard[i][j].isMine) continue
            if (!gBoard[i][j].isShown) {
                // debugger
                gBoard[i][j].isShown = true
                minesNegsCount(i, j)
                renderCell(i, j)
                gGame.shownCount++
            }
        }
    }
}