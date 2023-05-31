'use strict'

//reference for cell object structure
// var cell ={
//     minesAroundCount: 0,
//     isShown: false,
//     isMine: false,
//     isMarked: false
// }
addEventListener(`contextmenu`, (e) => {
    e.preventDefault();
});

function onMark(elCell) {
    // debugger
    var cell = gBoard[elCell.dataset.i][elCell.dataset.j]
    if(cell.isShown) return
    if(cell.isMarked){
        gGame.markedCount--
        cell.isMarked = false
        elCell.classList.add('hidden')
    }else{
        gGame.markedCount++
        cell.isMarked = true
        elCell.classList.remove('hidden')
    }
    console.log('gGame.markedCount :', gGame.markedCount)
    renderCell(elCell.dataset.i, elCell.dataset.j)
    checkGameOver()
}