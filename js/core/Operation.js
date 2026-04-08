export class Operation {
  /**
   * Generate a new Problem instance.
   * Must return: new Problem(a, b, operator, result)
   */
  generate(max) {
    throw new Error("Operation.generate(max) must be implemented by subclass");
  }

  /**
   * Return an array of fact rows.
   * Each row is an array of parts: [number, operator, number, operator, number]
   */
  getFacts(problem) {
    throw new Error("Operation.getFacts(problem) must be implemented by subclass");
  }
}

