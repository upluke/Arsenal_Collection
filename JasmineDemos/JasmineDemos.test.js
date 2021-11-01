it('should calculate lower-bracket taxes', function () {
    expect(calculateTaxes(10000)).toEqual(1500);
    expect(calculateTaxes(20000)).toEqual(3000);
  });
  
it('should calculate higher-bracket taxes', function () {
    expect(calculateTaxes(50000)).toEqual(12500);
    expect(calculateTaxes(80000)).toEqual(20000);
    expect(calculateTaxes(0)).toEqual(0)
  });

it('should remove duplicates from an array', function(){
    expect(removeDupes([1,1,2,2,3,3,4])).toEqual([1,2,3,4])
    expect(removeDupes([1,2,3])).toEqual([1,2,3])
})