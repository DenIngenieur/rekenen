import { Problem } from "./Problem.js";
import { RendererManager } from "./RendererManager.js";

export class ExerciseController {
  constructor(operation) {
    this.operation = operation;
    this.renderers = new RendererManager();

    this.max = 20;
    this.numTrials = 5;
    this.currentTrial = 0;
    this.score = 0;
    this.problem = null;

    this.cacheDOM();
    this.cacheSounds();
    this.bindEvents();
  }

  // ---------------------------------------------------------
  // DOM references
  // ---------------------------------------------------------
  cacheDOM() {
    this.settingsForm = document.getElementById("settings-form");
    this.maxInput = document.getElementById("max-number");
    this.numTrialsInput = document.getElementById("num-trials");

    this.answerForm = document.getElementById("answer-form");
    this.answerInput = document.getElementById("answer-input");
    this.okButton = document.getElementById("ok-button");
    this.nextButton = document.getElementById("next-button");

    this.answerSection = document.querySelector(".answer-section");

    this.trialInfo = document.getElementById("trial-info");

    this.problemWrapper = document.getElementById("problem-wrapper");
    this.solutionWrapper = document.getElementById("solution-wrapper");
    this.solutionBox = document.getElementById("solution");   // inner box
    this.factsWrapper = document.getElementById("facts-wrapper");
  }
  
  // ---------------------------------------------------------
  // Sound preload
  // ---------------------------------------------------------
  cacheSounds() {
    this.correctSound = new Audio("sounds/correct.mp3");
    this.correctSound.preload = "auto";
    this.correctSound.load();
    
    this.wrongSound = new Audio("sounds/wrong.mp3");
    this.wrongSound.preload = "auto";
    this.wrongSound.load();    
  }

  // ---------------------------------------------------------
  // Event binding
  // ---------------------------------------------------------
  bindEvents() {
    this.settingsForm.addEventListener("submit", e => {
      e.preventDefault();
      this.start();
    });

    this.answerForm.addEventListener("submit", e => {
      e.preventDefault();
      this.checkAnswer();
    });

    this.nextButton.addEventListener("click", () => this.next());

    // keyboard: right arrow = next (when visible)
    document.addEventListener("keydown", e => {
      if (e.key === "ArrowRight") {
        if (this.nextButton.style.display !== "none") {
          e.preventDefault();
          this.next();
        }
      }
    });
  }

  // ---------------------------------------------------------
  // Session control
  // ---------------------------------------------------------
  start() {
    this.max = parseInt(this.maxInput.value, 10);
    this.numTrials = parseInt(this.numTrialsInput.value, 10);

    this.currentTrial = 0;
    this.score = 0;

   // Show answer section again 
    this.answerSection.classList.remove("hidden");

    this.next();
  }

  next() {
    this.currentTrial++;

    if (this.currentTrial > this.numTrials) {
      return this.finish();
    }

    this.trialInfo.textContent = `${this.currentTrial} / ${this.numTrials}`;

    this.problem = this.operation.generate(this.max);
    
    // enable answer button 
    this.okButton.disabled = false;

    this.showProblemView();
    this.renderers.showProblem(this.problem);

    this.answerInput.value = "";
    this.answerInput.focus();
  }

  // ---------------------------------------------------------
  // Answer checking
  // ---------------------------------------------------------
  checkAnswer() {
    const value = parseInt(this.answerInput.value, 10);
    const correct = value === this.problem.result;
    
    // disable answer button 
    this.okButton.disabled = true;

    // clear previous colour on solution box
    this.solutionBox.classList.remove("solution-correct", "solution-wrong");

    if (correct) {
      this.score++;
      this.solutionBox.classList.add("solution-correct");
      this.playCorrectSound();
    } else {
      this.solutionBox.classList.add("solution-wrong");
      this.playWrongSound();
    }

    this.showSolutionView();
    this.renderers.showSolution(this.problem);

    const facts = this.operation.getFacts(this.problem);
    this.renderers.showFacts(facts);

    this.nextButton.style.display = "inline-block";
  }

  // ---------------------------------------------------------
  // End of session
  // ---------------------------------------------------------
  finish() {
    this.trialInfo.textContent = `${this.numTrials} / ${this.numTrials}`;

    // hide and clear facts
    this.factsWrapper.classList.add("hidden");
    this.renderers.facts.clear();

    // clear colour
    this.solutionBox.classList.remove("solution-correct", "solution-wrong");

    // clear the last typed answer
    this.answerInput.value = "";

    // Hide the entire answer section 
    this.answerSection.classList.add("hidden");

    this.showSolutionView();
    this.renderers.solution.renderFinalScore(this.score, this.numTrials);

    this.nextButton.style.display = "none";
  }

  // ---------------------------------------------------------
  // View switching
  // ---------------------------------------------------------
  showProblemView() {
    this.problemWrapper.classList.remove("hidden");
    this.solutionWrapper.classList.add("hidden");
    this.factsWrapper.classList.add("hidden");
    this.nextButton.style.display = "none";

    this.solutionBox.classList.remove("solution-correct", "solution-wrong");
  }

  showSolutionView() {
    this.problemWrapper.classList.add("hidden");
    this.solutionWrapper.classList.remove("hidden");
    this.factsWrapper.classList.remove("hidden");
  }

  // ---------------------------------------------------------
  // Sound helpers
  // ---------------------------------------------------------
  playCorrectSound() {
    if (document.getElementById("sound-enabled").checked) {
      this.correctSound.currentTime = 0; // rewind to start
      this.correctSound.play();
    }
  }

  playWrongSound() {
    if (document.getElementById("sound-enabled").checked) {
      this.wrongSound.currentTime = 0; // rewind to start
      this.wrongSound.play();
      // new Audio("sounds/wrong.mp3").play();
    }
  }
}

