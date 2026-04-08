import { ProblemRenderer } from "../renderers/ProblemRenderer.js";
import { SolutionRenderer } from "../renderers/SolutionRenderer.js";
import { FactsRenderer } from "../renderers/FactsRenderer.js";

export class RendererManager {
  constructor() {
    this.problem = new ProblemRenderer("problem");
    this.solution = new SolutionRenderer("solution");
    this.facts = new FactsRenderer("facts");
  }

  showProblem(problem) {
    this.problem.render(problem.a, problem.operator, problem.b, "=", null);
  }

  showSolution(problem) {
    this.solution.render(problem.a, problem.operator, problem.b, "=", problem.result);
  }

  showFacts(factsRows) {
    this.facts.render(factsRows);
  }
}

