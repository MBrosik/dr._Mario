"use strict"
class LevelClass {
   /**
    * 
    * @param {app} module 
    */
   constructor(module) {
      this.MainModule = module;
      this.level = 0;
      this.VirusCount = 4 * this.level + 4;
      this.CreateDiv();
      this.ShowLevel(false);
      this.ShowVirusCount(false);
   }
   CreateDiv() {
      let { Container } = this.MainModule;

      this.LevelDisplay = new NumberDisplay("LevelContainer", Container, 2, this.MainModule);
      this.VirusDisplay = new NumberDisplay("VirusCountContainer", Container, 2, this.MainModule);
   }
   ShowLevel(newLevel = true) {
      // if (newLevel) this.level += 1;
      // if (newLevel) this.level += true;
      if (newLevel) this.level++;

      this.LevelDisplay.ChangeDisplay(this.level)
   }
   ShowVirusCount(newScore = true) {
      // if (newScore) this.VirusCount -= 1;
      if (newScore) this.VirusCount--;

      this.VirusDisplay.ChangeDisplay(this.VirusCount);
   }
}