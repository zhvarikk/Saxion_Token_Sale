pragma solidity >=0.4.22 <0.8.0;
import "./SaxToken.sol";

contract SaxTokenSale{

address payable admin; //external address which is in charge of our token sale
SaxToken public tokenContract;
uint public tokenPrice;
uint public tokensSold=0;


event Sell(address _buyer,uint256 _numberOfTokens);

constructor(SaxToken _tokenContract, uint _tokenPrice) public
{
   
   admin=msg.sender;
   tokenContract=_tokenContract;
   tokenPrice=_tokenPrice;
}

function multiply(uint x, uint y) internal pure returns (uint z) {
        require(y == 0 || (z = x * y) / y == x);
    }

function buyTokens(uint256 _numberOfTokens) public payable
{
  require(msg.value==multiply(_numberOfTokens,tokenPrice));
  require(tokenContract.balanceOf(address(this))>=_numberOfTokens);
  require(tokenContract.transfer(msg.sender,_numberOfTokens));

  tokensSold+=_numberOfTokens;

  emit Sell(msg.sender,_numberOfTokens);
}

function endSale() public
{
    require(msg.sender==admin);
    require(tokenContract.transfer(admin,tokenContract.balanceOf(address(this))));
    selfdestruct(admin);
}



}