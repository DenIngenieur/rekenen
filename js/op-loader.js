import { ExerciseController } from "./core/ExerciseController.js";

let loadedOperation = null;

export function registerOperation(opInstance) {
  loadedOperation = opInstance;
}

function getOperationName() {
  const params = new URLSearchParams(window.location.search);
  return params.get("op") || "plus";
}

const opName = getOperationName();

import(`./operations/${opName}.js`)
  .then(() => {
    if (!loadedOperation) {
      throw new Error(`Operation '${opName}' did not register itself.`);
    }

    new ExerciseController(loadedOperation);
  })
  .catch(err => {
    console.error("Failed to load operation:", err);
    alert("Error loading operation. Check console for details.");
  });

