const reportProof = artifacts.require("reportProof");

module.exports = function (deployer,accounts) {
  deployer.deploy(reportProof,{from:accounts[0]});
};
