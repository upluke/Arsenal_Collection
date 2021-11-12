// Step Two: Test the remainder of the app
// Repeat the process from step one for payments.js and helpers.js

// Create a helpers.test.js file and test each function in helpers.js
// Create a payments.test.js file and test each function in payments.js
// When finished you should have three .test.js files one for each .js file

describe("Utilities test (with setup and tear-down)", function() {
    beforeEach(function () {
      billAmtInput.value = 100;
      tipAmtInput.value = 20;
      submitPaymentInfo();
    });
  
    it('should sum total tip amount of all payments on sumPaymentTotal()', function () {
      expect(sumPaymentTotal('tipAmt')).toEqual(20);
  
      billAmtInput.value = 200;
      tipAmtInput.value = 40;
  
      submitPaymentInfo();
  
      expect(sumPaymentTotal('tipAmt')).toEqual(60);
    });
  
    it('should sum total bill amount of all payments on sumPaymentTotal()', function () {
      expect(sumPaymentTotal('billAmt')).toEqual(100);
  
      billAmtInput.value = 200;
      tipAmtInput.value = 40;
  
      submitPaymentInfo();
  
      expect(sumPaymentTotal('billAmt')).toEqual(300);
    });
  
    it('should sum total tip percent on sumPaymentTotal()', function () {
      expect(sumPaymentTotal('tipPercent')).toEqual(20);
  
      billAmtInput.value = 100;
      tipAmtInput.value = 20;
  
      submitPaymentInfo();
  
      expect(sumPaymentTotal('tipPercent')).toEqual(40);
    });
  
    it('should sum tip percent of a single tip on calculateTipPercent()', function () {
      expect(calculateTipPercent(100, 23)).toEqual(23);
      expect(calculateTipPercent(111, 11)).toEqual(10);
    });

    it('should generate new td from value and append to tr on appendTd(tr, value)', function () {
      let newTr = document.createElement('tr');
  
      appendTd(newTr, 'test');
  
      expect(newTr.children.length).toEqual(1);
      expect(newTr.firstChild.innerHTML).toEqual('test');
    });

  
    it('should generate delete td and append to tr on appendDeleteBtn(tr, type)', function () {
      let newTr = document.createElement('tr');
  
      appendDeleteBtn(newTr);
  
      expect(newTr.children.length).toEqual(1);
      expect(newTr.firstChild.innerHTML).toEqual('X');
    });
    
  
    afterEach(function() {
      billAmtInput.value = '';
      tipAmtInput.value = '';
      paymentTbody.innerHTML = '';
      summaryTds[0].innerHTML = '';
      summaryTds[1].innerHTML = '';
      summaryTds[2].innerHTML = '';
      serverTbody.innerHTML = '';
      allPayments = {};
      paymentId = 0;
    });
  });


// init:
// describe('helpers tests', function(){
//     beforeEach(function(){
//         allPayments={payment1: {billAmt: '4', tipAmt: '2', tipPercent: 50}}
//         newTr = document.createElement('tr');
//         value='test'
//     })
//     it('should return a total number on sumPaymentTotal', function(){
//         expect(sumPaymentTotal('tipAmt')).toEqual(2)
//         expect(sumPaymentTotal('billAmt')).toEqual(4)
//         expect(sumPaymentTotal('tipPercent')).toEqual(50) 
//     })

//     it('should calculate tipe percent on calculateTipPercent()', function(){
//         expect(calculateTipPercent(allPayments.payment1.billAmt, allPayments.payment1.tipAmt)).toEqual(50)
//     }) 

//     it('should append Td', function(){
//         appendTd(newTr, value)
//         expect(paymentTbody.childElementCount).toEqual(1)
//     })

//     it('should generate new td from value from value and append to tr',function(){
//      let newTr=document.createElement('tr')
// .    appendDeleteBtn(newTr, 'any')
// .    expect(newTr.classList.contains('deleteBtn')).toEqual(true)
//    })

//     afterEach(function(){
//         allPayments={}
//         paymentTbody.innerHTML=''
//     })

// })