// Step Two: Test the remainder of the app
// Repeat the process from step one for payments.js and helpers.js

// Create a helpers.test.js file and test each function in helpers.js
// Create a payments.test.js file and test each function in payments.js
// When finished you should have three .test.js files one for each .js file

describe('helpers tests', function(){
    beforeEach(function(){
        allPayments={payment1: {billAmt: '4', tipAmt: '2', tipPercent: 50}}
    })
    it('should return a total number on sumPaymentTotal', function(){
        expect(sumPaymentTotal('tipAmt')).toEqual(2)
        expect(sumPaymentTotal('billAmt')).toEqual(4)
        expect(sumPaymentTotal('tipPercent')).toEqual(50) 
    })

     


    afterEach(function(){
        allPayments={}
    })

})