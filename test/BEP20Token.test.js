/* eslint-disable no-undef */
const BEP20Token = artifacts.require("BEP20Token");
contract(BEP20Token.contractName, (accounts) => {
    before(async () => {
        this.owner = accounts[0];
        this.token = await BEP20Token.deployed();
        this.name = "Kaytrin";
        this.symbol = "KTR";
        this.decimals = 18;
        this.totalSupply = 1000000 * 10 ** 18;
    });

    describe("Init", () => {
        it("Contract has been deployed successfully", async () => {
            let address = await this.token.address;
            assert.notEqual(address, 0x0);
            assert.notEqual(address, null);
            assert.notEqual(address, undefined);
            assert.notEqual(address, "");
            assert.equal(address.length, 42);
        });
        it("Has the correct name", async () => {
            let name = await this.token.name();
            assert.equal(name, this.name);
        });
        it("Has the correct symbol", async () => {
            let symbol = await this.token.symbol();
            assert.equal(symbol, this.symbol);
        });
        it("Has the correct decimals", async () => {
            let decimals = await this.token.decimals();
            assert.equal(decimals.toNumber(), this.decimals);
        });
        it("Has the correct total supply", async () => {
            let totalSupply = await this.token.totalSupply();
            assert.equal(parseInt(totalSupply.toString()), this.totalSupply);
        });
        it("Owner own all of total supply at the first time", async () => {
            let balanceOf = await this.token.balanceOf(this.owner);
            assert.equal(parseInt(balanceOf.toString()), this.totalSupply);
        });
    });
});