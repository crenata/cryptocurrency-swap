import React from "react";

const Web3Context = React.createContext({
    loading: true,
    account: "",
    primaryBalance: 0,
    bep20Balance: 0,
    bep20Token: null,
    bnbSwap: null,
    loadWeb3: () => false
});

export default Web3Context;