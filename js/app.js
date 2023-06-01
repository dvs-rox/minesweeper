'use strict'
const MINE = '🧨'
const FLAG = '🚩'
const EMPTY = ' '

var gElModal = document.querySelector('.modal')
var gBoard = []
var gLevel = {
    SIZE: 6,
    MINES: 2,
    MINEPERCENTAGE: 0
}
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
    lives: 3,
    isFirstClick: true,
    isVictory: false,
    hintCount: 3,
    isHint: false
}
//reference for cell object structure
// var cell ={
//     minesAroundCount: 0,
//     isShown: false,
//     isMine: false,
//     isMarked: false,
//     isHinted: false
// }


function onInit() {
    setDifficulty()
    //reset vars
    resetVars()
    //build data model
    buildBoard()
    //build DOM
    renderBoard()
    updateLifeImage()
}
function resetVars() {
    //reset visibility of modal
    gElModal.style.visibility = 'hidden'

    //reset gGame vars
    gGame.isVictory = false
    gGame.isFirstClick = true
    gGame.isOn = true
    gGame.lives = 3
    gGame.markedCount = 0
    gGame.hintCount = 3
    //reset board
    gBoard = []

    document.querySelector('.lifeCounter').innerText = gGame.lives
}
function buildBoard(size = gLevel.SIZE) {
    for (var i = 0; i < size; i++) {
        gBoard.push([])
        for (var j = 0; j < size; j++) {
            gBoard[i].push({
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false,
                isHinted: false
            })
        }

    }
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
function onCellClick(elCell, i, j) { //please excuse this absolute UNIT of a function, it triggers most things and is nearly unreadable so I added tons of comments :^)
    var cell = gBoard[i][j]
    if (!gGame.isOn) return
    if (cell.isMarked || cell.isShown) return//prevents revealing makred cell and needlessly marking marked cell
    if (gGame.isHint) {//if hint mode is activated
        activateHint(gBoard, i, j)
        gGame.isHint = false
        return
    }
    //scenarios for flagging, mines, empty spaces & counted neighbors
    if (gGame.isFirstClick) {//handles first turn not landing on a mine
        gBoard[i][j].isShown = true
        plantRandomMines(gBoard)
        gGame.isFirstClick = false
    }
    if (cell.isMine) { //clicked cell is mine scenario
        if (!cell.isShown && !cell.isMarked) { // prevents clicking revealed or flagged bomb reducing life count
            gGame.lives--
            gGame.markedCount++
            updateLifeImage()//changes face icon
        }
        document.querySelector('.lifeCounter').innerText = gGame.lives//updates lifecounter in DOM
        cell.isShown = true
        renderCell(i, j)
        checkGameOver()
        return
    }
    if (cell.isMarked && !cell.isMine) {
        onMark(elCell)
        showCell(gBoard, i, j, elCell)
    }

    if (!cell.isShown) {//clicking a cell that isn't shown and isn't a mine
        showCell(gBoard, i, j, elCell)
    }
    // minesNegsCount(i, j)
    renderCell(i, j)
    checkGameOver()
}
function showCell(board, i, j, elCell) {
    var cell = gBoard[i][j]
    cell.isShown = true
    elCell.classList.remove('.hidden')
    if (board[i][j].minesAroundCount === 0) {
        expandShown(board, i, j)
    }
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
        return
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
    countShown()
    //if all empty cells are revealed and all mines are marked
    console.log('gGame.shownCount :', gGame.shownCount)
    if (gGame.markedCount === gLevel.MINES //marked all mines (works always)
        && gGame.shownCount=== Math.pow(gLevel.SIZE, 2)) { //shown all other cells
        gGame.isOn = false
        gGame.isVictory = true
        updateLifeImage()
        gElModal.style.visibility = 'visible'
        gElModal.querySelector('span').innerText = 'Victory!'
    }
    if (gGame.lives === 0) {
        gGame.isVictory = false
        gGame.isOn = false
        gElModal.style.visibility = 'visible'
        gElModal.querySelector('span').innerText = 'Crushing defeat!'
    }
}
function updateLifeImage() {//handles change of face icon
    var elImg = document.querySelector('.lifecountDynamic')
    if (gGame.isVictory === true) {
        switch (gGame.lives) {
            case 3:
                elImg.src = 'img/lifecount/win-3.png'
                break
            case 2:
                elImg.src = 'img/lifecount/win-2.png'
                break
            case 1:
                elImg.src = 'img/lifecount/win-1.png'
                break
            default:
                elImg.src = 'img/lifecount/3.png'
                break
        }

    } else {
        switch (gGame.lives) {
            case 3:
                elImg.src = 'img/lifecount/3.png'
                break
            case 2:
                elImg.src = 'img/lifecount/2.png'
                break
            case 1:
                elImg.src = 'img/lifecount/1.png'
                break
            case 0:
                elImg.src = 'img/lifecount/0.png'
                break
            default:
                elImg.src = 'img/lifecount/3.png'
                break
        }
    }

}
function expandShown(board, row, col) {
    for (var i = row - 1; i <= row + 1; i++) {
        if (i < 0 || i > board.length - 1) continue
        for (var j = col - 1; j <= col + 1; j++) {
            if (j < 0 || j > board[0].length - 1) continue
            if (i === row && j === col) continue
            if (gBoard[i][j].isMarked) continue
            if (gBoard[i][j].isMine) continue
            if (!gBoard[i][j].isShown) {
                gBoard[i][j].isShown = true
                // minesNegsCount(i, j)
                renderCell(i, j)
            }
        }
    }
}
function countShown() {
    var count = 0
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            if(gBoard[i][j].isShown || gBoard[i][j].isMarked) count++
        }
    }
    gGame.shownCount = count
}
function setDifficulty() {
    var elSelect = document.querySelector('select')
    // debugger
    switch (elSelect.value) {
        case 'easy':
            gLevel.SIZE = 4
            gLevel.MINES = 2
            break;
        case 'medium':
            gLevel.SIZE = 8
            gLevel.MINES = 14
            break;
        case 'hard':
            gLevel.SIZE = 12
            gLevel.MINES = 32
            break;
        default:
            gLevel.SIZE = 4
            gLevel.MINES = 2
            break;
    }
}