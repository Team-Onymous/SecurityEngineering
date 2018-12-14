let oNyCoin = artifacts.require("./oNyCoin.sol");

module.exports = function(deployer) {
  deployer.deploy(oNyCoin);
};
