"use strict"
// ---------------
//  Functions
// ---------------
function inRange(number, begin, end) {
   if (number >= begin && number < end) return true;
   else return false
}

function IsTypeNull(table, { y, x }) {
   if (table[y] != undefined) {
      if ((table[y][x] != undefined)) {
         return table[y][x].type == null
      }
      else return false
   }
   else return false
}

function SwapHalfPill(Half, Table, Vector, squaretype = null, sizeY = 16, sizeX = 8) {
   let { y, x } = Half.Cordinates;
   let { y: y1, x: x1 } = Vector;

   Half.el.style.top = `${(y + y1) / sizeY * 100}%`;
   Half.el.style.left = `${(x + x1) / sizeX * 100}%`;

   Table[y + y1][x + x1].el.style.top = `${y / sizeY * 100}%`;
   Table[y + y1][x + x1].el.style.left = `${x / sizeX * 100}%`;

   Half.Cordinates.y += y1;
   Half.Cordinates.x += x1;

   if (squaretype != null) {
      Half.TabEl.TypeColor(squaretype)
   }

   Table.swap1({ y: y, x: x }, { y: y + y1, x: x + x1 })

   //! console.table(Table.map(el => { return el.map(e1 => { return (e1 == undefined) ? e1 : (e1) }) }))
}

// ------------
// Arrays 
// ------------
Array.prototype.swap = function (x, y) {
   var b = this[x];
   this[x] = this[y];
   this[y] = b;
   return this;
}
Array.prototype.swap1 = function (a, b) {
   var c = this[a.y][a.x];
   this[a.y][a.x] = this[b.y][b.x];
   this[b.y][b.x] = c;
   return this;
}

// ------------
// Objects
// ------------
const SQUARETYPE = {
   left: "left",
   right: "right",
   up: "up",
   down: "down",
   single: "dot",
   pillDeath: "o",
   virus: "covid",
   virusDeath: "x",
}

const MOVES = {
   left: -1,
   right: 1,
}
const ROTATE = {
   clockwise: 1,
   anticlockwise: -1
}

const POSITION = {
   vertical: "vertical",
   horizontal: "horizontal"
}

const VIRUS_STATE = {
   dancing: "dancing",
   rolling: "rolling"
}

const PRIORITY = {
   firsthalf: "firsthalf",
   secondhalf: "secondhalf"
}

// ------------
// Variables
// ------------

const WIDTH = 280 * 2
const HEIGHT = (3 / 5) * WIDTH