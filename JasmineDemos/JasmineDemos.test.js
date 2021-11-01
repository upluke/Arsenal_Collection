describe('calculateTaxes tests', function(){
    it('should calculate lower-bracket taxes', function () {
        expect(calculateTaxes(10000)).toEqual(1500);
        expect(calculateTaxes(20000)).toEqual(3000);
      });
      
    it('should calculate higher-bracket taxes', function () {
        expect(calculateTaxes(50000)).toEqual(12500);
        expect(calculateTaxes(80000)).toEqual(20000);
        expect(calculateTaxes(0)).toEqual(0)
      });
    
    it('should reject invalid incomes', function () {
        expect(()=>calculateTaxes('slkdfjskldfj')).toThrowError();
        expect(()=>calculateTaxes([])).toThrowError();
        expect(()=>calculateTaxes(true)).toThrowError();
      });
})

describe('removeDupes tests', function(){
    it('should remove duplicates from an array', function(){
        expect(removeDupes([1,1,2,2,3,3,4])).toEqual([1,2,3,4])
        expect(removeDupes([1,2,3])).toEqual([1,2,3])
        expect(removeDupes([1,2,3])).toBeInstanceOf(Array)
    })
    
    it('should remove duplicates from a string', function(){
        expect(removeDupes( 'hello')).toEqual('helo')
        expect(removeDupes('hello')).toBeInstanceOf(String)
    })
})

describe('remove tests', function(){
    it('should remove value from array', function(){
        expect(remove([1,2,3,4,5,6],4)).not.toContain([4])
    })
})


describe('submitForm() tests', ()=>{
    it('saves input val to usernames array',()=>{
        input.value='jacket'
        submitForm()
        expect(usernames.length).toBe(1)
        expect(usernames).toContain('jacket')
    })
    it('test if afterEach cleanup function (bellow) works',()=>{
        input.value='test'
        submitForm()
        // after submit it length should be still 1 instead of 2 because afterEach resets, 
        expect(usernames.length).toBe(1)
     
    }) 
})

// cleanup
afterEach(function(){
    input.value=''
    usernames=[]
})