const ctx = document.getElementById('chart').getContext('2d');

class QueueModel {
  constructor(model_params) {
    this.numCounter = model_params.numCounter;
    this.lambda = model_params.lambda;
    this.mu = model_params.mu;
  }
}

function createModel(params) {
  console.log("Creating Model...");
  // Create Model
  return new QueueModel(params);
}

function simulate(model, numSteps, delay) {
  console.log("Start Simulation...");
  console.log(delay);
  // Start Simulation
  // Variables for Graph plotting
  let x = [0];
  let numCustomer = [0];
  let queueLength = [0];
  // Show initial graph
  let chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: x,
      datasets: [{
        label: 'Number of Customer(s)',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        fill: false,
        data: numCustomer
      },
      {
        label: 'Length of Queue',
        backgroundColor: 'rgb(99, 200, 132)',
        borderColor: 'rgb(99, 200, 132)',
        fill: false,
        data: queueLength
      }]
    },
    options: {
      animation: {
            duration: 0 // general animation time
        }
    }
  })

  // Varibles
  let counterInUse = 0;

  for (let idx = 1; idx <= numSteps; idx++) {
    setTimeout(() => {
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
      chart.data.labels = x;
      chart.data.datasets[0].data = numCustomer;
      chart.data.datasets[1].data = queueLength;
      chart.update();
    }, delay*idx);
  }
}
