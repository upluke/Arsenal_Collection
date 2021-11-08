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