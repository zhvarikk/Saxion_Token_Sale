var SaxToken = artifacts.require("./SaxToken.sol");

contract('SaxToken',function(accounts){

    var token;

    it('should have the correct initials', function()
    {
        return SaxToken.deployed().then(function(t)
        {
            token=t;
            return token.name() 
        }).then(function(name)
        {
            assert.equal(name,"SaxionToken","name is SaxionToken");
            return token.symbol()
        }).then(function (symbol)
        {
          assert.equal(symbol,"Sax", "The symbol of the token should be Sax");
        })
    });

     it('transfers correctly',function()
    {
        return SaxToken.deployed().then(function(t){
            token=t
            return token.transfer(accounts[1],250000,{ from: accounts[0] });

        }).then(function(receipt)
        {
            return token.balanceOf(accounts[1]);
        }).then(function(balance)
        {
            assert.equal(balance,250000,"balance should be equalled 250,000")
        })
    });

    it('sets the totalSupply to the first account', function()
    {
        return SaxToken.deployed().then(function(t2)
            {
                token=t2;
            return token.balanceOf(accounts[0])
        }).then(function(adminBalance)
        {
           assert.equal(adminBalance,750000,'adminBalance should equal 1,000,000');
        })
    });



it('should make the totaL supply of SaxToken equal 1,000,000',function(){
SaxToken.deployed().then(function(token){return token.totalSupply();}).then(function(tokenSupply)
{
 assert.equal(tokenSupply,1000000,'The token supply should be equalled 1,000,000');
});

});

it("should allow sender to transact certain amount",function()
{
    return SaxToken.deployed().then(function(t)
    {
        token=t;
        return token.approve(accounts[1],100,{from:accounts[0]});
    }).then(function(receipt)
    {
     return token.allowance(accounts[0],accounts[1]);
    }).then(function(allowance)
    {
        assert.equal(allowance,100,"Account[0] allows account[1] to spend 100 on his behalf");
    })
});

it("checks transferFrom function",function()
{
    return SaxToken.deployed().then(function(t){
        token=t;
        return token.transferFrom(accounts[0],accounts[2],100,{ from:accounts[1] }).then(function(receipt)
        {
            return token.balanceOf(accounts[2]);
        }).then(function(balance)
        {
            assert.equal(balance,100,"The balance of second account is 100");
            return token.allowance(accounts[0],accounts[1]);
        }).then(function(amountOfAllowance)
        {
            assert.equal(amountOfAllowance,0,"The allowance should be 0");
        })
    })
});

})