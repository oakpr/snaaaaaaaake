
const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");

document.querySelector("#txtfld").innerHTML = "New header";
// var grd = ctx.createLinearGradient(0,0,200,0);

ctx.fillStyle = "red";
// ctx.fillStyle = grd;
ctx.fillRect(10, 10, 550, 500);