import React, {PureComponent} from "react";
import AppRoutes from "./AppRoutes";
import Web3 from "web3";
import TruffleContract from "@truffle/contract";
import Web3Context from "./contexts/Web3Context";
import IsEmpty from "./helpers/IsEmpty";
import BEP20Token from "./contracts/BEP20Token.json";
import BNBSwap from "./contracts/BNBSwap.json";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";

class App extends PureComponent {
    constructor(props) {
        super(props);
        this.initialState = {
            loading: true,
            web3: null,
            newBlockHeadersSubscription: null,
            account: "",
            primaryBalance: 0,
            bep20Balance: 0,
            bep20Token: null,
            bnbSwap: null,
            loadWeb3: () => false
        };
        this.state = {
            ...this.initialState
        };
        this.loadWeb3 = this.loadWeb3.bind(this);
    }

    componentDidMount() {
        this.setState({
            loadWeb3: this.loadWeb3
        }, () => this.loadWeb3());
    }

    loadWeb3() {
        this.setLoading(true, () => {
            let web3 = null;
            if (!IsEmpty(window.ethereum)) {
                web3 = new Web3(window.ethereum);
                this.setState({
                    web3: web3
                }, () => {
                    window.ethereum.request({method: "eth_requestAccounts"}).then((accounts) => {
                        this.getAccounts(accounts);
                        this.getListeners();
                    }).catch((error) => {
                        this.errorGettingAccounts();
                    }).finally(() => {});
                });
            } else if (!IsEmpty(window.web3)) {
                web3 = new Web3(window.web3.currentProvider);
                this.setState({
                    web3: web3
                }, () => {
                    if (!IsEmpty(window.ethereum)) {
                        window.ethereum.enable().then((accounts) => {
                            this.getAccounts(accounts);
                            this.getListeners();
                        }).catch((error) => {
                            this.errorGettingAccounts();
                        }).finally(() => {});
                    }
                });
            } else {
                window.alert("Non-Ethereum browser detected. You should consider tyring Metamask!");
            }
        });
    }

    getAccounts(accounts) {
        if (!IsEmpty(accounts)) {
            this.setState({
                account: accounts[0]
            }, () => {
                this.getPrimaryBalance();
            });
        } else {
            this.setState({
                ...this.initialState
            });
        }
    }

    getPrimaryBalance() {
        this.state.web3.eth.getBalance(this.state.account).then((balance) => {
            this.setState({
                primaryBalance: balance
            }, () => {
                this.getBlockchainData();
            });
        }).catch((error) => {
            console.error(error);
        }).finally(() => {
            this.setLoading(false);
        });
    }

    listenAccountChanges() {
        if (!IsEmpty(window.ethereum)) {
            window.ethereum.on("accountsChanged", (accounts) => {
                this.getAccounts(accounts);
            });
        }
    }

    listenChainChanges() {
        if (!IsEmpty(window.ethereum)) {
            window.ethereum.on("chainChanged", (chainId) => {
                this.getBlockchainData();
            });
        }
    }

    listenNewBlockHeaders() {
        let newBlockHeadersSubscription = this.state.web3.eth.subscribe("newBlockHeaders", (error, blockHeader) => {
            if (IsEmpty(error)) {
                this.getPrimaryBalance();
            } else {
                console.error(error);
            }
        }).on("connected", (subscriptionId) => {
            //
        }).on("data", (data) => {
            //
        }).on("error", (error) => {
            console.error(error);
        });
        this.setState({
            newBlockHeadersSubscription: newBlockHeadersSubscription
        });
    }

    errorGettingAccounts() {
        console.error("Error getting account.");
        this.setLoading(false);
    }

    getListeners() {
        this.listenAccountChanges();
        this.listenChainChanges();
        this.listenNewBlockHeaders();
    }

    getBlockchainData() {
        this.loadBEP20Token();
        this.loadBNBSwap();
    }

    setLoading(value, callback) {
        this.setState({
            loading: value
        }, () => {
            if (!IsEmpty(callback) && typeof callback === "function") callback();
        });
    }

    loadBEP20Token() {
        const token = TruffleContract(BEP20Token);
        token.setProvider(this.state.web3.currentProvider);
        this.setState({
            bep20Token: token
        }, () => {
            this.state.bep20Token.deployed().then((data) => {
                data.balanceOf(this.state.account).then((result) => {
                    this.setState({
                        bep20Balance: result
                    });
                }).catch((error) => {
                    console.error(error);
                }).finally(() => {});
            }).catch((error) => {
                console.error(error);
            }).finally(() => {});
        });
    }

    loadBNBSwap() {
        const bnbSwap = TruffleContract(BNBSwap);
        bnbSwap.setProvider(this.state.web3.currentProvider);
        this.setState({
            bnbSwap: bnbSwap
        }, () => {
            this.state.bnbSwap.deployed().then((data) => {
                console.log('BNBSwap :', data);
            }).catch((error) => {
                console.error(error);
            }).finally(() => {});
        });
    }

    render() {
        return (
            <Web3Context.Provider value={this.state}>
                <AppRoutes />
            </Web3Context.Provider>
        );
    }
}

export default App;