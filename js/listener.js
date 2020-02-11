const numCounterInput = document.getElementById('numCounter');
const lambdaInput = document.getElementById('lambda');
const muInput = document.getElementById('mu');
const initialCustomerInput = document.getElementById('initial_customer');
const stepsInput = document.getElementById('steps');
const speedInput = document.getElementById('speed');
const startButton = document.getElementById('start_btn');
const resetButton = document.getElementById('reset_btn');

startButton.addEventListener('click', () => {
  let numCounter = parseInt(numCounterInput.value);
  let lambda = parseFloat(lambdaInput.value);
  let mu = parseFloat(muInput.value);

  let model = createModel({
    numCounter: numCounter,
    lambda: lambda,
    mu: mu
  })

  let initialCustomer = parseInt(initialCustomerInput.value);
  let steps = parseInt(stepsInput.value);
  let speed = parseInt(speedInput.value);
  simulate(model, initialCustomer, steps, speed);
});

resetButton.addEventListener('click', () => {
  removeChart(chart);
});
