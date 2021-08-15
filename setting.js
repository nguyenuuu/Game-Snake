// setting canvas and size game
const sizeDot = 20;
const g_width = 30;
const g_height = 20;
var run = true;
var dots = [[0, 2], [0, 1], [0, 0]];
var vx = 0;
var vy = 1;
var fx = g_height / 2;
var fy = g_width / 2;
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = sizeDot * g_width;
canvas.height = sizeDot * g_height;

// DOM
const score = document.querySelector(".score");
const gameover = document.querySelector(".gameover");