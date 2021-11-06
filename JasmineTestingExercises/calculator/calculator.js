window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues()
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      
      let monthly= update();
      updateMonthly(monthly) 
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  // SB solution:
  // const values  = { amount: 10000, years: 10, rate: 4.5 };
  // const amountUI = document.getElementById("loan-amount");
  // amountUI.value = values.amount;
  // const yearsUI = document.getElementById("loan-years");
  // yearsUI.value = values.years;
  // const rateUI = document.getElementById("loan-rate");
  // rateUI.value = values.rate;
  // update();

  let amount=document.getElementById("loan-amount")
  let years=document.getElementById("loan-years")
  let rate=document.getElementById("loan-rate")
  amount.defaultValue=5
  years.defaultValue=2
  rate.defaultValue=10
  calculateMonthlyPayment({amount: +amount.value, years:+years.value, rate:+rate.value}) //"+" cast it to number
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  // SB solution:
  // const currentUIValues = getCurrentUIValues();
  // updateMonthly(calculateMonthlyPayment(currentUIValues));

  let currentValues=getCurrentUIValues()
  return calculateMonthlyPayment(currentValues)
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  // SB solution:
  // const monthlyRate = (values.rate / 100) / 12;
  // const n = Math.floor(values.years * 12);
  // return (
  //   (monthlyRate * values.amount) /
  //   (1 - Math.pow((1 + monthlyRate), -n))
  // ).toFixed(2);

  const {amount, years, rate}= values
  let monthlyPayment=(amount*((rate/100)/12))/ 1-Math.pow(1+((rate/100)/12), -(Math.floor(years*12)))
  return monthlyPayment.toFixed(2)
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  //SB:
  // const monthlyUI = document.getElementById("monthly-payment");
  // monthlyUI.innerText = "$" + monthly;
  
  let resultSpan=document.querySelector("#monthly-payment")
  resultSpan.innerText=monthly
}
