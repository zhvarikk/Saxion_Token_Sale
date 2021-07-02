var SaxTokenSale = artifacts.require("./SaxTokenSale.sol");
var SaxToken =artifacts.require("./SaxToken.sol");

contract('SaxTokenSale',function(accounts){

	 var token;
  var tokenSale;
  var admin = accounts[0];
  var buyer = accounts[1];
  var tokenPrice = 1000000000000000; // in wei
  var tokensAvailable = 750000;
  var numberOfTokens;

	

it("is connected to the token contract", function()
{
	return SaxTokenSale.deployed().then(function(t)
{
	tokenSale=t;
	return tokenSale.tokenContract();
}).then(function(tokenContract){
  assert.notEqual(tokenContract,0x0,"tokenContract should have address");
});
});

it("has the correct token price", function()
{
	return SaxTokenSale.deployed().then(function(t)
	{
		tokenSale=t;
		return tokenSale.tokenPrice();
	}).then(function(price)
	{
		assert.equal(price,1000000000000000,"The price is 0,01 ETH");
	})
})

/*it("enables to buy tokens", function()
{
	return SaxToken.deployed().then(function(t)
	{
		token=t;
		return token.transfer(tokenSale.address,1000,{ from:accounts[0] });
	}).then(function(receipt)
	{
		
		return SaxTokenSale.deployed().then(function(t){
     tokenSale=t;
     numberOfTokens=1000;
    return tokenSale.buyTokens(numberOfTokens, { from:accounts[3], value: numberOfTokens*tokenPrice});
		}).then(function(receipt)
	{
		return token.balanceOf(accounts[3]);
	}).then(function(balance)
	{
     assert.equal(balance,1000,"Account 3 has 1000 tokens");
     return tokenSale.tokenPrice();
	}).then(function(price)
	{
		assert.equal(price,1000000000000000,"");
	})
	
});

});*/



it("is correct in terms of tokensSold", function()
{
  return SaxToken.deployed().then(function(t)
  {
    token=t;
    return token.transfer(tokenSale.address,501,{ from:accounts[0] });
  }).then(function(receipt)
  {
    return SaxTokenSale.deployed().then(function(t){
     tokenSale=t;
     numberOfTokens=501;
    return tokenSale.buyTokens(numberOfTokens, { from:accounts[3], value: numberOfTokens*tokenPrice});
    }).then(function(receipt)
  {
    return tokenSale.tokensSold();
  }).then(function(ts)
  {
    assert.equal(ts,501, tokenSale.tokensSold());
  })
});

});

})






