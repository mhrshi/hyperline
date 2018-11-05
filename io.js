const { io, grid } = require('./globals');
const shortid = require('shortid');

const rooms = {};

io.on('connection', socket => {
    socket.on('newHost', gamerName => {
        const roomId = shortid.generate();
        socket.join(roomId);
        socket.emit('sessionAssigned', roomId);
        rooms[roomId] = {
            p1: gamerName,
            p2: undefined
        }
    });

    socket.on('addPlayer', (gamerName, roomId) => {
        let success = false;
        try {
            if (rooms[roomId]['p2'] === undefined) {
                rooms[roomId]['p2'] = gamerName;
                socket.join(roomId);
                success = true;
                io.to(roomId).emit('playerAdded', {
                    success,
                    1: rooms[roomId]['p1'],
                    2: gamerName 
                });
                return;
            } else {
                success = false;
            }
        } catch(error) {
            console.log(error);
            success = false;
        }
        socket.emit('playerAdded', { success });
    });

    socket.on('gridChange', updatedSize => {
        const roomId = Object.keys(socket.rooms).filter(item => item !== socket.id)[0];
        io.to(roomId).emit('updateGrid', updatedSize);
    });

    socket.on('turnPlayed', payload => {
        const roomId = Object.keys(socket.rooms).filter(item => item !== socket.id)[0];
        const newMarker = payload.gridArray[payload.index] === 1 ? 2 : 1;
        const wonBy = checkForWinner(payload.index, payload.gridArray, roomId);
        io.to(roomId).emit('nextTurn', { 
            newMarker,
            gridArray: payload.gridArray,
            wonBy
        });
    });

    socket.on('playAgain', gridSize => {
        const roomId = Object.keys(socket.rooms).filter(item => item !== socket.id)[0];
        io.to(roomId).emit('resetGame', gridSize);
    });

    socket.on('disconnecting', () => {
        try {
            const roomId = Object.keys(socket.rooms).filter(item => item !== socket.id)[0];
            delete rooms[roomId];
            io.to(roomId).emit('destroySession');
        } catch(error) {
            console.log(error);
        }
    });
});

function checkForWinner(index, gridArray, roomId) {
    const gridSize = Math.round(Math.sqrt(gridArray.length));

    if (index % (gridSize + 1) === 0) {
        const major = diagonalCheck(gridArray, gridSize, 1);
        if (major) return rooms[roomId][`p${major}`];
    }

    if (index % (gridSize - 1) === 0) {
        const minor = diagonalCheck(gridArray, gridSize, -1);
        if (minor) return rooms[roomId][`p${minor}`];
    }

    const rowRes = rowCheck(index, gridArray, gridSize);
    if (rowRes) return rooms[roomId][`p${rowRes}`];

    const colRes = columnCheck(index, gridArray, gridSize);
    if (colRes) return rooms[roomId][`p${colRes}`];

    return '';
}

function diagonalCheck(gridArray, gridSize, type) {
    const jump = gridSize + type;
    let i = type === 1 ? 0 : gridSize - 1;
    let sum = 0;
    while (i < gridArray.length) {
        sum += gridArray[i] * grid['magic'][gridSize][i];
        i += jump;
    }
    const sumIndex = grid['wins'][gridSize].indexOf(sum);
    return sumIndex === -1 ? '' : sumIndex + 1;
}

function rowCheck(index, gridArray, gridSize) {
    let i = index - (index % gridSize);
    const end = i + gridSize;
    let sum = 0;
    while (i < end) {
        sum += gridArray[i] * grid['magic'][gridSize][i];
        i++;
    }
    const sumIndex = grid['wins'][gridSize].indexOf(sum);
    return sumIndex === -1 ? '' : sumIndex + 1;
}

function columnCheck(index, gridArray, gridSize) {
    const jump = gridSize;
    let i = index % gridSize;
    let sum = 0;
    while (i < gridArray.length) {
        sum += gridArray[i] * grid['magic'][gridSize][i];
        i += jump;
    }
    const sumIndex = grid['wins'][gridSize].indexOf(sum);
    return sumIndex === -1 ? '' : sumIndex + 1;
}