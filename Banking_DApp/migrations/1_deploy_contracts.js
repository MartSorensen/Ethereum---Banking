const ConvertLib = artifacts.require("ConvertLib");
const Banking = artifacts.require("Banking");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, Banking);
  deployer.deploy(Banking);
};
