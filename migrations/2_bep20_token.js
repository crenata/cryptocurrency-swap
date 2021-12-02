const BEP20Token = artifacts.require("BEP20Token");

module.exports = (deployer) => {
    deployer.deploy(BEP20Token);
};