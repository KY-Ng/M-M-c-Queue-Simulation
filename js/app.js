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
  console.log("Creating Model...");
  // Create Model
  return new QueueModel(params);
}

function simulate(model, numSteps) {

  // Initialize Counters
  let counters = []
  for (let n = 0; n < model.numCounter; n++) {
    counters[n] = new Counter();
  }

  console.log("Start Simulation...");
  // Start Simulation
  for (let i = 0; i < numSteps; i++) {
    console.log(i);
    // add new customer
    // provide service
  }
}
