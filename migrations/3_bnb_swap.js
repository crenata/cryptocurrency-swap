const BEP20Token = artifacts.require("BEP20Token");
const BNBSwap = artifacts.require("BNBSwap");

module.exports = async (deployer, network, accounts) => {
    await deployer.deploy(BNBSwap, BEP20Token.address);
    this.owner = accounts[0];
    this.bnbSwap = await BNBSwap.deployed();
    this.token = await BEP20Token.deployed();
    // await this.token.transfer(this.bnbSwap.address, await this.token.balanceOf(this.owner));
};