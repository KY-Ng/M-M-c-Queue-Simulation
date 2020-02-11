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
  // Variables for Graph plotting
  let x = [0];
  let numCustomer = [0];
  let queueLength = [0];
  // Varibles
  let counterInUse = 0;

  for (let idx = 1; idx <= numSteps; idx++) {
    console.log(idx, numCustomer[idx - 1], queueLength[idx - 1]);
    // get previous number of customer and number of counters in use
    let nextCustomerNum = numCustomer[idx - 1];
    let currentCounterInUse = counterInUse;
    // loop through each counter and see if they finished providing service
    for (let c = 0; c < currentCounterInUse; c++) {
      // provide service
      if (Math.random() < model.mu) {
        nextCustomerNum--;
        counterInUse--;
      }
    }
    // add new customer
    if (Math.random() < model.lambda) {
      nextCustomerNum++;
      // counter is empty
      if (counterInUse < model.numCounter) {
        counterInUse++;
      }
    }
    // assign customer to counters
    if (counterInUse === 0) {
      for (let c = 0; c < model.numCounter; c++) {
        // customers are waiting, so assign
        if (nextCustomerNum > counterInUse) {
          counterInUse++;
        }
      }
    }
    // update x
    x.push(idx)
    // update numCustomer & queueLength
    numCustomer.push(nextCustomerNum);
    queueLength.push(nextCustomerNum - counterInUse);
    // update graph
  }
}
