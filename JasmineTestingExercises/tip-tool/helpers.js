
// accepts 'tipAmt', 'billAmt', 'tipPercent' as type and sums total from allPayments objects
function sumPaymentTotal(type) {
  let total = 0;

  for (let key in allPayments) {//eg:  "key:  payment1"
    let payment = allPayments[key];

    total += Number(payment[type]); // eg: payment1: {billAmt: '4', tipAmt: '2', tipPercent: 50}
  }
  console.log("total is here", total, "type: ", type)
  return total;
}

// converts the bill and tip amount into a tip percent
function calculateTipPercent(billAmt, tipAmt) {
  return Math.round(100 / (billAmt / tipAmt));
}

// expects a table row element, appends a newly created td element from the value
function appendTd(tr, value) {
  let newTd = document.createElement('td');
  newTd.innerText = value;

  tr.append(newTd);
}

// append delete button and click handler for removing server from allServers and DOM td
function appendDeleteBtn(tr, type) {
  let newTd = document.createElement('td');
  newTd.className = 'deleteBtn';
  newTd.innerText = 'X';

  newTd.addEventListener('click', removeEle);

  tr.append(newTd);
}


function removeEle(evt) {
  let ele = evt.target.closest('tr');

  delete allServers[ele.id];

  ele.parentNode.removeChild(ele);
  updateServerTable();
}