"use strict"
class MarioThrowsPill {
   /**
    * 
    * @param {app} MainModule 
    */
   constructor(MainModule) {
      this.MainModule = MainModule;
      this.marioWindow = new MarioWindow(MainModule, this)
      this.throwPillArea = new ThrowPillArea(MainModule, this)

      this.VectorList = [
         {
            Firsthalf: { y: 0, x: 0, type: SQUARETYPE.down },
            Secondhalf: { y: -1, x: -1, type: SQUARETYPE.up },
            priority: PRIORITY.firsthalf
         },
         {
            Firsthalf: { y: -1, x: 0, type: SQUARETYPE.right },
            Secondhalf: { y: 0, x: -1, type: SQUARETYPE.left },
            priority: PRIORITY.secondhalf
         },
         {
            Firsthalf: { y: -1, x: -1, type: SQUARETYPE.up },
            Secondhalf: { y: 0, x: 0, type: SQUARETYPE.down },
            priority: PRIORITY.firsthalf
         },
         {
            Firsthalf: { y: 0, x: -1, type: SQUARETYPE.left },
            Secondhalf: { y: -1, x: 0, type: SQUARETYPE.right },
            priority: PRIORITY.firsthalf,
            change: true
         },//! 1.Zmiana
         {
            Firsthalf: { y: 0, x: 0, type: SQUARETYPE.down },
            Secondhalf: { y: -1, x: -1, type: SQUARETYPE.up },
            priority: PRIORITY.firsthalf
         },
         {
            Firsthalf: { y: 0, x: 0, type: SQUARETYPE.right },
            Secondhalf: { y: 1, x: -1, type: SQUARETYPE.left },
            priority: PRIORITY.firsthalf
         },
         {
            Firsthalf: { y: -1, x: -1, type: SQUARETYPE.up },
            Secondhalf: { y: 0, x: 0, type: SQUARETYPE.down },
            priority: PRIORITY.firsthalf,
            change: true
         },//! 2/Zmiana
         {
            Firsthalf: { y: 1, x: -1, type: SQUARETYPE.left },
            Secondhalf: { y: 0, x: 0, type: SQUARETYPE.right },
            priority: PRIORITY.firsthalf
         },
         {
            Firsthalf: { y: 0, x: 0, type: SQUARETYPE.down },
            Secondhalf: { y: -1, x: -1, type: SQUARETYPE.up },
            priority: PRIORITY.firsthalf
         },
         {
            Firsthalf: { y: 0, x: 0, type: SQUARETYPE.right },
            Secondhalf: { y: 1, x: -1, type: SQUARETYPE.left },
            priority: PRIORITY.firsthalf
         },
         {
            Firsthalf: { y: -1, x: -1, type: SQUARETYPE.up },
            Secondhalf: { y: 0, x: 0, type: SQUARETYPE.down },
            priority: PRIORITY.firsthalf
         },
         {
            Firsthalf: { y: 1, x: -1, type: SQUARETYPE.left },
            Secondhalf: { y: 0, x: 0, type: SQUARETYPE.right },
            priority: PRIORITY.firsthalf
         },
         {
            Firsthalf: { y: 0, x: 0, type: SQUARETYPE.down },
            Secondhalf: { y: -1, x: -1, type: SQUARETYPE.up },
            priority: PRIORITY.firsthalf
         },
         {
            Firsthalf: { y: 0, x: 0, type: SQUARETYPE.right },
            Secondhalf: { y: 1, x: -1, type: SQUARETYPE.left },
            priority: PRIORITY.firsthalf
         },
         {
            Firsthalf: { y: -1, x: -1, type: SQUARETYPE.up },
            Secondhalf: { y: 0, x: 0, type: SQUARETYPE.down },
            priority: PRIORITY.firsthalf
         },
         {
            Firsthalf: { y: 1, x: -1, type: SQUARETYPE.left },
            Secondhalf: { y: 0, x: 0, type: SQUARETYPE.right },
            priority: PRIORITY.firsthalf
         },
         {
            Firsthalf: { y: 0, x: 0, type: SQUARETYPE.down },
            Secondhalf: { y: -1, x: -1, type: SQUARETYPE.up },
            priority: PRIORITY.firsthalf
         },
         {
            Firsthalf: { y: 1, x: 0, type: SQUARETYPE.right },
            Secondhalf: { y: 2, x: -1, type: SQUARETYPE.left },
            priority: PRIORITY.firsthalf
         },
         {
            Firsthalf: { y: -1, x: -1, type: SQUARETYPE.up },
            Secondhalf: { y: 0, x: 0, type: SQUARETYPE.down },
            priority: PRIORITY.firsthalf
         },
         {
            Firsthalf: { y: 1, x: -1, type: SQUARETYPE.left },
            Secondhalf: { y: 0, x: 0, type: SQUARETYPE.right },
            priority: PRIORITY.firsthalf
         },
         {
            Firsthalf: { y: 1, x: 0, type: null },
            Secondhalf: { y: 1, x: 0, type: null },
            priority: PRIORITY.firsthalf
         },
         {
            Firsthalf: { y: 1, x: 0, type: null },
            Secondhalf: { y: 1, x: 0, type: null },
            priority: PRIORITY.firsthalf
         },
         {
            Firsthalf: { y: 1, x: 0, type: null },
            Secondhalf: { y: 1, x: 0, type: null },
            priority: PRIORITY.firsthalf
         },
         {
            Firsthalf: { y: 1, x: 0, type: null },
            Secondhalf: { y: 1, x: 0, type: null },
            priority: PRIORITY.firsthalf
         },
      ]
   }
   animate(Promise) {
      let count = 0;
      let interval = setInterval(() => {
         if (count != this.VectorList.length) {
            this.throwPillArea.move(this.VectorList[count]);
            if (count == 3) {
               this.marioWindow.throw(1)
            }
            else if (count == 6) {
               this.marioWindow.throw(2)
            }
            count++;
         }
         else {
            clearInterval(interval);
            Promise();
         }
      }, 20)
   }
   setNewPill({ l, r }) {
      let { BottleTable } = this.throwPillArea;
      if (BottleTable[6][0] instanceof PillType) {
         BottleTable[6][0].ChangeToNormalType(BottleTable, 6, 0, false);
         BottleTable[6][1].ChangeToNormalType(BottleTable, 6, 1, false);
      }

      let Cord = [{ y: 3, x: 10 }, { y: 3, x: 11 }]
      this.throwPillArea.Pill = new Pill(this.throwPillArea, { l, r }, Cord);

      this.marioWindow.throw(0)
   }
   loose() {
      this.marioWindow.loosePosition();
      let { BottleTable } = this.throwPillArea;
      if (BottleTable[3][10] instanceof PillType) {
         BottleTable[3][10].ChangeToNormalType(BottleTable, 6, 0, false);
         BottleTable[3][11].ChangeToNormalType(BottleTable, 6, 1, false);
      }
   }
}

class MarioWindow {
   /**
    * 
    * @param {app} MainModule 
    * @param {MarioAndPill} Module 
    */
   constructor(MainModule, Module) {
      this.MainModule = MainModule;
      this.Module = Module;

      /**
       * @type {Array<HTMLImageElement>}
       */
      this.imageList = [];
      for (let x = 0; x < 3; x++) {
         let img = document.createElement("img");
         img.src = `./images/GameIMG/hands/Mario${x}.png`
         this.imageList.push(img);
      }

      this.create();
   }
   create() {
      this.marioImage = document.createElement("img");
      this.marioImage.id = "MarioWindow";
      this.marioImage.src = this.imageList[0].src;
      this.MainModule.Container.appendChild(this.marioImage);
   }
   throw(number) {
      this.marioImage.src = this.imageList[number].src;
   }
   loosePosition() {
      this.marioImage.src = `./images/GameIMG/hands/MarioLoose.png`
   }
}

class ThrowPillArea {
   /**
    * 
    * @param {app} MainModule 
    * @param {MarioAndPill} Module 
    */
   constructor(MainModule, Module) {
      this.MainModule = MainModule;
      this.Module = Module;
      this.create();
   }
   create() {
      this.throwPillContainer = document.createElement("div");
      this.throwPillContainer.id = "ThrowPillContainer";
      this.MainModule.Container.appendChild(this.throwPillContainer);

      //* ------------------------------
      //* Create BottleTab with squares
      //* ------------------------------
      /** 
      * @type {Array<Array<PillType|Virus>>} 
      * */
      this.BottleTable = [];

      for (let y = 0; y < 8; y++) {
         this.BottleTable[y] = [];
         for (let x = 0; x < 12; x++) {
            let Square = document.createElement("div");
            Square.style.top = `${y / 8 * 100}%`;
            Square.style.left = `${x / 12 * 100}%`;

            this.BottleTable[y].push({
               el: Square,
            });
            this.throwPillContainer.appendChild(Square);
         }
      }
      let Cord = [{ y: 3, x: 10 }, { y: 3, x: 11 }]

      this.Pill = null;

   }
   move(table) {
      this.Pill.changePosition(table.Firsthalf, table.Secondhalf, table.priority);
   }
}