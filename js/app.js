"use strict";

class app {
   constructor() {
      this.Create();
      this.marioThrowsPill = new MarioThrowsPill(this);
      this.maginify = new Magnify(this);
      this.score = new ScoreTable(this);
      this.levelClass = new LevelClass(this);
      this.bottle = new Bottle(this);
      this.PrepareForGame();
   }

   Create() {
      //* Create Container
      let Container = document.createElement('div');
      Container.id = "Container";
      Container.style.backgroundColor = "#91163e";
      document.body.appendChild(Container);
      this.Container = Container;

      //* ----------------------
      //* Array of Numbers
      //* ----------------------
      this.NumberPhotos = [];
      for (let x = 0; x < 10; x++) {
         let Number = document.createElement("img");
         Number.src = `./images/GameIMG/Numbers/${x}.png`;
         this.NumberPhotos.push(Number);
      }

      //* ----------------------
      //* Preloading
      //* ----------------------

      this.BottlePhotos = [];
      let colorobject = ["bl", "br", "yl"]

      // Bottle Image
      for (let ind = 0; ind < colorobject.length; ind++) {
         for (const key in SQUARETYPE) {
            let Photo = document.createElement("img");
            Photo.src = `./images/GameIMG/${colorobject[ind]}_${SQUARETYPE[key]}.png`
            this.BottlePhotos.push(Photo)
         }
      }

      // Game Over Image
      let Photo = document.createElement("img");
      Photo.src = `./images/GameIMG/go.png`
      this.BottlePhotos.push(Photo)

      // Stage Completed Image
      Photo = document.createElement("img");
      Photo.src = `./images/GameIMG/sc.png`
      this.BottlePhotos.push(Photo)

      // Mario Images
      for (let ind = 0; ind < 3; ind++) {
         let Photo = document.createElement("img");
         Photo.src = `./images/GameIMG/hands/Mario${ind}.png`
         this.BottlePhotos.push(Photo)
      }

      Photo = document.createElement("img");
      Photo.src = `./images/GameIMG/hands/MarioLoose.png`
      this.BottlePhotos.push(Photo)

      // Magnify Images
      for (let ind = 0; ind < colorobject.length; ind++) {
         for (let x = 0; x < 5; x++) {
            let Photo = document.createElement("img");
            Photo.src = `./images/GameIMG/Magnify/${colorobject[ind]}/${x}.png`
            this.BottlePhotos.push(Photo)
         }
         for (let x = 0; x < 2; x++) {
            let Photo = document.createElement("img");
            Photo.src = `./images/GameIMG/Magnify/${colorobject[ind]}/roll${x}.png`
            this.BottlePhotos.push(Photo)
         }
      }
   }

   PrepareForGame() {
      let onEnterPass = true;
      this.Music = new Audio("./music/fever.mp3");
      this.Music.loop = true;
      this.Music.volume = 0.02;

      window.onkeydown = (e) => {
         console.log({
            keyCode: e.keyCode,
            code: e.code,
            which: e.which,
            charCode: e.charCode,
            key: e.key
         })

         // if (e.code == "Enter" && onEnterPass) {
         if (onEnterPass) {
            this.Music.play();
            onEnterPass = false;
            this.bottle.StartGame();
            this.maginify.animate();
         }
      }
   }
}

var App = new app();
console.log("App:");
console.log(App);