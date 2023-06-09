'use strict'
// The maximum is exclusive and the minimum is inclusive
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

// The maximum is inclusive and the minimum is inclusive
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}
//returns random color in hex
function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('')
    var color = '#'
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}
//returns random id
function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}
//creates empty matrix
function createMat(ROWS, COLS) {
    const mat = []
    for (var i = 0; i < ROWS; i++) {
        const row = []
        for (var j = 0; j < COLS; j++) {
            row.push('')
        }
        mat.push(row)
    }
    return mat
}
//shuffles array
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }

// function getMineArray() {
//     var minesBackup = gLevel.MINES
//     var mineArray = []
//     for (var i = 0; i < Math.pow(gLevel.SIZE, 2); i++) {
//         if (minesBackup !== 0) {
//             mineArray.push(MINE)
//             minesBackup--
//         }else{
//             mineArray.push(EMPTY)
//         }
//     }
//     shuffle(mineArray)
//     console.log('mineArray :', mineArray)
//     return mineArray
// }