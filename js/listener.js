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

// const ctx = document.getElementById('chart').getContext('2d');
// let chart = new Chart(ctx, {
//     // The type of chart we want to create
//     type: 'line',
//
//     // The data for our dataset
//     data: {
//         labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//         datasets: [{
//             label: 'My First dataset',
//             backgroundColor: 'rgb(255, 99, 132)',
//             borderColor: 'rgb(255, 99, 132)',
//             data: [0, 10, 5, 2, 20, 30, 45]
//         }]
//     },
//
//     // Configuration options go here
//     options: {}
// });
