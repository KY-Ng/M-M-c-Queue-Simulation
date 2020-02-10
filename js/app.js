class QueueModel {
  constructor(model_params) {
    this.numCounter = model_params.numCounter;
    this.lambda = model_params.lambda;
    this.mu = model_params.mu;
  }
}

class Counter {
  constructor() {}
}

function createModel(params) {
  console.log("Update Model...");
  let newModel = new QueueModel(params);
  console.log(newModel);

  return newModel;
}

function simulate(model, numSteps) {
  console.log("Start Simulation...");

  // Initialize Counters
  let counters = []
  for (let n = 0; n < model.numCounter; n++) {
    counters[n] = new Counter();
  }

  for (let i = 0; i < numSteps; i++) {
    console.log(i);
  }
}
