const SaxToken = artifacts.require("./SaxToken.sol");
const SaxTokenSale = artifacts.require("./SaxTokenSale.sol");

module.exports = function (deployer) {
  deployer.deploy(SaxToken).then(function()
  {
    var tokenPrice=1000000000000000;
    return deployer.deploy(SaxTokenSale,SaxToken.address,tokenPrice);
  });
};