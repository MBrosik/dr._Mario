"use strict"
class Magnify {
   /**
    * 
    * @param {app} module 
    */
   constructor(module) {
      this.MainModule = module;
      this.Create();
   }
   Create() {

      /**
       * @type {Array<{x,y}>}
       */
      this.VirusesPosition = [
         //* First Yellow
         { x: (7 / 40) * WIDTH + `px`, y: (14 / 24) * HEIGHT + `px` },
         { x: (6 / 40) * WIDTH + `px`, y: (14 / 24) * HEIGHT + `px` },
         { x: (5 / 40) * WIDTH + `px`, y: (14 / 24) * HEIGHT + `px` },
         { x: (4 / 40) * WIDTH + `px`, y: (14 / 24) * HEIGHT + `px` },
         { x: (3 / 40) * WIDTH + `px`, y: (15 / 24) * HEIGHT + `px` },
         { x: (2 / 40) * WIDTH + `px`, y: (16 / 24) * HEIGHT + `px` },
         //* Second Red
         { x: (2 / 40) * WIDTH + `px`, y: (16 / 24) * HEIGHT + `px` },
         { x: (2 / 40) * WIDTH + `px`, y: (17 / 24) * HEIGHT + `px` },
         { x: (3 / 40) * WIDTH + `px`, y: (18 / 24) * HEIGHT + `px` },
         { x: (3 / 40) * WIDTH + `px`, y: (19 / 24) * HEIGHT + `px` },
         { x: (4 / 40) * WIDTH + `px`, y: (19 / 24) * HEIGHT + `px` },
         { x: (5 / 40) * WIDTH + `px`, y: (19 / 24) * HEIGHT + `px` },
         //*Third Blue
         { x: (6 / 40) * WIDTH + `px`, y: (19 / 24) * HEIGHT + `px` },
         { x: (7 / 40) * WIDTH + `px`, y: (19 / 24) * HEIGHT + `px` },
         { x: (8 / 40) * WIDTH + `px`, y: (18 / 24) * HEIGHT + `px` },
         { x: (8 / 40) * WIDTH + `px`, y: (17 / 24) * HEIGHT + `px` },
         { x: (8 / 40) * WIDTH + `px`, y: (16 / 24) * HEIGHT + `px` },
         { x: (8 / 40) * WIDTH + `px`, y: (15 / 24) * HEIGHT + `px` },
      ]

      this.virusTable = {
         yl: new MagnifyVirus(`yl`, this.VirusesPosition, 0, this.MainModule, this),
         br: new MagnifyVirus(`br`, this.VirusesPosition, 6, this.MainModule, this),
         bl: new MagnifyVirus(`bl`, this.VirusesPosition, 12, this.MainModule, this),
      };
   }
   animate() {
      /**
       * @type {Array<Promise>}
       */
      let promiseList = [];
      for (const key in this.virusTable) {
         if (this.virusTable[key] != undefined) {
            promiseList.push(new Promise((resolve, reject) => {
               this.virusTable[key].dancing(resolve);
            }))
         }
      }

      Promise.all(promiseList).then(values => {
         for (const key in this.virusTable) {
            if (this.virusTable[key] != undefined) {
               this.virusTable[key].stopDancing()
               this.virusTable[key].step();
            }
         }
         values.forEach(el => {
            if (el != undefined && this.MainModule.bottle.virusCountList[el] == 0) {
               this.virusTable[el].removeElement();
            }
         })
         let Allundefined = true;
         for (const key in this.virusTable) {
            if (this.virusTable[key] != undefined) {
               Allundefined = false;
            }
         }
         if (!Allundefined) {
            this.animate();
         }
      })
   }
   clear() {
      for (const key in this.virusTable) {
         if (this.virusTable[key] != undefined) {
            this.virusTable[key].stopDancing()
            this.virusTable[key].removeElement();
         }
      }
   }
   loose() {
      for (const key in this.virusTable) {
         if (this.virusTable[key] != undefined) {
            this.virusTable[key].stopDancing();
            this.virusTable[key].looseDancing();
         }
      }
   }
}


class MagnifyVirus {
   /**
    * 
    * @param {String} id 
    * @param {Array<{x,y}>} cordsTable 
    * @param {Number} iterator 
    * @param {app} Mainmodule 
    * @param {Magnify} module 
    */
   constructor(id, cordsTable, iterator, Mainmodule, module) {
      this.MainModule = Mainmodule;
      this.module = module;
      this.cordsTable = cordsTable
      this.iterator = iterator;
      this.id = id;

      this.dancingNumber = 1;
      this.rollingNumber = 0;
      this.state = VIRUS_STATE.dancing

      this.Create(id)
   }
   Create(id) {
      this.el = document.createElement('img');
      this.el.id = id + `Virus`;
      this.el.classList.add("MaginifyVirus");
      this.el.src = `./images/GameIMG/Magnify/${id}/1.png`

      this.el.style.top = this.cordsTable[this.iterator].y
      this.el.style.left = this.cordsTable[this.iterator].x

      this.MainModule.Container.appendChild(this.el)
   }
   step() {
      if (this.iterator != this.cordsTable.length - 1) {
         this.iterator++;
      }
      else this.iterator = 0;

      this.el.style.top = this.cordsTable[this.iterator].y
      this.el.style.left = this.cordsTable[this.iterator].x
   }
   dancing(Promise) {
      this.state = VIRUS_STATE.dancing
      this.Interval = setInterval(() => {
         if (this.state == VIRUS_STATE.dancing) {
            this.dancingNumber++;
            this.el.src = `./images/GameIMG/Magnify/${this.id}/${this.dancingNumber % 4}.png`

            if (this.dancingNumber >= 4) {
               let allFinished = true;
               for (const key in this.module.virusTable) {
                  if (this.module.virusTable[key] != null) {
                     if (this.module.virusTable[key].dancingNumber < 4 && this.module.virusTable[key].rollingNumber < 10) {
                        allFinished = false;
                     }
                  }
               }
               if (allFinished) Promise(this.id)
            }
         }
         else {
            this.rollingNumber++;
            this.el.src = `./images/GameIMG/Magnify/${this.id}/roll${this.rollingNumber % 2}.png`

            if (this.rollingNumber >= 10) {
               let allFinished = true;
               for (const key in this.module.virusTable) {
                  if (this.module.virusTable[key] != null) {
                     if (this.module.virusTable[key].dancingNumber < 4 && this.module.virusTable[key].rollingNumber < 10) {
                        allFinished = false;
                     }
                  }
               }
               if (allFinished) {
                  Promise(this.id)
               }
            }
         }
      }, 200)
   }
   stopDancing() {
      clearInterval(this.Interval)
      this.dancingNumber = 1;
      this.rollingNumber = 0;
   }
   getOnBack() {
      this.rollingNumber = 0
      this.state = VIRUS_STATE.rolling

   }
   removeElement() {
      this.el.remove();
      this.module.virusTable[this.id] = undefined;
   }
   looseDancing() {
      clearInterval(this.Interval);
      let count = 0
      setInterval(() => {
         clearInterval(this.Interval);
         this.el.src = `./images/GameIMG/Magnify/${this.id}/${3 + count % 2}.png`
         count++;
      }, 200)
   }
}