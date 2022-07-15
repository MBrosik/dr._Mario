"use strict"

class Bottle {
   /**
    * 
    * @param {app} MainModule 
    */
   constructor(MainModule) {
      this.MainModule = MainModule;
      this.CreateDiv();
   }


   CreateDiv() {
      //* -----------------
      //* Create Bottle
      //* -----------------
      let BottleContainer = document.createElement("div");
      BottleContainer.id = "BottleContainer";
      this.MainModule.Container.appendChild(BottleContainer);
      this.BottleContainer = BottleContainer;

      //* ------------------------------
      //* Create BottleTab with squares
      //* ------------------------------
      /** 
      * @type {Array<Array<PillType|Virus>>} 
      * */
      this.BottleTable = [];

      for (let y = 0; y < 17; y++) {
         this.BottleTable[y] = [];
         for (let x = 0; x < 8; x++) {
            let Square = document.createElement("div");
            Square.style.top = `${y / 16 * 100}%`;
            Square.style.left = `${x / 8 * 100}%`;

            if (((x == 3 || x == 4)) || y != 0) {
               this.BottleTable[y].push({
                  el: Square,
               });
            }
            else this.BottleTable[y].push(undefined);
            BottleContainer.appendChild(Square);
         }
      }

      // ! App.bottle.BottleTable.map(el => {return el.map(e1 =>{return (e1==undefined)?e1:(e1.el)})})
   }

   //* ------------------
   //* Game
   //* ------------------

   StartGame() {
      this.backgroundColorList = ["#91163e", "#008454", "#ffb19c", "#837e85", "#0041ae"];
      this.TypesOfColors = ["bl", "br", "yl"];

      this.virusList = [];
      this.virusCountList = { "bl": 0, "br": 0, "yl": 0 };
      this.virusCount = 4 * this.MainModule.levelClass.level + 4;
      this.MainModule.levelClass.VirusCount = this.virusCount;
      this.MainModule.levelClass.ShowVirusCount(false);
      //* ------------------
      //* Viruses
      //* ------------------

      for (let z = 0; z < this.virusCount/*11 * 8*/; z++) {
         (function f(el1) {
            let y = Math.floor(Math.random() * 10.98) + 6;
            let x = Math.floor(Math.random() * 7.98);
            if (el1.BottleTable[y][x].type != SQUARETYPE.virus) {
               let color = el1.TypesOfColors[z % 3];

               let el = el1.BottleTable[y][x].el
               el1.BottleTable[y][x] = new Virus(el, color, SQUARETYPE.virus);
               el1.virusList.push(el1.BottleTable[y][x]);
               el1.virusCountList[color]++;
            }
            else f(el1)
         })(this)
      }

      this.color = {
         l: this.TypesOfColors[Math.floor(Math.random() * (this.TypesOfColors.length - 0.01))],
         r: this.TypesOfColors[Math.floor(Math.random() * (this.TypesOfColors.length - 0.01))]
      };
      this.MainModule.marioThrowsPill.setNewPill(this.color);

      /**
       * @type {Array<Pill>}
       */
      this.PillsList = [];
      this.QueueOfFall();
   }

   QueueOfFall() {
      //* ------------------
      //* When you won
      //* ------------------
      if (this.virusCount == 0) {
         let StageCompleteDIV = document.createElement("div");
         StageCompleteDIV.id = "StageComplete";
         StageCompleteDIV.style.backgroundColor = this.backgroundColorList[this.MainModule.levelClass.level % 4];
         this.MainModule.Container.appendChild(StageCompleteDIV);

         let KeyEnterisPushed = false;

         window.onkeydown = (e) => {
            if (/*e.code == "Enter" && */!KeyEnterisPushed) {
               KeyEnterisPushed = true;
               StageCompleteDIV.remove();
               for (let y = 0; y < this.BottleTable.length; y++) {
                  for (let x = 0; x < this.BottleTable[y].length; x++) {
                     if (this.BottleTable[y][x] != undefined) {
                        this.BottleTable[y][x] = NormalType(this.BottleTable[y][x].el);
                     }
                  }
               }
               this.MainModule.levelClass.ShowLevel();
               this.MainModule.maginify.clear();
               this.MainModule.maginify = new Magnify(this.MainModule);
               this.MainModule.maginify.animate();

               this.MainModule.Container.style.backgroundColor = this.backgroundColorList[this.MainModule.levelClass.level % 4];
               this.StartGame();
            }
         }
      }
      //* ------------------
      //* When you lost
      //* ------------------
      else if (this.BottleTable[1][3].type != undefined || this.BottleTable[1][4].type != undefined) {
         let GameOverDIV = document.createElement("div");
         GameOverDIV.id = "GameOver";
         GameOverDIV.style.backgroundColor = this.backgroundColorList[this.MainModule.levelClass.level % 4];
         this.MainModule.Container.appendChild(GameOverDIV);

         this.MainModule.score.ShowTopScore();
         this.MainModule.maginify.loose();
         this.MainModule.marioThrowsPill.loose();
      }
      //* ----------------------
      //* When you are in game
      //* ----------------------
      else {
         let Promise1 = new Promise((resolve, reject) => {
            this.MainModule.marioThrowsPill.animate(resolve);
         })

         Promise1.then(v => {

            this.Pill = new Pill(this, this.color);      //* Create pill

            this.color = {
               l: this.TypesOfColors[Math.floor(Math.random() * (this.TypesOfColors.length - 0.01))],
               r: this.TypesOfColors[Math.floor(Math.random() * (this.TypesOfColors.length - 0.01))]
            };

            this.MainModule.marioThrowsPill.setNewPill(this.color);

            //* ----------------------------------
            //* Interval
            //* ----------------------------------
            this.Speed = 500/*1000 * 60 * 10*/;
            if (this.FallInterval != null) clearInterval(this.FallInterval);
            this.FallInterval = setInterval(FallIntervalFunction, this.Speed)

            /**
             * 
             * @param {Bottle} el 
             */
            function FallIntervalFunction(el = App.bottle) {
               el.Pill.fall();
               if (el.Pill.ThisIsFallen) {
                  el.PillsList.push(el.Pill);
                  clearInterval(el.FallInterval);
                  el.BeatingSquares();
               };
            }

            //* ----------------------------------
            //* Keys on events
            //* ----------------------------------

            this.KeySisPushed = false;
            this.KeyAisPushed = false;
            this.KeyDisPushed = false;
            this.KeyWisPushed = false;
            this.KeyShiftisPushed = false;

            this.KeyWandShiftTime = 0;

            window.onkeydown = fall;
            function fall(e, el = App.bottle) {
               if (el.Pill != null && !el.KeySisPushed) {
                  if ((e.code == "KeyA" || e.code == "ArrowLeft") && !el.KeyAisPushed) {
                     el.KeyAisPushed = true;
                     el.Pill.move(MOVES.left);
                  }
                  else if ((e.code == "KeyD" || e.code == "ArrowRight") && !el.KeyDisPushed) {
                     el.KeyDisPushed = true;
                     el.Pill.move(MOVES.right);
                  }


                  if ((e.code == "KeyW" || e.code == "ArrowUp") && !el.KeyShiftisPushed && !el.KeyWisPushed) {
                     el.KeyWandShiftTime = Date.now();
                     el.KeyWisPushed = true;
                     el.Pill.rotate(ROTATE.anticlockwise);
                  }
                  else if ((e.code == "ShiftLeft" || e.code == "ShiftRight") && !el.KeyShiftisPushed && !el.KeyWisPushed) {
                     // el.KeyWandShiftTime = Date.now();
                     el.KeyShiftisPushed = true;
                     el.Pill.rotate(ROTATE.clockwise);
                  }

                  if ((e.code == "KeyS" || e.code == "ArrowDown") && !el.KeySisPushed && el.Pill != null) {
                     el.KeySisPushed = true;
                     clearInterval(el.FallInterval)
                     el.FallInterval = setInterval(FallIntervalFunction, 20);
                  }
               }
            }

            //* ----------------------------------
            //* Keys up events
            //* ----------------------------------

            window.onkeyup = (e) => {
               if (e.code == "KeyA" || e.code == "ArrowLeft") {
                  this.KeyAisPushed = false;
               }
               if (e.code == "KeyD" || e.code == "ArrowRight") {
                  this.KeyDisPushed = false;
               }
               if (e.code == "KeyW" || e.code == "ArrowUp") {
                  this.KeyWisPushed = false;
               }
               if (e.code == "ShiftLeft" || e.code == "ShiftRight") {
                  this.KeyShiftisPushed = false;
               }
            }
         })
      }
   }

   BeatingSquares() {
      this.Pill = null;

      //* ----------------------------------
      //* Search fields to beat
      //* ----------------------------------
      let BeatList = [];
      for (let y = 1; y < this.BottleTable.length; y++) {
         let ColorGroup = [];
         for (let x = 0; x < this.BottleTable[y].length; x++) {
            ColorGroupManager(ColorGroup, BeatList, this.BottleTable, y, x, true, (x == this.BottleTable[y].length - 1))
         }
      }

      for (let x = 0; x < this.BottleTable[0].length; x++) {
         let ColorGroup = [];
         for (let y = 1; y < this.BottleTable.length; y++) {
            ColorGroupManager(ColorGroup, BeatList, this.BottleTable, y, x, false, (y == this.BottleTable.length - 1))
         }
      }

      function ColorGroupManager(ColorGroup, BeatList, BottleTable, y, x, horizontal, last) {
         let x1 = (horizontal) ? 1 : 0;
         let y1 = (horizontal) ? 0 : 1;
         if (ColorGroup.length != 0) {
            if (BottleTable[y][x].color == BottleTable[y - y1][x - x1].color
               && BottleTable[y][x].color != null && BottleTable[y - y1][x - x1].color != null) {
               ColorGroup.push({ y, x, el: BottleTable[y][x] });
            }
            else {
               if (ColorGroup.length >= 4 && ColorGroup.some(el => (el.el instanceof PillType))) {
                  BeatList.push([...ColorGroup]);
               }
               ColorGroup.splice(0);
               ColorGroup.push({ y, x, el: BottleTable[y][x] })
            };
         }
         else if (BottleTable[y][x].color != null) {
            ColorGroup.push({ y, x, el: BottleTable[y][x] })
         };

         if (ColorGroup.length >= 4 && last && ColorGroup.some(el => (el.el instanceof PillType))) {
            BeatList.push([...ColorGroup]);
         }
      }

      //* ----------------------------------
      //* Beating
      //* ----------------------------------

      BeatList.forEach(el => {
         el.forEach((el1, ind1, arr1) => {
            let Div = this.BottleTable[el1.y][el1.x].el;
            if (this.BottleTable[el1.y][el1.x] instanceof PillType) {

               this.BottleTable[el1.y][el1.x].SecondHalf = null; //! 1. Zmiana
               this.BottleTable[el1.y][el1.x].ThisHalf.el = null;
               this.BottleTable[el1.y][el1.x].PillModule.HalfPillPrepere();
            }
            else if (this.BottleTable[el1.y][el1.x] instanceof Virus) {
               this.MainModule.maginify.virusTable[this.BottleTable[el1.y][el1.x].color].getOnBack();
               this.virusCountList[this.BottleTable[el1.y][el1.x].color]--;
               this.virusCount--;
               this.MainModule.levelClass.ShowVirusCount();
               this.MainModule.score.ShowScore();
            }
            this.BottleTable[el1.y][el1.x].ChangeToNormalType(this.BottleTable, el1.y, el1.x);
         })
      })



      //* ----------------------------------
      //* Gravity
      //* ----------------------------------
      setTimeout(() => {
         if (BeatList.length != 0) {
            this.PillsList = this.PillsList.filter(el => (el.FirstHalf != null || el.SecondHalf != null))

            this.PillsList.sort((a, b) => {
               return b.FirstHalf.Cordinates.y - a.FirstHalf.Cordinates.y;
            })

            let GravityInterval = setInterval(() => {
               let AllFallen = true;
               this.PillsList.forEach((el, ind, arr) => {
                  arr[ind].fall();
                  AllFallen = (arr[ind].ThisIsFallen) ? AllFallen : false;
               })
               if (AllFallen) {
                  clearInterval(GravityInterval);
                  this.BeatingSquares();
               };
            }, 50)
         }
         else {
            this.QueueOfFall();
         }
      }, 150);
   }
}