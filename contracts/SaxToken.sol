// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

 contract SaxToken {

uint public totalSupply;
string public name="SaxionToken";
string public symbol="Sax";

mapping(address=>uint256) public balanceOf;
mapping(address=>mapping(address=>uint256)) public allowance;

event Transfer(address indexed _from, address indexed _to, uint256 _value);
event Approval(address indexed _owner, address indexed _spender, uint256 _value);


constructor() public
{
  totalSupply=1000000;
  balanceOf[msg.sender]=totalSupply;
}

function transfer (address _to, uint256 _value) public returns (bool success)
{
  require(balanceOf[msg.sender]>=_value);
  balanceOf[_to]+=_value;
  balanceOf[msg.sender]-=_value;
   
   emit Transfer(msg.sender,_to,_value);

   return true;
}

function approve(address _spender, uint256 _value) public returns(bool success)
{
  allowance[msg.sender][_spender]=_value;
   
  emit Approval(msg.sender,_spender,_value);

  return true;
}

function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) 
{
  require(balanceOf[_from]>=_value,"The balance of _from is not enough");
  require(allowance[_from][msg.sender]>=_value,"You are not allowed to spend that amount from _from address");
  
  balanceOf[_from]-=_value;
  balanceOf[_to] +=_value;

  allowance[_from][msg.sender]-=_value;

  emit Transfer(_from,_to,_value);

  return true;

}


}