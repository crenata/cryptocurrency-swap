import React from "react";

const Web3Context = React.createContext({
    loading: true,
    web3: null,
    newBlockHeadersSubscription: null,
    account: "",
    primaryBalance: 0,
    bep20Balance: 0,
    bep20Token: null,
    bnbSwap: null,
    rate: 0,
    loadWeb3: () => false,
    setLoading: () => false
});

export default Web3Context;