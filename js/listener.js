const numCounterInput = document.getElementById('numCounter')
const lambdaInput = document.getElementById('lambda')
const muInput = document.getElementById('mu')
const stepsInput = document.getElementById('steps')
const startButton = document.getElementById('start_btn')

startButton.addEventListener('click', () => {
  console.log('clicked');
  let model = createModel({
    numCounter: parseInt(numCounterInput.value),
    lambda: parseFloat(lambdaInput.value),
    mu: parseFloat(muInput.value)
  })
  simulate(model, parseInt(stepsInput.value));
})
