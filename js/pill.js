"use strict"
class Pill {
   /**
    * @param {Bottle} BottleModule 
    * @param {{l, r}} color
    */
   constructor(BottleModule, color, Cordinates = [{ y: 1, x: 3 }, { y: 1, x: 4 }],
      SquaretypeFirst = SQUARETYPE.left, SquaretypeSecond = SQUARETYPE.right,
      Position = POSITION.horizontal) {
      //* ------------------
      //* Modules
      //* ------------------
      this.MainModule = BottleModule.MainModule;
      this.BottleModule = BottleModule;

      //* ------------------
      //* Halfs
      //* ------------------
      let [l, r] = Cordinates;      //* l - left , r- right

      //* ------------------
      //* FirstHalf
      //* ------------------
      let el = BottleModule.BottleTable[l.y][l.x].el
      BottleModule.BottleTable[l.y][l.x] = new PillType(el, color.l, SquaretypeFirst, this);

      this.FirstHalf = {
         el: BottleModule.BottleTable[l.y][l.x].el,
         TabEl: BottleModule.BottleTable[l.y][l.x],
         Cordinates: l
      };

      //* ------------------
      //* SecondHalf
      //* ------------------
      let el1 = BottleModule.BottleTable[r.y][r.x].el
      BottleModule.BottleTable[r.y][r.x] = new PillType(el1, color.r, SquaretypeSecond, this);

      this.SecondHalf = {
         el: BottleModule.BottleTable[r.y][r.x].el,
         TabEl: BottleModule.BottleTable[r.y][r.x],
         Cordinates: r
      };

      // BottleModule.BottleTable[l.y][l.x].SecondHalf = BottleModule.BottleTable[r.y][r.x];
      // BottleModule.BottleTable[r.y][r.x].SecondHalf = BottleModule.BottleTable[l.y][l.x];
      BottleModule.BottleTable[l.y][l.x].ThisHalf = this.FirstHalf;
      BottleModule.BottleTable[l.y][l.x].SecondHalf = this.SecondHalf;
      BottleModule.BottleTable[r.y][r.x].ThisHalf = this.SecondHalf;
      BottleModule.BottleTable[r.y][r.x].SecondHalf = this.FirstHalf;

      //* Position
      this.position = Position;

      //* FullPill
      this.FullPill = true;
   }

   //* ------------------
   //* fall
   //* ------------------

   fall() {
      this.ThisIsFallen = false;
      this.IsFalling = true;

      let { y, x } = this.FirstHalf.Cordinates;
      let BottleTable = this.BottleModule.BottleTable;

      if (/*this.SecondHalf != null*/ this.FullPill) {
         if ((this.position == POSITION.horizontal && IsTypeNull(BottleTable, { y: y + 1, x: x }) && IsTypeNull(BottleTable, { y: y + 1, x: x + 1 }))
            || (this.position == POSITION.vertical && IsTypeNull(BottleTable, { y: y + 1, x: x }))) {
            SwapHalfPill(this.FirstHalf, BottleTable, { y: 1, x: 0 })   //* swap firsthalf 
            SwapHalfPill(this.SecondHalf, BottleTable, { y: 1, x: 0 })  //* swap secondhalf
         }
         else this.ThisIsFallen = true;
      }
      else {
         if (IsTypeNull(BottleTable, { y: y + 1, x: x })) {
            SwapHalfPill(this.FirstHalf, BottleTable, { y: 1, x: 0 })   //* swap firsthalf 
         }
         else this.ThisIsFallen = true;
      }
      this.IsFalling = false;
   }

   move(key) {
      if (!this.IsFalling) {

         let { y, x } = this.FirstHalf.Cordinates;
         let { y: y1, x: x1 } = this.SecondHalf.Cordinates;
         let BottleTable = this.BottleModule.BottleTable;

         if ((inRange(x + key, 0, 8) && inRange(x1 + key, 0, 8))) {

            if (key == MOVES.left && ((this.position == POSITION.horizontal && IsTypeNull(BottleTable, { y: y, x: x - 1 }))
               || (this.position == POSITION.vertical && IsTypeNull(BottleTable, { y: y, x: x - 1 }) && IsTypeNull(BottleTable, { y: y1, x: x1 - 1 })))) {
               SwapHalfPill(this.FirstHalf, BottleTable, { y: 0, x: key });
               SwapHalfPill(this.SecondHalf, BottleTable, { y: 0, x: key })
            }
            else if (key == MOVES.right && ((this.position == POSITION.horizontal && IsTypeNull(BottleTable, { y: y1, x: x1 + 1 }))
               || (this.position == POSITION.vertical && IsTypeNull(BottleTable, { y: y, x: x + 1 }) && IsTypeNull(BottleTable, { y: y1, x: x1 + 1 })))) {
               SwapHalfPill(this.SecondHalf, BottleTable, { y: 0, x: key });
               SwapHalfPill(this.FirstHalf, BottleTable, { y: 0, x: key });
            }
         }

         setTimeout(() => {
            if (!this.ThisIsFallen && !this.IsFalling && !this.BottleModule.KeySisPushed && ((key == MOVES.left && this.BottleModule.KeyAisPushed) ||
               (key == MOVES.right && this.BottleModule.KeyDisPushed))) {
               this.move(key);
            }
         }, 100)
      }
   }
   rotate(key) {
      let { y, x } = this.FirstHalf.Cordinates;
      let BottleTable = this.BottleModule.BottleTable;

      if (key == ROTATE.clockwise) {

         if (this.position == POSITION.horizontal && IsTypeNull(BottleTable, { y: y - 1, x: x })) {
            SwapHalfPill(this.FirstHalf, BottleTable, { y: -1, x: 0 }, SQUARETYPE.up)
            SwapHalfPill(this.SecondHalf, BottleTable, { y: 0, x: -1 }, SQUARETYPE.down)
            this.position = POSITION.vertical;
            [this.FirstHalf, this.SecondHalf] = [this.SecondHalf, this.FirstHalf];
         }
         else if (IsTypeNull(BottleTable, { y: y, x: x + 1 })) {
            this.FirstHalf.TabEl.TypeColor(SQUARETYPE.left)
            SwapHalfPill(this.SecondHalf, BottleTable, { y: 1, x: 1 }, SQUARETYPE.right)
            this.position = POSITION.horizontal;
         }
         else if (BottleTable[y][x + 1] == undefined && IsTypeNull(BottleTable, { y: y, x: x - 1 })) {          //* Bouncing off the wall
            SwapHalfPill(this.FirstHalf, BottleTable, { y: 0, x: -1 }, SQUARETYPE.left)
            SwapHalfPill(this.SecondHalf, BottleTable, { y: 1, x: 0 }, SQUARETYPE.right)
            this.position = POSITION.horizontal;
         }
      }
      else if (key == ROTATE.anticlockwise) {
         if (this.position == POSITION.vertical /*&& IsTypeNull(BottleTable, { y: y, x: x + 1 })*/) {
            if (IsTypeNull(BottleTable, { y: y, x: x + 1 })) {
               SwapHalfPill(this.FirstHalf, BottleTable, { y: 0, x: 1 }, SQUARETYPE.right)
               SwapHalfPill(this.SecondHalf, BottleTable, { y: 1, x: 0 }, SQUARETYPE.left)
               this.position = POSITION.horizontal;

               [this.FirstHalf, this.SecondHalf] = [this.SecondHalf, this.FirstHalf];
            }
            else if (BottleTable[y][x + 1] == undefined && IsTypeNull(BottleTable, { y: y, x: x - 1 })) {        //* Bouncing off the wall
               this.FirstHalf.TabEl.TypeColor(SQUARETYPE.right);
               SwapHalfPill(this.SecondHalf, BottleTable, { y: 1, x: -1 }, SQUARETYPE.left);
               this.position = POSITION.horizontal;

               [this.FirstHalf, this.SecondHalf] = [this.SecondHalf, this.FirstHalf];
            }
         }
         else if (IsTypeNull(BottleTable, { y: y - 1, x: x })) {
            this.FirstHalf.TabEl.TypeColor(SQUARETYPE.down)
            SwapHalfPill(this.SecondHalf, BottleTable, { y: -1, x: -1 }, SQUARETYPE.up)
            this.position = POSITION.vertical
         }
      }
      setTimeout(() => {
         if (!this.ThisIsFallen && (Date.now() - this.BottleModule.KeyWandShiftTime) >= 180 && !this.BottleModule.KeySisPushed && ((key == ROTATE.anticlockwise && this.BottleModule.KeyWisPushed) ||
            (key == ROTATE.clockwise && this.BottleModule.KeyShiftisPushed))) {
            this.rotate(key);
         }
      }, 200)
   }
   HalfPillPrepere() {
      if (this.FirstHalf?.el != null) {
         // this.SecondHalf.TabEl.TypeColor(SQUARETYPE.single);
         this.FirstHalf.TabEl.TypeColor(SQUARETYPE.single);
         this.SecondHalf = null;
      }
      else {
         if (this.SecondHalf != null) {
            if (this.SecondHalf.el != null) {
               // this.FirstHalf.TabEl.TypeColor(SQUARETYPE.single);
               this.SecondHalf.TabEl.TypeColor(SQUARETYPE.single);
            }
         }
         this.FirstHalf = null;
         [this.FirstHalf, this.SecondHalf] = [this.SecondHalf, this.FirstHalf];
      }
      this.FullPill = false;
   }

   //* ------------------
   //* Mario Throw
   //* ------------------
   /**
    * 
    * @param {(`PRIORITY.firsthalf`|`PRIORITY.secondhalf`)} priority 
    */
   changePosition({ y, x, type }, { y: y1, x: x1, type: type1 }, priority) {
      let BottleTable = this.BottleModule.BottleTable;
      if (priority == PRIORITY.firsthalf) {
         SwapHalfPill(this.FirstHalf, BottleTable, { y: y, x: x }, type, 8, 12);
         SwapHalfPill(this.SecondHalf, BottleTable, { y: y1, x: x1 }, type1, 8, 12);
      }
      else {
         SwapHalfPill(this.SecondHalf, BottleTable, { y: y1, x: x1 }, type1, 8, 12);
         SwapHalfPill(this.FirstHalf, BottleTable, { y: y, x: x }, type, 8, 12);
      }
      // this.position = POSITION.vertical;
   }
}

/**
 * 
 * @param {HTMLDivElement} el 
 */
function NormalType(el) {
   el.style.backgroundImage = null;
   return { el }
}

//* ------------------
//* Virus
//* ------------------

class Virus {
   /**
    * @param {HTMLDivElement} el 
    */
   constructor(el, color, type, Deathtype = SQUARETYPE.virusDeath) {
      this.el = el;
      this.color = color;
      this.type = type;
      this.Deathtype = Deathtype;
      this.TypeColor();
   }
   TypeColor(type = this.type, color = this.color) {
      // this.ColorType = `${color}_${type}`
      this.el.style.backgroundImage = `url(./images/GameIMG/${color}_${type}.png)`;
      this.el.style.backgroundRepeat = "no-repeat";
   }
   ChangeToNormalType(table, y, x, animate = true) {
      if (animate) {
         this.TypeColor(this.Deathtype);
         setTimeout(() => {
            table[y][x] = NormalType(this.el);
         }, 100);
      }
      else table[y][x] = NormalType(this.el);
   }
}

//* ------------------
//* PillType
//* ------------------

class PillType extends Virus {
   constructor(el, color, type, PillModule, ThisHalf, SecondHalf) {
      super(el, color, type, SQUARETYPE.pillDeath);
      this.PillModule = PillModule;
      // this.SecondHalf = null;
   }
}