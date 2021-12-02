/* eslint-disable no-undef */
const BEP20Token = artifacts.require("BEP20Token");
const BNBSwap = artifacts.require("BNBSwap");
const Revert = require("./helpers/Revert");
contract(BNBSwap.contractName, (accounts) => {
    before(async () => {
        this.owner = accounts[0];
        this.buyer = accounts[1];
        this.token = await BEP20Token.deployed();
        this.bnbSwap = await BNBSwap.deployed();
        this.name = "BNB Swap Instant Exchange";
        this.rate = 100;
    });

    describe("Init", () => {
        it("Contract has been deployed successfully", async () => {
            let address = await this.bnbSwap.address;
            assert.notEqual(address, 0x0);
            assert.notEqual(address, null);
            assert.notEqual(address, undefined);
            assert.notEqual(address, "");
            assert.equal(address.length, 42);
        });
        it("Has the correct name", async () => {
            let name = await this.bnbSwap.name();
            assert.equal(name, this.name);
        });
        describe("Transfers tokens to the contract", () => {
            before(async () => {
                this.receipt = null;
                this.ownerBalance = await this.token.balanceOf(this.owner);
                this.amountToTransfer = this.ownerBalance.toString();
            });
            it("Transfer", async () => {
                this.receipt = await this.token.transfer(this.bnbSwap.address, this.amountToTransfer, {
                    from: this.owner
                });
                assert.notEqual(this.receipt, null);
            });
            it("Sender's balance should decreased", async () => {
                let balanceOf = await this.token.balanceOf(this.owner);
                assert.equal(balanceOf.toString(), parseInt(this.ownerBalance.toString()) - parseInt(this.amountToTransfer));
            });
            it("Receiver's balance should increased", async () => {
                let balanceOf = await this.token.balanceOf(this.bnbSwap.address);
                assert.equal(balanceOf.toString(), this.amountToTransfer);
            });
            describe("Event check", () => {
                it("Triggers one event", async () => {
                    assert.equal(this.receipt.logs.length, 1);
                });
                it("Should be the `Transfer` event", async () => {
                    assert.equal(this.receipt.logs[0].event, "Transfer");
                });
                it("Has the correct `from` argument", async () => {
                    assert.equal(this.receipt.logs[0].args.from, this.owner);
                });
                it("Has the correct `to` argument", async () => {
                    assert.equal(this.receipt.logs[0].args.to, this.bnbSwap.address);
                });
                it("Has the correct `value` argument", async () => {
                    assert.equal(this.receipt.logs[0].args.value, this.amountToTransfer);
                });
            });
        });
    });

    describe("Buy Tokens", () => {
        before(async () => {
            this.receipt = null;
            this.buyerETHBalance = await web3.eth.getBalance(this.buyer);
            this.amountToPurchase = web3.utils.toWei("1", "ether");
        });
        it("Should can't buy tokens larger than available", async () => {
            await Revert(async () => {
                let bnbSwapBalance = await this.token.balanceOf(this.bnbSwap.address);
                await this.bnbSwap.buyTokens({
                    from: this.buyer,
                    value: web3.utils.toWei(((parseInt(web3.utils.fromWei(bnbSwapBalance, "ether")) / this.rate) + 1).toString(), "ether")
                });
            });
        });
        it("Allows user to instantly purchase tokens from BNB swap for a fixed price", async () => {
            this.receipt = await this.bnbSwap.buyTokens({
                from: this.buyer,
                value: this.amountToPurchase
            });
            assert.notEqual(this.receipt, null);
        });
        it("Buyer's ETH balance should decreased", async () => {
            let balance = await web3.eth.getBalance(this.buyer);
            assert.isBelow(parseInt(balance), parseInt(this.buyerETHBalance) - parseInt(this.amountToPurchase));
        });
        it("BNBSwap's ETH balance should increased", async () => {
            let balance = await web3.eth.getBalance(this.bnbSwap.address);
            assert.equal(parseInt(balance), parseInt(this.amountToPurchase));
        });
        it("Buyer's should received the tokens", async () => {
            let balance = await this.token.balanceOf(this.buyer);
            assert.equal(parseInt(balance.toString()), parseInt(this.amountToPurchase) * this.rate);
        });
        it("BNBSwap tokens balance should decreased", async () => {
            let balance = await this.token.balanceOf(this.bnbSwap.address);
            assert.equal(parseInt(balance), parseInt(this.amountToTransfer) - (parseInt(this.amountToPurchase) * this.rate));
        });
        describe("Event check", () => {
            it("Triggers one event", async () => {
                assert.equal(this.receipt.logs.length, 1);
            });
            it("Should be the `TokensPurchased` event", async () => {
                assert.equal(this.receipt.logs[0].event, "TokensPurchased");
            });
            it("Has the correct `account` argument", async () => {
                assert.equal(this.receipt.logs[0].args.account, this.buyer);
            });
            it("Has the correct `token` argument", async () => {
                assert.equal(this.receipt.logs[0].args.token, this.token.address);
            });
            it("Has the correct `amount` argument", async () => {
                assert.equal(this.receipt.logs[0].args.amount, parseInt(this.amountToPurchase) * this.rate);
            });
            it("Has the correct `rate` argument", async () => {
                assert.equal(this.receipt.logs[0].args.rate, this.rate);
            });
        });
    });

    describe("Sell Tokens", () => {
        before(async () => {
            this.receipt = null;
            this.buyerTokenBalance = await this.token.balanceOf(this.buyer);
            this.bnbSwapTokenBalance = await this.token.balanceOf(this.bnbSwap.address);
        });
        it("Should can't sell tokens without approve the tokens first", async () => {
            await Revert(async () => {
                await this.bnbSwap.sellTokens(this.buyerTokenBalance, {
                    from: this.buyer
                });
            });
        });
        it("Approve the token for BNB swap", async () => {
            this.receipt = await this.token.approve(this.bnbSwap.address, this.buyerTokenBalance.toString(), {
                from: this.buyer
            });
            assert.notEqual(this.receipt, null);
        });
        describe("Event check", () => {
            it("Triggers one event", async () => {
                assert.equal(this.receipt.logs.length, 1);
            });
            it("Should be the `Approval` event", async () => {
                assert.equal(this.receipt.logs[0].event, "Approval");
            });
            it("Has the correct `owner` argument", async () => {
                assert.equal(this.receipt.logs[0].args.owner, this.buyer);
            });
            it("Has the correct `spender` argument", async () => {
                assert.equal(this.receipt.logs[0].args.spender, this.bnbSwap.address);
            });
            it("Has the correct `value` argument", async () => {
                assert.equal(this.receipt.logs[0].args.value, this.buyerTokenBalance.toString());
            });
        });
        describe("Returns to `Sell Tokens` section", () => {
            before(async () => {
                this.receipt = null;
                this.buyerETHBalance = await web3.eth.getBalance(this.buyer);
                this.bnbSwapETHBalance = await web3.eth.getBalance(this.bnbSwap.address);
            });
            it("Should can't sell tokens larger than they have", async () => {
                await Revert(async () => {
                    await this.bnbSwap.sellTokens(web3.utils.toWei((web3.utils.fromWei(this.buyerTokenBalance, "ether") + 1).toString(), "ether"), {
                        from: this.buyer
                    });
                });
            });
            it("Allows user to instantly sell tokens to BNB swap for a fixed price", async () => {
                this.receipt = await this.bnbSwap.sellTokens(this.buyerTokenBalance.toString(), {
                    from: this.buyer
                });
                assert.notEqual(this.receipt, null);
            });
            it("Buyer's ETH balance should increased", async () => {
                let balance = await web3.eth.getBalance(this.buyer);
                assert.isAbove(parseInt(balance), parseInt(this.buyerETHBalance));
            });
            it("BNBSwap's ETH balance should decreased", async () => {
                let balance = await web3.eth.getBalance(this.bnbSwap.address);
                assert.equal(parseInt(balance), parseInt(this.bnbSwapETHBalance) - parseInt(this.amountToPurchase));
            });
            it("Buyer's tokens should decreased", async () => {
                let balance = await this.token.balanceOf(this.buyer);
                assert.equal(parseInt(balance.toString()), parseInt(this.buyerTokenBalance.toString()) - parseInt(this.buyerTokenBalance.toString()));
            });
            it("BNBSwap's tokens should increased", async () => {
                let balance = await this.token.balanceOf(this.bnbSwap.address);
                assert.equal(parseInt(balance), parseInt(this.bnbSwapTokenBalance.toString()) + parseInt(this.buyerTokenBalance.toString()));
            });
            describe("Event check", () => {
                it("Triggers one event", async () => {
                    assert.equal(this.receipt.logs.length, 1);
                });
                it("Should be the `TokensSold` event", async () => {
                    assert.equal(this.receipt.logs[0].event, "TokensSold");
                });
                it("Has the correct `account` argument", async () => {
                    assert.equal(this.receipt.logs[0].args.account, this.buyer);
                });
                it("Has the correct `token` argument", async () => {
                    assert.equal(this.receipt.logs[0].args.token, this.token.address);
                });
                it("Has the correct `amount` argument", async () => {
                    assert.equal(this.receipt.logs[0].args.amount, this.buyerTokenBalance.toString());
                });
                it("Has the correct `rate` argument", async () => {
                    assert.equal(this.receipt.logs[0].args.rate, this.rate);
                });
            });
        });
    });
});