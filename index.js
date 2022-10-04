


const canvas = document.getElementById("canvas");
const ctx = document.getContext("2d");

var grd = ctx.createLinearGradient(0,0,200,0);

ctx.fillStyle = "red";
ctx.fillStyle = grd;
ctx.fillRect(10, 10, 150, 100);


