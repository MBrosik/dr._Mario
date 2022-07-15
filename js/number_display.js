"use strict"
class NumberDisplay {
   /**
    * 
    * @param {String} id 
    * @param {HTMLDivElement} container 
    * @param {Number} len 
    * @param {app} MainModule 
    */
   constructor(id, container, len, MainModule) {
      this.MainModule = MainModule;
      this.len = len;
      this.display_container = document.createElement("div");
      this.display_container.id = id;
      container.appendChild(this.display_container);
   }
   ChangeDisplay(Count) {
      this.display_container.innerHTML = "";
      this.ShowIteration(Count.toString(), this.display_container, this.len);
   }
   ShowIteration(Score, Container, len) {
      for (let i = 0; i < len; i++) {
         let img = document.createElement("img");
         let elem = (i < (len - Score.length)) ? 0 : Score[(i - (len - Score.length))];
         img.src = this.MainModule.NumberPhotos[elem].src
         Container.appendChild(img);
      }
   }
}