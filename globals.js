const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, { path: '/backend/' });

const grid = {
    magic: {
        3: [
            8, 1, 6,
            3, 5, 7,
            4, 9, 2
        ],
        5: [
            17, 24,  1,  8, 15,
            23,  5,  7, 14, 16,
             4,  6, 13, 20, 22,
            10, 12, 19, 21,  3,
            11, 18, 25,  2,  9
        ],
        7: [
            30, 39, 48,  1, 10, 19, 28,
            38, 47,  7,  9, 18, 27, 29,
            46,  6,  8, 17, 26, 35, 37,
             5, 14, 16, 25, 34, 36, 45,
            13, 15, 24, 33, 42, 44,  4,
            21, 23, 32, 41, 43,  3, 12,
            22, 31, 40, 49,  2, 11, 20
        ]
    },
    wins: {
        3: [15, 30],
        5: [65, 130],
        7: [175, 350]
    }
};

module.exports = {
    app,
    express,
    io,
    server,
    grid
};