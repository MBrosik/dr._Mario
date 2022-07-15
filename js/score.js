"use strict"
class ScoreTable {
   /**
    * 
    * @param {app} module 
    */
   constructor(module) {
      this.MainModule = module;
      this.Score = 0;

      //* ----------------------
      //* Functions
      //* ----------------------
      this.CreateDiv();
      this.ShowTopScore(null);
      this.ShowScore(false);
   }
   CreateDiv() {
      let { Container } = this.MainModule;

      this.TopScoreDisplay = new NumberDisplay("TopScoreContainer", Container, 7, this.MainModule);
      this.ScoreDisplay = new NumberDisplay("ScoreContainer", Container, 7, this.MainModule);
   }
   ShowTopScore(newTopScore = this.Score) {
      //* ----------------------
      //* Local Storage
      //* ----------------------
      // 7 miejsc
      let TopScore = newTopScore || window.localStorage.getItem("TopScore");
      if (TopScore == undefined) TopScore = (0).toString();
      window.localStorage.setItem("TopScore", TopScore)

      this.TopScoreDisplay.ChangeDisplay(TopScore)
   }
   ShowScore(newScore = true) {
      // 7 miejsc
      if (newScore) this.Score += 100;

      this.ScoreDisplay.ChangeDisplay(this.Score)
   }
}