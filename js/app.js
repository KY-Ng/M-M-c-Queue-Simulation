const ctx = document.getElementById('chart').getContext('2d');

// Calculation related to Queue Model
function factorial(n, next=1) {
  if (n === 0) {
    return next;
  } else {
    return factorial(n-1, n * next);
  }
}

function getInitialProb(k, lambda, mu) {
  return factorial(k-1) * (1 - lambda/(k*mu)) / Math.pow(k, k-1);
}

class QueueModel {
  constructor(model_params) {
    this.numCounter = model_params.numCounter;
    this.lambda = model_params.lambda;
    this.mu = model_params.mu;
    this.rho = model_params.lambda / model_params.mu;
    this.initialProb = getInitialProb(model_params.numCounter, model_params.lambda, model_params.mu);
  }

  getKProb(k, next=1) {
    if (k <= 0) {
      return next * this.initialProb;
    }
    return this.getKProb(k-1, (this.rho/k)*next);
  }

  getNProb(n) {
    if (n >= (this.numCounter - 1)) {
      // q_{n} = (\frac{\lambda}{k\mu})^{n}(1-\frac{\lambda}{k\mu})
      return Math.pow((this.rho / this.numCounter), n) * (1 - (this.rho / this.numCounter));
    } else {
      // use recursive
      return this.getKProb(n);
    }
  }
}

function createModel(params) {
  console.log("Creating Model...");
  // Create Model
  return new QueueModel(params);
}

function createChart(context, x, y1, y2) {
  return new Chart(context, {
    type: 'line',
    data: {
      labels: x,
      datasets: [{
        label: 'Number of Customer(s)',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        fill: false,
        data: y1,
        pointRadius: 2
      },
      {
        label: 'Length of Queue',
        backgroundColor: 'rgb(99, 200, 132)',
        borderColor: 'rgb(99, 200, 132)',
        fill: false,
        data: y2,
        pointRadius: 2
      }]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        position: 'top',
        text: 'Changes in Number of Customers and Length of Queue over time',
        fontSize: 16
      },
      legend: {
				position: 'bottom',
			},
      scales: {
				xAxes: [{
					display: true,
					scaleLabel: {
						display: true,
						labelString: 'Unit Time'
					}
				}],
				yAxes: [{
					display: true,
					scaleLabel: {
						display: true,
						labelString: 'Number of People'
					}
				}]
			},
      animation: {
            duration: 0 // general animation time
      }
    }
  })
}

function updateChart(chart, new_x, new_ys) {
  chart.data.labels = new_x;
  for (let n = 0; n < new_ys.length; n++) {
    chart.data.datasets[n].data = new_ys[n];
  }
  chart.update();
}

function resetChart(context) {
  createChart(context, [0], [0], [0]);
}

function simulate(model, numSteps, delay) {
  console.log("Start Simulation...");
  // Start Simulation
  // Variables for Graph plotting
  let x = [0];
  let numCustomer = [0];
  let queueLength = [0];
  // Show initial graph
  let chart = createChart(ctx, x, numCustomer, queueLength);

  // Varibles
  let counterInUse = 0;

  for (let idx = 1; idx <= numSteps; idx++) {
    setTimeout(() => {
      // get previous number of customer and number of counters in use
      let nextCustomerNum = numCustomer[idx - 1];
      let currentCounterInUse = counterInUse;
      // console.log({
      //   time: idx,
      //   currentNum: nextCustomerNum,
      //   usedCounters: currentCounterInUse,
      //   increaseProb: model.getNProb(nextCustomerNum + 1),
      //   decreaseProb: model.getNProb(nextCustomerNum - 1)
      // });
      // loop through each counter and see if they finished providing service
      for (let c = 0; c < currentCounterInUse; c++) {
        // provide service
        if (Math.random() < model.getNProb(nextCustomerNum - 1)) {
          nextCustomerNum--;
          counterInUse--;
        }
      }
      // add new customer
      if (Math.random() < model.getNProb(nextCustomerNum + 1)) {
        nextCustomerNum++;
      }
      // assign customer to counters
      if (nextCustomerNum > model.numCounter) {
        counterInUse = model.numCounter;
      } else {
        counterInUse = nextCustomerNum;
      }
      // if (counterInUse === 0) {
      //   for (let c = 0; c < model.numCounter; c++) {
      //     // customers are waiting, so assign
      //     if (nextCustomerNum > counterInUse) {
      //       counterInUse++;
      //     }
      //   }
      // }
      // update x
      x.push(idx)
      // update numCustomer & queueLength
      numCustomer.push(nextCustomerNum);
      queueLength.push(nextCustomerNum - counterInUse);
      // update graph
      updateChart(chart, x, [numCustomer, queueLength]);
    }, delay*idx);
  }
}
