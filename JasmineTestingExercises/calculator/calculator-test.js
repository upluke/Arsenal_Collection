
it('should calculate the monthly rate correctly', function () {
  let values={amount: 3000, years:2, rate:10}
  expect(calculateMonthlyPayment(values)).toEqual('24.18')
});


it("should return a result with 2 decimal places", function() {
  let values={amount: 2000, years:2, rate:10}
  expect(calculateMonthlyPayment(values)).toEqual('15.85')
});

/// etc
