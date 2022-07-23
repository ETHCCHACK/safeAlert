const Migrations = artifacts.require("safeAlert");

module.exports = function (deployer,accounts) {
  deployer.deploy(Migrations,{from:accounts[0]});
};
