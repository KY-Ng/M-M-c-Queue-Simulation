const numCounterInput = document.getElementById('numCounter');
const lambdaInput = document.getElementById('lambda');
const muInput = document.getElementById('mu');
const stepsInput = document.getElementById('steps');
const speedInput = document.getElementById('speed');
const startButton = document.getElementById('start_btn');
const resetButton = document.getElementById('reset_btn');

startButton.addEventListener('click', () => {
  let model = createModel({
    numCounter: parseInt(numCounterInput.value),
    lambda: parseFloat(lambdaInput.value),
    mu: parseFloat(muInput.value)
  })

  let speed = parseInt(speedInput.value);
  let steps = parseInt(stepsInput.value);
  simulate(model, steps, speed);
});

resetButton.addEventListener('click', () => {
  resetChart(ctx);
});
