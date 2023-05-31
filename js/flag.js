'use strict'

//reference for cell object structure
// var cell ={
//     minesAroundCount: 0,
//     isShown: false,
//     isMine: false,
//     isMarked: false
// }
addEventListener(`contextmenu`, (e) => { //prevents opening content menu while still allowing right click event to happen
    e.preventDefault();
});

function onMark(elCell) {
    if(gGame.isFirstClick)return
    if(!gGame.isOn) return
    var cell = gBoard[elCell.dataset.i][elCell.dataset.j]
    if(cell.isShown) return
    if(cell.isMarked){
        gGame.markedCount--
        cell.isMarked = false
        elCell.classList.add('hidden')
    }else{
        gGame.markedCount++
        cell.isMarked = true
        if(cell.isMine || !cell.isShown) elCell.classList.remove('hidden')
    }
    console.log('gGame.markedCount :', gGame.markedCount)
    renderCell(elCell.dataset.i, elCell.dataset.j)
    checkGameOver()
}