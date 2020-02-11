const numCounterInput = document.getElementById('numCounter');
const lambdaInput = document.getElementById('lambda');
const muInput = document.getElementById('mu');
const initialCustomerInput = document.getElementById('initial_customer');
const stepsInput = document.getElementById('steps');
const speedInput = document.getElementById('speed');
const conditionText = document.getElementById('conditionText');
const startButton = document.getElementById('start_btn');

startButton.addEventListener('click', () => {
  let numCounter = parseInt(numCounterInput.value);
  let lambda = parseFloat(lambdaInput.value);
  let mu = parseFloat(muInput.value);

  if ((1 - (lambda/(numCounter*mu))) < 0) {
    console.error("Invalid Paramters");
    conditionText.style.color = "#F00";
  } else {
    conditionText.style.color = "#000";
    let model = createModel({
      numCounter: numCounter,
      lambda: lambda,
      mu: mu
    })

    let initialCustomer = parseInt(initialCustomerInput.value);
    let steps = parseInt(stepsInput.value);
    let speed = parseInt(speedInput.value);
    simulate(model, initialCustomer, steps, speed);
  }
});
