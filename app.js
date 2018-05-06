let submit = document.querySelector('#loan-form');
// event listener
submit.addEventListener('submit', function(e){
  // show loader
  document.querySelector('.loading').style.display = 'block';
  document.querySelector('.result').style.display = 'none';
  setTimeout(calculateLoan, 2000);
  e.preventDefault();
});

// calculate loan
function calculateLoan(e){
  // input var
  let amount = document.querySelector('.amount');
  let interest = document.querySelector('.interest');
  let years = document.querySelector('.years');
  // result var
  let monthlyPayment = document.querySelector('.monthly-payment');
  let totalPayment = document.querySelector('.total-payment');
  let totalInterest = document.querySelector('.total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Monthly Payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest)/(x-1);

  if(isFinite(monthly)){
    document.querySelector('.loading').style.display = 'none';
    document.querySelector('.result').style.display = 'block';
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value  = ((monthly * calculatedPayments) - principal).toFixed(2);
  }else{
    showError('Please check your numbers');
    document.querySelector('.loading').style.display = 'none';
    document.querySelector('.result').style.display = 'none';
  }


}

// Show error
function showError(error){
  // create div
  let errorDiv = document.createElement('div');
  // add class
  errorDiv.className = 'alert alert-danger';
  // create text node and append to the error div
  errorDiv.appendChild(document.createTextNode(error));

  let card = document.querySelector('.card');
  let heading =  document.querySelector('.heading');

  // insert error div in card before heading element
  card.insertBefore(errorDiv, heading);
  
  //clear error after 3 secs
  setTimeout(clearError, 3000);
}

// clear error
function clearError(){
  document.querySelector('.alert').remove();
}
